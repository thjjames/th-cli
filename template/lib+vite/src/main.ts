import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { foo } from '../lib';

foo();
createApp({
  setup() {
    const count = ref(0);
    return {
      msg: 'Vite.lib',
      count,
      setCount: () => {
        count.value++;
      },
    };
  },
  template: `
    <h1>{{ msg }}</h1>
    <button type="button" @click="setCount">count is {{ count }}</button>
  `,
}).mount('#app');
