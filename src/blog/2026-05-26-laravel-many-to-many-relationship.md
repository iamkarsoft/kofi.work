---
layout: post
title: "Laravel Many to Many relationship"
date: 2026-05-26
categories: laravel database eloquent
topic: "Laravel Eloquent relationship"
learning_path: true
path_tag: "Laravel Eloquent Relationship"
---


This is more complex than the [one to one]("https://kofi.work/blog/laravel-one-to-one-relationship") and [one to many]("https://kofi.work/blog/laravel-one-to-many-relationship") relationships.
Think of Teams and Users — like Slack. A user can belong to many teams and a team can have many users.


**What's in this post:**

| # | Section |
|---|---------|
| 1 | [Migration](#1-migration-relationship) — pivot table naming convention, `cascadeOnDelete`, composite primary key |
| 2 | [Eloquent Models](#2-setting-up-the-many-to-many-relationship-with-eloquent-models) — `belongsToMany` on both sides, one using `->using(Membership::class)` |
| 3 | [Routes / code](#3-using-the-relationship-in-code) — eager loading, accessing pivot data, using the accessor |
| 4 | [Accessors](#4-creating-accessors) — `getTeamsCountAttribute()` explained |
| 5 | [Pivot Model](#5-creating-a-pivot-model) — `Membership extends Pivot` with `getIsOwnerAttribute()` |
| 6 | [Sync](#6-syncing-pivot-data) — `TeamUserController@update` with validation and `sync()` |
| 7 | [Eager loading](#7-eager-loading-to-avoid-n1-query-problems) — N+1 explanation |


There are a few things that help you identify when a model has a many to many relationship.

## 1. Migration relationship

Unlike the previous relationships, there is no foreign key on either model's table. Instead we create a **pivot table** to hold the connection between the two.

Name the pivot table using the **singular form** of both table names in **alphabetical order**:

```bash
php artisan make:migration create_team_user_table
```

```php
public function up(): void
{
    $table->foreignId('user_id')
        ->constrained()
        ->cascadeOnDelete();

    $table->foreignId('team_id')
        ->constrained()
        ->cascadeOnDelete();

    $table->string('role')->default('member'); // pivot data

    $table->primary(['user_id', 'team_id']); // composite key for uniqueness
}
```


## 2. Setting up the Many to Many relationship with Eloquent Models

```php
// User model
public function teams(): BelongsToMany
{
    return $this->belongsToMany(Team::class)
                ->withPivot('role')
                ->withTimestamps();
}
```

```php
// Team model — using a Pivot Model for extra logic
public function users(): BelongsToMany
{
    return $this->belongsToMany(User::class)
                ->using(Membership::class)
                ->withPivot('role')
                ->withTimestamps();
}
```


## 3. Using the relationship in code

```php
Route::get('/', function () {
    $user = User::with('teams')->find(2);
    // $user->teams->makeHidden('pivot') // hide pivot data from output

    $team = $user->teams->first();

    return [
        'user'        => $user->name,
        'teams_count' => $user->teams_count,  // from accessor
        'firstTeam'   => $team->name,
        'owner'       => $team->pivot->is_owner, // from pivot accessor
        'role'        => $team->pivot->role,     // raw pivot data
    ];
});
```


## 4. Creating Accessors

Accessors let you compute or format data from a model. The `get` prefix means we are reading a value.

```php
// User model
public function getTeamsCountAttribute(): int
{
    return $this->teams->count();
}
```


## 5. Creating a Pivot Model

When you need extra logic on pivot data, extend `Pivot` instead of `Model`.

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Membership extends Pivot
{
    protected $casts = ['role' => 'string'];

    public function getIsOwnerAttribute(): bool
    {
        return $this->role === 'owner';
    }
}
```


## 6. Syncing pivot data

`sync()` **wipes** the existing pivot records and replaces them with the new data — useful when updating a user's team memberships in bulk.

```php
class TeamUserController extends Controller
{
    public function update(Request $request, Team $team)
    {
        $validated = $request->validate([
            'users'            => 'array',
            'users.*.role'     => 'required|in:owner,member,guest',
            'users.*.assigned' => 'nullable|boolean',
        ]);

        $team->users()->sync([
            1 => ['role' => 'guest'],
        ]);
    }
}
```


## 7. Eager loading to avoid **N+1 query problems**

Eager loading is a technique used in database queries to load all necessary related data in a single query, rather than making multiple queries for each piece of related data.
<br>`$users = User::with(['teams'])->get();`
