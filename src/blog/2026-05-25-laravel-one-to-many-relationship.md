---
layout: post
title: "Laravel One to Many relationship"
date: 2026-05-25
categories: laravel database eloquent
topic: "Laravel Eloquent relationship"
learning_path: true
path_tag: "Laravel Eloquent Relationship"
---


This is similar to the [one to one relationship](/blog/laravel-one-to-one-relationship).
But this time, one record has multiple children and is associated in another table.

**What's in this post:**

| # | Section |
|---|---------|
| 1 | [Migration](#1-migration-relationship) — foreign key setup, no cascade, no unique |
| 2 | [Eloquent Models](#2-setting-up-the-relationship-with-eloquent-models) — `hasMany` on parent, `belongsTo` on child |
| 3 | [Routes / code](#3-using-the-relationship-in-code) — eager loading with a constraint |
| 4 | [Blade views](#4-using-the-relationship-in-blade-views) — looping through children |
| 5 | [Eager loading](#5-eager-loading-to-avoid-n1-query-problems) — N+1 explanation |
| 6 | [Reverse relationship](#6-using-the-reverse-relationship) — querying from the child side |


There are a few things that help you identify when a model has a one to many relationship.

## 1. Migration relationship

```php
public function up():void
{

   $table->foreignId('user_id') // foreign key id on user id, 
    ->constrained() // Constrained means must belong to a user
    // No cascasding or unique because we might have multiple children
}

```



## 2. Setting up the relationship with Eloquent Models

```php
//** User model | Parent
public function tasks() : hasMany
{
    return $this->hasMany(Task::class);
}
``` 

```php
//** Task model | Child

public function user() : BelongsTo
{
    return $this->belongsTo(User::class);
}

```


## 3. Using the relationship in code

```php
// Routes


Route::get('/list', function () {
    $users = User::with(['profile', 'tasks' => function($query) {
        $query->where('status', 'A');
    }])->get();

    return view('list', ['users' => $users]);
});


```

## 4. Using the relationship in Blade views

```php
  @foreach ($user->tasks as $task)
    <li class="ml-3 mb-1">{{ $task->title }}</li>
    @endforeach
```


## 5. Eager loading to avoid **N+1 query problems**

Eager loading is a technique used in database queries to load all necessary related data in a single query, rather than making multiple queries for each piece of related data.
<br>`$users = User::with(['profile','tasks'])->get();`

## 6. Using the reverse relationship
```php
Route::get('/', function () {
    $user = User::find(1);
    $tasks = $user->tasks()->where('status', 'A')->get();

    return view('welcome', ['user' => $user, 'tasks' => $tasks]);
});
```



