<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录"/>
    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
        <van-field
          v-model="user.mobile"
          name="mobile"
          type="number"
          placeholder="请输入手机号"
          :rules="userFormRules.mobile"
          maxlength="11"
          left-icon="phone"
        />
        <van-field
          v-model="user.code"
          type="number"
          name="code"
          placeholder="请输入验证码"
          :rules="userFormRules.code"
          maxlength="6"
          left-icon="lock"
        >
          <template #button>
            <van-count-down 
              v-if="isCountDownShow"
              :time="1000 * 10" 
              format="ss s"
              @finish="isCountDownShow = false"
            />
            <van-button 
              v-else
              class="send-sms-btn" 
              native-type="button"
              round 
              size="small" 
              type="default"
              @click="onSendSms"
            >发送验证码</van-button>
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
import { login,sendSms } from '@/api/user'
import { log } from 'util'
export default {
    data() {
        return {
          user:{
            mobile:'13911111111', //手机号
            code:'246810' // 验证码
          },
          userFormRules:{
            mobile:[
            { required: true, message: '请填写手机号' },
            {pattern:/^1[3|5|7|8]\d{9}$/, message:'手机号格式错误'}
            ],
            code:[{ required: true, message: '请填写验证码' }]
          },
          isCountDownShow:false
        }
    },
    methods:{
        async onSubmit() {
          const user = this.user
          // 在组件中需要使用this.$toast来调用
          this.$toast.loading({
            message: '登录中...',
            forbidClick: true, // 禁用背景点击
            duration:2000 // 持续时间
          })

          try {
            const {data} = await login(user)
            console.log(data)
            this.$store.commit('setUser',data.data)
            this.$toast.success('登录成功')
          } catch (error) {
            if(error.response.status === 400) {
              this.$toast.fail('手机号或验证码错误')
            } else {
              this.$toast.fail('登录失败，请稍后重试')
            }   
          }
        },
        async onSendSms() {
          console.log('onSendSms')
          try {
            this.$refs.loginForm.validate('mobile')
          } catch (error) {
            return console.log('验证失败',error)
          }
          this.isCountDownShow = true
          try {
            await sendSms(this.user.mobile)
            this.$toast('发送成功')
          } catch (error) {
            this.isCountDownShow = false
            if(error.response.status === 429) {
              this.$toast('发送太频繁，请稍后重试')
            } else {
              this.$toast('发送失败，请稍后重试')
            }
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