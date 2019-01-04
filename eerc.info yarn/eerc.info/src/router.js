import Vue from 'vue'
import Router from 'vue-router'
import Construction from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Construction',
      component: Construction
    }
  ]
})
