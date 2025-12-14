---
layout: post
title:  "Css grid simplified"
date:   2022-09-12
categories: css course grid
---

[Course code](https://github.com/ThirusOfficial/css-grids-simplified) [Laracast course](https://laracasts.com/series/css-grids-simplified)

<br>


### Making a grid

- grid-template-columns


```css
.section{

display: grid;
//
grid-template-columns: 50% 50%; /** 2 columns */

}

@media screen and (min-width: 480px){
	.section{
		grid-template-collumns: 50% 50%;
		
	}
}



@media screen and (min-width: 720px){
	.section{
		grid-template-collumns: 33.33% 33.33% 33.33%;
		
	}
}
```


<br>

### Sizing Cells

-   Fractional Units
    
-   Percentage and Auto Widths

```css

.section{
	display: grid;
	grid-template-columns: 1fr 1fr 1fr /* 33.33% or 1 fraction */
	
}

/* version 2 */
section{
	display: grid;
	grid-template-columns: repeat(3, 1fr)
	/* grid-template-columns: 1fr 1fr 50% */
	/* grid-template-columns: auto auto // depending on content */
	/* grid-template-columns: 1fr auto  // fixed with and content */
}


```



<br>

### Creating Rows
- grid-template-rows

```css
/* for sticky footer*/
body{
display: grid;
min-height: 100vh;
grid-template-rows: auto 1fr  auto; /* making the sections take whole site */
}

nav{
	height: 100vh;
	display: grid;

	grid-template: repeat(2, 1fr) / repeat(3, 1fr) /* rows / columns*/
}
```


<br>

### Spaces between  cells (gaps)
-   column-gap
    
-   row-gap

```css

.section{
	display: grid;

	grid-template: repeat(2, 1fr) / repeat(3, 1fr);
	column-gap: 2rem; /* columns between cells*/
	row-gap: 2rem;/* row between cells*/
	gap: 2rem 2rem; /*row / column*/
	justify-content: space-between; /* for columns */
	align-content: space-between; /* for rows*/
	place-content: center space-between /*align content / justify content */
}
```


<br>

### Horizontal and Vertical Space


-   justify-items
    
-   align-items
    
-   place-items


```css
.section{
	display: grid;
	grid-template-columns: repeat(3, 1fr) auto;
	justify-items: start; /*positioning content horizontaly*/
	align-items: end; /*positioning content vertically*/
	place-items: end start; /*align / justify */
}

/*centering a div*/

.section{
width: 100%;
height: 100vh;
display: grid;
place-items: center;
}
```



<br>

### Single cell alignment

-   align-self
    
-   justify-self

```css

.rating{
align-self: start; /*vertical alignment for single cell*/
justify-self: end; /* horizontal alignment for single cell*/
}
```



<br>

### Merge and Swap Cells

-   grid-row
    
-   grid-column
    
-   grid-area

```css


@media screen and(min-width: 540px){
	form{
		grid-template-columns: 1fr 1fr;
	}

	#message-box{
		grid-column-start:2;
		grid-row-start:1;
		grid-row-end: span 2;
		/* grid-row: 1 / 3 start and end */
		/** grid-area: 1/ 2 / 3 /-1 **/
		
	}

	button{
		grid-column-end: span 2;
		/** grid-column-end: -1 from right to left **/
		/** grid-column: span 2**/
		
	}

}
```


### Named Grid Areas
-   grid-area
    
-   grid-template-areas

```css

#name-block{
	grid-area: name;
}

#email-block{
	grid-area: email
}

#message-block{
	grid-area: message;
}

button{
	grid-area: button
}

/* using grid*/
form{
	grid-template-areas: 
		"name"
		"email"
		"message"
		"button"
}

/* responsive*/
@media screen and (min-width: 540px){


form{
	grid-template-columns: 1fr 1fr;
	grid-template-areas: 
		"name message",
		"email message",
		"button button" /* blank cell*/ "... button"
	}
}
}
```


<br>

### Advanced sizing values
-   max-content
    
-   min-content
    
-   fit-content
    
-   minmax

```css

/* max-content can be used for content with width and height and make the content not flexible, takes maximum space*/


/* fix-content can be used for content with width and height and make the content flexible*/

/* min-content can be used for content with width and height and make the content take minimum space*/

/* use minmax to specify minimum and maximum of rows and column*/

section{
	display: grid;
	grid-template-columns: max-content auto auto fit-content(100%);
	align-items: center;
}

/*limit with of items*/
section{
	display: grid;
	grid-template-columns:  minmax(9rem, 16rem);
	align-items: center;
}
/* responsive*/
section{
	grid-template-columns:  repeat(3 ,minmax(9rem, 16rem));
}
.plan{
max-width:
}
```


<br>

### Responsive Grids without media queries
-   auto-fit
    
-   minmax
    
-   auto-fill

```css
section{
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
	/*use auto-fill to make sure it section doesn't stretch*/
	grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
	align-items: center;
}

```


<br>

### Auto flow and sizing implicit grids

 -   grid-auto-flow
-   grid-template-rows
-   grid-auto-columns


```css


section{
	grid-auto-columns: 1fr; /* each column takes 1fr space*/
	grid-template-rows: repeat(3,1fr);
	grid-auto-flow: column;
}

```
<br>

