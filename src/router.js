import { createRouter, createWebHistory } from 'vue-router'
import Yearbook from './components/Yearbook.vue'
import Gallery from './components/GalleryPage.vue'

const routes = [
  { path: '/', component: Yearbook },
  { path: '/gallery', component: Gallery },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top
    return { top: 0 }
  }
})

export default router
