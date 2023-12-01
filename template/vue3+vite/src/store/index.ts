const userInfoStore = defineStore('userInfo', {
  state: () => ({
    userInfo: JSON.parse(localStorage.getItem('userInfo') as string),
  }),
  actions: {
    setUserInfo (payload) {
      this.userInfo = payload;
      localStorage.setItem('userInfo', JSON.stringify(payload));
    },
  },
});

export default userInfoStore;
