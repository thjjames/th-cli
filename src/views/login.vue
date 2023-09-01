<template>
  <div class="login-page">
    <div class="bg-block"></div>
    <div class="content-block">
      <div class="title">Login</div>
      <div class="tip mb-32">Don’t have an account?<span class="blue-tip ml-4">Sign up for Free</span></div>
      <input
        v-model="username"
        class="input mb-16"
        :use-default-width="true"
        placeholder="Email / Phone / Username"
      />
      <input
        v-model="password"
        class="input mb-16"
        type="password"
        :show-password="true"
        :use-default-width="true"
        placeholder="Password"
      />
      <div class="blue-tip mb-32">Forgot Password?</div>
      <button @click="login">login</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { throttle } from '@/utils/decorator';

@Component({})
export default class Login extends Vue {
  username = '';
  password = '';

  @throttle(1000, { trailing: false })
  public login(): void {
    this['$swagger'].$post('/login', {
      username: this.username,
      password: this.password
    }).then(res => {
      this['$swagger'].defaults.headers.common['X-Auth-Token'] = res.token;
      this['$store'].commit('setUserInfo', res);
      this['$router'].push('');
    });
  }
}
</script>

<style lang="less">
.login-page {
  height: 100%;
  margin-right: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .bg-block {
    // flex: 0 0 auto;
    background: url('../assets/img/login_bg@2x.png') no-repeat;
    background-size: contain;
    min-width: 496px;
    height: 388px;
  }
  .content-block {
    // flex: 0 0 auto;
    background: white;
    min-width: 416px;
    height: 388px;
    // margin-left: 144px;
    padding: 48px;
    .title {
      height: 28px;
      line-height: 28px;
      font-size: 24px;
      text-align: center;
    }
    .tip {
      margin-top: 16px;
      height: 16px;
      line-height: 16px;      
      font-size: 14px;
      color: #999;
      text-align: center;
    }
    .blue-tip {
      opacity: 0.5;
      height: 16px;
      line-height: 16px;      
      font-size: 14px;
      color: #2673DD;
      text-align: right;
    }
    .input {
      width: 100% !important;
      padding: 5px 12px;
    }
    button {
      width: 100%;
      height: 40px;
      // text-align: center;
      justify-content: center;
    }
  }
}
</style>
