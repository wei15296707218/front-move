<template>
    <div>
      <div class="header-abs" v-show="showHeader">
        <router-link tag="div" to="/home" class="iconfont header-abs-back">&#xe676;</router-link>
      </div>
      <div class="header-fixed" :style="opacityStyle" v-show="!showHeader">
        <router-link tag="div" to="/home" class="iconfont header-fixed-back">&#xe676;</router-link>
      </div>
    </div>
</template>

<script>
    export default {
        name: "DetailHeader",
      data (){
          return{
              showHeader:true,
              opacityStyle:{
                opacity:0
              }
          }
      },
      mounted(){
          window.addEventListener('scroll',this.handleScroll)
      },
      methods:{
          handleScroll(){
            const top =document.documentElement.scrollTop;
            if (top>60){
              //60-140之间透明,
              let opacity = top/140;
              opacity=(opacity>=1?1:opacity)
              this.opacityStyle={opacity};

              this.showHeader=false;
            }else {
              this.showHeader=true;
            }
          }
      }

    }
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl'
  .header-abs
    position: absolute
    left:.2rem
    top: .2rem
    width:.72rem
    height:.72rem
    line-height .8rem
    border-radius .2rem
    text-align center
    background rgba(0,0,0,.8)
    .header-abs-back
      color white
      font-size .4rem
  .header-fixed
    position fixed
    left:0
    top:0
    right:0
    background-color : $bgColor
    height:.8rem
    line-height .8rem
    text-align center
    .header-fixed-back
      color: white
      width .64rem
      font-size .4rem


</style>
