<template>
  <div class="container">
    <!-- <div class="box">
      <header class="header">header</header>
      <div class="content">content</div>
      <footer class="footer">footer</footer>
    </div> -->
    <!-- 视图页面的出口 -->
    <router-view></router-view>
    <footer class="footer"
            v-if="!$route.meta.hidden">
      <ul>
        <router-link to='/home'
                     tag="li">
          <span class="iconfont icon-shouye"></span>
          <p>首页</p>
        </router-link>
        <router-link to='/kind'
                     tag="li">
          <span class="iconfont icon-fenlei"></span>
          <p>分类</p>
        </router-link>
        <router-link to='/cart'
                     tag="li">
          <span class="iconfont icon-gouwuche"></span>
          <p>购物车</p>
        </router-link>
        <router-link to='/user'
                     tag="li"
                     v-if="localState">
          <span class="iconfont icon-My"></span>
          <p>我的</p>
        </router-link>
        <router-link to='/login'
                     tag="li"
                     v-else>
          <span class="iconfont icon-My"></span>
          <p>未登录</p>
        </router-link>
      </ul>

    </footer>
    <div class="tip"> 请将屏幕竖向显示 </div>
  </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
  computed: {
    localState() {
        console.log(this.$store.state.loginState)
      return this.$store.state.loginState
    },
  },
}
</script>

<style lang="stylus">
// scoped 让这里的样式只能在当前应用，不会影响到其他组件
html, body, .container
  height 100%
html
  // font-size 100px  // 1rem = 100px
  // 如果设计稿是以 iphone6 为基础设计的，那么设置为 100 / 375 * 100 = 26.66666vw
  // 如果设计稿是以 iphone5 为基础设计的，那么设置为 100 / 320 * 100 = 31.25vw
  font-size 26.666666666vw
@media all and (min-width 960px)
  html
    font-size 100px
body
  font 12px / 1 'Lucida Grande', Arial, '\5FAE\8F6F\96C5\9ED1', '\5b8b\4f53'
.container
  display flex
  flex-direction column
.box
  display flex
  flex-direction column
  flex 1
  overflow auto
  .header
    height 0.44rem
    background-color #ff6666
  .content
    flex 1
    overflow auto
.footer
  height 0.5rem
  background-color #efefef
  ul
    list-style none
    height 100%
    display flex
    margin 0
    padding 0
    li
      flex 1
      height 100%
      display flex
      flex-direction column
      justify-content center
      align-items center
      &.router-link-active
        color #f66
      span
        margin-top 0.1rem
.tip
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  background-color rgba(0, 0, 0, 0.5)
  font-size 30px
  font-weight bold
  justify-content center
  align-items center
  display none // 默认不显示，只有在宽度大于高度时显示
@media all and (orientation landscape)
  .tip
    display flex // 显示
</style>
