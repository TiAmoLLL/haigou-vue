/*
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-09 14:05:26
 * @LastEditTime: 2022-08-15 21:58:12
 * @FilePath: \code\threeStages\week03\day12\codes\haigou-vue-app\vue.config.js
 */
module.exports = {
    publicPath: './', // 表示打包出来的是 相对路径
    devServer:{
        // 设置代理
        proxy:{
            "/api":{
                target:"http://121.89.205.189:3001/api/",//域名
                // ws:true,//是否启用websockets
                // changOrigin:true,   /**开启代理:在本地会创建一个虚拟服务器，然后发送请求的数据，并同时接收请求的数据
                // 这样服务器和服务端进行数据交互就不会有跨域的问题**/
                // pathRewrite:{
                //     "^/api":"/",    /**扫描到"/api"时 拼接url"http://127.0.0.1:8888/api/private/v1/后面加具体url"*/
                // }
            }
        }
    }
}