import { swagger } from '@/plugin/swagger';

const useUserInfoStore = defineStore('userInfo', {
  state: () => ({
    userInfo: JSON.parse(localStorage.getItem('userInfo') as string),
  }),
  actions: {
    getUserInfo () {
      if (this.userInfo) {
        swagger.defaults.headers.common['X-Auth-Token'] = this.userInfo.token;
      } else {
        // reusable 401 logic
        // this.setUserInfo({ token: 'token' });
      }
    },
    setUserInfo (payload) {
      this.userInfo = payload;
      localStorage.setItem('userInfo', JSON.stringify(payload));
      swagger.defaults.headers.common['X-Auth-Token'] = payload.token;
    },
  },
});

export default useUserInfoStore;
