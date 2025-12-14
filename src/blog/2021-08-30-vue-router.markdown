---
title: Learning Vue Router
layout: post
date: 2021-08-30
categories: vuejs vue course javascript
---



## Skills Acquired

- [x]  Learn how to install Vue Router
-  [x] Learn how to create dynamic and nested routes
- [x] Learn how to lazy load Vue.js routes with Vue Router
- [x]   Learn how to pass Vue Router params to components as props
-  [x] Learn how to programmatically navigate the Vue Router and create a Go Back button
-  [x] Learn how to create impressive route transitions with CSS and Vue Router
-  [] Learn what navigation guards are and how to create an authentication middleware
- []   Learn how to control the scroll behavior of the Vue Router

[Learning Repo](https://github.com/iamkarsoft/vue-school-travel-app)


## Introduction to Vue Router


## Vue Router Fundamentals

### Create Your Project with Vue CLI


### Creating Routes in src/route.js

```js
import Vue from "vue";

import Router from "vue-router";

import Home from './views/Home.vue';

import Brazil from './views/Brazil.vue'

import Jamaica from './views/Jamaica.vue'

import Hawaii from './views/Hawaii.vue'

import Panama from './views/Panama.vue'

//tell vue to use router

Vue.use(Router);

  
  

export default new Router({

 routes: [

 {

 path: "/",

 name: "home",

 component: Home,

 },

 {

 path: "/about",

 name: "about",

 component: () =>

 import(/* webpackChunkName: "about" */ "./views/About.vue"),

 },

 {

 path: "/brazil",

 name: "brazil",

 component: Brazil,

 },

 {

 path: "/panama",

 name: "panama",

 component: Panama,

 },

 {

 path: "/jamaica",

 name: "jamaica",

 component: Jamaica,

 },

 {

 path: "/hawaii",

 name: "hawaii",

 component: Hawaii,

 },

 ],

});

```


### Basic App.vue file

```js
<template>

 <div id="app">

 <router-link to="/">Home</router-link>

 <router-link to="/brazil">Brazil</router-link>

 <router-view></router-view>

 </div>

</template>

  
  
  

<style>

#app {

 font-family: Avenir, Helvetica, Arial, sans-serif;

 -webkit-font-smoothing: antialiased;

 -moz-osx-font-smoothing: grayscale;

 text-align: center;

 color: #2c3e50;

 margin-top: 60px;

}

</style>


```

### Initializing the vue router

```js

import Vue from "vue";

import App from "./App.vue";

import router from "./router.js";

  

Vue.config.productionTip = false;

  

new Vue({

 router,

 render: (h) => h(App),

}).$mount("#app");

```


### Code Splitting and Chunking in vue

- `magic comments` allow js to name your chunks based on your specs i.e panama will be `panama.js`

```js

{
    path: "/about",
    name: "about",
    component() =>
    import(/* webpackChunkName: "panama" */'./views/panama')

}


```
<br>

### Active Routes


```js

<template>

 <div id="nav">

 <router-link to="/">Home</router-link>

 <router-link to="/brazil">Brazil</router-link>

 <router-link to="/hawaii">Hawaii</router-link>

 <router-link to="/panama">Panama</router-link>

 <router-link to="/jamaica">Jamaica</router-link>

 </div>

</template>

  
  

<style scoped>

#nav {

 display: flex;

 justify-content: center;

}


#nav a.router-link-exact-active {

 color: #42b983;

}

</style>

```

### Route Parameters
  - Recommended to always use named route
  - computed properties are used the same way as data but also have custom logic
  - add `<router-view :key="$route.path"></router-view>` to make sure dynamic routing works else vue router wouldn't know when paths change
  
  ```js
  
  // Named Route
  <router-link :to="{ name: 'DestinationDetails', params:{id: destination.id} }">
  
  </router-link
  
  
  // in component
  
  <template>
  
    <p> The destination is: {{this.$route.params.id}}
  </template>
  
  scrippt{
  
    data(){
        return{
            destinationID: this.$route.params.id
        }
    },
    computed:{
    destination(){
    return store.destinations.find(
        desitionation => destionation.id === this.destionationId
    )
    }
    }
  }
  
  //router.js
    {
        path:/details/:id
    }
  
  //
  
  ```
  
  
### Removing Hash Mode
- remove hash mode with `mode:"history"`

### Using props for better flexibility

<br>

  
## Vue Router Embellishments
 
### Creating A Go-Back Button
 
##### Creating the button
 
 ```js
 <template>

<span class="go-back">

 <button @click="goBack">go back</button>

</span>

</template>

  

<script>

 export default {

 methods:{

 goBack(){

 return this.$router.go(-1)

 }

 }

 }

</script>
 
 ```
 
<br>

##### Using the component

```js
<template>
    <GoBack />

</template>


```


#### Transitioning with Vue Router 

```js
// App.vue
<template>

 <div id="app">

 <TheNavigation></TheNavigation>

 <transition name="slide" mode="out-in">

 <router-view :key="$route.path"></router-view>

 </transition>

 </div>

</template>

<style>

.slide-enter-active,

.slide-leave-active{

 transition: opacity 1s, transform 1s;

}

  

.slide-enter,

.slide-leave-to{

 opacity:0;

 transform: translateX(-20%);

}

  

</style>

</style>

```
 
 
### 404 for not found routes
  
  
 
 
#####  Creating the NotFound Component
 
 
```js
 <template>

 <div>

 <h1>Ooops! Nothing found here</h1>

  

 <router-link :to="{name: 'home' }">Go back Home</router-link>

 </div>

</template>

  

<script>

 export default {

 }

</script>

  

<style scoped>

  

</style>
 
```


  
  
 
#### Defining the path to the 404
 
 ```js
 //router.js
 {

 path: "404",

 alias: "*",

 name: "notFound",

 component: () =>

 import(/*webpackChunkName: "NotFound" */ "./views/NotFound"),

 },
 
 
 ```
 
## Advanced Vue Router options
