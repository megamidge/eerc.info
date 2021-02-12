
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'Gallery', component: () => import('pages/Gallery.vue') },
      { path: 'About', component: () => import('pages/About.vue') },
      { path: 'Leagues', component: () => import('pages/Leagues.vue') },
      { path: 'Leagues/:league', component: () => import('pages/League.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
