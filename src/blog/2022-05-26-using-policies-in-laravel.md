---
layout: post
title:  "Using policies in laravel"
date:   2022-05-26
categories: laravel post 
---


When you want to logically group your authorization actions for any particular model or resource, it's the policy you're looking for.

Lets create a policy for a **Post** model. Policies are great 


1. create the model
2. create migration for the post model

<br>

### Creating a policy for the post model

```bash
php artisan make:policy PostPolicy --model=Post
```

<br>

### Conditionals in the policy

In the following, we will be checking if the `user id` matches the `post user id` then allow the user to perform certain tasks.

```php

<?php

  

namespace App\Policies;

  

use App\Models\Post;

use App\Models\User;

use Illuminate\Auth\Access\HandlesAuthorization;

  

class PostPolicy

{

use HandlesAuthorization;

  

/**

* Determine whether the user can view any models.

*

* @param \App\Models\User $user

* @return \Illuminate\Auth\Access\Response|bool

*/

public function viewAny(User $user)

{

//

}

  

/**

* Determine whether the user can view the model.

*

* @param \App\Models\User $user

* @param \App\Models\Post $post

* @return \Illuminate\Auth\Access\Response|bool

*/

public function view(User $user, Post $post)

{

//

return TRUE;

}

  

/**

* Determine whether the user can create models.

*

* @param \App\Models\User $user

* @return \Illuminate\Auth\Access\Response|bool

*/

public function create(User $user)

{

//

return $user->id > 0;

}

  

/**

* Determine whether the user can update the model.

*

* @param \App\Models\User $user

* @param \App\Models\Post $post

* @return \Illuminate\Auth\Access\Response|bool

*/

public function update(User $user, Post $post)

{

//

return $user->id == $post->user_id;

}

  

/**

* Determine whether the user can delete the model.

*

* @param \App\Models\User $user

* @param \App\Models\Post $post

* @return \Illuminate\Auth\Access\Response|bool

*/

public function delete(User $user, Post $post)

{

//

return $user->id == $post->user_id;

}

  

/**

* Determine whether the user can restore the model.

*

* @param \App\Models\User $user

* @param \App\Models\Post $post

* @return \Illuminate\Auth\Access\Response|bool

*/

public function restore(User $user, Post $post)

{

//

}

  

/**

* Determine whether the user can permanently delete the model.

*

* @param \App\Models\User $user

* @param \App\Models\Post $post

* @return \Illuminate\Auth\Access\Response|bool

*/

public function forceDelete(User $user, Post $post)

{

//

}

}
```



<br>

### Applying policies in controller

```php

<?php

  

namespace App\Http\Controllers;

  

use App\Models\Post;

use Illuminate\Http\Request;

  

class PostController extends Controller

{

/**

* Display a listing of the resource.

*

* @return \Illuminate\Http\Response

*/

public function index()

{

//

dump(Post::get());

}

  

/**

* Show the form for creating a new resource.

*

* @return \Illuminate\Http\Response

*/

public function create()

{

//

  

}

  

/**

* Store a newly created resource in storage.

*

* @param \Illuminate\Http\Request $request

* @return \Illuminate\Http\Response

*/

public function store(Request $request)

{

  
  

Post::create([

'title' => 'this is the title',

'content' => 'this is the content',

'user_id' => auth()->user()->id

]);

  
  

return redirect()->route('posts');

}

  

/**

* Display the specified resource.

*

* @param int $id

* @return \Illuminate\Http\Response

*/

public function show($id)

{

}

  

/**

* Show the form for editing the specified resource.

*

* @param int $id

* @return \Illuminate\Http\Response

*/

public function edit($id)

{

//

}

  

/**

* Update the specified resource in storage.

*

* @param \Illuminate\Http\Request $request

* @param int $id

* @return \Illuminate\Http\Response

*/

public function update(Request $request, $id)

{

$post = Post::find($id);

  

if (auth()->user()->can('update', $post)) {

  

$post->update([

'title' => 'this is the title post again and again ' . $id,

'content' => 'this is the content of post ' . $id

]);

} else {

echo 'not authorized';

}

  

dump($post);

}

  

/**

* Remove the specified resource from storage.

*

* @param int $id

* @return \Illuminate\Http\Response

*/

public function destroy($id)

{

$post = Post::find($id);

if (auth()->user()->can('delete', $post)) {

$post->delete();

echo 'deleted';

} else {

echo "You're not authorized";

}

}

}
```


<br>

### Applying policies with middleware in route file

```php

Route::get('/post/delete/{post}', function (Post $post) {

$post->delete();

echo 'deleted';

})->name('post.delete')->middleware('can:delete,post');
```



<br>

### Using policies


```php
@can('delete',$post)

 what ever you want

@endcan
```