<!--
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-11 20:59:02
 * @LastEditTime: 2022-08-12 09:45:53
 * @FilePath: \haigou-vue-app\src\views\address\index.vue
-->
<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="地址管理"
                   left-text="返回"
                   left-arrow
                   @click-left="onClickLeft" />
    </header>
    <main class="main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, AddressList } from 'vant'
import { getAddressList } from '@/api/address'

Vue.use(NavBar)
Vue.use(AddressList)
export default {
  data() {
    return {}
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
  },
  mounted() {},
}
</script>