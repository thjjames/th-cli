import Vue from 'vue';
import Swagger, { LoadingModule, ErrorModule } from 'swagger/dist/swagger';
import store from '@/store';

const baseURL = process.env.NODE_ENV === 'development' ? '/api' : 'https://getman.cn/api';
const swagger = Swagger.create({
  baseURL,
  headers: { 'X-Auth-Token': store.state.userInfo?.token },
});
swagger.use(LoadingModule).use(ErrorModule, {
  codeKey: 'status',
});
Vue.prototype.$swagger = swagger;
