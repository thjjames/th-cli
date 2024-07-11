<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {
  mounted() {
    this['$store'].dispatch('getUserInfo');
  }
}
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
