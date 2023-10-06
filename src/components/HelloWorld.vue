<template>
  <h1>{{ msg }}</h1>

  <div class="mt-8 mb-16">
    <a-button type="primary" ghost @click="count++">count is {{ count }}</a-button>
    <a-button class="ml-8" type="primary" @click="swaggerGet">$get</a-button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<script lang="ts" setup>
defineProps<{ msg: string }>();
const swagger: any = inject('swagger');

const count = ref(0);
const swaggerGet = _.throttle(() => {
  swagger.$get('/request');
}, 800, {
  trailing: false,
});
</script>

<style lang="less" scoped>
.read-the-docs {
  color: var(--text-color-secondary);
}
</style>
