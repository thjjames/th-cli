import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    path: '/',
    alias: '/home',
    component: () => import('@/views/Home.vue')
  }
];

export const router = new VueRouter({
  mode: 'hash',
  routes
});

