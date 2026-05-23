---
layout: post
title: "Laravel One to One relationship"
date: 2026-05-23
categories: laravel database eloquent
topic: "Laravel Eloquent relationship"
learning_path: true
path_tag: "Laravel Eloquent Relationship"
---


This is one of the simplest relationship in laravel.One record is related to another record in another table.


There are few things that make you know that will make you identify
when a record or a model has a one to one relationship.

1. Migration relationship

```php
public function up():void
{

   $table->foreignId('user_id') // foreign key id on user id, 
    ->constrained() // Constrained means must belong to a user
    ->cascadeOnDelete(); // means delete  if user data is deleted;

    $table->unique('user_id'); // enforces one to one relationship

}

```



2. Setting up One to One relationship with Eloquent Models

```php
//** User model | Parent
public function profile() : HasOne
{
    return $this->hasOne(Profile::class)
    ->withDefault([
        'handle' => 'No profile is set for this user',
        'bio' => 'No bio exists'
    ]);
}
``` 

```php
//** Profile model | Child

public function user() : BelongsTo
{
    return $this->BelongsTo(User::class);
}

```


3. Using the relationship in code

```php
// Routes

Route::get('/', function(){
    $user = User::find(1);
    return view('welcome', ['user' => $user]);
});

```

4. Using the the relationship in blade views

```php
{{ $user->profile->handle }}
{{ $user->profile->bio }}
```


5. Eager loading to avoid **N+1 query problems**

Eager loading is a technique used in database queries to load all necessary related data in a single query, rather than making multiple queries for each piece of related data.
<br>`$users = User::with(['profile'])->get();`

6. Using reverse relationship.

```php
Route::get('/profile', function(){
  $profile = Profile::find(1);
  $profile->user->id;
});
```



