<template>
  <div>
    <div><van-nav-bar
      title="选择收货地址"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    /></div>
<div>
  <van-address-list
    v-model="chosenAddressId"
    :list="list"
    @add="onAdd"
    @edit="onEdit"
    @click-item="toCreatOrder"

  />
</div>

  </div>
</template>

<script>
    export default {
        name: "SelectShipping",
      data(){
          return {

            chosenAddressId: '1',
            list: []
            ,
            ids:[],

          }
          },
      mounted(){
        this.getShippingList();
        this.ids=this.$route.params.ids;
      },
      methods:{
        getShippingList(){
          this.service.get("shipping/findShppingByUserId.do")
            .then(this.getShippinginf)
        },
        getShippinginf(res){
          console.log(res.data.data);

          for (let i=0;i<res.data.data.length;i++){
           let address=
              {
                id:"",
                name:"",
                tel:"",
                address:""
              };


            address.id=res.data.data[i].id;
            address.name=res.data.data[i].receiverName;
            address.tel=res.data.data[i].receiverPhone;
            address.address=res.data.data[i].receiverAddress;
            this.list.push(address);
          }

        },
        onAdd() {
          this.$router.push({
            name:'AddShipping',
            params:{
              ids:this.ids,
            }
          });
        },

        onEdit(item, index) {

        },
        onClickLeft() {
          this.$router.go(-1);
        },
        onClickRight() {
          console.log(this.ids)
        },
        toCreatOrder(item){
         // console.log(item);
       /*  this.$router.push({
            name:'ConfirmOrder',
            params:{
              shippingid: item.id,
              id:this.$route.params.id,
              count:this.$route.params.count
            }
          });*/
          this.$router.push({
            name:'ConfirmOrderCart',
            params:{
              shippingid: item.id,
              ids:this.ids,
            }
          });
        }
      }
      }

</script>

<style scoped>

</style>
