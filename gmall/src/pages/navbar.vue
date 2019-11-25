<template>
    <div class="container">
      <router-view/><transition><!-- 解决切换滑动问题 下有样式-->

</transition>

      <div v-show="this.isShowfootbar">
      <mt-tabbar v-model="selected" fixed>
        <mt-tab-item id="home">
          <img slot="icon" :src="home_img">
          首页
        </mt-tab-item>
        <mt-tab-item id="classify">
          <img slot="icon" :src="class_img">
          分类
        </mt-tab-item>
        <mt-tab-item id="cart">
          <img slot="icon" :src="cart_img">
          购物车
        </mt-tab-item>
        <mt-tab-item id="my">
          <img slot="icon" :src="my_img">
          我的
        </mt-tab-item>
      </mt-tabbar>
      </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'

    export default {
        name: "navbar",
        data () {
          return{
            fixed:true,
            selected:'home',
            home_img:'static/images/home-null.png',
            class_img:'static/images/classify-null.png',
            cart_img:'static/images/cart-null.png',
            my_img:'static/images/my-null.png'
          }
        },
      computed:{
        ...mapGetters(["isShowfootbar"])
      },
      watch:{
          selected:function (value) {
            if (value=='home'){
              //显示首组件-----通过编程式的路由跳转
              this.$router.push("home");//home/10
              this.home_img="static/images/home-on.png"
            } else{
              this.home_img="static/images/home-null.png"
            }
            if (value=='classify'){
              //显示首组件-----通过编程式的路由跳转
              this.$router.push("classify");//home/10
              this.class_img='static/images/classify-on.png'
            } else{
              this.class_img='static/images/classify-null.png'
            }

              if(value=='cart'){
              //显示购物车组件
              this.$router.push("cart");
              this.cart_img="static/images/cart-full.png"
            }else{
                this.cart_img="static/images/cart-null.png"
              }
              if(value=='my'){
              // 显示我的组件
              this.$router.push("my");
              this.my_img="static/images/my-on.png"
            }else {
                this.my_img="static/images/my-null.png"
              }
          }
      },


    }
</script>

<style lang="stylus" scoped>

  .container
    padding-bottom 1rem
    overflow-x: hidden

  .v-enter
    opacity 0
    transform translateX(100%)
  .v-leave-to
    opacity 0
    transform translateX(-100%)
    position absolute
  .v-enter-active,
  .v-leave-active
    transition all 0.5s ease

</style>
