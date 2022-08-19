<!--
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-02 20:29:50
 * @LastEditTime: 2022-08-13 10:23:28
 * @FilePath: \haigou-vue-app\src\views\home\index.vue
-->
<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="标题"
                   @click-left="toAddress"
                   left-arrow>
        <template #left>
          <van-icon name="location-o" />
          <span>{{$store.state.cityState}}</span>
        </template>
      </van-nav-bar>
    </header>

    <div class="content"
         ref="content">
      <van-pull-refresh v-model="isLoading"
                        success-text="刷新成功"
                        @refresh="onRefresh">
        <van-swipe class="my-swipe"
                   :autoplay="3000"
                   indicator-color="white">
          <van-swipe-item class="banner"
                          v-for="item in bannerList"
                          :key="item.bannerid">
            <van-image width="320"
                       height="100"
                       :src="item.img" />
          </van-swipe-item>
        </van-swipe>
        <van-grid :column-num="5"
                  :border="false">
          <van-grid-item v-for="item in navList"
                         :key="item.navid"
                         :icon="item.imgurl"
                         :text="item.title" />
        </van-grid>
        <ul class="sekillTitle">
          <li>
            嗨购秒杀
          </li>
          <li>
            <van-count-down :time="time">
              <template #default="timeData">
                <span class="block">{{ timeData.hours }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.minutes }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.seconds }}</span>
              </template>
            </van-count-down>
          </li>
          <li>
            更多秒杀
            <van-icon name="gem-o"
                      color="#f66"
                      size="20px" />
          </li>
        </ul>
        <!-- 更多秒杀下面的商品列表 -->
        <div class="productList">
          <ul class="productList-ul">
            <router-link tag="li"
                         :to="'/detail/'+item.proid"
                         v-for="item in seckillList"
                         :key="item.proid">
              <van-image width="55px"
                         height="55px"
                         :src="item.img1" />
              <span>￥{{item.originprice}}</span>
            </router-link>
          </ul>
        </div>
        <!-- 商品列表 -->
        <!-- van-list上拉获取数据 -->
        <van-list v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad">
          <ProList :proList=proList></ProList>
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="toTop"
         v-if="scrollTop > 300"
         @click="backTops">
      <van-icon name="back-top" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  Swipe,
  SwipeItem,
  Lazyload,
  Grid,
  GridItem,
  CountDown,
  Image as VanImage,
  Icon,
  List,
  PullRefresh,
  NavBar,
} from 'vant'
import {
  getBannerList,
  getNavList,
  getSeckillList,
  getProList,
} from '@/api/home'
import ProList from '@/components/ProList'

Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(CountDown)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(VanImage)
Vue.use(Icon)
Vue.use(getBannerList)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(getNavList)
Vue.use(getSeckillList)
Vue.use(getProList)
Vue.use(NavBar)

export default {
  data() {
    return {
      // banner
      bannerList: [],
      //导航数据
      navList: [],
      //更多秒杀下面的商品列表数据
      seckillList: [],
      //   商品列表
      proList: [],
      //   倒计时
      time: 3 * 60 * 60 * 1000,
      //   上拉获取数据的参数
      loading: false,
      finished: false,
      count: 1,
      //   下拉刷新参数
      isLoading: false,
      //   scrollTop
      scrollTop: 0,
    }
  },
  methods: {
    //   上拉获取数据调用的事件
    onLoad() {
      // 异步更新数据
      this.count++
      this.loading = true
      getProList({ count: this.count, limitNum: 10 }).then((res) => {
        // console.log(res)
        this.proList = [...this.proList, ...res.data]
        // 加载状态结束;
        this.loading = false
        if (this.count >= 15) {
          this.finished = true
        }
      })
    },
    // 下拉刷新事件
    onRefresh() {
      this.count = 1
      getProList({ count: this.count, limitNum: 10 }).then((res) => {
        // console.log(res)
        this.proList = res.data
        // Toast('刷新成功')
        this.isLoading = false
      })
    },
    //   回到顶部
    backTops() {
      this.$refs.content.scrollTop = 0
    },
    // 选择地区
    toAddress() {
      console.log('选择地区')
      this.$router.push('/city')
    },
  },
  mounted() {
    // 获取到页面的滚动距离
    this.$refs.content.addEventListener('scroll', () => {
      //   console.log(this.$refs.content)
      this.scrollTop = this.$refs.content.scrollTop
    })
    //   获取banner数据
    getBannerList().then((res) => {
      //   console.log(res)
      this.bannerList = res.data
    }),
      // 获取导航数据
      (this.navList = getNavList()),
      //获取更多秒杀下面的商品列表数据
      getSeckillList().then((res) => {
        // console.log(res)
        this.seckillList = res.data
      }),
      //   获取商品数据
      getProList().then((res) => {
        // console.log(res)
        this.proList = res.data
      })
  },
  //   过滤器
  filters: {
    priceFilters(val, str) {
      return str + val.toFixed(2)
    },
  },
  //   商品列表组件
  components: {
    ProList,
  },
  //   mixins: [Obj],
}
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  height: 100px;
}

.colon {
  display: inline-block;
  margin: 0 4px;
  color: #ee0a24;
}
.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 4px;
}
.sekillTitle {
  height: 0.4rem;
  display: flex;
  background-color: #fff;
  align-items: center;
}
ul li {
  line-height: 0.4rem;
  /* width: 60px; */
  padding-left: 20px;
  display: flex;
  align-items: center;
}
.productList {
  width: 100%;
  height: 1.1rem;
  overflow-y: auto;
}
.productList-ul {
  height: 100%;
  display: flex;
}
.productList-ul > li {
  width: 0.6rem;
  display: flex;
  flex-direction: column;
}
/* .productList-ul > li > img {
  width: 0.4rem;
  height: 0.4rem;
} */
.productList-ul > li > span {
  color: red;
}
.toTop {
  position: fixed;
  width: 0.5rem;
  height: 0.5rem;
  bottom: 1.3rem;
  right: 0.1rem;
  background-color: #ccc;
  border-radius: 50%;
  opacity: 0.7;
  font-size: 30px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}
.banner {
  height: 100px;
}
</style>