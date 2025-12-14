---
layout: post
title:  "Boot function in laravel to create events"
date:   2019-07-20 22:34:49 +0000
categories: laravel php model gist
---

### Using boot function to create certain events simultaneously

```
# User Model
 public static function boot()
    {
        parent::boot();
        static::created(function ($user) {
            $user->profile()->create([
            'title' => $user->username,
        ]);
        });
    }
```
