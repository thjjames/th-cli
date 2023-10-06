<template>
  <a-config-provider>
    <router-view />
  </a-config-provider>
</template>

<script lang="ts" setup>
</script>

<style lang="less">
body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
  color: #333;
  #app {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
}
</style>

