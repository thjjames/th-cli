declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'vue/types/vue' {
  import VueRouter, { Route } from 'vue-router';
  import { Store } from 'vuex';
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $store: Store<any>;
    $swagger: any;
  }
}
