<template>
    <div>
      <div><van-nav-bar
        title="账户设置"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      /></div>
      <div class="head">
        <van-cell > <van-image
          round
          width="70px"
          height="70px"
          src="https://img.yzcdn.cn/vant/cat.jpeg"

        /></van-cell>
      </div>
      <div class="username"><van-button round type="info" size="small">请登录</van-button></div>
      <div class="content1">
        <van-cell title="地址管理" is-link to="" />
        <van-cell title="功能反馈" is-link to="" />
        <van-cell title="关于GMall" is-link to="" />
      </div>
      <div class="foot">
        <van-button type="primary" size="large" color="linear-gradient(to right, #4bb0ff, #6149f6)">退出登录</van-button>
    </div>
    </div>
</template>

<script>
    export default {
        name: "SetInfo",
      data(){
          return{
            pic:"https://img.yzcdn.cn/vant/cat.jpeg"
          }
      },
      methods:{
        onClickLeft(){
          this.$router.go(-1);
        }
      }
    }
</script>

<style scoped lang="less">
  .content1{
    margin-top: 20px;
  }
  .foot{
    margin-top: 20px;
  }
  .van-image{
    margin-left: 12px;
  }
  van-cell>.van-cell__right-icon{

    margin-top: 50px;
  }
  .van-cell__value--alone{

    text-align: center;
  }
  .username{
    text-align: center;
    padding-left: 10px;
  }

</style>
