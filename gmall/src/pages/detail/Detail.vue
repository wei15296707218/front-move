<template>
<div>

 <detail-banner :DetailInfo="DetailInfo"></detail-banner>
  <detail-header></detail-header>
  <div class="goods">
    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ DetailInfo.name }}</div>
        <div class="goods-price">￥{{DetailInfo.price}}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：{{ goods.express }}</van-col>
        <van-col span="14">剩余：{{DetailInfo.stock}}</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop-o" is-link @click="sorry">
        <template slot="title">
          <span class="van-cell-text">有赞的店</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location-o" is-link @click="sorry" />
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="查看商品详情" is-link @click="see" />
    </van-cell-group>

    <van-goods-action class="vga">
      <van-goods-action-icon icon="chat-o" @click="sorry">
        客服
      </van-goods-action-icon>
      <van-goods-action-icon icon="cart-o" @click="onClickCart">
        购物车
      </van-goods-action-icon>
      <van-goods-action-button type="warning" @click="addcart1">
        加入购物车
      </van-goods-action-button>
      <van-goods-action-button type="danger" @click="buy1">
        立即购买
      </van-goods-action-button>
    </van-goods-action>


  </div>
  <div>
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="DetailInfo"
      :goods-id="DetailInfo.id"
      :quota="quota"
      :style="{height:'30%'}"
      :hide-stock="sku.hide_stock"
      :message-config="messageConfig"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
      @stepper-change="getCount"
    />
    <!--:quota-used="quotaUsed"   已经购买过的数量,可以根据订单中该商品的数量来获得-->
  </div>

</div>
</template>

<script>
  import {mapActions} from 'vuex'
  import DetailBanner from './components/DetailBanner'
  import DetailHeader from './components/DetailHeader'
  /*import ConfirmOrder from './../order/ConfirmOrder'*/
  import {
    Tag,
    Col,
    Icon,
    Cell,
    CellGroup,
    Swipe,
    Toast,
    SwipeItem,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton
  } from 'vant';



    export default {
        name: "Detail",
        components:{DetailBanner,DetailHeader,[Tag.name]: Tag,
          [Col.name]: Col,
          [Icon.name]: Icon,
          [Cell.name]: Cell,
          [CellGroup.name]: CellGroup,
          [Swipe.name]: Swipe,
          [SwipeItem.name]: SwipeItem,
          [GoodsAction.name]: GoodsAction,
          [GoodsActionIcon.name]: GoodsActionIcon,
          [GoodsActionButton.name]: GoodsActionButton,

        },
      data (){
        return{
          DetailInfo:{},
          quota:5,
          deprice:0,
          show: false,
          count:0,
          sku: {
            // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
            // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
            tree: [
              {
                k: '颜色', // skuKeyName：规格类目名称
                v: [
                  {
                    id: '', // skuValueId：规格值 id
                    name: '红色', // skuValueName：规格值名称
                    imgUrl: '', // 规格类目图片，只有第一个规格类目可以定义图片
                    previewImgUrl: '', // 用于预览显示的规格类目图片
                  }/*,
                  {
                    id: '1215',
                    name: '蓝色',
                    imgUrl: 'https://img.yzcdn.cn/2.jpg',
                    previewImgUrl: 'https://img.yzcdn.cn/2p.jpg',
                  }*/
                ],

                k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
              },
            ],
            // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
            list: [
              {
                id: 2259, // skuId，下单时后端需要
                price: 100, // 价格（单位分）
                s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
               /* s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
                s3: '0', // 最多包含3个规格值，为0表示不存在该规格*/
                stock_num: 110 // 当前 sku 组合对应的库存
              }
            ],

            price: '8.00', // 默认价格（单位元）
            stock_num: 227, // 商品总库存
            collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
            none_sku: false, // 是否无规格商品
            messages: [
              {
                // 商品留言
                datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
                multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
                name: '留言', // 留言名称
                type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
                required: '0', // 是否必填 '1' 表示必填
                placeholder: '' // 可选值，占位文本
              }
            ],
            hide_stock: false // 是否隐藏剩余库存
          },
        /*  skuData: {
            // 商品 id
            goodsId: '946755',
            // 留言信息
            messages: {
              message_0: '12',
              message_1: ''
            },
            // 另一种格式的留言，key 不同
            cartMessages: {
              '留言1': 'xxxx'
            },
            // 选择的商品数量
            selectedNum: 1,
            // 选择的 sku 组合
            selectedSkuComb: {
              id: 2257,
              price: 100,
              s1: '30349',

              stock_num: 111
            }
          },*/
          goods:{},
         messageConfig: {
            // 图片上传回调，需要返回一个promise，promise正确执行的结果需要是一个图片url
            uploadImg: () => {
              return new Promise((resolve) => {
                setTimeout(() => resolve('https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg'), 1000);
              });
            },
            // 最大上传体积 (MB)
            uploadMaxSize: 3,
            // placeholder 配置
            placeholderMap: {
              text: 'xxx',
              tel: 'xxx',

            }
          }
        }
      },
        mounted() {
        this.getdetailInfo();
        this.isShowfootbar(false);


        },

        methods:{
          getCount(value){
          this.count = value
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
        getDetailsInfoRes(res){
            if(res.data.status==0 && res.data.data){


                this.DetailInfo=res.data.data;
             // console.log(this.DetailInfo);
              this.sku.price=res.data.data.price;
              this.sku.stock_num=res.data.data.stock;
              this.sku.tree[0].v[0].imgUrl='http://img.cdn.imbession.top/'+res.data.data.mainImage;
              this.sku.tree[0].v[0].previewImgUrl='http://img.cdn.imbession.top/'+res.data.data.mainImage;
              this.sku.tree[0].v[0].id=res.data.data.id;
              this.sku.list[0].s1=res.data.data.id;
              this.sku.list[0].price=res.data.data.price*100;
              this.sku.list[0].stock_num=res.data.data.stock;

            }
        },
        /*  productInf(){
              console.log(this.deprice);
            this.sku.price=1;
          },*/
          onClickCart() {
            this.$router.push('/cart');
          },
          addcart1() {
            this.show=!this.show;
            Toast('添加到购物车')
          },
          buy1() {
            this.show=!this.show;

          },
          see() {
            this.show=!this.show;
          },
          sorry(){
             Toast('暂未开发')
          },
          ...mapActions(['isShowfootbar']),
          onBuyClicked(){
            Toast('确认订单');
            this.$router.push({
              name:'ConfirmOrder',
              params:{
                id:this.DetailInfo.id,
                count:this.count
              }
            });
          },
          onAddCartClicked(){

            this.service.get("/cart/add",
           {
             params:{
               productId:this.$route.params.id,
               count:this.count
             }

            }).then(this.updataCart);
          },
          updataCart(resp){
            console.log(resp);
          }
      },
     /* mounted(){
          var _this = this
        _this.isShowfootbar(false);
      }*/
    }
</script>

<style scoped lang="less" >


  .goods {
    padding-bottom: 50px;
    height: 500px;
    &-swipe {
      img {
        width: 100%;
        display: block;
      }
    }
    &-title {
      font-size: 16px;
    }
    &-price {
      color: #f44;
    }
    &-express {
      color: #999;
      font-size: 12px;
      padding: 5px 15px;
    }
    &-cell-group {
      margin: 15px 0;
      .van-cell__value {
        color: #999;
      }
    }
    &-tag {
      margin-left: 5px;
    }
    .vga{
      z-index: 400;
    }
    .van-sku-actions{
      z-index: 999;
    }
  }
</style>
