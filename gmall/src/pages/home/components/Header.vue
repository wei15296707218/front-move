<template>
    <div class="header" >

      <div class="header-left"><span class="iconfont">&#xe676;</span></div>
      <div class="header-content"><span class="iconfont">&#xe613;</span><span class="warn">输入要搜索的商品</span></div>
    </div>
</template>

<script>
    export default {
        name: "HomeHeader"
    }
</script>

<style lang="stylus" scoped>//scope的作用是样式只对本组件起作用./*可以对css进行封装,从而可以复用*/
  @import '~styles/varibles.styl'//css中引入其他的样式要加~
  .header
    height : .88rem
    background-color : $bgColor
    display : flex
    line-height :.88rem
    .header-left
      width:0.72rem
      height:0.72rem
      color:white
    .header-left>.iconfont
      font-size .5rem
    .header-content
      flex :1
      background-color :white
      height :0.6rem
      line-height :.6rem
      margin-top:.14rem
      margin-right :.2rem
      border-radius :.2rem
      -webkit-border-radius : .2rem
      -moz-border-radius :.2rem
    .header-content>.iconfont
      padding-left .1rem
</style>
