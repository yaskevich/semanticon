import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import PhraseList from '../components/PhraseList.vue'
import UnitList from '../components/UnitList.vue'
import Login from '../components/Login.vue'
import Logout from '../components/Logout.vue'
import Admin from '../components/Admin.vue'
import Dashboard from '../components/Dashboard.vue'

const routes = [
  {
    path: '/',
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
    path: '/home',
    name: 'PhraseListScreen',
    component: PhraseList
  },
  {
    path: '/search/:prop/:id',
    name: 'List',
    component: PhraseList
  },
   {
     path: '/expr/:id',
     component: UnitList,
     name: 'Phrase',
     props: true
   },
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
     path: '/admin',
     name: 'Admin',
     component: Admin
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
