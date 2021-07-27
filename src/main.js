import Vue from 'vue'
import Vuex from "vuex";
import VueRouter from 'vue-router';
import App from './App.vue'

import Home from './views/Home.vue'
import Portfolio from './Pages/Portfolio.vue'

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
    path: "/portfolio",
    name: "portfolio",
    component: Portfolio
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
