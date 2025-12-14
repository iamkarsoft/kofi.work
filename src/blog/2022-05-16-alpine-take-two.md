---
layout: post
title:  "Alpine take 2"
date:   2022-05-16
categories: alpinejs js 
---




### Installation

Using CDN `<script src="http://unpkg.com/alpinejs" defer></script>`

<br>

### Setting state and show and hide

1. setting alpine state `x-data="{state}"`
2. Show and hide

<br>

```html
<body class="p-4">
<h1 class="my-4">Alpine.js Crash Course</h1>

<div x-data="{open: false }">
	<button x-on:click="open = !open" class="bg-slate-700 text-white px-4 py-2 rounded-xl">
		Toggle
	</button>

	<div x-show="open" x-cloak class="my-4">
		<p>This is being shown</p>
	</div>
	
</div>
</body>
```

3. to stop flicker you can use `x-cloak`

<br>

### **x-text**

```html
<div x-data="{open: false, name: 'Ramos' }">
		<button x-on:click="open = !open" class="bg-slate-700 text-white px-4 py-2 rounded-xl">
			Toggle
		</button>

		<div x-show="open" x-cloak class="my-4">
			<p>This is being shown</p>
			<p x-text="name"></p>
		</div>
		
	</div>
```

<br>

### x-effect

This is like a watcher for an alpine expression

```html
<!-- x-effect -->
	<div x-effect="console.log(open)">
		
	</div>
	<div x-effect="alert(open)">
			
		</div>
<!-- /====== -->
```

<br>

### x-bind

Dynamically bind a class or a piece of attribute

```html
<button x-on:click="open = !open" 
		x-transition class="bg-slate-700 text-white px-4 py-2 rounded-xl"
		x-bind:class="open ? 'bg-blue-800': '' "
		>
			Toggle
		</button>
```

<br>

### x-model

Setting the state`<div x-data="{search: ''}"`

```html
	<div class="my-2" x-data="{search: ''}">
			<input 
			x-model="search"
			type="text" 
			class="border p-2 w-full mb-2 mt-6"
			placeholder="Search for something..."
			>

			<p class="mt-2" x-text="search"></p>
		</div>

```

<br>

### x-if

Conditional template for alpine

```html
<!-- x-if -->
	<template x-if="open">
		<div>
			This is only Shown when open is true
		</div>
	</template>

<!-- /======== -->
```

<br>

### x-for

Looping through stuff in alpine js

```html
	<!-- x-for -->

			<div class="my-2"  x-data="{
				posts:[
					{id:1,title:'first post'},
					{id:2,title:'second post'},
					{id:3,title:'third post'},
					{id:4, title:'fourth post'},
				],
				post: ''
			}">
			<h3 class="text-2xl mt-6 mb-3 font-bold">Posts</h3>

			<input 
			x-model="post"
			type="text" 
			class="border p-2 w-full mb-2 mt-6"
			placeholder="Add Post"
			>
			<button x-on:click="posts.push({title: post})" 
		 class="bg-slate-700 text-white px-4 py-2 rounded-xl"
				>Add Post
			</button>

				<template x-for="post in posts" x-key="post.id">
					<div x-text="post.title"></div>
				</template>
			</div>

		<!-- /=========== -->
```

<br>

### x-ref

Use to reference a certain element or part of your code

```html
	<!-- x-ref -->
<div class="my-8">
<div x-ref="removethis">Hello world</div>
<button @click="$refs.removethis.remove()" class="bg-black text-white p-2 rounded-lg">Remove</button> 

<button @click="$refs.removethis.innerText='Hello Ramos'" class="bg-black text-white p-2 rounded-lg">Change inside</button>

</div>
		<!--  -->
```

<br>

### x-html

Used to set inner html 

<br>


### `$el` 

use to access current element similar to `refs` that can 

```html
<!-- $el -->
<button @click="$el.innerHTML='Hi World'" class="mt-4 p-4 border">Replace Text</button>
<!-- /===== -->

```

<br>

### x-init and watching

`x-init` is used to initialize any js and in this case we are using it as a watcher


```html
<!-- x-init and $watch -->
<div x-init="$watch('posts', vaule=>console.log(value))"></div>
<!-- /======== -->
```

<br>

### $dispatch

Used to dispatch any browser event

```html
<!-- $dispatch -->
<div @notify="alert('you have been notified!')" class="my-4">
<button @click="$dispatch('notify')" class="bg-green-700 p-2 text-white">
Notify
</button>
</div>
<!-- /= -->
```


<br>

### $data

Use to get all the data in alpine

```html
<!-- $data -->

<div >
<button @click="getLatestPost($data.posts)" class="bg-green-700 p-2 text-white">
	Get latest Post
</button>
</div>

<!-- / ======= -->

<script>
function getLatestPost(posts){
console.log(posts.slice(-1).pop());
}
</script>
```

<br>

### Alpine store

This is a way for alpine to store data on the client side

In this example we use the store to toggle darkmode
```html


// html
	<div x-data :class="$store.darkMode.on && 'bg-gray-700 text-white'" class="container mx-auto max-w-sm mt-6 bg-gray-50 p-4">
		<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus aperiam blanditiis cumque fugit corporis nihil, voluptatibus optio facere ullam aspernatur magni, explicabo soluta nemo dolore consequatur ratione nulla sed voluptate ex maiores hic accusantium at eius. Nemo asperiores soluta temporibus.</p>

		<button
		:class="$store.darkMode.on && 'bg-gray-700 text-white border border-white rounded-lg'"
		 @click="$store.darkMode.toggle()" class="block mt-4 text-xs p-4 bg-gray-200">
			Toggle Dark Mode
		</button>
	</div>

// script and store

	<script>
		document.addEventListener("alpine:init",()=>{
			Alpine.store('darkMode',{
				on: false,


				// methods
				toggle(){
					this.on = !this.on
				}
			});
		})
	</script>
```


<br>

### Alpin Plugins

In this case, using the x-mask plugin. 

```html

<div class="mt-6">
	<h3 class="text-2xl">Enter a date:</h3>
	<input x-mask="99/99/9999" type="text">
</div>
```