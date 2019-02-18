import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Header from './components/header.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Header,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home
        }
      ]
    },
    {
      path: '*',
      component: Header
    }
  ]
})
