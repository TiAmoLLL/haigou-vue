<!--
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-10 20:25:19
 * @LastEditTime: 2022-08-11 19:29:10
 * @FilePath: \haigou-vue-app\src\views\kind\step2.vue
-->
<template>
  <div class="box">
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1"
                         :options="option1"
                         @change="changeOption" />
      <van-dropdown-item v-model="value2"
                         :options="option2"
                         @change="changeOption" />
    </van-dropdown-menu>
    <ProList :proList=brandProList></ProList>
    <van-dialog v-model="show"
                title="标题"
                show-cancel-button
                :beforeClose="closeDialog">
      <van-field v-model="minPrice"
                 type="digit"
                 label="最低价:" />
      <van-field v-model="maxPrice"
                 type="digit"
                 label="最高价:" />
    </van-dialog>
  </div>
</template>

<script>
import { getBrandProList, getSearcList } from '@/api/kind'
import Vue from 'vue'
import {
  Card,
  Tag,
  PullRefresh,
  Toast,
  DropdownMenu,
  DropdownItem,
  Dialog,
  Field,
} from 'vant'
import ProList from '@/components/ProList'

Vue.use(Card)
Vue.use(Tag)
Vue.use(PullRefresh)
Vue.use(Toast)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dialog)
Vue.use(Field)
export default {
  data() {
    return {
      // 商品列表
      brandProList: [],
      isLoading: false,
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '筛选', value: 1 },
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '价格升序', value: 'b' },
        { text: '价格降序', value: 'c' },
      ],
      show: false,
      minPrice: 0,
      maxPrice: 0,
    }
  },
  methods: {
    //   跳转到详情页
    toDetail(id) {
      this.$router.push('/detail/' + id)
    },
    // 排序事件
    changeOption(val) {
      console.log(val)
      if (val == 'b') {
        console.log(
          this.brandProList.sort((a, b) => {
            return a.originprice - b.originprice
          })
        )
      } else if (val == 'c') {
        console.log(
          this.brandProList.sort((a, b) => {
            return b.originprice - a.originprice
          })
        )
      } else if (val == 1) {
        console.log('筛选')
        // 唤醒筛选对话框
        this.show = true
      } else {
        console.log(this.$route.query)
        if (this.$route.query['category']) {
          getBrandProList(this.$route.query).then((res) => {
            console.log(res)
            this.brandProList = res.data
          })
        } else {
          getSearcList(this.$route.query).then((res) => {
            console.log(res)
            this.brandProList = res.data
          })
        }
      }
    },
    // 筛选事件
    closeDialog(action, done) {
      if (action === 'confirm') {
        //点击确定按钮
        console.log('点击确定按钮')
        let newArr = []
        this.brandProList.forEach((item) => {
          if (
            item.originprice >= this.minPrice &&
            item.originprice <= this.maxPrice
          ) {
            newArr.push(item)
          }
        })
        this.brandProList = newArr
        this.show = false
      } else {
        console.log('点击关闭按钮')
        console.log('取消')
        this.show = false
      }
    },
  },
  mounted() {
    console.log(this.$route.query['category'])
    if (this.$route.query['category']) {
      getBrandProList(this.$route.query).then((res) => {
        console.log(res)
        this.brandProList = res.data
      })
    } else {
      getSearcList(this.$route.query).then((res) => {
        console.log(res)
        this.brandProList = res.data
      })
    }
  },
  components: {
    ProList,
  },
}
</script>