/*
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-05 19:03:43
 * @LastEditTime: 2022-08-11 16:24:14
 * @FilePath: \haigou-vue-app\src\api\detail.js
 */
import axios from '@/units/request'

export function getProDetailData(params){
    return axios('/api/pro/detail/'+ params)
}