<!--
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-12 16:46:27
 * @LastEditTime: 2022-08-12 22:19:44
 * @FilePath: \haigou-vue-app\src\views\order\index.vue
-->
<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="确认订单"
                   left-text="返回"
                   left-arrow
                   @click-left="onClickLeft" />
    </header>
    <main class="main">
      <!-- <div class="address"
           @click="addressChoice">
        <div class="address_top">
          <van-tag type="danger">默认</van-tag>
          <div class="city">
            {{address.province | addressFilters(address.city,address.county)}}
          </div>
        </div>
        <div class="address_midden">
          <p class="van-multi-ellipsis--l2">{{address.addressDetail}}</p>
          <van-icon name="arrow" />
        </div>
        <div class="address_bottom">
          <span>{{address.name}}</span>
          <span>{{address.tel}}</span>
        </div>
      </div> -->
      <div class="address"
           @click="addressChoice">
        <div class="address_top">
          <van-tag type="danger">默认</van-tag>
          <div class="city">
            {{orderList[0].province | addressFilters(orderList[0].city,orderList[0].county)}}
          </div>
        </div>
        <div class="address_midden">
          <p class="van-multi-ellipsis--l2">{{orderList[0].addressDetail}}</p>
          <van-icon name="arrow" />
        </div>
        <div class="address_bottom">
          <span>{{orderList[0].name}}</span>
          <span>{{orderList[0].tel}}</span>
        </div>
      </div>
      <div class="list">
        <van-card v-for="item in orderList"
                  :key="item.orderid"
                  :num="item.num"
                  :price="(item.originprice*item.discount/10).toFixed(2)"
                  desc="描述信息"
                  :title="item.proname"
                  :origin-price="item.originprice"
                  :thumb="item.img1" />
      </div>
    </main>
    <van-cell title="商品金额"
              :value="originalTotal" />
    <van-cell title="优惠金额"
              :value="(originalTotal-total/100).toFixed(2)" />
    <van-cell title="">
      <template #default>
        <span>总计:</span>
        <span class="totalPrice">{{total/100}}</span>
      </template>
    </van-cell>
    <van-submit-bar :price="total"
                    text-align="left"
                    button-text="提交订单"
                    @submit="onSubmit">
    </van-submit-bar>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  NavBar,
  Toast,
  Icon,
  Tag,
  Card,
  SubmitBar,
  Cell,
  CellGroup,
} from 'vant'
import { getOrderList, addOrder } from '@/api/order'
import { defaultAddress } from '@/api/address'

Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Icon)
Vue.use(Tag)
Vue.use(Card)
Vue.use(SubmitBar)
Vue.use(Cell)
Vue.use(CellGroup)
export default {
  data() {
    return {
      time: '',
      address: {},
      orderList: [],
      total: 0,
      originalTotal: 0,
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    // 选择地址
    addressChoice() {
      console.log('选择地址')
      this.$router.push('/changeAddress')
    },
    onSubmit() {
      console.log('提交订单')
      this.$router.push('/payment')
    },
  },
  created() {},
  mounted() {
    // defaultAddress({ userid: localStorage.getItem('userid') }).then((res) => {
    //   console.log(res)
    //   this.address = res.data[0]
    //   console.log(this.address)
    // })
    console.log('获取订单')
    console.log(this.$store.state.timeState)
    getOrderList({
      userid: localStorage.getItem('userid'),
      time: this.$store.state.timeState,
    }).then((res) => {
      console.log('获取订单')
      console.log(res)
      this.orderList = res.data
      this.orderList.forEach((item) => {
        this.total += item.originprice * item.discount * item.num * 10
        this.originalTotal += item.originprice * item.num
      })
    })
  },
  filters: {
    addressFilters(province, city, county) {
      console.log(province, city)
      if (province == city) {
        return city + county
      } else {
        return province + city + county
      }
    },
  },
}
</script>

<style scoped>
.main {
  margin-top: 15px;
  background-color: #eee;
}
.address {
  background-color: #fff;
  margin: 10px 0;
  padding: 5px 10px;
}
.address_top {
  display: flex;
}
.address_midden {
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.address_midden > p {
  margin: 5px 0;
}
.totalPrice {
  color: red;
  font-size: 18px;
}
</style>