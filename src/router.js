import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../components/Home.vue';
// import About from '../components/About.vue';
// import PhraseList from '../components/PhraseList.vue';
// import SimilarList from '../components/SimilarList.vue';
// import UnitList from '../components/UnitList.vue';
// import Login from '../components/Login.vue';
// import Logout from '../components/Logout.vue';
// import Admin from '../components/Admin.vue';
// import Dashboard from '../components/Dashboard.vue';

const load = view => () => import(`./components/${view}.vue`);

const routes = [
  { path: '/sim', redirect: { name: 'Home' } },
  {
    path: '/',
    name: 'Home',
    component: load('Home'),
  },
  {
    path: '/about',
    name: 'About',
    component: load('About'),
  },
  {
    path: '/filters',
    name: 'PhraseListScreen',
    component: load('PhraseList'),
  },
  {
    path: '/search/:prop/:id',
    name: 'List',
    component: load('PhraseList'),
  },
  {
    path: '/sim/:id',
    component: load('SimilarList'),
    name: 'SimilarList',
    props: true,
  },
  {
    path: '/exp/:id',
    component: load('UnitList'),
    name: 'Phrase',
    props: true,
  },
  //  {
  //    path: '/login',
  //    name: 'Login',
  //    component: Login
  //  },
  //  {
  //    path: '/logout',
  //    name: 'Logout',
  //    component: Logout
  //  },
  //  {
  //    path: '/admin',
  //    name: 'Admin',
  //    component: Admin
  //  },
  //  {
  //    path: '/dashboard',
  //    name: 'Dashboard',
  //    component: Dashboard
  //  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
