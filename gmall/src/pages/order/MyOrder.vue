<template>
    <div>
      <div>
      <mt-header title="个人订单">
        <router-link to="/my" slot="left">
          <mt-button icon="back" @click="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
      <div id="corder_loadmore" ref="wrapper" :style="{height:this.wrapperHeight+'px'}">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="autoFill">

          <div class="content" v-for="(item,index) in orderlist">
            <div class="line"></div>
          <div class="cont-header" ><span class="orderNo">订单号:{{item.orderNo}}</span><span class="status">订单状态:11111{{item.status}}</span></div>
          <router-link tag="div" :to="'/orderDetail/'+item.orderNo"   class="item border-bottom" v-for="(item1,index) in item.orderItemVoList " :key="index">
            <img class="item-img" :src="'http://img.cdn.imbession.top/'+item1.productImage"/>
            <div class="item-info">
              <p class="item-title">{{item1.productName}}</p>
              <span class="item-count">共{{item1.quantity}}件商品</span><span class="item-price">合计:￥{{item1.totalPrice}}</span>
            </div>
          </router-link>
          <div class="foot-butt">
            <van-button size="small" round @click="alert1">取消订单</van-button>
            <van-button size="small" round>查看物流</van-button>
          </div>
          </div>
        </mt-loadmore>

            </div>

      </div>

</template>

<script>
  import {mapActions} from 'vuex'
  import { Toast } from 'mint-ui';
    export default {
      name: "MyOrder",
      data() {
        return {
          orderlist: [],
          orderItemlist: [],
          active: 1,
          selected: "1",
          allLoaded: false,
          pageModel: {},
          autoFill: true,
          wrapperHeight: 0,

        }
      },
      computed: {
        orderList: function () {
          return this.pageModel.list
        }
      },
      watch: {
        selected: function (newval, oldval) {
          console.log("=====newval====" + newval);
          this.getMyOrderList('refresh', 1, 10);
          var loadme = document.getElementById('order_loadmore');
          loadme.scrollTop = 0
        }
      },
      created() {
        this.isShowfootbar(false);
        var _this = this;

        window.onscroll = function () {
          //scrolltop滚动条距离顶部的距离
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          //windowHeight可视区的高度
          var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
          //scrollHeight滚动条的总高度
          var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
          //滚动条到底部的条件
          if ((scrollTop + windowHeight + 60) >= scrollHeight) {
            //写后台加载的数据
            //console.log("距离顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
            _this.isShowfootbar(false);
          } else {
            _this.isShowfootbar(true);
          }
        }
      },
      mounted() {
        this.getMyOrderList('refresh', 1, 10);
        this.wrapperHeight = document.documentElement.clientHeight -
          this.$refs.wrapper.getBoundingClientRect().top;
        console.log(this.wrapperHeight);
        Toast("高度=" + this.wrapperHeight);
        this.isShowfootbar(false);
        this.getMyOrderList();
      },
      methods: {
        alert1(){
          alert(11)
        },
        ...mapActions(['isShowfootbar']),
        loadTop: function () {
          this.getMyOrderList('refresh', 1, 1)
        },
        loadBottom: function () {
          //加载更多数据
          console.log("加载更多");
          console.log(this.pageModel.pageNum);
          if (this.pageModel.hasNextPage) {
            this.getMyOrderList("loadmore", this.pageModel.pageNum + 1, 10)
          } else {
            this.allLoaded = true;
            this.$refs.loadmore.onBottomLoaded();
          }
        },
        getMyOrderList: function (optype, pageNo, pageSize) {
          var _this = this;
          this.service.get("order/list.do", {
            "pageNum": pageNo,
            "pageSize": pageSize
          }).then(function (res) {
            _this.orderlist = res.data.data.list;
            for (let i =0;i<res.data.data.list.length;i++){
              _this.orderItemlist = res.data.data.list[i].orderItemVoList
            }
            /*_this.orderItemlist = res.data.data.list*/
            console.log(res.data.data);
            console.log(res.data.data.list[0]);
            if (optype == 'refresh') {
              _this.pageModel = res.data.data;
              _this.$refs.loadmore.onTopLoaded();
              _this.allLoaded = false
            } else if (optype == 'loadmore') {
              if (res.data.data.list.length > 0) {
                const oldOrders = _this.pageModel.list;
                console.log("-----旧数据-----");
                console.log(oldOrders);
                var orderItem;

                var newArrayOrder = oldOrders.concat(res.data.data.list)
                res.data.data.list = newArrayOrder
                console.log("-----新数据-----");
                console.log(newArrayOrder);
              } else {
                //加载完成
                _this.allLoaded = true;//如数据已全部获取完毕
              }
              _this.pageModel = res.data.data
              console.log("-----loadmore-----");
              console.log(_this.pageModel.list);
              _this.$refs.loadmore.onBottomLoaded();
            }

          }).catch(function (err) {
            console.log(err)
          })
        },
        getorderDesc(order) {
          if (order.status == 10) {
            return "去支付"
          }
        },
      back: function () {
        this.$router.go(-1);
      }
      },
    }
</script>

<style scoped lang="less">

  .content{
padding-top: 20px;
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
    min-width :0;
    position: relative;
  }
  .item>.item-info> .item-title{
    line-height:.54rem;
    font-size :.30rem;
    overflow :hidden;
    white-space :nowrap;
    text-overflow:ellipsis

  }
  .item>.item-info> .item-desc{
    line-height:.5rem;
    font-size :.22rem;
    overflow :hidden;
    white-space :nowrap;
    text-overflow:ellipsis

  }
  .item>.item-info>.item-price{
     color: #ff261e;
      float: right;
      position: absolute;
      bottom:10px;
      right:12px
   }
  .item>.item-info>.item-count{
      position: absolute;
      bottom:10px;
    right:120px
  }
  .van-cell__value--alone{
    text-align: right;
  }
  .cont-header{
    position: relative;
  }
  .cont-header>.status{

    position: absolute;
    right: 12px;
  }

.content>.foot-butt>.van-button{
  float: right;

}
  .line{
    height:20px
  }
</style>
