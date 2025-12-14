---
layout: post
title:  "Using trix editor with laravel"
date:   2022-05-12
categories: editor laravel packages
---


I've been using ckeditor for rich text editor, I've always wanted to use trix but i never got to make it work in my blade templates. I finally got it to work a few months back.<br>


So here are the steps.

1. include trix css and js in your blade file<br>

{% include codeHeader.html %}
```html
<link href="{{ asset('css/trix.css') }}" rel="stylesheet">
  <script src="{{asset('js/trix.js')}}" defer></script>

```

<br>
2. Replace your textarea with trix's<br>

You neet the trix editor tag and set a hidden input that will hold the set content.

{% include codeHeader.html %}
```php

<input id="bio" type="hidden" name="how_to_apply" value="" class=""/>
<trix-editor input="bio" class="trix-content"></trix-editor>


```