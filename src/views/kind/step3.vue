<!--
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-10 22:12:18
 * @LastEditTime: 2022-08-11 14:46:34
 * @FilePath: \haigou-vue-app\src\views\kind\step3.vue
-->
<!--搜索视图-->
<template>
  <div class="box">
    <van-cell title="最近搜索">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="delete-o"
                  @click="deleteLatelyLst" />
      </template>
    </van-cell>
    <!-- 最近搜索 -->
    <div class="lately-search">
      <div class="lately-list">
        <em v-for="(item,index) in latelyList"
            :key="index"
            @click="toHotSearch(item)">{{item}}</em>
      </div>
    </div>
    <van-cell title="热门搜索">
      <template #right-icon>
        <span @click="showHot = !showHot">隐藏</span>
      </template>
    </van-cell>
    <!-- 热门搜索 -->
    <div class="hot-search">
      <div class="hot-list"
           v-if="showHot">
        <em v-for="item in hotWordList"
            :key="item.wordid"
            @click="toHotSearch(item.keyword)">{{item.keyword}}</em>
      </div>
      <div class="tags"
           v-else>
        已隐藏搜索发现
      </div>
    </div>
  </div>
</template>
<script>
import { hotWord } from '@/api/kind'
import Vue from 'vue'
import { Cell, CellGroup } from 'vant'

Vue.use(Cell)
Vue.use(CellGroup)
export default {
  data() {
    return {
      // 热门搜索数据
      hotWordList: [],
      //   显示隐藏
      showHot: true,
      //   最近数据列表
      latelyList: [],
    }
  },
  methods: {
    getList() {
      hotWord().then((res) => {
        console.log(res)
      })
    },
    // 点击em跳转
    toHotSearch(value) {
      console.log(value)
      //   this.$store.commit('changeSearchValue', value)
      //   console.log(this.$store.state.searchValue)
      this.$router.push('step2?' + 'keyword=' + value)
    },
    // 获取最近搜索
    getLatelyList() {
      this.latelyList = new Set(
        localStorage.getItem('search').split(',').reverse()
      )
      console.log(this.latelyList)
    },
    // 清空最近搜索
    deleteLatelyLst() {
      localStorage.removeItem('search')
      this.latelyList = []
    },
  },
  mounted() {
    hotWord().then((res) => {
      res.data.forEach((item) => {
        if (item.keyword) {
          this.hotWordList.push(item)
        }
      })
      console.log(this.hotWordList)
    }),
      this.getLatelyList()
  },
}
</script>

<style scoped>
.hot-list,
.lately-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 15px;
}
em {
  display: inline-block;
  height: 14px;
  font-size: 12px;
  border: 1px solid #ccc;
  background-color: #ccc;
  font-style: normal;
  padding: 2px 5px;
  margin: 2px 15px;
}
em:hover {
  color: #f66;
}
.tags {
  margin: 50px auto;
  text-align: center;
}
</style>