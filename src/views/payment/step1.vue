<!--
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-12 22:15:24
 * @LastEditTime: 2022-08-13 09:22:21
 * @FilePath: \haigou-vue-app\src\views\payment\step1.vue
-->
<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="支付"
                   left-text="返回"
                   left-arrow
                   @click-left="onClickLeft" />
    </header>
    <main class="main">
      <van-cell-group>
        <van-radio-group v-model="radio">
          <van-cell>
            <template #title>
              <van-icon name="gold-coin"
                        size="18" />
              <span>微信支付</span>
            </template>
            <template #right-icon>
              <van-radio name="1"></van-radio>
            </template>
          </van-cell>
          <van-cell :style="{margin:'20px 0 0 0'}">
            <template #title>
              <van-icon name="gold-coin"
                        size="18" />
              <span>支付宝支付</span>
            </template>
            <template #right-icon>
              <van-radio name="2"></van-radio>
            </template>
          </van-cell>
        </van-radio-group>
      </van-cell-group>
      <van-button class="pay_btn"
                  type="danger"
                  @click="payClick">确认支付</van-button>
    </main>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Cell, CellGroup, Icon, RadioGroup, Radio, Button } from 'vant'

Vue.use(NavBar)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Icon)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Button)
export default {
  data() {
    return {
      radio: '1',
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    payClick() {
      console.log('确认支付', this.radio)
      if (this.radio == 1) this.$router.push('step2')
      else this.$router.push('step3')
    },
  },
}
</script>
<style scoped>
.main {
  padding-top: 150px;
  height: 100%;
  position: relative;
}
.pay_btn {
  position: absolute;
  bottom: 25px;
  right: 25px;
}
</style>