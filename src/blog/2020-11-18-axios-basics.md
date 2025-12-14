---
layout: post
title:  "Axios basics"
date:   2020-11-18
categories: api javascript http
---

Following ajax with jquery, I took axios for a spin

#### Getting data with axios

{% include codeHeader.html %}
```
axios.get('https://jsonplaceholder.typicode.com/posts')
	.then(function(response){
		resultContainer.innerHTML ='<pre>'+JSON.stringify(response.data, null,'\t')+'</pre>';
	})
	.catch(function (error){

	})
```

#### Posting data with axios

{% include codeHeader.html %}
```
let resultContainer = document.querySelector("#containerThree");
	let todotitle = document.querySelector('#title').value;
	resultContainer.innerHTML ='';




	axios.post('https://jsonplaceholder.typicode.com/posts', {
		userId: '1',
		title: todotitle,
		body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem culpa ratione, nemo voluptate, dolore sit ducimus blanditiis commodi cupiditate iure animi repudiandae necessitatibus quia est, facere fugit porro natus delectus odio beatae perspiciatis aliquid, molestiae? Deserunt fugiat cupiditate nesciunt quis nisi, soluta fugit voluptas neque doloremque possimus amet vel eos.'
	})
	.then(function(response){
		resultContainer.innerHTML ='<pre>'+JSON.stringify(response.headers, null,'\t')+'</pre>';
		resultContainer.innerHTML +='<pre>'+JSON.stringify(response.data, null,'\t')+'</pre>';
	})
	.catch(function (error){
		resultContainer.innerHTML +='<pre>'+JSON.stringify(response.status, null,'\t')+'</pre>';
	})

```