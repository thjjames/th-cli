import envLog from './env-log';
import swagger from './swagger';
import eventBus from './event-bus';
import type { App } from 'vue';

export default {
  install: (app: App): void => {
    app.use(envLog);
    app.use(swagger);
    app.use(eventBus);
  },
};
