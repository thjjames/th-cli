import Vue from 'vue';
import App from './app.vue';
import { router } from './router/index';
import { store } from './store/index';
import './plugin';

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});
