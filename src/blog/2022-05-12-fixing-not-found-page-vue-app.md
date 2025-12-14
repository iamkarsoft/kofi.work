---
layout: post
title:  "Fixing 404 not found with Vue app on server"
date:   2022-05-11 
categories: linux vuejs vue-router 
---


After Deploying a Vue app using Vue Router on a server, I encountered a problem visiting other pages aside from the home page. It threw a page not found when i visited a page without starting from the homepage. This problem is because our site is an spa and our server doesn't know how to deal with that. You can read more about it from vue documentation [here]('https://v3.router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations')

In my case, my server was an apache server. The fix was to create an `.htaccess` file with some content that tells the server how to handle the spa routes and drop it in the root folder which in my case was `dist/` folder.
  

### .htaccess content

{% include codeHeader.html %} 
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>


```

