/*
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-10 16:44:40
 * @LastEditTime: 2022-08-11 16:24:40
 * @FilePath: \haigou-vue-app\src\api\kind.js
 */
import axios from '@/units/request'

// 产品的分类列表
export function getCateList(params) {
    return axios.get('/api/pro/categorylist')
}
//产品分类下品牌列表
export function getCategoryBrandList(params) {
    return axios.get('/api/pro/categorybrandlist?category='+params)
}

// 获取某分类下某品牌的产品列表
export function getBrandProList(params) {
    return axios.get('/api/pro/categorybrandprolist',{params})
}
// 热门搜索的数据
export function hotWord(params){
    return axios.get('/api/pro/hotword')
}
//获取搜索列表
export function getSearcList(params){
    return axios.get('/api/pro/search',{params})
}