<!--
 * @Author: lzy
 * @Description: 选择地址
 * @Date: 2022-08-11 15:30:07
 * @LastEditTime: 2022-08-11 17:15:08
 * @FilePath: \haigou-vue-app\src\views\city\index.vue
-->
<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="选择地区"
                   left-text="返回"
                   left-arrow
                   @click-left="onClickLeft" />
    </header>
    <div class="content">
      <div class="city-item"
           v-for="(item,index) in cityList"
           :key="index">
        <li class="anchor"
            :id="'anchor'+item.letter">{{item.letter}}</li>
        <van-cell v-for="items in item.data"
                  :key="items.cityid"
                  :title="items.name"
                  @click="toCity(items.name)" />
      </div>
    </div>
    <div class="unit">
      <li v-for="(item,index) in cityList"
          :key="index">
        <a :href="'#anchor'+item.letter">{{item.letter}}</a>
      </li>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, List } from 'vant'
import { getCityList } from '@/api/city'

Vue.use(NavBar)
Vue.use(List)
export default {
  data() {
    return {
      cityList: [],
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    toCity(val) {
      console.log(val)
      this.$store.commit('changeCityState', val)
      this.$router.push('/home')
    },
  },
  mounted() {
    getCityList().then((res) => {
      console.log(JSON.parse(res.data))
      let newArr = JSON.parse(res.data)
      newArr.forEach((item) => {
        console.log(item)
        if (item.data.length > 0) {
          this.cityList.push(item)
        }
      })
    })
  },
}
</script>

<style scoped>
.box {
  height: 100%;
  overflow: auto;
}
.content {
  margin-top: 5px;
}
.anchor {
  list-style: none;
  background-color: #eee;
  height: 40px;
  line-height: 40px;
  font-size: 26px;
  text-indent: 0.5em;
}
.unit {
  width: 30px;
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  text-align: right;
}
.unit > li {
  list-style: none;
  width: 17px;
  height: 17px;
}
.unit > li > a {
  display: inline-block;
  width: 100%;
  height: 100%;
  font-size: 14px;
  text-decoration: none;
}
</style>