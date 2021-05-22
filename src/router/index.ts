import { h } from 'vue'
import { RouterView } from 'vue-router'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Money from '@/views/Money.vue'
import Labels from '@/views/Labels.vue'
import Statistics from '@/views/Statistics.vue'
import NotFound from '@/views/NotFound.vue'
import EditLabel from '@/views/EditLabel.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    component: Money
  },
  {
    path: '/labels',
    component: { render: () => h(RouterView) },
    children: [
      {
        path: '',
        component: Labels
      },
      {
        path: 'edit/:id',
        component: EditLabel
      },
    ]
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'selected',
  routes
})

export default router
