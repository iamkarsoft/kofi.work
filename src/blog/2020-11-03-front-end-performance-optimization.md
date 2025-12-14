---
layout: post
title:  "Front-end performance optimization"
date:   2020-11-03
categories: front-end css html
---


## Front End Performance Optimization

<small>created on 11/03/2020</small>
<small>updated on 11/03/2020</small>





### Planning for performance

- target load time or number of http request
- consider page wait 
- fewer fonts, svg, javascript
- don't use `@import` in  your css
- use google fonts if possible (maximum 2)
- compile and minify assets
- move javascript files to the bottom



### Measuring Performance

use software tools to measure performance. some of these tools are

- chrome dev tools
  - network > disable cache
- google page speed insights(extension)



### Optimizing Assets

- start by removing assets that show 404
- remove unused assets from pages
- create a sprite map to reduce http request
- optimize your images



### Optimize Images

- use Svg when possible
- create multiple sizes of images and show the appropriate one according to screen sizes



### Combining SVG

```
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
	<symbol id="mail" viewbox="0 0 161.4 188.9">
		use icon path here
	</symbol>
	
	<symbol id="phone" viewbox="0 0 161.4 188.9">
		use icon path here
	</symbol>
</svg>
```



##### using the combined svg

```html
//html

//1
<a href="#">
    <svg class="social-icon">
        <use xlink:href="#facebook-wrap" >
    </svg>
</a>
    
 //2 
 <svg>
     <use xlink:href="#phone">
 </svg>
     
  //css
   //2
     
    .contact a{
    	padding: 0 0 0 10px;
    }
    
    .contact svg{
    width: 14px;
    height: 14px;
    
    }
```

