<!--
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-09 10:02:18
 * @LastEditTime: 2022-08-11 09:51:58
 * @FilePath: \haigou-vue-app\src\views\login\step2.vue
-->
<template>
  <div class="box">
    <van-form>
      <van-field v-model="tel"
                 name="username"
                 label="手机号"
                 placeholder="手机号"
                 clearable
                 :rules="[{ required: true, message: '请填写手机号' }]" />
      <van-field v-model="telcode"
                 name="telcode"
                 label="验证码"
                 placeholder="验证码"
                 :rules="[{ required: true, message: '请填写验证码' }]">
        <template #button>
          <van-button type="default"
                      size="mini"
                      :disabled="typeof time == 'number'"
                      @click="sendCodeFn">{{codeText}}{{time}}</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round
                    block
                    type="danger"
                    :disabled="flag"
                    native-type="submit"
                    @click="onSubmit">登录</van-button>
      </div>
    </van-form>
    <div class="btn_jump">
      <router-link tag="a"
                   to="step1">账号密码登录</router-link>
      <router-link tag="a"
                   to="/register">快速注册</router-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, NavBar, Form, Field, Button } from 'vant'
import { doSendMsgCode } from '@/api/user'

Vue.use(NavBar)
Vue.use(Icon)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
export default {
  data() {
    return {
      tel: '',
      telcode: '',
      time: '',
      timer: null,
      codeText: '发送验证码',
    }
  },
  methods: {
    onSubmit() {},
    sendCodeFn() {
      console.log('sendCodeFn')
      doSendMsgCode({ tel: this.tel }).then((res) => {
        // console.log(localStorage.getItem('tel')
        console.log(res)
        this.time = 10
        this.codeText = '重新发送'
        console.log(this.telcode)
        this.timer = setInterval(() => {
          this.time--
          if (this.time <= 0) {
            clearInterval(this.timer)
            this.time = ''
          }
        }, 1000)
        // Notify('验证码是' + res.data)
      })
      this.telcode = ''
    },
  },
  computed: {
    flag() {
      if (this.telcode.length == 5) {
        return false
      } else {
        return true
      }
    },
  },
}
</script>

<style scoped>
.btn_jump {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>