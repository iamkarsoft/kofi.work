---
title: "Laravel foreign key migrations"
layout: post
date: 2020-12-21
categories: laravel migrations
---


### New way to add foreign key

```php
$table->foreignId('user_id')->nullable()->constrained('authors')
//->referecens("id")->on('authors')


$table->foreignId('pass model here')->nullable()->constrained('authors')
```