---
layout: post
title:  "Fix 404 page not found vue routing error on apache server"
date:   2023-12-14
categories: server apache 
---

For a while i had this error on my personal website which uses vuejs. Everytime i visited a url, it returned a `404 page not found` unless you visited the homepage then navigated to that route. 

*The Problem* was that my website is a SPA website, but my routing was being treated as a server side website.
  


*The Solution* is to tell server to handle the routing differently.

I had to add a few lines to my `apache.conf` file to tell the server how to handle that particular website.

{% include codeHeader.html %}
```bash
<Directory /var/www/html/>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
</Directory>
``` 

