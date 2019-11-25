<template>
  <div>
    <div>
      <van-nav-bar
        title="购物车"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div class="cartContent">
      <van-checkbox-group class="card-goods" v-model="checkedGoods">
        <van-checkbox
          class="card-goods__item"
          v-for="item in cartProductInfoList"
          :key="item.productId"
          :name="item.productId"
          @click="HandlerClick"
        >
          <van-card
            :title="item.productName"
            :num="item.quantity"
            :price="formatPrice(item.productPrice)*100"
            :thumb="'http://img.cdn.imbession.top/'+item.productMainImage"
          ></van-card>
          <div>总价:{{formatPrice(item.productPrice)*100*item.quantity}}</div>
        </van-checkbox>
      </van-checkbox-group>

      <div class="footer">
      <van-submit-bar
        :price="totalPrice*100"
        :disabled="!checkedGoods.length"
        :button-text="submitBarText"
        @submit="onSubmit"
      >
       <!-- <van-checkbox v-model="checked">全选</van-checkbox>-->

      </van-submit-bar></div>
    </div>
  </div>


</template>

<script>
  import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from 'vant';


    export default {
      name: "Cart",
      components: {
        [Card.name]: Card,
        [Checkbox.name]: Checkbox,
        [SubmitBar.name]: SubmitBar,
        [CheckboxGroup.name]: CheckboxGroup
      },
      data() {
        return {
          cartProductInfoList:[],
          checkedGoods: [],
          cartProducts:[],

        };
      },

      computed: {
        submitBarText() {
          const count = this.checkedGoods.length;
          return '结算' + (count ? `(${count})` : '');
        },
        totalPrice() {
          return this.cartProductInfoList.reduce((total, item) => total + (this.checkedGoods.indexOf(item.productId) !== -1 ? item.productPrice*item.quantity : 0), 0);
        }
      },
      mounted(){

        this.getCartList();
      //  this.getCartProducts();

      },
      methods: {
        HandlerClick(){
          this.check=! this.check

        },
        getCartList(){
          this.service.get("/cart/list.do",)
            .then(this.getCartInfoRes);
        },
        getCartInfoRes(res){
          if(res.data.status==0 && res.data.data){
            console.log(res.data.data);
            this.cartProductInfoList=res.data.data.cartProductVOList
          }
        },
        formatPrice(price) {
          return (price / 100).toFixed(2);
        },
       /* onSubmit() {
         this.$router.push({
            name:'ConfirmOrderCart',
            params:{
              ids:this.checkedGoods,
            }
          });
        },*/
        onSubmit() {
          this.$router.push({
            name:'SelectShipping',
            params:{
              ids:this.checkedGoods,
            }
          });
        },
        onClickLeft() {
          this.$router.go(-1);
        },
        onClickRight() {
          Toast('按钮');
        },
        /*
        //1.商品栏点击事件更新数据库中的选中状态
        //2.获取选中状态商品的信息集合
        getCartProducts(){


        }*/
      }
    }
</script>

<style scoped lang="less" >
  .card-goods {
    padding: 10px 0;
    background-color: #fff;
    &__item {
      position: relative;
      background-color: #fafafa;
      .van-checkbox__label {
        width: 100%;
        height: auto; // temp
        padding: 0 10px 0 15px;
        box-sizing: border-box;
      }
      .van-checkbox__icon {
        top: 50%;
        left: 10px;
        z-index: 1;
        position: absolute;
        margin-top: -10px;
      }
      .van-card__price {
        color: #f44;
      }
    }
  }

  .van-submit-bar{
    bottom:50px;

  }
</style>
