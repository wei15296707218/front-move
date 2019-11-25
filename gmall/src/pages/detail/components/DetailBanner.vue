<template>
  <div>
    <div class="banner" @click="handlerClickBanner">
      <img class="banner-img" :src="productUrl"/>
      <div class="banner-info">
        <div class="banner-number">
          <span class="iconfont banner-icon">&#xe62d;</span>
          {{imgList.length}}
        </div>
      </div>
    </div>
<Gallery :imgList="imgList" v-show="showgallery" @close="handlerClose"></Gallery>
  </div>
</template>

<script>
  import Gallery from '@/common/gallery/Gallery'
    export default {
        name: "DetailBanner",
        components:{Gallery},
      props:{
        DetailInfo:Object
      },
      data (){
          return{
            showgallery:false
          /*  imgList:[
              {producturl:"http://img.cdn.imbession.top/100000971366/wrapper/dac0b00509961827.jpg"},
              {producturl:"http://img.cdn.imbession.top/100000971366/wrapper/dac0b00509961827.jpg"}
            ]*/
          }
      },
      methods:{
        handlerClickBanner:function () {
          this.showgallery=true
        },
        handlerClose:function () {
          this.showgallery=false
        }
      },
      computed:{
          productUrl:function () {
            return 'http://img.cdn.imbession.top/'+this.DetailInfo.mainImage
          },
        imgList:function(){
            const imgList = (this.DetailInfo.subImages || "").split(",");
            for (var i=0;i<imgList.length;i++){
              imgList[i]='http://img.cdn.imbession.top/'+imgList[i];
            }
            return imgList;
        }
      }
    }
</script>

<style lang="stylus" scoped>

  .banner
    overflow:hidden
    height:0
    padding-bottom 70%
    position: relative
    .banner-img
      width: 100%
    .banner-info
      position: absolute
      left:0
      right:0
      bottom:0
      background rgba(255,255,255,.6)
      .banner-number
        float:right
        margin-right .1rem
        background rgba(0,0,0,.8)
        color:white
        border-radius .1rem
        padding:.05rem
        font-size .24rem
        .banner-icon
          font-size .24rem
</style>
