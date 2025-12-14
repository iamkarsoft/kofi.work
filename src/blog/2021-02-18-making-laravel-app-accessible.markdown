---
title: Making laravel app accessible
layout: post
date: 2021-02-18
categories: laravel devops
---

## Fixing laravel 403 stuff
  


### Create .htaccess file in root folder

Create and put this .htaccess file in your laravel installation folder.

{% include codeHeader.html %}   
```


<IfModule mod_rewrite.c>
    RewriteEngine on
    RewriteCond %{REQUEST_URI} !^public
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```
  

### Making writing files to folders accessible  
 
change the owner of the project directory to www-data using the following command:
  
{% include codeHeader.html %}
```
sudo chown -R www-data:www-data /var/www/path/to/your/project/
```

### Change directory ownership
 

ever set a directory to 777. you should change directory ownership. so set your current user that you are logged in with as owner and the webserver user (www-data, apache, ...) as the group. You can try this:  

{% include codeHeader.html %}
```
sudo chown -R $USER:www-data storage
sudo chown -R $USER:www-data bootstrap/cache
```
  
  
  
### Set storage and cache permissions
 

{% include codeHeader.html %}
```
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```
