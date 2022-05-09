import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    name: 'login',
    path: '/',
    alias: '/login',
    component: () => import('@/views/login.vue')
  }
];

export const router = new VueRouter({
  mode: 'hash',
  routes
});

