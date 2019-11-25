<template>
    <div>
      <div class="header-left"><span class="iconfont">&#xe676;</span></div>
      <div class="header-right">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          @search="onSearch"
          background="red"
        >
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </div>
      <div class="center">
      <div class="content-left">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item title="手机数码" @click="showPro"/>
          <van-sidebar-item title="尚未上架" @click="popo" />
          <van-sidebar-item title="......." />
          <van-sidebar-item title="" />
          <van-sidebar-item title="" />
          <van-sidebar-item title="" />
          <van-sidebar-item title="" />
          <van-sidebar-item title="" />
          <van-sidebar-item title="" />
        </van-sidebar>
      </div>

        <div v-show="show">
        <van-icon name="fire-o" >热销产品</van-icon>
        <van-row type="flex" justify="space-around">
          <van-col span="6"><img src="//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png">
            <div class="text">小米</div>
          </van-col>
          <van-col span="6"><img src="//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg">
            <div class="text">华为</div>
          </van-col>
          <van-col span="6"><img src="//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg">
            <div class="text">荣耀</div>
          </van-col>
        </van-row>
        <van-row type="flex" justify="space-around">
          <van-col span="6"><img src="//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg">
            <div class="text">iPhone</div>
          </van-col>
          <van-col span="6"><img src="//img11.360buyimg.com/focus/s140x140_jfs/t11014/359/2341377211/2777/1755c29c/5a169244Nff0179e0.png">
            <div class="text">vivo</div>
          </van-col>
          <van-col span="6"><img src="//img13.360buyimg.com/focus/s140x140_jfs/t13036/273/932026474/2570/a3517c7d/5a169254N4bbbd9fb.png">
            <div class="text">oppo</div>
          </van-col>
        </van-row>
        <van-row type="flex" justify="space-around">
          <van-col span="6"><img src="//img12.360buyimg.com/focus/s140x140_jfs/t15085/289/2395028996/2546/1e7e1f7b/5a9fa5e7Nc5cc0f6b.jpg">
            <div class="text">努比亚</div>
          </van-col>
          <van-col span="6"><img src="//img13.360buyimg.com/focus/s140x140_jfs/t11509/131/2348573811/3425/4f20fe6/5a16925aN8a6dfd03.png">
            <div class="text">三星</div>
          </van-col>
          <van-col span="6"><img src="//img13.360buyimg.com/focus/s140x140_jfs/t11209/71/2351231464/4158/fc0c415c/5a16923fNfc14307e.jpg">
            <div class="text">一加</div>
          </van-col>
        </van-row>
        <van-icon name="graphic" >手机通讯</van-icon>
        <van-row type="flex" justify="space-around">
          <van-col span="6"><img src="//img12.360buyimg.com/focus/s140x140_jfs/t11461/339/2354953633/8254/8c8c50d3/5a169217N5d1b842e.jpg">
            <div class="text">老人机</div>
          </van-col>
          <van-col span="6"><img src="//img10.360buyimg.com/focus/s140x140_jfs/t11503/241/2246064496/4783/cea2850e/5a169216N0701c7f1.jpg">
            <div class="text">手机</div>
          </van-col>
          <van-col span="6"><img src="//img30.360buyimg.com/focus/s140x140_jfs/t18955/187/1309277884/11517/fe100782/5ac48d27N3f5bb821.jpg">
            <div class="text">全面屏手机</div>
          </van-col>
        </van-row>
        <van-row type="flex" justify="space-around">
          <van-col span="6"><img src="//img11.360buyimg.com/focus/s140x140_jfs/t11470/45/2362968077/2689/fb36d9a0/5a169238Nc8f0882b.jpg">
            <div class="text">游戏手机</div>
          </van-col>
          <van-col span="6">
            <div class="text"></div>
          </van-col>
          <van-col span="6">
            <div class="text"></div>
          </van-col>
        </van-row>
        </div>
      </div>

    </div>
</template>

<script>
  import {Toast} from 'vant';
    export default {
        name: "Classify",
      data(){
          return{
              value:"",
              activeKey:0,
              show:true,

          };
      },
      methods:{
        onSearch:function () {
          Toast('暂无后续逻辑~');
        },
        popo(){
          this.activeKey=1;
          this.show=false;
          Toast('敬请期待...');
        },

        showPro(){
          this.activeKey=0;
          this.show=true;

        }
      }

    }
</script>

<style scoped lang="less">
    .header-left{
      width:30px;
      height:54px;
      float: left;
      background-color: red;
      color:white;
      padding-top:0px;
      position: relative;
    }
    .header-left>.iconfont{
      font-size: .5rem;
      position: absolute;
      left: 5px;
      top:14px;
    }
    .content-left>.van-sidebar{
      float: left;
    }
    .content-left> .content-right{
      float: right;
    }
 .center{
   position: relative;
 }
    .van-icon{
      margin-top: 23px;
      font-size: 16px;
      font-weight: bold;
    }
    .van-row--flex{
      margin-top: 20px;
    }
img{
  height: 70px;
  width: 70px;
}
.text{
  text-align: center;
}

</style>
