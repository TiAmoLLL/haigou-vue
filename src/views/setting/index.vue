<!--
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-11 20:41:19
 * @LastEditTime: 2022-08-12 20:07:18
 * @FilePath: \haigou-vue-app\src\views\setting\index.vue
-->
<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="账户设置"
                   left-text="返回"
                   left-arrow
                   @click-left="onClickLeft" />
    </header>
    <main class="main">
      <div class="main_top">
        <strong>管理我的账户</strong>
        <van-card desc="用户ID:123456"
                  title="张三的账号"
                  tag="已登录">
          <template #thumb>
            <van-image round
                       width="80"
                       height="80"
                       src="https://img01.yzcdn.cn/vant/cat.jpeg" />
          </template>
        </van-card>
      </div>
      <van-cell :style="{margin:'15px 0'}"
                title="收获地址管理"
                is-link
                value="管理我的地址"
                @click="toAddress" />
      <van-cell title="账户与按钮"
                is-link
                value="密码/实名认证等管理" />
      <van-cell title="京东支付密码"
                is-link
                value="已设置" />
      <van-cell title="隐私设置"
                is-link />
      <van-cell :style="{margin:'15px 0 0 0 '}"
                title="切换客服"
                is-link
                value="限时解答用户疑难" />
      <div class="bottom">
        <span>
          <van-icon name="newspaper-o" />意见反馈
        </span>
        <span>
          <van-icon name="smile-o" />客户端
        </span>
        <span @click="singOut">
          <van-icon name="manager-o" />退出登录
        </span>
      </div>
      <!-- <van-checkbox v-model="checked">复选框</van-checkbox> -->
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  NavBar,
  Card,
  Image as VanImage,
  Cell,
  CellGroup,
  Dialog,
  Checkbox,
  CheckboxGroup,
} from 'vant'

Vue.use(NavBar)
Vue.use(Card)
Vue.use(VanImage)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
export default {
  data() {
    return {
      checked: false,
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 退出登录
    singOut() {
      Dialog.confirm({
        message: '是否退出登录',
      })
        .then(() => {
          // on confirm
          this.$store.commit('changeLoginState', false)
          localStorage.clear()
          this.$router.push('/home')
        })
        .catch(() => {
          // on cancel
        })
    },
    // 地址管理
    toAddress() {
      this.$router.push('/address')
    },
  },
}
</script>

<style scoped>
.main {
  margin-top: 20px;
  background-color: #eee;
  height: 100%;
}
.main_top {
  background-color: #fafafa;
}
.main_top > strong {
  font-size: 16px;
  font-weight: normal;
}
.bottom {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
</style>