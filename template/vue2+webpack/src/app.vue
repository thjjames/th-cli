<template>
  <router-view />
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default class App extends Vue {}
</script>

<style lang="less">
body {
  min-width: 1200px;
  min-height: 100vh;
  margin: 0;
  color: #333;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}
</style>
