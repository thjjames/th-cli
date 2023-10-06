import type { RouteRecordRaw } from 'vue-router';
import type { Component } from 'vue';

const Home = (): Promise<Component> => import('@/views/Home.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    alias: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '首页',
    },
  },
];
export default routes;
