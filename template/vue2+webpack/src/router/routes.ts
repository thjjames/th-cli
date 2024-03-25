const routes = [
  {
    name: 'home',
    path: '/',
    alias: '/home',
    component: () => import(/* webpackChunkName: "HomePage" */'@/views/HomePage.vue'),
  },
];
export default routes;
