<!--
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-09 10:02:18
 * @LastEditTime: 2022-08-09 16:42:25
 * @FilePath: \haigou-vue-app\src\views\login\step1.vue
-->
<template>
  <div class="box">
    <van-form @submit="onSubmit">
      <van-field v-model="username"
                 name="username"
                 label="用户名"
                 placeholder="用户名/邮箱/手机号"
                 clearable
                 :rules="[{ required: true, message: '请填写用户名/邮箱/手机号' }]" />
      <van-field v-model="password"
                 :type="type"
                 name="password"
                 label="密码"
                 :right-icon="typeIcon"
                 @click-right-icon="rightClick"
                 placeholder="请输入密码"
                 :rules="[{ required: true, message: '请填写密码' }]">
        <template #button>
          <van-button type="default"
                      size="mini">忘记密码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round
                    block
                    type="danger"
                    :disabled="flag"
                    native-type="submit">登录</van-button>
      </div>
    </van-form>
    <div class="btn_jump">
      <router-link tag="a"
                   to="step2">验证码登录</router-link>
      <router-link tag="a"
                   to="/register">快速注册</router-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, NavBar, Form, Field, Button } from 'vant'
import { login } from '@/api/user'

Vue.use(NavBar)
Vue.use(Icon)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
export default {
  data() {
    return {
      type: 'password',
      typeIcon: 'closed-eye',
      username: '',
      password: '',
    }
  },
  methods: {
    onSubmit() {
      login({
        loginname: this.username,
        password: this.password,
      })
        .then((res) => {
          console.log(res)
          if (res.code == 200) {
            localStorage.setItem('userid', res.data.userid)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('loginState', true)
            this.$store.commit('changeLoginState', true)
            this.$router.push('/home')
          }
        })
        .catch((res) => {
          new Error(res.message)
        })
    },
    rightClick() {
      if (this.type == 'password') {
        this.type = 'text'
        this.typeIcon = 'eye'
      } else {
        this.type = 'password'
        this.typeIcon = 'closed-eye'
      }
    },
  },
  computed: {
    flag() {
      // 请输入至少6位密码，包含至少一个大写字母，1个小写字母，1个数字
      if (
        /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])\S*$/.test(
          this.password
        )
      ) {
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