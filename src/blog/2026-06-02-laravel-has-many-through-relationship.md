---
layout: post
title: "Laravel Has Many Through relationship"
date: 2026-06-02
categories: laravel database eloquent
topic: "Laravel Eloquent relationship"
learning_path: true
path_tag: "Laravel Eloquent Relationship"
---


`HasManyThrough` is less common than other relationships but very useful when you need to reach across two models to get at a third.
Think of it this way — a Department has many Users, and each User has many Tasks, so a Department has many Tasks *through* Users.

**What's in this post:**

| # | Section |
|---|---------|
| 1 | [Migration](#1-migration) — creating the Department model, adding `department_id` to users |
| 2 | [Eloquent Models](#2-eloquent-models) — `belongsTo`, `hasMany`, and `hasManyThrough` |
| 3 | [Using the relationship](#3-using-the-relationship) — eager loading, accessing data in Blade |
| 4 | [Querying through the relationship](#4-querying-through-the-relationship) — filtering tasks via the department |


## 1. Migration

Start by generating the Department model and its migration:

```bash
php artisan make:model Department -m
```

In the Department migration, add a `name` column:

```php
public function up(): void
{
    Schema::create('departments', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->timestamps();
    });
}
```

In the Users migration, add the `department_id` foreign key. Using `nullOnDelete()` means the user stays in the database but loses their department reference if the department is deleted:

```php
public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->foreignId('department_id')
            ->nullable()
            ->constrained()
            ->nullOnDelete();
    });
}
```


## 2. Eloquent Models

On the **User** model, define the inverse relationship back to Department:

```php
use Illuminate\Database\Eloquent\Relations\BelongsTo;

public function department(): BelongsTo
{
    return $this->belongsTo(Department::class);
}
```

On the **Department** model, define both relationships. `users()` is a standard `hasMany`. `tasks()` uses `hasManyThrough` — Laravel will join through the users table to reach tasks automatically:

```php
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

public function users(): HasMany
{
    return $this->hasMany(User::class);
}

public function tasks(): HasManyThrough
{
    return $this->hasManyThrough(Task::class, User::class);
}
```


## 3. Using the relationship

Eager load both `tasks` and `users` to avoid N+1 queries:

```php
function () {
    $departments = Department::with('tasks', 'users')->get();

    return view('departments.index', compact('departments'));
}
```

In your Blade view, you can access the relationship as a property. Use `isEmpty()` to guard against empty collections:

```blade
@foreach($departments as $department)
    @if($department->tasks->isEmpty())
        <p>No tasks for this department.</p>
    @else
        @foreach($department->tasks as $task)
            <p>{{ $task->title }} — {{ $task->user->name }}</p>
        @endforeach
    @endif
@endforeach
```


## 4. Querying through the relationship

Because `tasks()` is a proper Eloquent relationship, you can chain query builder methods directly on it. Here, fetching only completed tasks for a department:

```php
function () {
    $department = Department::first();

    $completed = $department->tasks()
        ->where('status', 'C')
        ->get();

    return $completed;
}
```

This runs a single query with the join handled by Laravel — you never have to manually join the users table yourself.
