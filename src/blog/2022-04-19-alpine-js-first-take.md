---
layout: post
title:  "Alpine Js first Take"
date:   2022-04-19 
categories: alpine js laravel
---



# Showing element

## all directives
- **x-text**
- **x-data**
- **x-model**
- **x-show**
- **x-if**
- **x-for**

## Click Element

{% include codeHeader.html %}
```

<div x-data="{open: false}">
	
	<a href="#" @click.prevent="open = !opn">open</a>
	
	<div x-show="open">
		I'm Open
	</div>

</div>
```


## Syncing data with input

- **x-text** for outputting text of a function


{% include codeHeader.html %}
```


<div x-data="{name: ''}">
	
	<input type="text" x-on:input="name= $event.target.value" />
	
	<input type="text" x-model="name" />
	<span x-text="name"></span>
</div>

//form binding
<div x-data="{form: {email:'', password:''}}">
	
	
	<input type="text" x-model="form.email" />
	<input type="password" x-model="form.password" />
	<span x-text="`${form.email} ${form.password}`"></span>
</div>

```


- **x-data**

{% include codeHeader.html %}
```


<div x-data="state">
	<span x-text="number">
	<a href="#" x-on:click.prevent="increment">increment</a>
	

</div>

<script>
	function state(){
		return{
		 	number: 0,
			incement(){
				this.number++
			}
		}
	}


</script>

```


- **x-if**

{% include codeHeader.html %}
```

<template x-if="visible">
	<div>
		i'm toggled!
	</div>
</template>

</div>


```

- **x-for**

{% include codeHeader.html %}
```
 <template x-for="user in users" :key="user.id">
 	<span x-text="user.name"></span>
 </template>

```


## Binding values

{% include codeHeader.html %}
```
	<div x-data="{name: 'alex'}">
		<input type="text" x-bind:value="name">
	</div>
	
	<div x-data="{progess: 30}">
		<div x-bind:style="`width: ${progress}%;``"></div>
	</div>

```

## Component initialization

{% include codeHeader.html %}
```js
<div x-data="state()" x-init="mounted">
		<span x-text="counter"></span>
</div>

<script>
	
	function state(){
		return{
			counter: 5,
			
			mounted(){
				let interval = setInterval(() =>{
					this.counter--
					
					if(this.counter === 0){
					clearInterval(interval)
					}
					
				},1000)
			}
		
		}
	}

</script>


```