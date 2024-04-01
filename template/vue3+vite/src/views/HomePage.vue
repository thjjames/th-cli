<template>
  <div class="home-page">
    <a href="https://vitejs.dev" target="_blank">
      <img src="@/assets/svg/vite.svg" class="logo vite" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="@/assets/svg/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <HelloWorld msg="Vite + Vue" />
  </div>
</template>

<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue';
</script>

<style lang="less" scoped>
.home-page {
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
    &.vite:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    &.vue:hover {
      filter: drop-shadow(0 0 2em #42b883aa);
    }
  }
}
</style>