<!--
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-02 20:29:50
 * @LastEditTime: 2022-08-13 10:19:16
 * @FilePath: \haigou-vue-app\src\views\detail\index.vue
-->
<template>
  <div class="box">
    <!-- 头部标题栏 -->
    <header class="header">
      <van-nav-bar :title="detailData.proname.substr(0,10)"
                   left-text="返回"
                   right-text="#right"
                   left-arrow
                   @click-left="$router.back()"
                   @click-right="onClickRight">
        <template #right>

          <van-popover v-model="showPopover"
                       theme="dark"
                       trigger="click"
                       placement="bottom-end"
                       :actions="actions"
                       @select="onSelect">

            <template #reference>
              <van-icon name="ellipsis"
                        size="22" />
            </template>

          </van-popover>

        </template>
      </van-nav-bar>
    </header>
    <!-- content区 -->
    <div class="content">
      <!-- 轮播图 -->
      <div class="banner_box">
        <van-swipe :autoplay="3000"
                   @change="onChange"
                   :initial-swipe="index-1">
          <van-swipe-item v-for="(image, index) in banner"
                          :key="index"
                          @click="onClickImg(index)">
            <van-image :src="image" />
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">{{index}}/{{banner.length}}</div>
          </template>
        </van-swipe>
        <div class="video_btn"
             @click="show = true">
          <van-icon name="play-circle" />
          <span>{{vdoTime|timeFilter}}</span>
        </div>
      </div>
      <!-- 详细信息 -->
      <div class="fn_warp">
        <div class="warp_price">
          <span>￥{{detailData.originprice.toFixed(2)}}</span>
          <div class="price_right">
            <div class="icon1">
              <van-icon name="after-sale" />
              降价提醒
            </div>
            <div class="icon1">
              <van-icon name="like" />
              收藏
            </div>
          </div>
        </div>
        <div class="warp_title">
          <p>
            <van-tag type="danger">自营</van-tag>
            {{detailData.proname}}
          </p>
        </div>
      </div>
      <van-goods-action>

        <van-goods-action-icon icon="chat-o"
                               text="客服" />
        <van-goods-action-icon icon="cart-o"
                               text="购物车"
                               @click="toCart" />
        <van-goods-action-icon icon="shop-o"
                               text="店铺" />
        <van-goods-action-button color="#be99ff"
                                 type="warning"
                                 text="加入购物车"
                                 @click="addCart" />
        <van-goods-action-button color="#7232dd"
                                 type="danger"
                                 text="立即购买" />
      </van-goods-action>
    </div>
    <!-- 分享面板 -->
    <van-share-sheet v-model="showShare"
                     title="立即分享给好友"
                     :options="options"
                     @select="onSelect" />
    <!-- 大图显示 -->
    <van-overlay :show="show"
                 @click="show = false">
      <!-- 视频 -->
      <video :src="vdoSrc"
             class="my-video"
             controls
             ref="vdo"></video>
    </van-overlay>
    <!-- 弹出层 -->
    <van-popup v-model="showPopup"
               position="bottom"
               :style="{ height: '40%' }">
      <div class="popup_top">
        <!-- 缩略图 -->
        <div class="top_left">
          <van-image width="80"
                     height="80"
                     :src="detailData.img1"
                     :style="{border:'1px solid #ccc'}" />
          <!-- 价格 -->
          <div>
            <div class="popup_price">
              ￥
              <em>{{detailData.originprice}}</em>
            </div>
            <!-- title -->
            <div class="popup_title">
              <p>{{detailData.proname}}</p>
            </div>
            <van-stepper v-model="sales"
                         max="8"
                         integer />
          </div>
        </div>

        <!-- 关闭按钮 -->
        <div class="close">
          <van-icon name="cross"
                    @click="showPopup = false" />
        </div>
      </div>
      <!-- 确认添加到购物车按钮 -->
      <van-button type="danger"
                  class="add_btn"
                  block
                  @click="confirm_add">确认添加</van-button>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import { getProDetailData } from '@/api/detail.js'
import { addCart, cartList } from '@/api/cart'
import {
  NavBar,
  Swipe,
  SwipeItem,
  Lazyload,
  Popover,
  Icon,
  ShareSheet,
  Toast,
  Image as VanImage,
  Overlay,
  ImagePreview,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Cell,
  CellGroup,
  Tag,
  Popup,
  Stepper,
} from 'vant'

