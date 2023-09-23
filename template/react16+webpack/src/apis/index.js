import React from 'react';
import Swagger, { RefreshTokenModule, ErrorModule } from 'swagger/dist/swagger';

const baseURL = process.env.NODE_ENV === 'development' ? '/api' : 'https://getman.cn';
const swagger = Swagger.create({
    baseURL // 请求基本域名
});
swagger.use(RefreshTokenModule).use(ErrorModule, {
    codeKey: 'status'
});
React.Component.prototype.$swagger = swagger;
