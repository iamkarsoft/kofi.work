---
layout: post
title: "Vue Snippets II"
date: 2020-11-30
categories: vuejs javascript
---
##### _updated on: 14-12-2020_



### Data binding and Event Binding


#### Data Binding

```
// html

  <a   :href="github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-github fa-2x" aria-hidden="true"></i>
          </a>
          <a
            :href="twitter"
            target="_blank"
            rel="noopener noreferrer"
          >


    // javascript

    <script type="text/javascript">

    export default{
    	name: 'HeaderBarLinks',

    	data () {
    		return {
    			github: 'https://github.com/iamkarsoft',
    			twitter: 'https://twitter.com/iamkarsoft'
    		}
    	}
    }
    </script>

```

#### Display text




```
 //html
  <header class="card-header">
            <p class="card-header-title">{{hero.firstName}}</p>
          </header>


      <div class="field">
        <label class="label" for="id">id</label>
        <label class="input" id="id" readonly>{{hero.id}}</label>
      </div>


     <div class="notification is-info">{{message}}</div>

<script>
export default {
  name: 'Heroes',
  data () {
    return {
      hero: {
        id: 20,
        firstName: 'Kofi',
        lastName: 'Ramos',
        description: 'Web developer in ghana',
        capeColor:'',
        power:'',
        active: true,
      },
      message:''
    };
  }
};

</script>

```



#### Capture User event





```
 //html
  <header class="card-header">
            <p class="card-header-title">{{hero.firstName}}</p>
          </header>


      <div class="field">
        <label class="label" for="id">id</label>
        <label class="input" id="id" readonly>{{hero.id}}</label>
      </div>

     <footer class="card-footer">
            <button class="link card-footer-item cancel-button" @click="cancelHero()">
              <i class="fas fa-undo"></i>
              <span>Cancel</span>
            </button>
            <button class="link card-footer-item" @click="saveHero">
              <i class="fas fa-save"></i>
              <span>Save</span>
            </button>
          </footer>
     <div class="notification is-info">{{message}}</div>

<script>
export default {
  name: 'Heroes',
  data () {
    return {
      hero: {
        id: 20,
        firstName: 'Kofi',
        lastName: 'Ramos',
        description: 'Web developer in ghana',
        capeColor:'',
        power:'',
        active: true,
      },
      message:''
    };
  },
  methods: {
    cancelHero () {
      this.message = ''
    },
    saveHero(){
      this.message = JSON.stringify(this.hero, null, '\n');
    },

  }
};

</script>

```


#### Adding 2 ways binding





```
 //html
  <header class="card-header">
            <p class="card-header-title">{{hero.firstName}}</p>
          </header>

 </div>
              <div class="field">
                <label class="label" for="firstName">first name</label>
                <input class="input" id="firstName" v-model="hero.firstName"/>
              </div>
              <div class="field">
                <label class="label" for="lastName">last name</label>
                <input class="input" id="lastName" v-model="hero.lastName"/>
              </div>
              <div class="field">
                <label class="label" for="description">description</label>
                <textarea class="input" id="description" v-model="hero.description" type="text" />
      <div class="field">
        <label class="label" for="id">id</label>
        <label class="input" id="id" readonly>{{hero.id}}</label>
      </div>

     <footer class="card-footer">
            <button class="link card-footer-item cancel-button" @click="cancelHero()">
              <i class="fas fa-undo"></i>
              <span>Cancel</span>
            </button>
            <button class="link card-footer-item" @click="saveHero">
              <i class="fas fa-save"></i>
              <span>Save</span>
            </button>
          </footer>
     <div class="notification is-info">{{message}}</div>

<script>
export default {
  name: 'Heroes',
  data () {
    return {
      hero: {
        id: 20,
        firstName: 'Kofi',
        lastName: 'Ramos',
        description: 'Web developer in ghana',
        capeColor:'',
        power:'',
        active: true,
      },
      message:''
    };
  },
  methods: {
    cancelHero () {
      this.message = ''
    },
    saveHero(){
      this.message = JSON.stringify(this.hero, null, '\n');
    },

  }
};

</script>

```


#### Binding to checkbox and select as well as classes


```
//html
     <div class="field">
                <label class="label">cape color</label>
                <label class="radio" for="color-red">
                  <input type="radio" id="color-red" v-model="hero.capeColor" value="red" />
                  red
                </label>
                <label class="radio" for="color-blue">
                  <input type="radio" id="color-blue" v-model="hero.capeColor" value="blue" />
                  blue
                </label>
                <label class="radio" for="color-green">
                  <input type="radio" id="color-green" v-model="hero.capeColor" value="green" />
                  green
                </label>
    <div class="color-line" :style="{'background-color': hero.capeColor}"></div>
  </div>


// 

<script>
export default {
  name: 'Heroes',
  data () {
    return {
      hero: {
        id: 20,
        firstName: 'Kofi',
        lastName: 'Ramos',
        description: 'Web developer in ghana',
        capeColor:'',
        power:'',
        active: true,
      },
      message:''
    };
  },
  methods: {
    cancelHero () {
      this.message = ''
    },
    saveHero(){
      this.message = JSON.stringify(this.hero, null, '\n');
    },

  }
};

</script>


```


