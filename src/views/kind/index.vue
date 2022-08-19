<!--
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-02 20:29:50
 * @LastEditTime: 2022-08-11 19:11:10
 * @FilePath: \haigou-vue-app\src\views\kind\index.vue
-->
<template>
  <div class="box">

    <header class="header">
      <!-- 未点击时显示 -->
      <van-search v-model="value"
                  v-if="showSearch"
                  placeholder="请输入搜索关键词"
                  @focus="toSearch">
        <template #left>
          <van-icon size="20"
                    @click="toBack"
                    name="arrow-left" />
        </template>
      </van-search>
      <!-- 得到焦点时显示 -->
      <van-search v-model="value"
                  v-else
                  show-action
                  placeholder="请输入搜索关键词"
                  @blur="onBlueClick">
        <template #left>
          <van-icon size="20"
                    @click="toBack"
                    name="arrow-left" />
        </template>
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </header>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Search, Icon } from 'vant'
import { getSearcList } from '@/api/kind'

Vue.use(NavBar)
Vue.use(Search)
Vue.use(Icon)
export default {
  data() {
    return {
      showSearch: true,
      value: '',
    }
  },
  methods: {
    // 返回按钮
    toBack() {
      this.$router.go(-1)
    },
    // 跳转step3
    toSearch() {
      if (this.$route.path != '/kind/step3') {
        this.$router.push('step3')
      }
      this.showSearch = false
    },
    onBlueClick() {
      setTimeout(() => {
        this.showSearch = true
      }, 500)
    },
    // 点击搜索按钮
    onSearch() {
      console.log('搜索')
      console.log(this.value)
      if (this.value != '') {
        let str = localStorage.getItem('search')
          ? localStorage.getItem('search') + ','
          : ''
        localStorage.setItem('search', str + this.value)
      }
      // 调用搜索接口
      this.$router.push('step2?' + 'keyword=' + this.value)
    },
  },
}
</script>