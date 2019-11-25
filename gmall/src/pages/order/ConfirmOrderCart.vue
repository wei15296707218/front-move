<template>
    <div>
      <div>
        <van-nav-bar
          title="确认订单"
          left-text="返回"
          right-text="按钮"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        />
      </div>
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
      <div v-for="(item ,index) in orderInfs" :key="index">
      <div><van-card
        :num="item.quantity"
        :price="item.productPrice"
        :desc="item.productName"
        :title="item.productName"
        :thumb="'http://img.cdn.imbession.top/'+item.productMainImage"
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
        <van-cell title="购买数量"  size="large" :value="'X '+item.quantity">

        </van-cell>
        <van-cell title="配送方式"  size="large" is-link value="快递  免邮" />
        <van-cell title="订单备注"  size="large" label="选填,请先和商家协商一致" />
      </div>
        <div><van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">

        </van-divider>
        </div>
      </div>
      <div>
        <van-submit-bar
          :price="totalPrice*100"
          button-text="提交订单"
          @submit="onSubmit"
        />
      </div>
      <div>
        <van-action-sheet v-model="show" title="确认付款">
          <div class ="content">
          <div class="price">￥206</div>
          <div><van-cell is-link @click="showPopup">去付款</van-cell>

            <van-popup v-model="show1"><div class="picture"> <img :src="src" @click="cancel"></div></van-popup></div>
            <!--<div class="picture"><img src=""></div>-->
          </div>
        </van-action-sheet>
      </div>

    </div>
</template>

<script>

  import { Toast } from 'vant';
    export default {
        name: "ConfirmOrderCart",
      data(){
          return{
              shipping:{},
              orderInfs:[],
              totalPrice:0,
              ids:[],
              show:false,
              show1:false,
              orderNo:0,
              src:"",
              status:""

         }
      },
      mounted(){
       // this.updataProStatus();
        //this.getShippingFirst();
        this.getProIds();
        this.ids=this.$route.params.ids;
        this.getShippinginf();

      },
      created(){
        this.getshipid();
      },
      beforeDestroy(){
        clearInterval(this.timer);
      },
      methods:{
        getshipid(){
          this.ids=this.$route.params.ids
          //console.log(this.ids)
        },
        getProIds(){
          for (var i = 0;i<this.ids.length;i++){
            this.service.get("cart/updatestatus.do",{
              params:{
                productId:this.ids[i],
                checked:1
              }
            });
            this.service.get("cart/findcartproByid.do")
              .then(this.getorderinfs)
          }
        },
        getorderinfs(res){
          this.orderInfs = res.data.data.cartProductVOList;
          this.totalPrice = res.data.data.carttotalprice;
         // console.log(res.data.data)

        },

        onClickLeft() {
          this.$router.go(-1);
        },
        onClickRight() {
          console.log(this.$route.params.ids)

        },
        selectShipping(){
          this.$router.push(
            {
              name:'SelectShipping',
              params:{
                ids:this.ids,
              }
            });
        },
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
           // console.log(this.shipping);
          }
        },
        onSubmit(){
          this.service.get("order/create.do",{
            params:{
              shippingId:this.$route.params.shippingid
            }
          }).then(this.getorderinf);
          //console.log(this.orderNo);

          this.show=true;
        },
        getorderinf(resp){
          //console.log(resp.data.data);
          this.orderNo = resp.data.data.orderNo;
          console.log(this.orderNo);
        },
        showPopup() {
          this.service.get("order/pay",{
            params:{
              orderNo:this.orderNo
            }
          }).then(this.getpicture);
          this.show1 = true;
        },
        getpicture(res){
          console.log(res.data.data.qrcode);
          this.src =res.data.data.qrcode;
          // 设置定时器,询问服务器用户是否付款
          const  _this = this;
          this.timer = setInterval(function () {

            _this.service.get("order//query_order_pay_status.do",{
              params:{
                orderNo: _this.orderNo
              }
            })    //轮询此时的订单状态
              .then((res)=>{
               // console.log(res);
                _this.status = res.data.data;
              });
              console.log(_this.status);
          if (_this.status == true){                                //如果状态为true，则认为支付成功
                console.log(_this.status);
              console.log("已经支付");
            Toast.success('支付成功!');
              _this.$router.push({
                name:"OrderDetail",
                params:{
                  orderNo:_this.orderNo
                }

              });
              clearInterval(_this.timer);
            }else {
              console.log("还没支付，还没支付！");
            }

          },1000)

        },
        cancel(){
          this.$router.push(
            {
              name:'OrderDeteil',
              params:{
                ids:this.ids,
              }
            });
        }
      }
    }
</script>

<style scoped lang="less">
  .picture{
    height: 300px;
    width: 300px;
    background-color: #6190ef;
  }
  .picture>img{
    width: 100%;

  }
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
  .content{
    line-height: 80px;
    position: relative;
    padding-left: 60px;
    padding-bottom: 50px;
  }
.price{
    text-align: center;
  }
  .content > .picture{
    height:300px;
    width:300px;
    background-color: black;
    /*position: absolute;*/
    left: 100px;

  }
</style>
