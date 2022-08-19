/*
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-03 17:08:27
 * @LastEditTime: 2022-08-15 21:57:43
 * @FilePath: \code\threeStages\week03\day12\codes\haigou-vue-app\src\units\request.js
 */
import axios from 'axios'
// 开发环境       测试环境        生产环境
// localhost,ip  npm run build  npm run build
// development    production
// process.env 是node中返回环境的对象
// NODE_ENV 是 webpack 进行设置的
const isDev = process.env.NODE_ENV == 'development';

// 自定义axios
const request = axios.create({
    baseURL : isDev ? 'http://121.89.205.189:3001' : 'http://121.89.205.189:3001',  //设置数据请求地址,以开发模式和生产模式来判断
    timeout : 6000, //设置超时时间
})

// 请求拦截器
request.interceptors.request.use(config=>{
    // 比如登录验证 -- token
    // console.log(config);
    config.headers.token = localStorage.getItem('token');
    // console.log("config");
    // console.log(config);
    return config;
},error=>{
    return Promise.reject(error);
})

// 响应拦截器
request.interceptors.response.use(config=>{
    return config.data;
},error=>{
    return Promise.reject(error);
})

export default request

