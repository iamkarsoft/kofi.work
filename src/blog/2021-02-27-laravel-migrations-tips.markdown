---
title: Laravel migration tips
layout: post
date: 2021-02-27
categories: laravel migration
---
  
### Foreign Keys in Laravel 7 and below  

`$table->foreignId('book_id')->constrainde()` for 7 and above

### constrained() and nullable()  

`nullable()->constrained()`  to allow nulable

### Delete Parent: Restrict or Cascade?  

`constrained()->onDelete('cascade')` to delete everything related

### Change Order of Migrations    
  
To change order of migrations, rename the file name changing the timestamp.

###  What Migrations Have (not) Run?  
 
`php artisan migrate:status` will list all the migrations and those not run

###  Timestamps with Default Value  

`table->timestamp('reviewed_at')->useCurrent() or ->useCurrentUpdate()` to insert default time.

###  Customize Default Migration File  
  
`php artisan stub:publish` 

###  Export Migrations into One SQL File  

squash all migrations to one file `php artisan schema:dump`

###  Drop Multiple Columns  
  
`$table->dropColumn(['is_admin','date'])`

###  Rollback or Refresh X Steps    

`php artisan migrate:rollback --steps=5` rollbacks migration 5 steps back

###  Auto-increment starting value  
  
`$table->id()->from(10000)` starts id from 1000

###  Make Migration: Spaces vs Underscores
  
`php artisan make:migration "create movies table"`