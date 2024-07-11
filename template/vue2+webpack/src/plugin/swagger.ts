import Swagger, { ErrorModule } from 'swagger/dist/swagger';

const baseURL = process.env.NODE_ENV === 'development' ? '/api' : 'https://getman.cn/api';
export const swagger = Swagger.create({
  baseURL,
});
swagger.use(ErrorModule, {
  codeKey: 'status',
});

export default {
  install: (Vue): void => {
    Vue.prototype.$swagger = swagger;
  },
};
