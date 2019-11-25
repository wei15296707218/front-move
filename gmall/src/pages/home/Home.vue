<template>
  <div>

    <home-header></home-header>
    <home-carousel></home-carousel>
    <home-category></home-category>
    <home-hot :hotList="hotList"></home-hot>


  </div>

</template>

<script>
  import HomeHeader from './components/Header'
  import HomeCarousel from './components/HomeCarousel'
  import HomeCategory from './components/HomeCategory'
  import HomeHot from './components/HomeHot'

    export default {
        name: "Home",
      components:{
        HomeHeader,
        HomeCarousel,
        HomeCategory,
        HomeHot,
      },
      data (){
          return{
            hotList:[]
          }
      },
      //onload ---获取接口数据在dom渲染完之后,这里使用mounted
      mounted(){
          //热门产品
          this.getHotList();
          //轮播图
        //类别

      },
      methods:{
          getHotList(){
            this.service.get("/manage/product/hot.do?category_id=1&is_hot=1").then(this.getHotListInfo)
          },
        getHotListInfo(res){

          if(res.data.status==0){
            console.log(res.data.data);
            this.hotList=res.data.data;
          }
        }
      }

    }
</script>

<style scoped>

</style>
