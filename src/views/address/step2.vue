<!--
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-12 09:37:54
 * @LastEditTime: 2022-08-12 11:34:19
 * @FilePath: \haigou-vue-app\src\views\address\step2.vue
-->
<template>
  <div class="box">
    <van-address-edit :area-list="areaList"
                      show-set-default
                      show-search-result
                      :search-result="searchResult"
                      :area-columns-placeholder="['请选择', '请选择', '请选择']"
                      @save="onSave"
                      @change-detail="onChangeDetail" />
  </div>
</template>
<script>
import Vue from 'vue'
import { AddressEdit, Toast } from 'vant'
import { areaList } from '@vant/area-data'
import { addAddress } from '@/api/address'

Vue.use(AddressEdit)
Vue.use(Toast)
export default {
  data() {
    return {
      areaList,
      searchResult: [],
    }
  },
  methods: {
    onSave(obj) {
      console.log(obj)
      console.log(this.searchResult)
      addAddress({
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
        console.log('添加成功')
        Toast(res.message)
        setTimeout(() => {
          this.$router.push('step1')
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
  },
}
</script>