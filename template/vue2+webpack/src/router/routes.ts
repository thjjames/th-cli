const routes = [
  {
    name: 'home',
    path: '/',
    alias: '/home',
    component: () => import('@/views/Home.vue'),
  },
];
export default routes;
