---
layout: post
title:  "Tailwind Pagination in my laravel app"
date:   2020-11-11
categories: tailwind css laravel
---

This is the settings i'm using in my laravel app to enable tailwind pagination.

{% include codeHeader.html %}
```
module.exports = {
  theme: {
    pagination: theme => ({
      color: theme('colors.purple.500'),
      link: 'py-2 px-3 bg-white block border-t border-b',
      wrapper: 'justify-start flex my-10',
      item: 'block',
      linkFirst: 'border-l border-r bg-gray-200 rounded-l-sm',
      linkLast: 'border-r border-l bg-gray-200 rounded-r-sm',
    })
  },
  variants: {},
  plugins: [
    require('tailwindcss-plugins/pagination')
  ]
}
```