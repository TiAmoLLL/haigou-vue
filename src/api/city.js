/*
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-11 15:44:45
 * @LastEditTime: 2022-08-11 16:26:30
 * @FilePath: \haigou-vue-app\src\api\city.js
 */
import axios from '@/units/request'

export function getCityList(){
    return axios.get('/api/city/sortCity')
}