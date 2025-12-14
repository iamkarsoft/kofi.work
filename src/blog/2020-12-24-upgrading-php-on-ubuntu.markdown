---
title: "Upgrading php on ubuntu"
layout: post
date: 2020-12-24
categories: linux php devops
---


As new versions of php are being released, the following are the steps to upgrade your php version on ubuntu.


## Step 1 

Step 1 involves updating your box and installing a few packages with these commands


```bash
sudo apt-get update
sudo apt -y install software-properties-common
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update

```


## Step 2 : install php 7.4

```bash
sudo apt -y install php7.4
```

## Step 3 Configure php7.4

### On apache

```bash
sudo nano /etc/php/7.4/apache2/php.ini
```

### On nginx

```bash
sudo nano /etc/php/7.4/fpm/php.ini
```

## a few preferences changeable settings in your php.ini file

```php
upload_max_filesize = 32M 
post_max_size = 48M 
memory_limit = 256M 
max_execution_time = 600 
max_input_vars = 3000 
max_input_time = 1000
```

