<template>

  <div>
    <div>
      <van-nav-bar
        title="订单详情"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div class="c-center">
   <div class="left"><van-icon name="location" size="18px" />
   </div>
    <div class="right">
      <span>收货人:{{shipping.receiverName}}</span> <span class="tel">电话:{{shipping.receiverPhone}}</span>

      <div>收货地址:{{shipping.receiverAddress}}</div>
    </div>
    </div>
    <div>
      <van-panel :title="'订单号:'+orderInf.orderNo"  >
        <router-link tag="div" :to="'/detail/'"  v-for="(item,index ) in orderItemInf" :key="index"  class="item border-bottom" >
          <img class="item-img" :src="'http://img.cdn.imbession.top/'+item.productImage"/>
          <div class="item-info">
            <!--<p class="item-title">{{orderItemInf.productName}}</p>-->
            <p class="item-desc">{{item.productName}}</p>
            <p class="item-price">￥{{item.currentUnitPrice}}</p>
          </div>
        </router-link>

      </van-panel>
    </div>
    <div>
      <van-cell-group>
        <van-cell title="商品总价" :value="'￥'+orderInf.payment" />
        <van-cell title="运费" :value="'￥'+orderInf.postage" />
        <van-cell title="订单总价" :value="'￥'+orderInf.payment" />
        <van-cell title="实付款" :value="'￥'+orderInf.payment" />
      </van-cell-group>
    </div>
    <div>
      <p>订单编号:{{orderInf.orderNo}}</p>
      <p>支付宝交易号:XXXXXXXXXXXXX</p>
      <p>创建时间:{{orderItemInf.createTime}}</p>
      <p>付款时间:{{orderInf.endTime}}</p>
      <p>发货时间:{{orderInf.sendTime}}</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "OrderDetail",
      data(){
      return{
        orderInf:{},
        orderItemInf:[],
        shipping:{}
         }
            },
      mounted(){
        this.getMyOrderList();
      },
      methods: {
        getMyOrderList:function () {
          var _this = this;
          this.service.post("order/detail.do",
            {
              "orderNo":this.$route.params.orderNo
            })
            .then(function (res) {
            console.log(res.data.data);
              //console.log(res.data.data.shippingVo);
              _this.shipping = res.data.data.shippingVo;
              _this.orderInf = res.data.data;
              _this.orderItemInf = res.data.data.orderItemVoList
            }).catch(function (err) {
            console.log(err)
          })
        },
        onClickLeft() {
          this.$router.go(-1);
        },
        onClickRight() {
          Toast('按钮');
        },

      }
    }
</script>

<style scoped lang="less">

  .c-center{


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
    width:90%;

    padding-top: 8px;
    padding-right: 9px;

    line-height: 20px;
  }
  .c-center>.right>.tel{
    float: right;

  }
  .item{
    display :flex;
    over-flow:hidden;
    height:2rem
  }
  .item> .item-img{
    width:1.8rem;
    height:1.8rem;
    padding:.1rem
  }
  .item>.item-info{
    flex:1;//占满父元素的item的剩余的空间
    padding:.1rem;
    min-width :0
  }
  /*  .item>.item-info> .item-title{
      line-height:.54rem;
      font-size :.30rem;
      overflow :hidden;
      white-space :nowrap;
      text-overflow:ellipsis

    }*/
  .item>.item-info> .item-desc{
    line-height:.5rem;
    font-size :.22rem
    ellipsis()
  }
  .item>.item-info>.item-price{
    color: #ff261e
  }
  .van-cell__value--alone{
    text-align: right;
  }
</style>
