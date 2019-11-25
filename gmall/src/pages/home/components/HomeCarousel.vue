<template>
  <swiper :options="swiperOption" ref="mySwiper" ><!--@someSwiperEvent="callback"-->
    <!-- slides -->
    <swiper-slide><img class="swaper-img" src="http://img.cdn.imbession.top/combanner.png"/></swiper-slide>
    <swiper-slide><img class="swaper-img" src="http://img.cdn.imbession.top/topbanner.png"/></swiper-slide>
    <swiper-slide><img class="swaper-img" src="http://img.cdn.imbession.top/combanner.png"/></swiper-slide>
    <swiper-slide><img class="swaper-img" src="http://img.cdn.imbession.top/topbanner.png"/></swiper-slide>

    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>

  </swiper>
</template>

<script>
  import {Toast} from 'mint-ui'
    export default {
        name: "HomeCarousel",
        data (){
          return {
            swiperOption:{
              pagination: '.swiper-pagination',
              loop:true
            },
            carouselList:[]//轮播图的数组
          }
        },
      created(){
          this.carousel();
      },
      methods:{
        carousel:function () {
         /* //发送请求获取轮播热图,在轮播图上使用v-for 动态传入图片地址
          this.service.get("接口地址").then(function (res) {
            if (res.data.status==0){
                this.carouselList=res.data.轮播图
            }else{
            Toast("加载轮播图失败");
            }
          })*/
        }
      }

    }
</script>

<style lang="stylus" scoped>//scope的作用是样式只对本组件起作用.

    .swaper-img
      width:100%
    .swiper-pagination >>> .swiper-pagination-bullet-active ///父类选择器>子类选择器 || >>>代表样式穿透,可对引入的组件的样式起作用
      background: white
</style>
