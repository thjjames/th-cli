import Swagger, { ErrorModule } from 'swagger';
import userInfoStore from '@/store';
import type { App } from 'vue';

export default {
  install: (app: App): void => {
    const { userInfo } = storeToRefs(userInfoStore());
    const baseURL = process.env.NODE_ENV === 'development' ? '/api' : 'https://getman.cn/api';
    const swagger = Swagger.create({
      baseURL,
      headers: { 'X-Auth-Token': userInfo.value?.token },
    });
    swagger.use(ErrorModule, {
      codeKey: 'status',
    });

    app.provide('swagger', swagger);
    app.config.globalProperties.$swagger = swagger;
  },
};
