<template>
    <div>

      <!--{{this.getUser}}-->
      <div>
        <van-nav-bar
          title="我的"
          left-text="返回"
          right-text="设置"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        />
      </div>

      <div>
        <div class="head">
          <van-cell > <van-image
            round
            width="70px"
            height="70px"
            src="https://img.yzcdn.cn/vant/cat.jpeg"

          /></van-cell>
        </div>
        <div class="username"><van-button round type="info"  size="small" @click="logic">{{optext}}</van-button></div>

        <van-row class="user-links">
          <van-col span="6">
            <van-icon name="pending-payment" />
            待付款
          </van-col>
          <van-col span="6">
            <van-icon name="records" />
            已收货
          </van-col>
          <van-col span="6">
            <van-icon name="tosend" />
            待发货
          </van-col>
          <van-col span="6">
            <van-icon name="logistics" />
            已发货
          </van-col>
        </van-row>

        <van-cell-group class="user-group">
          <van-cell icon="records" title="全部订单" is-link   @click="handlerclick"/>
        </van-cell-group>

        <van-cell-group>
          <van-cell icon="points" title="地址管理" is-link @click="toSelectShip" />
          <van-cell icon="gold-coin-o" title="功能反馈" is-link />
          <van-cell icon="gift-o" title="关于GMall" is-link />
        </van-cell-group>
      </div>
      <div class="foot">
        <van-button v-show="show" type="primary" size="large" color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="offLogin">退出登录</van-button>
      </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import { Row, Col, Icon, Cell, CellGroup } from 'vant';
  import { Toast } from 'vant';
    export default {
        name: "My",
      components: {
        [Row.name]: Row,
        [Col.name]: Col,
        [Icon.name]: Icon,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup
      },
        data (){
          return{
            optext:"请登录",
            isLogin:false,
            show:false
          }
        },
        methods:{

          toSelectShip(){
            this.$router.push({
              name:'IndSelectShipping'
            })
          },
          logic:function () {
            if (this.isLogin){
              //已经登录,查看信息
              this.$router.push("/myInfo")
            }else{
              //去登陆
              this.$router.push("/login")
            }


          },
          handlerclick:function () {
            this.$router.push("/myOrder")
          },
          onClickLeft(){
            this.$router.go(-1);
          },
          onClickRight(){
            this.$router.push({
              name:'SetInfo'

            })
          },
          offLogin(){
            this.service.get("user//logout.do").then(this.offlogin)
          },
          offlogin(res){
              console.log(res.data);
            if (res.data.data===0){
              Toast.success('退出成功');
              this.show=false;
              this.$router.push({
                name:"/"
              })
            }
          }
        },
      computed:{
          ...mapGetters(['getUser'])
      },
      mounted(){
          if (JSON.stringify(this.getUser)=='{}'){
            this.optext="请登录";
            this.isLogin=false
            console.log(this.getUser)
          }else {
            this.optext="个人信息";
            this.isLogin=true;
            this.show=true;
          }

      },




    }
</script>

<style scoped lang="less">
  .user {
  &-poster {
     width: 100%;
     height: 53vw;
     display: block;
   }
  &-group {
     margin-bottom: 15px;
   }
  &-links {
     padding: 15px 0;
     font-size: 12px;
     text-align: center;
     background-color: #fff;
  .van-icon {
    display: block;
    font-size: 24px;
  }
  }
  }

  .content>.username{
    position: absolute;
    top:180px;
    left:170px;
    font-size: 22px;
  }
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
