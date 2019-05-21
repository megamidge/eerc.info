import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Header from './components/header.vue'
import League from './views/League.vue'
import Gallery from './views/Gallery.vue'
import FullscreenImage from '@/components/fullscreen-image'
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
          component: Home,
        },
        {
          path: 'Gallery',
          name: 'Gallery',
          component: Gallery,
          alias: 'Gallery/*',
          children: [
            {
              path: ':image',
              component: FullscreenImage,
            },
          ],
        },
        {
          path: 'About',
          name: 'About',
          component: About,
        },
        {
          path: 'league/:leagueCode',
          component: League,
        },
      ],
    },
    {
      path: '*',
      component: Header,
    },
  ],
})
