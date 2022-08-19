<!--
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-10 20:11:40
 * @LastEditTime: 2022-08-13 10:05:54
 * @FilePath: \haigou-vue-app\src\views\kind\step1.vue
-->
<template>
  <div class="box">
    <div class="content">
      <!-- 侧边导航 -->
      <div class="flex-box">
        <div class="flex-left">
          <van-sidebar v-model="activeKey"
                       @change="onChange">
            <van-sidebar-item v-for="(item,index) in cateList"
                              :key="index"
                              :title="item" />
          </van-sidebar>
        </div>
        <div class="flex-right">
          <van-grid :column-num="3"
                    class="flex-grid">
            <van-grid-item v-for="(item,index) in brands"
                           :key="index"
                           icon="https://img01.yzcdn.cn/vant/cat.jpeg"
                           :text="item.brand"
                           class="van-ellipsis"
                           @click="toStep1(item.brand)" />
          </van-grid>
        </div>

      </div>

    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  NavBar,
  Sidebar,
  SidebarItem,
  PullRefresh,
  Toast,
  Grid,
  GridItem,
} from 'vant'
import { getCateList, getCategoryBrandList } from '@/api/kind'

Vue.use(NavBar)
Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(PullRefresh)
Vue.use(Toast)
Vue.use(Grid)
Vue.use(GridItem)
export default {
  data() {
    return {
      //产品的分类列表
      cateList: [],
      //   分类品牌
      brands: [],
      brand: '手机',
      brandList: [],
      isLoading: false,
      activeKey: 0,
    }
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功')
        this.isLoading = false
      }, 1000)
    },
    // 切换侧边导航
    onChange(index) {
      console.log(this.cateList[index])
      this.brand = this.cateList[index]
    },
    // 跳转到商品列表
    toStep1(val) {
      console.log(val)
      this.$router.push('step2?' + 'category=' + this.brand + '&brand=' + val)
    },
  },
  mounted() {
    getCateList().then((res) => {
      console.log(res)
      this.cateList = res.data
    }),
      getCategoryBrandList(this.brand).then((res) => {
        // console.log(res)
        this.brands = res.data
        console.log(this.brands)
      })
  },
  watch: {
    brand(newVal) {
      getCategoryBrandList(newVal).then((res) => {
        this.brands = res.data
        console.log(this.brands)
      })
    },
  },
}
</script>

<style scoped>
.box {
  height: 100%;
}
.content {
  height: 100%;
}
.flex-box {
  display: flex;
  height: 100%;
}
.flex-left {
  width: 80px;
  height: 100%;
  overflow: auto;
}
.flex-right {
  overflow: auto;
  width: 240px;
}
</style>