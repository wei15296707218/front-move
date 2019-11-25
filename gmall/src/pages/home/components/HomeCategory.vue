<template>
    <div class="icons">
      <swiper :options="swiperOption" ref="mySwiper" ><!--@someSwiperEvent="callback"-->
        <swiper-slide v-for="(pageArray,index) of pages" :key="index">
        <div class="icon" v-for="(item,index) of pageArray" >
            <div class="icon-img">
              <img class="icon-img-content" :src="item.categoryUrl"/>
            </div>
            <p class="icon-desc">{{item.categoryName}}</p>
        </div>
        </swiper-slide>


      </swiper>
    </div>
</template>

<script>
    export default {
        name: "HomeCategory",
        data (){
          return{
            swiperOption:{},
            categoryList:[
              {
                "id":1,
                "categoryUrl":"http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",
                "categoryName":"手机"
              },
              {
                "id":1,
                "categoryUrl":"http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",
                "categoryName":"手机"
              },
              {
                "id":1,
                "categoryUrl":"http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",
                "categoryName":"手机"
              },
              {
                "id":1,
                "categoryUrl":"http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",
                "categoryName":"手机"
              },
              {
                "id":1,
                "categoryUrl":"http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",
                "categoryName":"手机"
              },
              {
                "id":1,
                "categoryUrl":"http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",
                "categoryName":"手机"
              },
              {
                "id":1,
                "categoryUrl":"http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",
                "categoryName":"手机"
              },
              {
                "id":1,
                "categoryUrl":"http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",
                "categoryName":"手机"
              },
              {
                "id":1,
                "categoryUrl":"http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",
                "categoryName":"手机qweqweqweqweqweqweqe"
              }
            ]
          }
        },
      computed:{
          pages (){
            const pages=[]//数组的长度代表页数
             //给数组的每一页进行赋值
            this.categoryList.forEach((item,index)=>{//遍历每一个图标
              //判断index的下标的元素应该显示在第几页
              const page = Math.floor(index/8);
              if(!pages[page]){
                pages[page]=[]
              }
              pages[page].push(item);

            })
            return pages;
          }
      }

    }
</script>

<style lang="stylus" scoped>
  @import '~styles/mixins.styl'
    .icons >>>.swiper-container
      width: 100%
      height:0
      padding-bottom :50%
      over-flow:hidden
      .icon
        width: 25%
        height:0
        padding-bottom: 25%
        over-flow:hidden
        float:left
        position :relative
        .icon-img
          position absolute
          left:0
          right:0
          top:0
          bottom:.44rem
          box-sizing :border-box
          padding:.1rem
          .icon-img-content
            height:100%
            display block
            margin :0 auto
        .icon-desc
          position :absolute
          left:0
          right:0
          bottom:0
          height:.44rem
          text-align center
          ellipsis()




</style>
