<template>
  <router-view />
</template>

<script lang="ts" setup>
import useUserInfoStore from '@/store';

const userInfoStore = useUserInfoStore();

onMounted(() => {
  userInfoStore.getUserInfo();
});
</script>

<style lang="less">
body {
  // min-width: 1200px;
  min-height: 100vh;
  margin: 0;
  color: #333;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  #app {
    width: 100%;
    height: 100%;
    background: #fff;
  }
}
</style>
