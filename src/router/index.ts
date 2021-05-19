import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Money from '@/views/Money.vue'
import Labels from '@/views/Labels.vue'
import Statistics from '@/views/Statistics.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    name: 'Money',
    component: Money
  },
  {
    path: '/labels',
    name: 'Labels',
    component: Labels
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router