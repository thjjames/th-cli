import App from './App.vue';
import router from '@/router';
import plugin from './plugin';
import '@/assets/style/index.less';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(plugin);
app.mount('#app');
