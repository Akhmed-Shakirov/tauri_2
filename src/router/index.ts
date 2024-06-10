import { createRouter, createWebHistory } from 'vue-router'
import { checkLogin } from '../middleware'

const routes = [
    {
        path: '/',
        component: () => import('../views/index.vue'),
        meta: {
            title: 'home'
        }
    },
    {
        path: '/login',
        component: () => import('../views/login.vue'),
        meta: {
            layout: 'empty',
            title: 'enter',
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(checkLogin)

export default router
