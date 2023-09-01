import Vue from 'vue';
import SwaggerApi, { LoadingModule, ErrorModule } from 'swagger-api';
import { store } from '@/store';

const baseURL = process.env.NODE_ENV === 'development' ? '/api' : 'http://apidoc.i.ssc.shopeemobile.com/';
const swagger = SwaggerApi.create({
  baseURL,
  headers: { 'X-Auth-Token': store.state.userInfo?.token }
});
swagger.use(LoadingModule).use(ErrorModule);
Vue.prototype.$swagger = swagger;
