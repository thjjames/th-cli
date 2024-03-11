import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.meta?.title || '';
  next();
});

export default router;
