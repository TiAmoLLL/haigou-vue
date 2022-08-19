<!--
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-12 22:15:24
 * @LastEditTime: 2022-08-13 09:45:28
 * @FilePath: \haigou-vue-app\src\views\payment\step4.vue
-->
<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="支付结果"
                   left-text="返回"
                   left-arrow
                   @click-left="onClickLeft" />
    </header>
    <main class="main">
      <div class="title">
        <van-icon name="checked"
                  size="24" />
        <span>支付完成</span>
      </div>
      <van-button type="info"
                  :style="{margin:'0 10px 0 0 '}"
                  @click="toOrder">查看订单</van-button>
      <van-button type="danger"
                  @click="toKind">继续购物</van-button>
    </main>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar } from 'vant'

Vue.use(NavBar)
export default {
  data() {
    return {}
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    toKind() {
      this.$router.push('/kind')
    },
    toOrder() {
      this.$router.push('step5')
    },
  },
}
</script>

<style scoped>
.main {
  height: 100%;
  text-align: center;
  padding-top: 200px;
}
.title {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>