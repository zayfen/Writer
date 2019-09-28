import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        requiresAuth: true
      },
      component: Home
    },
    {
      path: '/publish',
      name: 'publish',
      meta: {
        requiresAuth: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Publish.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    }
  ],
})

router.beforeEach((to, from, next) => {
  console.log('router from: ', from, ' ;to: ', to)
  if (to.matched.some(route => route.meta.requiresAuth)) {
    // // need to login
    console.log("router.ts loginState: ", store.getters.getLoginState)
    if (store.getters.getLoginState) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
