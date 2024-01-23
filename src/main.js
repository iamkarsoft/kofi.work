import Vue from 'vue'
import Vuex from "vuex";
import VueRouter from 'vue-router';
import App from './App.vue'

import Home from './views/Home.vue'
import Portfolio from './Pages/Portfolio.vue'
import MyResume from './Pages/MyResume.vue'
import NotFound from '@/components/NotFound.vue'
import Links from './Pages/Links.vue'

Vue.use(VueRouter);

Vue.config.productionTip = false
Vue.use(Vuex)


const routes = [

  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "home",
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
    path: '/:pathMatch(.*)*',
    alias:'/404',
    component: NotFound
  }
];


const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
});




new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
