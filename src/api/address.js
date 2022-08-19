/*
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-12 08:41:46
 * @LastEditTime: 2022-08-12 18:13:53
 * @FilePath: \haigou-vue-app\src\api\address.js
 */
import axios from '@/units/request'

// 查询收货地址列表
export function getAddressList(params){
    return axios.get('/api/address/list',{params})
}
// 添加收货地址
export function addAddress(params){
    return axios.post('/api/address/add',params)
}
// 修改收货地址
export function updateAddress(params){
    return axios.post('/api/address/update',params)
}
// 删除收货地址
export function deleteAddress(params){
    return axios.post('/api/address/delete',params)
}
//查询默认地址
export function defaultAddress(params){
    return axios.post('/api/address/defaultAddress', params)
}