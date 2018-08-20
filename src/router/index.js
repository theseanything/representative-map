import Vue from 'vue'
import VueRouter from 'vue-router'

import Error404 from '../components/Error404.vue'
import Layout from '../components/Layout.vue'
import CandidateList from '../components/CandidateList.vue'
import CandidatePlaceholder from '../components/CandidatePlaceholder.vue'
import About from '../components/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: CandidatePlaceholder
      },
      {
        path: '/districts/:districtNumber',
        name: 'district',
        component: CandidateList
      },
      {
        path: '/about',
        name: 'about',
        component: About
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
