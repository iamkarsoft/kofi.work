---
layout: post
title:  "Laravel permissions ubuntu"
date:   2022-05-11 
categories: linux devops
---

I tried uploading files from my laravel up but was met with some file permission. So this here are the following commands i've had to run to get that sorted.

1. `sudo chmod 755 -R directory-name`
2. `sudo chown www-data:www-data -R directory-name`
