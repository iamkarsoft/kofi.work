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
- `learning_path` (optional): Set to `true` to include this post in a learning path
- `path_tag` (optional): The learning path name this post belongs to (e.g., `"Laravel"`). Required when `learning_path: true`
- `course` (optional): Groups the post into a named chapter within a learning path (e.g., `"Authentication"`)
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

## Learning Paths

Learning paths are curated sequences of posts grouped under a topic, accessible at `/learning-paths`. They are driven entirely by frontmatter — no other config files need to be changed.

### How to Add a Post to a Learning Path

Add these fields to the post's frontmatter:

| Field | Required | Description |
|---|---|---|
| `learning_path` | Yes | Set to `true` to include this post in a learning path |
| `path_tag` | Yes | The learning path name (e.g. `"Laravel"`) |
| `course` | No | Groups the post into a chapter within the path (e.g. `"Authentication"`) |

### Example: Post with no chapter

```markdown
---
layout: post
title: "Laravel One to One Relationship"
date: 2026-05-23
categories: laravel
excerpt: "Learn how to set up one-to-one relationships in Eloquent."
learning_path: true
path_tag: "Laravel"
---
```

### Example: Post inside a chapter

```markdown
---
layout: post
title: "Laravel Login"
date: 2026-02-11
categories: laravel
excerpt: "How to implement authentication in Laravel."
learning_path: true
path_tag: "Laravel"
course: "Authentication"
---
```

### How Posts Are Grouped

```
/learning-paths
  └── Laravel                          ← path_tag: "Laravel"
        ├── Authentication (chapter)   ← course: "Authentication"
        │     ├── Post 1
        │     └── Post 2
        └── Other Posts                ← no `course` field
              └── Post 3
```

### Tips

- **A new learning path is created automatically** when the first post with a new `path_tag` is added — no other files to edit.
- **Post order within a path/chapter** is sorted **oldest → newest** by date, so use dates to control the sequence.
- The `path_tag` value is case-insensitive for routing (`/learning-paths/laravel`) but displays using the casing you set.
- Posts without a `course` field appear in an **"Other Posts"** section at the bottom of the learning path page.

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

