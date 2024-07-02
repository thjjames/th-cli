import Swagger, { ErrorModule } from 'swagger';
import userInfoStore from '@/store';
import type { App } from 'vue';

export default {
  install: (app: App): void => {
    const baseURL = process.env.NODE_ENV === 'development' ? '/api' : 'https://getman.cn/api';
    const swagger = Swagger.create({
      baseURL,
      headers: { 'X-Auth-Token': userInfoStore().userInfo?.token },
    });
    swagger.use(ErrorModule, {
      codeKey: 'status',
    });

    app.provide('swagger', swagger);
    app.config.globalProperties.$swagger = swagger;
  },
};
