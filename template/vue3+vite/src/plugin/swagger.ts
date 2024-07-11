import Swagger, { ErrorModule } from 'swagger';
import type { App } from 'vue';

const baseURL = process.env.NODE_ENV === 'development' ? '/api' : 'https://getman.cn/api';
export const swagger = Swagger.create({
  baseURL,
});
swagger.use(ErrorModule, {
  codeKey: 'status',
});

export default {
  install: (app: App): void => {
    // app.provide('swagger', swagger);
    app.config.globalProperties.$swagger = swagger;
  },
};
