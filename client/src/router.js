import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/submit',
      name: 'submit',
      component: () => import('./views/Submit.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('./views/List.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('./views/v1/Order.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('./views/v1/History.vue')
    },
    {
      path: '/qrcode',
      name: 'qrcode',
      component: () => import('./views/v1/QRcode.vue')
    },
    {
      path: '/driver',
      name: 'driver',
      component: () => import('./views/v1/Driver.vue')
    }             
  ]
})
