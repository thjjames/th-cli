// @ts-nocheck
import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import plugin from '@/plugin';
import '@/assets/style/index.less';

Vue.use(plugin);
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  plugin,
});
