import envLog from './env-log';
import swagger from './swagger';
import eventBus from './event-bus';

export default {
  install: (Vue): void => {
    Vue.use(envLog);
    Vue.use(swagger);
    Vue.use(eventBus);
  },
};
