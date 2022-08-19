/*
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-10 10:06:41
 * @LastEditTime: 2022-08-12 16:44:25
 * @FilePath: \haigou-vue-app\src\api\cart.js
 */
import axios from '@/units/request'
// 添加购物车
export function addCart(params){
    return axios.post('/api/cart/add', params)
}
// 查看购物车
export function cartList(params){
    return axios.post('/api/cart/list', params)
}
// 删除单条数据
export function deleteCartItem(params){
    return axios.post('/api/cart/remove', params)
}
// 删除所有订单
export function  deleteAllCart(params){
    return axios.post('/api/cart/removeall', params)
}
// 更新购物车数量
export function updateCartNum(params){
    return axios.post('/api/cart/updatenum', params)
}
// 更新单个复选框
export function selectOne(params){
 return axios.post('/api/cart/selectone', params)
}
//全选
export function selectAll(params){
    return axios.post('/api/cart/selectall', params)
}