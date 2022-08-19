<!--
 * @Author: lzy
 * @Description: test   
 * @Date: 2022-08-06 16:50:47
 * @LastEditTime: 2022-08-09 10:39:43
 * @FilePath: \code\threeStages\week03\day12\codes\haigou-vue-app\src\views\login\index.vue
-->
<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="京东登录"
                   left-text="返回"
                   left-arrow
                   @click-left="onClickLeft" />
    </header>
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, NavBar, Form, Field } from 'vant'

Vue.use(NavBar)
Vue.use(Icon)
Vue.use(Form);
Vue.use(Field);
export default {
  data() {
    return {}
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped>
</style>
