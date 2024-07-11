import Vue from 'vue';
import Vuex from 'vuex';
import { swagger } from '@/plugin/swagger';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo') as string),
  },
  actions: {
    getUserInfo ({ state, dispatch }) {
      if (state.userInfo) {
        swagger.defaults.headers.common['X-Auth-Token'] = state.userInfo.token;
      } else {
        // reusable 401 logic
        // dispatch('setUserInfo', { token: 'token' });
      }
    },
    setUserInfo ({ state }, payload) {
      state.userInfo = payload;
      localStorage.setItem('userInfo', JSON.stringify(payload));
      swagger.defaults.headers.common['X-Auth-Token'] = payload.token;
    },
  },
});