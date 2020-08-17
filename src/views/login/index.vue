<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录"/>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
        <van-field
          v-model="user.mobile"
          name="手机号"
          placeholder="请输入手机号"
          left-icon="phone"
        />
        <van-field
          v-model="user.code"
          name="验证码"
          placeholder="请输入验证码"
          left-icon="lock"
        >
          <template #button>
            <van-button class="send-sms-btn" round size="small" type="default">发送验证码</van-button>
          </template>
        </van-field>
        <div class="login-btn-wrap">
          <van-button class="login-btn" block type="info" native-type="submit">
            登录
          </van-button>
        </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { log } from 'util'
export default {
    data() {
        return {
          user:{
            mobile:'', //手机号
            code:'' // 验证码
          }
        }
    },
    methods:{
        async onSubmit() {
          const user = this.user
          try{
            const res = await login(user)
            console.log('登录成功',res)
          } catch (err) {
            console.log('登陆失败',err)
          }
        }
    }
}
</script>

<style lang="less" scoped>
.login-container {
    .toutiao{
        font-size: 37px;
    }
    .send-sms-btn{
        width: 152px;
        height: 46px;
        line-height: 46px;
        background-color: #ededed;
        color: #666;
        font-size: 22px;
        word-break: keep-all;
    }
    .login-btn-wrap{
      padding: 53px 33px;
      .login-btn{
        background-color: #6db4fb;
        border: none;
      }
    }
}
</style>