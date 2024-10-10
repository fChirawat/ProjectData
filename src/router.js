import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Prelogin from './views/Prelogin.vue';
import Recommend from './views/recom.vue';
import ProductDetail from '@/components/ProductDetail.vue';
import Sell from '@/views/sell.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    component: Home,
    props: route => ({ username: route.query.username || 'Guest' }) // ส่งค่า username ไปยัง Home
  },
  {
    path: '/',
    name: 'Prelogin',
    component: Prelogin
  },
  {
    path: '/recom',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/product-detail/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/sell',
    name: 'Sell',
    component: Sell
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
