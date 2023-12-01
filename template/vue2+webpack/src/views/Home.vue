<template>
  <div class="home-page">
    <img src="@/assets/img/logo@2x.png" class="logo" alt="logo" />
    <div>
      <a href="https://www.webpackjs.com/" target="_blank">
        <img src="@/assets/svg/webpack.svg" class="logo webpack" alt="Webpack logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="@/assets/svg/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <HelloWorld msg="Webpack + Vue" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>

<style lang="less" scoped>
.home-page {
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  &.webpack:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  &.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
}
</style>
