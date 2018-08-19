import Vue from 'vue'
import VueRouter from 'vue-router'

import Error404 from '../components/Error404.vue'
import Layout from '../components/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    children: [
      {
        path: '/district/:districtNumber',
        name: 'district'
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: Error404
  }
]

export default new VueRouter({
  mode: 'history',
  base: '/',
  routes
})
