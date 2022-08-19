/*
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-08 19:52:02
 * @LastEditTime: 2022-08-11 16:24:54
 * @FilePath: \haigou-vue-app\src\api\user.js
 */
import axios from '@/units/request'
// 判断是否已注册
export function doCheckPhone(params){
    return axios.post('/api/user/docheckphone',params)
}
// 获取验证码
export function doSendMsgCode(params){
    console.log('1234567890');
    console.log(params);
    console.log('1234567890');

    return axios.post('/api/user/dosendmsgcode',params)
}
// 判断验证码
export function doCheckCode(params){
    return axios.post('/api/user/docheckcode',params)
}
// 确认注册账号密码
export function doFinishRegister(params){
    return axios.post('/api/user/dofinishregister',params)
}
// 登录
export function login (params) {
    return axios.post('/api/user/login', params)
  }