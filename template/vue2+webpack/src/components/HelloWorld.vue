<template>
  <div>
    <h1>{{ msg }}</h1>

    <div class="mt-8 mb-16">
      <el-button type="primary" plain @click="count++">count is {{ count }}</el-button>
      <el-button class="ml-8" type="primary" @click="swaggerGet">$get</el-button>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>

    <p class="read-the-docs">Click on the Webpack and Vue logos to learn more</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { throttle } from '@/utils/decorator';

@Component({})
export default class HelloWorld extends Vue {
  @Prop() msg!: string;
  count = 0;

  @throttle(800, { trailing: false })
  swaggerGet(): void {
    this['$swagger'].$get('/request');
  }
}
</script>

<style lang="less" scoped>
@import '@/assets/style/variable';

.read-the-docs {
  color: var(--text-color-secondary);
}
</style>
