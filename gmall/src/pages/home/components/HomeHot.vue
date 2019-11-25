<template>
    <div>
      <div class="title">热销产品</div>
      <ul>
        <router-link tag="li" :to="'/detail/'+item.id"
          class="item border-bottom" v-for="(item,index) of hotList" :key="index"><!--进行路由的跳转,实质就是将li标签实现超链接的功能-->
          <img class="item-img" :src="'http://img.cdn.imbession.top/'+item.mainImage"/>
          <div class="item-info">
            <p class="item-title">{{item.name}}</p>
            <p class="item-desc">{{item.name}}</p>
            <p class="item-price">￥{{item.price}}</p>
          </div>
        </router-link>
      </ul>
    </div>
</template>

<script>
  export default {
    name: "HomeHot",
    props:{
      hotList:Array
    },
    data (){
    return{

    }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~styles/mixins.styl'
  .title
    background :#eee
    line-height :.8rem
    text-indent :.2rem
  .item
    display :flex
    over-flow:hidden
    height:2rem
    .item-img
      width:1.8rem
      height:1.8rem
      padding:.1rem
    .item-info
      flex:1//占满父元素的item的剩余的空间
      padding:.1rem
      min-width :0
      .item-title
        line-height:.54rem
        font-size :.30rem
        ellipsis()
      .item-desc
        line-height:.5rem
        font-size :.22rem
        ellipsis()
      .item-price
        color: #ff261e


</style>
