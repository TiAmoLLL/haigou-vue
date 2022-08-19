/*
 * @Author: lzy
 * @Description: test
 * @Date: 2022-08-02 19:07:33
 * @LastEditTime: 2022-08-03 14:46:38
 * @FilePath: \code\threeStages\week03\day12\codes\haigou-vue-app\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    // '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
