import { createWebHistory, createRouter } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import FlowPage from '../pages/FlowPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/flow/:id', component: FlowPage, name: 'flow' },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})