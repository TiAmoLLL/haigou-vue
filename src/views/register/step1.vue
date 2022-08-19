<!--
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-08 19:03:47
 * @LastEditTime: 2022-08-08 21:46:28
 * @FilePath: \code\threeStages\week03\day12\codes\haigou-vue-app\src\views\register\step1.vue
-->
<template>
  <div class="step1-box">
    <div class="content">
      <!-- 输入手机号，调起手机号键盘 -->
      <van-form @submit="onSubmit">
        <van-field v-model="tel"
                   type="tel"
                   name="tel"
                   clearable
                   label="手机号"
                   placeholder="请输入手机号" />
        <div style="margin: 16px;">
          <van-button round
                      block
                      type="danger"
                      native-type="submit"
                      :disabled="btnState">下一步</van-button>
        </div>
      </van-form>
    </div>
    <van-overlay :show="show"
                 @click="show = false">
      <div class="wrapper"
           @click.stop>
        <div class="block">
          <div class="agreement">
            <strong>注册协议及隐私政策</strong>
            <p>
              在您注册成为京东用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，
              <a href="javascript:;">
                请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）：
              </a>
            </p>
          </div>
          <!-- 同意or不同意的行为 -->
          <div class="behavior">
            <div class="behavior_top">
              <p>点击同意即表示您已阅读并同意
                《京东用户注册协议》与
                《京东隐私政策》
                并将您的订单信息共享给为完成此订单所必须的第三方合作方。关于
                《订单共享与安全》
              </p>
            </div>
            <div class="behavior-bottom">
              <span @click="$router.go(-1)">不同意</span>
              <span @click="show = false">同意</span>
            </div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Field, Overlay, Form, Button, Dialog } from 'vant'
import { doCheckPhone } from '@/api/user.js'
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Overlay)
Vue.use(Button)
Vue.use(Dialog)
export default {
  data() {
    return {
      tel: '',
      show: true,
    }
  },
  methods: {
    onSubmit(obj) {
      console.log(obj)
      doCheckPhone(obj).then((res) => {
        console.log(res)
        Dialog.confirm({
          //   title: '标题',
          message: '我们将发送短信/语音验证码至：' + this.tel,
        })
          .then(() => {
            // on confirm
            console.log('true')
            localStorage.setItem('tel', this.tel)
            this.$router.push('step2')
          })
          .catch(() => {
            // on cancel
            console.log('false')
          })
      })
    },
  },
  mounted() {},
  computed: {
    btnState() {
      if (
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(
          this.tel
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
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
.block {
  position: relative;
  width: 240px;
  height: 400px;
  background-color: #fff;
  border-radius: 10px;
  color: #000;
  font-size: 14px;
  padding-top: 15px;
}
.block p {
  margin: 10px 15px;
}
.agreement {
  text-align: center;
  line-height: 1.8;
}
.agreement > p {
  text-align: left;
}
.agreement > p > a {
  color: #000;
  text-decoration: underline;
}
.behavior {
  width: 100%;
}
.behavior-bottom {
  width: 100%;
  height: 40px;
  /* background-color: pink; */
  position: absolute;
  bottom: 0;
  border-radius: 10px;
  border-top: 1px solid #ccc;
}
.behavior-bottom > span {
  display: inline-block;
  width: 50%;
  height: 100%;
  text-align: center;
  line-height: 40px;
  /* background-color: #f66; */
  /* border-radius: 10px; */
}
.behavior-bottom > span:last-child {
  background-color: #ff0000;
  border-radius: 0 0 10px 0;
}
</style>