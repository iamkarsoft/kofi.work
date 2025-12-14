import matter from 'gray-matter';
import { marked } from 'marked';
import { Buffer } from 'buffer';

// Make Buffer available globally for gray-matter
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
  global.Buffer = Buffer;
}

// Get list of markdown files using import.meta.glob
// This gives us the file paths
const blogFilePaths = import.meta.glob('../blog/*.md', { 
  eager: false 
});

// Cache for loaded blog content
const blogContentCache = {};

// Load a single blog file as raw text
async function loadBlogFile(filePath) {
  if (blogContentCache[filePath]) {
    return blogContentCache[filePath];
  }
  
  try {
    // Convert the import path to a URL we can fetch
    // In Vite, we can import with ?raw to get raw text
    const module = await import(/* @vite-ignore */ filePath + '?raw');
    const content = module.default;
    blogContentCache[filePath] = content;
    return content;
  } catch (error) {
    console.error(`Error loading blog file ${filePath}:`, error);
    return null;
  }
}

// Helper function to parse categories (can be string with spaces or array)
function parseCategories(categories) {
  if (!categories) return [];
  if (Array.isArray(categories)) return categories;
  if (typeof categories === 'string') {
    return categories.split(/\s+/).filter(cat => cat.length > 0);
  }
  return [];
}

// Helper function to parse date (handles various formats)
function parseDate(dateString) {
  if (!dateString) return new Date().toISOString();
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

// Extract date and slug from filename (supports YYYY-MM-DD-slug.md format)
function parseFileName(fileName) {
  // Remove .md extension
  const nameWithoutExt = fileName.replace(/\.md$/, '');
  
  // Pattern: YYYY-MM-DD-slug
  const datePattern = /^(\d{4}-\d{2}-\d{2})-(.+)$/;
  const match = nameWithoutExt.match(datePattern);
  
  if (match) {
    return {
      dateFromFile: match[1], // YYYY-MM-DD
      slug: match[2] // slug part
    };
  }
  
  // No date prefix, use entire filename as slug
  return {
    dateFromFile: null,
    slug: nameWithoutExt
  };
}

// Get all blog posts (async version)
export async function getAllPostsAsync() {
  try {
    const posts = [];
    const filePaths = Object.keys(blogFilePaths);
    
    console.log('Blog file paths found:', filePaths.length, filePaths);
    
    if (filePaths.length === 0) {
      console.warn('No markdown files found in blog directory');
      return [];
    }
    
    // Load all files in parallel
    const loadPromises = filePaths.map(async (filePath) => {
      try {
        const fileName = filePath.split('/').pop();
        
        // Skip README.md files
        if (fileName.toLowerCase() === 'readme.md') {
          return null;
        }
        
        const contentString = await loadBlogFile(filePath);
        
        if (!contentString) {
          console.warn(`No content found for ${fileName}`);
          return null;
        }
        
        const { data, content: markdownContent } = matter(contentString);
        const { dateFromFile, slug } = parseFileName(fileName);
        const postDate = data.date || dateFromFile || null;
        const categories = parseCategories(data.categories || data.tags);
        
        return {
          slug: slug,
          filename: fileName,
          title: data.title || 'Untitled',
          date: parseDate(postDate),
          author: data.author || 'Unknown',
          excerpt: data.excerpt || '',
          layout: data.layout || 'post',
          categories: categories,
          tags: categories,
          content: markdownContent,
          ...data
        };
      } catch (error) {
        console.error(`Error loading post from ${filePath}:`, error);
        return null;
      }
    });
    
    const loadedPosts = await Promise.all(loadPromises);
    const validPosts = loadedPosts.filter(post => post !== null);
    
    console.log(`Successfully loaded ${validPosts.length} posts`);
    return validPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    return [];
  }
}

// Synchronous version - will return empty until async load completes
// Components should use getAllPostsAsync for initial load
let cachedPosts = [];

export function getAllPosts() {
  // Return cached posts if available, otherwise return empty
  return cachedPosts;
}

// Initialize and cache posts
export async function initializeBlogPosts() {
  if (cachedPosts.length === 0) {
    cachedPosts = await getAllPostsAsync();
    console.log('Blog posts initialized and cached:', cachedPosts.length);
  }
  return cachedPosts;
}

// Get a single post by slug
export async function getPostBySlugAsync(slug) {
  try {
    const filePaths = Object.keys(blogFilePaths);
    
    // Find the file by matching slug
    let foundFilePath = null;
    let actualSlug = slug;
    
    for (const filePath of filePaths) {
      const fileName = filePath.split('/').pop();
      const { slug: fileSlug } = parseFileName(fileName);
      
      if (fileSlug === slug) {
        foundFilePath = filePath;
        actualSlug = fileSlug;
        break;
      }
    }
    
    if (!foundFilePath) {
      console.error(`Post not found: ${slug}`);
      return null;
    }
    
    const contentString = await loadBlogFile(foundFilePath);
    if (!contentString) {
      return null;
    }
    
    const fileName = foundFilePath.split('/').pop();
    const { dateFromFile } = parseFileName(fileName);
    const { data, content: markdownContent } = matter(contentString);
    const postDate = data.date || dateFromFile || null;
    const categories = parseCategories(data.categories || data.tags);
    
    return {
      slug: actualSlug,
      filename: fileName,
      title: data.title || 'Untitled',
      date: parseDate(postDate),
      author: data.author || 'Unknown',
      excerpt: data.excerpt || '',
      layout: data.layout || 'post',
      categories: categories,
      tags: categories,
      content: markdownContent,
      html: marked(markdownContent),
      ...data
    };
  } catch (error) {
    console.error(`Post not found: ${slug}`, error);
    return null;
  }
}

export function getPostBySlug(slug) {
  // Try to find in cache first
  const cached = cachedPosts.find(p => p.slug === slug);
  if (cached) {
    return {
      ...cached,
      html: marked(cached.content)
    };
  }
  return null;
}

// Get posts by category
export function getPostsByCategory(category) {
  const allPosts = getAllPosts();
  return allPosts.filter(post => 
    post.categories && post.categories.some(cat => 
      cat.toLowerCase() === category.toLowerCase()
    )
  );
}

// Get all unique categories
export function getAllCategories() {
  const allPosts = getAllPosts();
  const categorySet = new Set();
  
  allPosts.forEach(post => {
    if (post.categories && Array.isArray(post.categories)) {
      post.categories.forEach(cat => categorySet.add(cat.toLowerCase()));
    }
  });
  
  return Array.from(categorySet).sort();
}

// Convert markdown to HTML
export function markdownToHtml(markdown) {
  return marked(markdown);
}

