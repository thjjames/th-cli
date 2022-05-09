<template>
  <div class="layout">
    <layout-header class="layout-header" />
    <div class="layout-body">
      <div class="layout-body-menu"></div>
      <div class="layout-body-view">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Header from './components/header';

@Component({
  LayoutHeader: Header
})
export default class App extends Vue {}
</script>

<style lang="less">
@import '~@/styles/index';
body {
  min-width: 1200px;
  height: 100%;
  margin: 0;
  color: #333;
  font-size: 14px;
  font-family: Roboto-Regular !important;
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
  background-color: #f0f2f5;
  -webkit-font-smoothing: antialiased;
}
.layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  &-header {
    height: 56px;
  }
  &-body {
    overflow: hidden;
    height: 100%;
    flex: 1;
    display: flex;
    &-menu {
      padding-top: 16px !important;
    }
    &-view {
      width: 100%;
      flex: 1;
      overflow-y: auto;
    }
  }
}
</style>
