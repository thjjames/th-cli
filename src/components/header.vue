<template>
  <div class="header">
    <img :src="require('@/assets/img/logo@2x.png')" />
    <div class="header-info">
      <div v-if="$route.name !== 'login'" class="header-info-avater">
        <span class="ml-8">{{ $store.state.userInfo.username }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Header extends Vue {
}
</script>

<style lang="less">
@import '~@/styles/mixins';

.header {
  background: white;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .12);
  padding: 12px 16px;
  box-sizing: border-box;
  font-size: 14px;
  color: #333;
  letter-spacing: 0;
  display: flex;
  justify-content: space-between;
  align-content: center;
  z-index: 100;
  img {
    width: 166px;
    height: 32px;
  }
  &-info {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    &-avater {
      position: relative;
      &::before {
        .hairline(#eee);
        border-left-width: 1px;
      }
    }
  }
}
</style>
