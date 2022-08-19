/*
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-02 19:07:34
 * @LastEditTime: 2022-08-03 15:26:40
 * @FilePath: \code\threeStages\week03\day12\codes\haigou-vue-app\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
