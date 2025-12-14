# Blog Posts

This directory contains all your blog posts in Markdown format.

## Creating a New Blog Post

1. Create a new `.md` file in this directory. You can use either format:
   - Simple: `my-new-post.md`
   - Date-prefixed: `2020-10-21-revisiting-gulp.md` (recommended for chronological organization)
2. Add frontmatter at the top of your markdown file:
   - **That's it!** Vite automatically detects all `.md` files in this directory - no manual registration needed!

```markdown
---
layout: post
title: "Your Post Title"
date: "2019-09-19 23:48:49 +0000"
author: "Your Name"
excerpt: "A brief description of your post"
categories: css laravel course tailwind
---

# Your Post Title

Your content here...
```

3. The post will automatically appear in the blog list at `/blog`

## File Naming

Blog posts can be named in two ways:

1. **Simple format**: `my-post.md`
   - Slug will be: `my-post`
   - URL: `/blog/my-post`

2. **Date-prefixed format**: `2020-10-21-revisiting-gulp.md` (recommended)
   - Date extracted from filename: `2020-10-21`
   - Slug will be: `revisiting-gulp`
   - URL: `/blog/revisiting-gulp`
   - If no date in frontmatter, the date from filename will be used

## Frontmatter Fields

- `layout` (optional): Layout to use for the post. Options: `post` (default), `minimal`
- `title` (required): The title of your blog post
- `date` (optional): Publication date. If not provided and filename has date prefix, that will be used. Supports formats like:
  - `"2019-09-19 23:48:49 +0000"`
  - `"2024-01-15"`
  - `2020-10-21`
  - Any valid date string
- `author` (optional): Author name
- `excerpt` (optional): Short description shown in the blog list
- `categories` (optional): Space-separated list of categories/tags (e.g., `"css laravel course tailwind"`)
  - You can also use `tags` instead of `categories`
  - Categories are clickable and filter posts
- Any other custom fields you want to add

## Features

### Category Filtering
- Posts can have multiple categories
- Click on a category to filter posts
- Categories are displayed as clickable badges
- URL: `/blog/category/category-name`

### Pagination
- Blog list is paginated (5 posts per page by default)
- Navigate between pages with Previous/Next buttons
- Page numbers are displayed

### Layouts
- **post** (default): Full-featured layout with categories, author, date
- **minimal**: Clean, minimal layout for simple posts
- Add new layouts by creating components in `src/components/blog/` and registering them in `BlogPost.vue`

## Markdown Support

You can use standard Markdown syntax:
- Headers (# ## ###)
- **Bold** and *italic* text
- Code blocks with syntax highlighting
- Lists
- Links
- Images
- HTML (you can mix HTML and Markdown)
- And more!

