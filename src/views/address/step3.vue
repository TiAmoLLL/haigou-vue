<!--
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-12 09:37:54
 * @LastEditTime: 2022-08-12 11:33:38
 * @FilePath: \haigou-vue-app\src\views\address\step3.vue
-->
<template>
  <div class="box">
    <van-address-edit :area-list="areaList"
                      :address-info="editObj"
                      show-set-default
                      show-delete
                      show-search-result
                      :search-result="searchResult"
                      :area-placeholder="editObj.province+' \/ '+editObj.city+' \/ '+editObj.county"
                      @delete="onDelete"
                      @save="onSave"
                      @change-detail="onChangeDetail" />
    <!-- :area-columns-placeholder="['请选择', '请选择', '请选择']" -->
  </div>
</template>
<script>
import Vue from 'vue'
import { AddressEdit, Toast } from 'vant'
import { areaList } from '@vant/area-data'
import { updateAddress, deleteAddress } from '@/api/address'

Vue.use(AddressEdit)
Vue.use(Toast)
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      editObj: {},
    }
  },
  methods: {
    onSave(obj) {
      console.log(obj)
      console.log(this.searchResult)
      updateAddress({
        addressid: obj.addressid,
        userid: localStorage.getItem('userid'),
        name: obj.name,
        tel: obj.tel,
        province: obj.province,
        city: obj.city,
        county: obj.county,
        addressDetail: obj.addressDetail,
        isDefault: obj.isDefault,
      }).then((res) => {
        console.log(res)
        console.log('修改成功')
        Toast(res.message)
        setTimeout(() => {
          this.$router.push('/address/step1')
        }, 300)
      })
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ]
      } else {
        this.searchResult = []
      }
    },
    onDelete(obj) {
      deleteAddress({
        addressid: obj.addressid,
      }).then((res) => {
        Toast(res.message)
        setTimeout(() => {
          this.$router.push('/address/step1')
        }, 300)
      })
    },
  },
  mounted() {
    this.editObj = JSON.parse(this.$route.params.address.substr(1))
    console.log(JSON.parse(this.$route.params.address.substr(1)))
  },
}
</script>