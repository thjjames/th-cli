import type { RouteRecordRaw } from 'vue-router';
import type { Component } from 'vue';

const HomePage = (): Promise<Component> => import('@/views/HomePage.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    alias: '/',
    name: 'home',
    component: HomePage,
    meta: {
      title: '首页',
    },
  },
];
export default routes;
