const routes = [
  {
    name: 'home',
    path: '/',
    alias: '/home',
    component: () => import('@/views/HomePage.vue'),
  },
];
export default routes;
