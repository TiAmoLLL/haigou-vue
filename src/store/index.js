/*
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-02 19:07:34
 * @LastEditTime: 2022-08-12 20:48:35
 * @FilePath: \haigou-vue-app\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    strict:process.env.NODE_ENV !=='production',
  state: {
    loginState: localStorage.getItem('loginState') == 'true',
    timeState:'',
    // 保存搜索框的信息
    checkState:false,
    // 保存地区信息
    cityState:'北京'
  },
  mutations: {
      changeLoginState(state,value){
        state.loginState = value;
      },
      changeCityState(state,value){
          state.cityState = value;
      },
      changeTimeState(state,value){
        state.timeState = value;
    },
    changeCheckState(state,value){
        state.checkState = value;
    }
    

  },
  actions: {
      loginAction(context,value){
          setTimeout(()=>{
              context.commit('changeLoginState',value)
          },1000)
      }
  },
  modules: {
  },
  getters:{

  }
})
