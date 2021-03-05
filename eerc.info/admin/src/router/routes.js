// import store from 'store/index'
const routes = [
  {
    nane: 'top',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
      staffOnly: true
    },
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'Leagues', component: () => import('pages/Leagues/Leagues.vue') },
      {
        path: 'Leagues/:leagueId',
        component: () => import('layouts/LeagueLayout.vue'),
        children: [
          { path: '/', component: () => import('pages/Leagues/League.vue') }
        ]
      },
      { path: 'Gallery', component: () => import('pages/Gallery.vue') }
    ]
  },
  {
    path: '/must-be-staff',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MustBeStaff.vue') }
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
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
