<!--
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-02 20:29:50
 * @LastEditTime: 2022-08-11 20:41:54
 * @FilePath: \haigou-vue-app\src\views\user\index.vue
-->
<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="我的京东"
                   left-text="返回"
                   left-arrow
                   @click-left="onClickLeft"
                   @click-right="onClickRight">
        <template #right>
          <van-icon name="ellipsis"
                    size="18" />
        </template>
      </van-nav-bar>
    </header>
    <div class="content">
      <div class="my_info van-hairline--top-bottom">
        <div class="left">
          <van-image round
                     width="80"
                     height="80"
                     src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <div class="main">
          <p>张三的账号</p>
        </div>
        <div class="right">
          <van-icon name="setting-o"
                    type="danger"
                    size="18"
                    @click="settingClick" />
        </div>
      </div>
      <van-grid :border="false"
                class="van-hairline--bottom">
        <van-grid-item icon="https://img12.360buyimg.com/img/s60x60_jfs/t1/144453/3/26543/2290/62651dc1E9a870916/9d55698157214416.png"
                       text="待付款" />
        <van-grid-item icon="https://img12.360buyimg.com/img/s60x60_jfs/t1/149388/24/26816/2914/62651dc1E1d5a859d/1e9d70ebcaa01281.png"
                       text="待收货" />
        <van-grid-item icon="https://img12.360buyimg.com/img/s60x60_jfs/t1/192293/7/23240/3633/62651dc1E8c8c7f45/1dbd5c48a5537c8a.png"
                       text="退货/售后" />
        <van-grid-item icon="https://img12.360buyimg.com/img/s60x60_jfs/t1/73197/18/17564/2229/62651dc1E9eb02b59/421fc756bd04de78.png"
                       text="全部订单" />
      </van-grid>
      <van-grid :border="false">
        <van-grid-item icon="https://img12.360buyimg.com/img/s59x60_jfs/t1/181893/30/23607/3772/6267c1c0E51feb772/6560b1afca6b253f.png.webp"
                       text="客户服务" />
        <van-grid-item icon="https://img12.360buyimg.com/img/s60x60_jfs/t1/216515/34/18229/3273/6267c3dfE721548af/18e0a2427b75b3a7.png.webp"
                       text="我的预约" />
        <van-grid-item icon="https://img12.360buyimg.com/img/s60x60_jfs/t1/110685/26/27072/4441/6267c401Edd8b8b42/7b6a83c417caecf0.png.webp"
                       text="我的问答" />
        <van-grid-item icon="https://img12.360buyimg.com/img/s60x60_jfs/t1/76070/23/18553/2532/62739b89E915f2bbd/33fdea80d024fdbe.png.webp"
                       text="闲置换钱" />
      </van-grid>
      <van-divider>为你推荐</van-divider>
      <ProList :proList=proList></ProList>
    </div>

    <van-action-sheet v-model="show"
                      :actions="actions"
                      cancel-text="取消"
                      @select="onSelect"
                      close-on-click-action
                      @cancel="onCancel" />
  </div>

</template>

<script>
import Vue from 'vue'
import {
  Button,
  NavBar,
  ActionSheet,
  Toast,
  Image as VanImage,
  Grid,
  GridItem,
  Divider,
} from 'vant'
import ProList from '@/components/ProList'
import { getProList } from '@/api/home'

Vue.use(Button)
Vue.use(NavBar)
Vue.use(ActionSheet)
Vue.use(Toast)
Vue.use(VanImage)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Divider)
export default {
  data() {
    return {
      show: false,
      actions: [{ name: '更多' }, { name: '退出登录' }],
      proList: [],
    }
  },
  methods: {
    //   退出登录
    signOut() {
      this.$store.commit('changeLoginState', false)
      localStorage.clear()
      this.$router.push('/home')
    },
    // 返回箭头事件
    onClickLeft() {
      this.$router.go(-1)
    },
    // 导航右侧事件
    onClickRight() {
      console.log('right')
      this.show = true
    },
    onSelect(val) {
      console.log(val.name)
      if (val.name == '退出登录') {
        this.$store.commit('changeLoginState', false)
        localStorage.clear()
        this.$router.push('/home')
      }
    },
    onCancel() {
      Toast('取消')
    },
    // 设置
    settingClick() {
      this.$router.push('/setting')
    },
  },
  mounted() {
    //   获取商品数据
    getProList().then((res) => {
      // console.log(res)
      this.proList = res.data
    })
  },
  //   商品列表组件
  components: {
    ProList,
  },
}
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
}
.my_info {
  width: 100%;
  height: 150px;
  background: #eee;
  display: flex;
  justify-content: space-around;
}
.my_info p {
  font-size: 18px;
  margin-top: 50px;
  margin-left: -50px;
}
.my_info > .left {
  display: flex;
  justify-content: center;
  align-items: center;
}
.my_info > .right {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>