#### Binding select boxes and key binding along with class binding


```
//html

   <div class="field">
                <label for="power">
                  super power
                  <div class="select is-primary">
                    <select id="power" v-model="hero.power" :class="{invalid: !hero.power}" @keyup.esc="clearPower">
                      <option disabled value>Please select one</option>
                      <option>Speed</option>
                      <option>Flight</option>
                      <option>Strength</option>
                      <option>Invisibility</option>
                    </select>
                  </div>
                </label>
              </div>




//script


<script>
export default {
  name: 'Heroes',
  data () {
    return {
      hero: {
        id: 20,
        firstName: 'Kofi',
        lastName: 'Ramos',
        description: 'Web developer in ghana',
        capeColor:'',
        power:'',
        active: true,
      },
      message:''
    };
  },
  methods: {
    cancelHero () {
      this.message = '';
    },
    saveHero(){
      this.message = JSON.stringify(this.hero, null, '\n');
    },

    clearPower(){
      this.hero.power='';
    },

  }
};

</script>

```



### Render A List with v-for


```

        <ul class="list is-hoverable">
          <li v-for="hero in heros" :key="hero.id">
            <a href="list-item">
              <span>{{hero.firstName}}</span>
            </a>
          </li>
        </ul>



        <script>
export default {
  name: 'Heroes',
  data() {
    return {
      selectedHero: {
        id: 111,
        firstName: '...',
        lastName: '...',
        description: '...',
      },
      heroes: [
        {
          id: 10,
          firstName: 'Ella',
          lastName: 'Papa',
          description: 'fashionista',
        },
        {
          id: 20,
          firstName: 'Madelyn',
          lastName: 'Papa',
          description: 'the cat whisperer',
        },
        {
          id: 30,
          firstName: 'Haley',
          lastName: 'Papa',
          description: 'pen wielder',
        },
        {
          id: 40,
          firstName: 'Landon',
          lastName: 'Papa',
          description: 'arc trooper',
        },
      ],
    };
  },
};
</script>

```


<br>

### Components

**data()** Define your component models

**Methods** execute custom logic

**lifecycle hooks** tap into when specific component event occurs

**computed** property that fires when any dependency value changes

**watch** execute custom logic specific data model changes

**filters** transform outputs, what the user sees 






### Adding Routing



#### Installing vue router

> `vue add router`


#### install default route


```
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/heroes'
    },
     {
      path: '/heroes',
      name: 'heroes',
      component: Heroes
    },

```

#### Including the route view directive

```
# app.vue
<template>
  <div id="app">
    <HeaderBar />
    <div class="main-section columns">
      <main class="column">
        <router-view></router-view> // all components will show for the router
      </main>
    </div>
  </div>
</template>

```

#### Building menu


use route `<router-link> ` to generate router links


```
//components/navbar.vue
  <ul  class="menu-list">
    <router-link to="/heroes">Heroes</router-link>
    <router-link to="/about">About</router-link>
  </ul>
```



#### Passing parameters into route

```
//router.js

  {
      path: '/heroes/:id', // here we're passing the id as a parameter in the route
      name: 'hero-detail',
      component: HeroDetail,
      props: true // this to make the route get the id through props or
       props: r => ({id: parseInt(r.params.id)}), // props can also take a functiona and this convers the id into string
    },
```


#### Creating a router link to accomodate for the parameters


```
       <router-link :to="{name: 'hero-detail', params:{id: hero.id}}"
                  tag="button"
                    class="link card-footer-item"
                  >
                    <i class="fas fa-check"></i>
                    <span>Select</span>
          </router-link>
```


#### Eager and Lazy Loading


##### Lazy loading a component

```
//router.js
  {
      path: '/heroes',
      name: 'heroes',
      // component: Heroes
      component: () => import(/* webpackChunkName: "bundle-heroes" */ './views/heroes.vue'),
    },
    {
      path: '/heroes/:id',
      name: 'hero-detail',
      // component: HeroDetail,
      component: () => import(/* webpackChunkName: "bundle-heroes" */ './views/hero-detail.vue'),
      props: r => ({id: parseInt(r.params.id)}),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/about.vue')
    }
```

##### Eager loading component

means to go get the javascript as soon as the page loads

<code>
  //router.js

import PageNotFound from './views/page-not-found.vue'

      {
      path: "*",
      component: PageNotFound,
    }
</code>


### Navigating through code



```
//from
this.$emit('done');

//to
this.$router.push({name: 'heroes'});
```


##### Section conclusion

<ul>
  <li>Added routing with vue cli</li>
  <li>created navigation links with `<router-link>`</li>
  <li>Defined route names, paths, and components in router.js</li>
  <li>Pass paremeters and receive them as props</li>
  <li>how to eager and lazy loading components</li>
</ul>