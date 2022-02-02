import Vue from 'vue'
import Vuex from "vuex";
import VueRouter from 'vue-router';
import App from './App.vue'

import Home from './views/Home.vue'
import About from './Pages/About.vue'
import Portfolio from './Pages/Portfolio.vue'
import MyResume from './Pages/MyResume.vue'

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
    name: "about",
    component: About
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
