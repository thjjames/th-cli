import './env-log';
import swagger from './swagger';
import type { App } from 'vue';

export default {
  install: (app: App): void => {
    app.use(swagger);
  },
};
