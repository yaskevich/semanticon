import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../components/Home.vue'
import SimpleSearch from '../components/SimpleSearch.vue'
import About from '../components/About.vue'
import PhraseListScreen from '../components/PhraseListScreen.vue'
import UnitListScreen from '../components/UnitListScreen.vue'
import Login from '../components/Login.vue'
import Logout from '../components/Logout.vue'
import Admin from '../components/Admin.vue'
import Dashboard from '../components/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: SimpleSearch
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
    component: PhraseListScreen
  },
  {
    path: '/search/:prop/:id',
    name: 'List',
    component: PhraseListScreen
  },
   { path: '/expr/:id', component: UnitListScreen, name: 'Phrase', props: true },
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
