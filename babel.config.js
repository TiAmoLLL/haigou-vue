/*
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-02 19:07:33
 * @LastEditTime: 2022-08-03 11:43:40
 * @FilePath: \code\threeStages\week03\day12\codes\haigou-vue-app\babel.config.js
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
