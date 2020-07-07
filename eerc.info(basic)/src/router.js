import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Header from './components/header.vue'
import League from './views/League.vue'
import LeagueIndex from './views/LeagueIndex.vue'
import Gallery from './views/Gallery.vue'
import TermsOfService from './views/TermsOfService.vue'
import FullscreenImage from '@/components/fullscreen-image'
import BasePage from '@/components/base-page'
import GalleryUpload from '@/management/GalleryUpload'
import FeedbackOrReport from '@/views/FeedbackOrReport'
import SecretTesting from './views/SecretTesting.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) { return { x: 0, y: 0 } },
    routes: [
        {
            path: '/',
            component: BasePage,
            children: [
                {
                    path: '',
                    name: 'Home',
                    component: Home,
                    meta: {
                        title: 'Home'
                    }
                },
                {
                    path: 'Gallery',
                    name: 'Gallery',
                    component: Gallery,
                    alias: 'Gallery/*',
                    meta: {
                        title: 'Gallery'
                    },
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
                    meta: {
                        title: 'About'
                    }
                },
                {
                    path: 'league',
                    name: 'leagueindex',
                    component: LeagueIndex,
                    meta: {
                        title: 'Leagues'
                    }
                },
                {
                    path: 'league/:leagueCode',
                    component: League,
                    meta: {
                        title: ':leagueCode'
                    }
                },
                {
                    path: 'TOS',
                    component: TermsOfService,
                    meta: {
                        title: 'Terms of Service'
                    }
                }, {
                    path: 'Feedback',
                    component: FeedbackOrReport,
                    meta: {
                        title: 'Feedback'
                    }
                }, {
                    path: 'SecretTesting',
                    component: SecretTesting,
                    meta: {
                        title: 'Secret Testing'
                    }
                }
            ],
        },
        {
            path: "/Admin",
            component: BasePage,
            meta: {
                title: 'Admin'
            },
            children: [
                {
                    path: 'GalleryUpload',
                    component: GalleryUpload,
                    meta: {
                        title: 'Gallery Upload'
                    }
                }
            ]
        },
        {
            path: '*',
            component: Header,
        },
    ],
})
