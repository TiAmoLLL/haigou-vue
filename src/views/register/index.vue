<!--
 * @Author: lzy
 * @Description: test   
 * @Date: 2022-08-06 16:50:47
 * @LastEditTime: 2022-08-08 19:13:22
 * @FilePath: \code\threeStages\week03\day12\codes\haigou-vue-app\src\views\register\index.vue
-->
<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="京东注册"
                   left-text="返回"
                   left-arrow
                   @click-left="onClickLeft" />
    </header>
    <div class="content">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Field, Overlay, Form, Button } from 'vant'

Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Overlay)
Vue.use(Button)
export default {
  data() {
    return {
      tel: '',
      show: true,
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
  },
  mounted() {},
}
</script>

<style scoped>
</style>
