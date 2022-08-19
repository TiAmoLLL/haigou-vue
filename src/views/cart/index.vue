<!--
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-02 20:29:50
 * @LastEditTime: 2022-08-13 10:17:02
 * @FilePath: \haigou-vue-app\src\views\cart\index.vue
-->
<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="购物车"
                   left-text="返回"
                   left-arrow
                   @click-left="onClickLeft" />
    </header>
    <div class="content">
      <!-- 数据列表 -->
      <van-pull-refresh v-model="isLoading"
                        @refresh="onRefresh">
        <!-- 头部工具栏 -->
        <van-cell :border="false"
                  :title="'全部 '+cartLists.length">
          <template #right-icon>
            <span @click="deleteChoice">删除选中</span>
          </template>
        </van-cell>
        <div class="cart_list">
          <van-swipe-cell v-for="item in cartLists"
                          :key="item.cartid">
            <!-- 商品单元格 -->
            <van-card :price="(item.originprice*item.discount/10).toFixed(2)"
                      :origin-price="item.originprice"
                      :desc="item.proname"
                      :title="item.proname"
                      class="goods-card">
              <template #thumb>
                <div class="img_box">
                  <!-- 复选框 -->
                  <van-checkbox v-model="item.flag"
                                checked-color="#ee0a24"
                                @change="changeCheckBox(item.cartid,item.flag)"></van-checkbox>
                  <van-image width="60"
                             height="60"
                             :src="item.img1" />
                </div>

              </template>
              <template #footer>
                <van-stepper :value="item.num"
                             min="0"
                             max="10"
                             @change="upCartNum(item.cartid,$event)" />
              </template>
            </van-card>
            <template #right>
              <van-button square
                          text="删除"
                          type="danger"
                          class="delete-button"
                          @click="deleteCartItem(item.cartid)" />
            </template>
            <van-divider />
          </van-swipe-cell>
        </div>

      </van-pull-refresh>
    </div>
    <!-- 提交订单栏 -->
    <van-submit-bar :price="totalPrice"
                    button-text="提交订单"
                    @submit="onSubmit">
      <van-checkbox v-model="$store.state.checkState"
                    checked-color="#ee0a24"
                    @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  Icon,
  SwipeCell,
  Card,
  Stepper,
  Checkbox,
  CheckboxGroup,
  Divider,
  SubmitBar,
  PullRefresh,
  Toast,
  NavBar,
  Cell,
  CellGroup,
  Dialog,
  Image as VanImage,
} from 'vant'
import {
  cartList,
  deleteCartItem,
  deleteAllCart,
  updateCartNum,
  selectOne,
  selectAll,
} from '@/api/cart'
import { addOrder } from '@/api/order'

Vue.use(Icon)
Vue.use(SwipeCell)
Vue.use(Card)
Vue.use(Stepper)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(SubmitBar)
Vue.use(Divider)
Vue.use(PullRefresh)
Vue.use(Toast)
Vue.use(NavBar)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.use(VanImage)
export default {
  data() {
    return {
      cartLists: [],
      checked: [],
      allCheck: false,
      isLoading: false,
      //   showSubmit: true,
    }
  },
  methods: {
    // 更新复选框事件接口
    changeCheckBox(id, flag) {
      selectOne({ cartid: id, flag: flag }).then((res) => {
        this.getCartList()
      })
    },
    //   返回箭头
    onClickLeft() {
      this.$router.go(-1)
    },
    // 全选
    checkAll() {
      console.log('全选1')
      console.log('全选1', this.$store.state.checkState)

      selectAll({
        userid: localStorage.getItem('userid'),
        type: this.$store.state.checkState,
      }).then((res) => {
        console.log(res)
        this.getCartList()
        // this.startChecks()
      })

      console.log('全选2')
    },
    // 删除选中
    deleteChoice() {
      if (!this.cartLists.every((item) => !item.flag)) {
        Dialog.confirm({
          message: '是否删除选中的商品',
        })
          .then(() => {
            console.log('删除')

            if (this.cartLists.every((item) => item.flag)) {
              // 全部删除
              console.log('全部删除')
              deleteAllCart({ userid: localStorage.getItem('userid') }).then(
                (res) => {
                  console.log('删除成功')
                  console.log(res)
                  this.cartLists = []
                  this.allCheck = false
                }
              )
            } else {
              // 部分删除
              this.cartLists.forEach((item) => {
                if (item.flag) {
                  deleteCartItem({ cartid: item.cartid }).then((res) => {
                    console.log('删除成功')
                    console.log(res)
                  })
                }
              })
            }
            // on confirm
            // 重新获取所有商品列表
            this.getCartList()
          })
          .catch(() => {
            console.log('不删除')
            // on cancel
          })
      }
    },
    // 更新数量
    upCartNum(id, num) {
      console.log(id, '----', num)
      if (num != 0) {
        //   更新数量
        updateCartNum({ cartid: id, num: num }).then((res) => {
          console.log(res)
        })
      } else {
        //   删除该商品
        deleteCartItem({ cartid: id }).then((res) => {
          console.log(res)
          // 重新获取所有商品列表
          this.getCartList()
        })
      }
    },
    //   提交订单
    onSubmit() {
      console.log('提交订单')
      addOrder({ userid: localStorage.getItem('userid') }).then((res) => {
        console.log(res)
        this.$store.commit('changeTimeState', res.time)
        console.log(this.$store.state.timeState)
        this.$router.push('/order')
      })
    },
    // 下拉刷新
    onRefresh() {
      // 获取所有订单
      this.getCartList()
      setTimeout(() => {
        Toast('刷新成功')
        this.isLoading = false
      }, 1000)
    },
    // 删除单条数据
    deleteCartItem(id) {
      console.log(id)
      deleteCartItem({ cartid: id }).then((res) => {
        console.log(res)
        // 重新获取所有商品列表
        this.getCartList()
      })
    },
    // 封装获取所有商品
    getCartList() {
      console.log('获取商品信息')
      cartList({ userid: localStorage.getItem('userid') }).then((res) => {
        this.cartLists = res.data
        this.$store.commit(
          'changeCheckState',
          this.cartLists.length != 0 &&
            this.cartLists.every((item) => item.flag)
        )
      })
      console.log('获取商品信息2')
    },
  },
  mounted() {
    // 获取所有商品列表
    this.getCartList()
    // this.startChecks()
  },
  watch: {},
  computed: {
    totalPrice() {
      let total = 0
      this.cartLists.forEach((item, index) => {
        if (item.flag) total += item.originprice * item.discount * item.num
      })
      return total * 10
    },
  },
}
</script>

<style scoped>
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
.content {
  overflow: auto;
}
.img_box {
  display: flex;
}
</style>
