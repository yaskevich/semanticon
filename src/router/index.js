import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import PhraseListScreen from '../components/PhraseListScreen.vue'
import UnitListScreen from '../components/UnitListScreen.vue'
import Login from '../components/Login.vue'
import Logout from '../components/Logout.vue'
import Dashboard from '../components/Dashboard.vue'

const routes = [
  {
    path: '/home',
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
    name: 'PhraseListScreen',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PhraseListScreen
  },
   { path: '/phrase/:id', component: UnitListScreen, name: 'Phrase', props: true },
   {
     path: '/login',
     name: 'Login',
     component: Login
   },
   {
     path: '/logout',
     name: 'Logout',
     component: Logout
   },
   {
     path: '/dashboard',
     name: 'Dashboard',
     component: Dashboard
   },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
