import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo') as string),
  },
  mutations: {
    setUserInfo (state, payload) {
      state.userInfo = payload;
      localStorage.setItem('userInfo', JSON.stringify(payload));
    },
  },
});