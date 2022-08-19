<!--
 * @Author: lzy
 * @Description: test   
 * @Date: 2022-08-04 11:38:56
 * @LastEditTime: 2022-08-11 14:32:30
 * @FilePath: \haigou-vue-app\src\components\ProList.vue
-->
<template>
  <div class="proBox">
    <div class="proList"
         :class="'cols_'+num">
      <router-link tag="li"
                   :to="'/detail/'+item.proid"
                   class="proList-li"
                   v-for="item in proList"
                   :key="item.proid">
        <img v-lazy="item.img1"
             alt="">
        <div class="proList-item">
          <p class="van-multi-ellipsis--l2">{{item.proname}}</p>
          <span>￥{{item.originprice}}</span>
        </div>
      </router-link>
    </div>
    <div class="msearch_aside"
         @click="colsChange">
      <van-icon name="bars"
                v-show="num ==1" />
      <van-icon name="apps-o"
                v-show="num ==2" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Image as VanImage } from 'vant'
Vue.use(VanImage)
export default {
  props: {
    proList: {
      type: [Array, Object],
      require: true,
    },
  },
  data() {
    return {
      num: 1,
    }
  },
  methods: {
    colsChange() {
      //   console.log(this.num)
      this.num = this.num == 1 ? 2 : 1
    },
  },
}
</script>

<style scoped>
.proList {
  display: flex;
}
.cols_1 {
  flex-wrap: wrap;
  justify-content: space-between;
}
.cols_2 {
  flex-direction: column;
}
.cols_1 > .proList-li {
  width: 48%;
  margin: 3px 1%;
  list-style: none;
  height: 220px;
  position: relative;
}
.cols_1 > .proList-li > img {
  width: 100%;
  height: 1.7rem;
}
.cols_1 .proList-item > p {
  font-size: 14px;
}
.cols_1 .proList-item > span {
  color: #f66;
  font-size: 18px;
  position: absolute;
  bottom: 0;
}
/* cols_2 */
.cols_2 > .proList-li {
  height: 1rem;
  display: flex;
  list-style: none;
}
.cols_2 > .proList-li > img {
  width: 0.94rem;
  /* height: 0.94rem; */
  margin: 0.03rem;
  display: block;
  border: 1px solid #f66;
  box-sizing: border-box;
}
.cols_2 > .proList-item {
  flex: 1;
  height: 1rem;
  padding: 5px 10px;
}
.cols_2 .proList-item > p {
  font-size: 14px;
}
.cols_2 .proList-item > span {
  color: #f66;
  font-size: 18px;
}
.msearch_aside {
  position: fixed;
  width: 0.5rem;
  height: 0.5rem;
  bottom: 0.6rem;
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
</style>
