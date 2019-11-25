<template>

<div>
  <div><van-nav-bar
    title="确认订单"
    left-text="返回"
    right-text="按钮"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  /></div>
<div>
  <div class="c-center" @click="selectShipping">
    <div class="left"><van-icon name="location" size="18px" /></div>

    <div class="right">
      <span>收货人:{{shipping.receiverName}}</span> <span class="tel">电话:{{shipping.receiverPhone}}</span>

      <div>收货地址:{{shipping.receiverAddress}}</div>
    </div>
    <div class="righticon"><van-icon name="arrow" size="18px" /></div>
  </div>
</div>

  <div><van-card
    :num="count"
    :price="DetailInfo.price"
    :desc="DetailInfo.subtitle"
    :title="DetailInfo.name"
    :thumb="'http://img.cdn.imbession.top/'+DetailInfo.mainImage"
  >
   <!-- <div slot="tags">
      <van-tag plain type="danger">标签</van-tag>
      <van-tag plain type="danger">标签</van-tag>
    </div>-->
   <!-- <div slot="footer">
      <van-button size="mini">按钮</van-button>
      <van-button size="mini">按钮</van-button>
    </div>-->
  </van-card></div>
  <div>
    <van-cell title="购买数量"  size="large" :value="'X '+count">

    </van-cell>
    <van-cell title="配送方式"  size="large" is-link value="快递  免邮" />
    <van-cell title="订单备注"  size="large" label="选填,请先和商家协商一致" />
  </div>

  <div>
    <van-submit-bar
      :price="count*DetailInfo.price*100"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</div>
</template>

<script>
    export default {
        name: "ConfirmOrder",
      data(){
        return{
            value:0,
          DetailInfo:{},
          count:this.$route.params.count,
          shipping:{}

        }
      },
      mounted(){
        this.getdetailInfo();
        this.getShippinginf();
      },
      methods:{
        getShippinginf(){
          this.service.get("shipping/findShppingByShippingId.do",{
            params:{
              shippingid:this.$route.params.shippingid
            }
          }).then(this.getShippinginfRes);
        },
        getShippinginfRes(res){
          if (res.data.status == 0 && res.data.data) {
            this.shipping = res.data.data;
            console.log(this.shipping);
          }
        },
        getdetailInfo(){
          //需要替换为前端的接口的商品详情,还需定义接口这里使用的是后端的接口
          this.service.get("/manage/product/detail.do",{
            params:{
              productId:this.$route.params.id
            }
          })
            .then(this.getDetailsInfoRes);
        },
        getDetailsInfoRes(res) {
          if (res.data.status == 0 && res.data.data) {
            this.DetailInfo = res.data.data;
            console.log(this.DetailInfo);
          }
        },
        onClickLeft() {
          this.$router.go(-1);
        },
        onClickRight() {

        },
        selectShipping(){
          this.$router.push(
          {
            name:'SelectShipping',
              params:{
               id:this.DetailInfo.id,
               count:this.count
          }
          });
        },
        onSubmit(){

        }
      }
    }
</script>

<style scoped lang="less">

  .c-center{
    display: -webkit-flex;
    display: flex;
    height:80px;
  }
  .c-center>.left{
    float: left;
    width:10%;
    height:90px;
    padding-top: 20px;
    padding-left: 20px;
  }
  .c-center>.right{
    width:80%;
    padding-top: 8px;
    padding-right: 9px;
    line-height: 20px;
    float: right;
  }
  .c-center>.righticon{
    width:10%;
    padding-top: 20px;
  }
  .c-center>.right>.tel{
    float: right;

  }
</style>
