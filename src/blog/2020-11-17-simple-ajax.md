---
layout: post
title:  "Simple ajax"
date: 2020-11-17   
categories: api jquery ajax javascript course-work
---


# Ajax Basics

### The steps for an ajax request

	1- Create request object

	2- create a callback function

	3- open a request

	4- send the request



### A simple example

```js
	//1 creating the requet object
	let xhr = new XMLHttpRequest();

	//creating callback
	xhr.onreadystatechange = function(){
		 if(xhr.readyState===4){

		 		document.getElementById('ajax').innerHTML = xhr.responseText;
		 }
	};

	// 3 opening a request
	xhr.open('GET','ajax-content.html');

	// 4 sending the request
	xhr.send();
```



### Using  A button to trigger the ajax request

```js
//getting the button element	
let loadButton = document.getElementById("load");

// attaching a click event to the button
	loadButton.addEventListener('click',function(){
			//1 creating the requet object
	let xhr = new XMLHttpRequest();

	//creating callback
	xhr.onreadystatechange = function(){
		 if(xhr.readyState===4){

		 		document.getElementById('ajax').innerHTML = xhr.responseText;
		 }
	};

	//3 opening a request
	xhr.open('GET','ajax-content.html');

	// 4 sending the request
	xhr.send();
	})

```



### Using Jquery for making request



```js
	$('#ajax').load('ajax-content.html')
```



##### the 4 steps of making an ajax request using jquery

```js
$.get(url,data,callback)

- url: represents to make url to
- data: the data being passed
- callback: the callback function
```



###### an example

```js
const url = '/employees.php';
let data = {
    firstName: 'kofi',
    lastName: 'ramos'
};
const callback = function(response){}
$.get(url,data,callback)
```



##### another example

```js
	$('#load').click(function(){
		$.get('ajax-content.html',function(response){
			$("#ajax").html(response)
		})

		$("#ajax").toggle();
	})

```