Vue.use(NavBar)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Popover)
Vue.use(Icon)
Vue.use(ShareSheet)
Vue.use(Toast)
Vue.use(VanImage)
Vue.use(Overlay)
Vue.use(ImagePreview)
Vue.use(GoodsAction)
Vue.use(GoodsActionButton)
Vue.use(GoodsActionIcon)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Tag)
Vue.use(Popup)
Vue.use(Stepper)
export default {
  data() {
    return {
      // 详细数据
      detailData: [],
      //   轮播图
      banner: [],
      //   右上角弹出层分享后界面数据
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
      //   右上角弹出层数据
      actions: [
        { index: 0, text: '首页', icon: 'wap-home-o' },
        { index: 1, text: '分类', icon: 'bars' },
        { index: 2, text: '购物车', icon: 'shopping-cart-o' },
        { index: 3, text: '个人中心', icon: 'friends-o' },
        { index: 4, text: '分享', icon: 'share-o' },
      ],
      showPopover: false,
      showShare: false,
      index: 1,
      //   视频链接
      vdoSrc:
        'https://jvod.300hu.com/vod/product/a4ef6fd8-9ec7-438b-b103-abcfe82a050d/e0a68f3f862a42a99ef253d38830e8b9.mp4',
      //   是否显示视频
      show: false,
      vdoTime: 0,
      showPopup: false,
      sales: 1,
    }
  },
  methods: {
    //   加入购物车
    addCart() {
      //   console.log('加入购物车')
      this.showPopup = true
    },
    // 确认添加
    confirm_add() {
      console.log('确认添加界面')
      addCart({
        userid: localStorage.getItem('userid'),
        proid: this.detailData.proid,
        num: this.sales,
      }).then((res) => {
        console.log(res)
        Toast('加入购物车成功')
      })

      cartList({ userid: localStorage.getItem('userid') }).then((res) => {
        console.log(res)
      })
      //  关闭确认添加窗口
      // this.showPopup = true
    },
    onClickLeft() {
      console.log('left')
    },
    onClickRight() {
      console.log('right')
    },
    onSelect({ index }) {
      console.log(index)
      switch (index) {
        case 0:
          this.$router.push('/home')
          break
        case 1:
          this.$router.push('/kind')
          break
        case 2:
          this.$router.push('/cart')
          break
        case 3:
          this.$router.push('/user')
          break
        case 4:
          this.showShare = true
          break
      }
    },
    onChange() {
      this.index = ++this.index % (this.banner.length + 1)
      this.index = this.index ? this.index : 1
      //   console.log(this.index++ % (this.banner.length - 1))
    },
    onClickImg(_index) {
      ImagePreview({
        images: this.banner,
        startPosition: _index,
        onChange: (index) => {
          // 设置关闭后轮播图也在当前位置
          this.index = index + 1
        },
      })
    },
    // 跳转购物车
    toCart() {
      console.log('跳转购物车')
      this.$router.push('/cart')
    },
  },
  mounted() {
    // this.$route.params['proid']   -- 拿去url中的proid
    getProDetailData(this.$route.params['proid']).then((res) => {
      //根据proid获取商品的详细信息
      console.log(res)
      this.detailData = res.data
      this.banner = this.detailData.banners[0].split(',')
      console.log(this.banner)
      console.log('this is me yao')
      console.log(this.$refs.vdo)
      setTimeout(() => {
        this.vdoTime = this.$refs.vdo.duration
        console.log(this.$refs.vdo.duration)
      }, 1000)
    })
  },

  filters: {
    timeFilter(val) {
      // 过滤器处理时间显示格式 01'22
      let t = Math.floor(val / 60)
      let s = Math.floor(val % 60)
      t = t < 10 ? '0' + t : t
      s = s < 10 ? '0' + s : s
      return t + "'" + s
    },
    titleName(val) {
      return val.substring(0, 10)
    },
  },
  watch: {
    show(newVal) {
      if (newVal) {
        // 从头开始播放
        this.$refs.vdo.currentTime = 0 // 设置播放时长
        // 播放
        this.$refs.vdo.play()
      } else {
        this.$refs.vdo.pause()
      }
    },
  },
  computed: {},
}
</script>

<style>
.van-swipe {
  height: 3.7rem;
  background-color: gainsboro;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.banner_box {
  position: relative;
}
.video_btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  width: 80px;
  height: 30px;
  transform: translateX(-50%);
  background-color: #f66;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
.my-video {
  position: fixed;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
.warp_price {
  width: 90%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  line-height: 40px;
}
.warp_price > span {
  color: #f66;
  font-size: 30px;
}
.warp_price > .price_right {
  font-weight: normal;
  display: flex;
  width: 100px;
  align-items: flex-start;
}
.warp_price > .price_right > div {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.warp_title > p {
  font-size: 16px;
  font-weight: 700;
}
.popup_top {
  height: 110px;
  display: flex;
  justify-content: space-between;
}
.top_left {
  display: flex;
}
.popup_price {
  color: #f66;
  font-size: 16px;
}
.popup_price > em {
  font-size: 24px;
  font-style: normal;
}
.add_btn {
  position: absolute;
  bottom: 0;
}
</style>
