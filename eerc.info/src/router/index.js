import Vue from 'vue'
import Router from 'vue-router'
import construction from '@/components/construction'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Construction',
      component: construction
    }
  ]
})
