// import store from 'store/index'
const routes = [
  {
    nane: 'top',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'leagues', component: () => import('pages/Leagues.vue') },
      { path: 'gallery', component: () => import('pages/Gallery.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Login.vue')
      }
    ]
    // beforeEnter (to, from, next) {
    //   if (store().getters['auth/getUser'])
    //     if (!from)
    //       next({ path: '/' })
    //     else
    //       next(from)
    //   else
    //     next()
    // }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
