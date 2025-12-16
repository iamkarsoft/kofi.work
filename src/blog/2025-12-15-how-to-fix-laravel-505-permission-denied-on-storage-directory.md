---
layout: post
title:  "How to Fix Laravel 505 Error: Permission Denied on Storage Directory"
date:   2025-12-15 
categories: php laravel devops
---

If your Laravel application is showing a 505 error and you're seeing "Permission denied" errors in your logs, it's likely due to incorrect file ownership and permissions on the storage directories. Here's how to fix it.

### The Problem

Laravel needs to write compiled Blade views to the `storage/framework/views/` directory. If these files are owned by a different user (like root) than your web server user `(typically www-data or nginx)`, Laravel can't overwrite them, resulting in a 505 error.

The error typically looks like this in your logs:

```bash
file_put_contents(/var/www/yourapp/storage/framework/views/xxxxx.php): 
Failed to open stream: Permission denied
```


### The Solution

Follow these steps to fix the permissions:
<br/>
<br/>

#### Step 1: Check the Current Permissions
First, verify the issue by checking who owns the files:
`ls -la storage/framework/views/`

If you see files owned by `root` or another user instead of your web server user, that's your problem.
<br/>  
<br/>

#### Fix the Ownership
Change the ownership of the storage directory to your web server user (usually www-data on Ubuntu/Debian or nginx on other systems):
`chown -R www-data:www-data storage/framework/views/`
<br />
<br />

#### Step 3: Set Proper Permissions
Ensure the storage and bootstrap cache directories have the correct permissions:

```bash
chmod -R 775 storage/
chmod -R 775 bootstrap/cache/
```

#### Step 4: Clear laravel Caches
Clear all cached files to ensure everything is fresh:

```bash
php artisan cache:clear
php artisan view:clear
php artisan config:clear
```

#### Test your application
After completing these steps, try accessing your Laravel application again. The 505 error should be resolved.


To prevent this issue in the future:

1. Always use the web server user when running commands that generate files (like php artisan commands)
2. Avoid using sudo for artisan commands unless absolutely necessary
3. Set up proper deployment scripts that maintain correct ownership and permissions

If you need to run artisan commands as root, remember to fix the permissions afterwards:
```bash
chown -R www-data:www-data storage bootstrap/cache
```



