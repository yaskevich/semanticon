import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import External from '../components/External.vue'
import Phrase from '../components/Phrase.vue'

const routes = [
  {
    path: '/kek',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: About
  },
  {
    path: '/',
    name: 'External',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: External
  },
   { path: '/phrase/:id', component: Phrase, name: 'Phrase', props: true }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
