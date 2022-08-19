<!--
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-12 22:15:24
 * @LastEditTime: 2022-08-13 09:40:32
 * @FilePath: \haigou-vue-app\src\views\payment\step2.vue
-->
<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="微信支付"
                   left-text="返回"
                   left-arrow
                   @click-left="onClickLeft" />
    </header>
    <main class="main">
      <div v-if="isLoading">
        <van-loading size="24px"
                     vertical>正在支付中</van-loading>
      </div>
      <div v-else>
        <van-icon name="checked"
                  size="24" />
        <span>支付完成</span>
      </div>
    </main>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Loading, Icon } from 'vant'
import { deleteCartItem } from '@/api/order'

Vue.use(NavBar)
Vue.use(Loading)
Vue.use(Icon)
export default {
  data() {
    return {
      isLoading: true,
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
  },
  mounted() {
    setTimeout(() => {
      deleteCartItem({ userid: localStorage.getItem('userid') }).then((res) => {
        console.log(res)
        this.isLoading = false
      })
    }, 1000)
  },
  watch: {
    isLoading() {
      setTimeout(() => {
        this.$router.push('step4')
      }, 1000)
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
span {
  font-size: 24px;
}
</style>