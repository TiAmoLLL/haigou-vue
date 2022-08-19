/*
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-12 17:25:20
 * @LastEditTime: 2022-08-13 09:38:38
 * @FilePath: \haigou-vue-app\src\api\order.js
 */
import axios from '@/units/request'

// 添加订单
export function addOrder(params) {
    return axios.post('/api/order/addOrder', params)
}

// 获取所有订单
export function getOrderList(params) {
    return axios.get('/api/order/confirmOrder',{params})
}
// 切换地址
export function updateOrderAddress(params){
    return axios.post('/api/order/updateOrderAddress',params)
}
// /api/order/deleteCartItem
export function deleteCartItem(params){
    return axios.get('/api/order/deleteCartItem',{params})
}