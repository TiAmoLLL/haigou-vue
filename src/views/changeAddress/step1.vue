<!--
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-12 09:37:45
 * @LastEditTime: 2022-08-12 22:02:29
 * @FilePath: \haigou-vue-app\src\views\changeAddress\step1.vue
-->
<template>
  <div class="box">
    <van-address-list v-model="chosenAddressId"
                      :list="addressList"
                      default-tag-text="默认"
                      @select="chosenAddress"
                      @add="onAdd"
                      @edit="onEdit" />
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, AddressList } from 'vant'
import { getAddressList } from '@/api/address'
import { updateOrderAddress } from '@/api/order'

Vue.use(NavBar)
Vue.use(AddressList)
export default {
  data() {
    return {
      chosenAddressId: '1',
      addressList: [],
    }
  },
  methods: {
    onAdd() {
      console.log('onadd')
      this.$router.push('step2')
    },
    onEdit(val) {
      delete val.userid
      console.log(
        JSON.stringify(val)
          .substring(1, JSON.stringify(val).length - 1)
          .replace(/,/g, '&')
          .replace(/:/g, '=')
      )
      let address = JSON.stringify(val)
      // .substring(1, JSON.stringify(val).length - 1)
      // .replace(/,/g, '&')
      // .replace(/:/g, '=')
      console.log(val)
      this.$router.push('step3/:' + address)
    },
    // 切换地址
    chosenAddress(obj) {
      console.log(obj)
      console.log(this.$store.state.timeState)
      updateOrderAddress({
        userid: localStorage.getItem('userid'),
        name: obj.name,
        tel: obj.tel,
        province: obj.province,
        city: obj.city,
        county: obj.county,
        addressDetail: obj.addressDetail,
        time: this.$store.state.timeState,
      }).then((res) => {
        console.log(res)
        this.$router.push('/order')
      })
    },
  },
  mounted() {
    getAddressList({ userid: localStorage.getItem('userid') }).then((res) => {
      console.log(res)
      res.data.forEach((item, index) => {
        item.address =
          item.province + item.city + item.county + item.addressDetail
        item.id = index + 1
        this.addressList.push(item)
      })
    })
  },
}
</script>