import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'
import App from './App.vue'
import '../tailwind.css'

import Home from './views/Home.vue'
import Portfolio from './Pages/Portfolio.vue'
import MyResume from './Pages/MyResume.vue'
import NotFound from '@/components/NotFound.vue'
import Links from './Pages/Links.vue'
import Blog from './Pages/Blog.vue'
import BlogPost from './Pages/BlogPost.vue'

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: Home
  },
  {
    path: "/portfolio",
    name: "portfolio",
    component: Portfolio
  },
  {
    path: "/resume",
    name: "resume",
    component: MyResume
  },
  {
    path: "/links",
    name: 'useful links',
    component: Links
  },
  {
    path: "/blog",
    name: "blog",
    component: Blog
  },
  {
    path: "/blog/category/:category",
    name: "blogCategory",
    component: Blog
  },
  {
    path: "/blog/:slug",
    name: "blogPost",
    component: BlogPost
  },
  {
    path: '/:pathMatch(.*)*',
    alias:'/404',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const store = createStore({
  // Add your store configuration here
})

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
