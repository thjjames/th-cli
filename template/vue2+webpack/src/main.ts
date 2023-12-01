// @ts-nocheck
import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import '@/plugin';
import '@/assets/style/index.less';

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
});
