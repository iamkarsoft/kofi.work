---
layout: post
title:  "Login user in laravel"
date: 2020-11-17  
categories: laravel snippets
---

This is a code snippets to try and login users from a controller after receiving input from a login form. 


```php
# getting data and attempt login
auth()->attempt($request->only('email','password'));

#redirect after login 
return redirect()->route('dashboard')
```