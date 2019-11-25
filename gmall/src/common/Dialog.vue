<template>
<div>

  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

    <van-list
      v-model="loading"
      :offset="300"
      :finished="finished"
      @load="onLoad"
    >

      <div class="blancetransation-alldetail-items" v-for='(item,index) in userblansedatalist'>

        <div  class="blancetransation-alldetail-items-left">

          <div class="blancetr transaclianbei1" v-if="item.status">收</div>

          <div class="blancetr transaclianbei2" v-else>支</div>

          <div class="blance-center-div">

            <p class="blancetransation-expenditure">{{item.desc}}</p>

            <p class="blancetransation-time">{{item.time}}</p>

          </div>
        </div>
        <div class="blancetransation-alldetail-items-right">
          <p class="blancetransation-amount">
            <span v-if="item.status" style="color:#F74C4C">+{{item.amount}}元</span>
            <span v-else style="color:#7CAAFF">-{{item.amount}}元</span>

          </p>

        </div>

      </div>

    </van-list>

  </van-pull-refresh>


</div>
</template>

<script>
    export default {
        name: "Dialog",
      data() {
        return {
          list: [],
          loading:false,
          isLoading: false,
          finished: false,
          blancecurrengpage:0,
          userblansedatalist:[],
          userblansedata:{}




        }
      },
            methods:{
          onLoad() {

            // 异步更新数据

            setTimeout(() => {

              this.getblancedetail();

              // 加载状态结束

              this.loading = false;

            }, 500);

          },

          onRefresh (){

            this.blancecurrengpage = 0;

            // this.pages = 1

            this.userblansedatalist = [];

            // this.sendRequstForBuy()

            setTimeout(() => {

              this.userblansedatalist = [];

              this.isLoading = false;

              this.getblancedetail()

            }, 300)

          },
              getblancedetail(){
              if (this.blancecurrengpage!=0 && this.blancecurrengpage*7>=this.userblansedata.listCount) {
                return
              }
              this.blancecurrengpage = this.blancecurrengpage + 1;

              this.service.get("order/list.do", {
                params:{
                  "pageNum":this.blancecurrengpage,
                  "pageSize":7
                }
              }).then(respond => {
                  console.log(respond);
                 if (respond.status === 200) {
                    if (respond.data.status == 0) {
                      this.userblansedata = respond.data.data
                      // this.userblansedatalist = respond.data.result.detailList

                      this.userblansedatalist = this.userblansedatalist.concat(respond.data.data.list)
                      console.log(this.userblansedatalist)

                      // 数据全部加载完成  停止懒加载
                      console.log(this.userblansedata.listCount)
                      if (this.blancecurrengpage*7>=this.userblansedata.listCount) {
                        this.finished = true;
                        console.log('加载完成')
                      }

                    } else {
                      console.log(respond.data.message)
                      this.finished = true;
                    }
                  }else{
                    console.log(respond.code)
                    this.finished = true;
                  }

                }
              )

            }
        }

    }
</script>

<style scoped>

</style>
