import Vue from 'vue';
import App from './App.vue';
import { router } from './router/index';
import { store } from './store/index';
import './plugin';
import '@/assets/style/index.less';

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});
