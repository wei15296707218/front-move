
new Vue({
    el:'#app',
    data:{
        title:"232",
        productList:[],
        totalMoney:0,
        checkAllFlag:false
    },
    mounted(){
        this.cartView()
    },
    methods:{
        cartView:function () {
        this.$http.get("data/cartData.json").then(function (res) {
            this.totalMoney=res.data.result.totalMoney
            this.productList=res.data.result.list
            console.log(res.data.result)
        })
       },
        changeMoney:function (product,flag) {
            if (flag>0){
                product.productQuantity++;
            }else{
                product.productQuantity--;
                if (product.productQuantity<1){
                    product.productQuantity=1;
                }
            }
        },
        selectProduct:function (product) {
            if (typeof product.check=="undefined"){  //商品没有check属性
                this.$set(product,"check",true)
            }else{
                product.check=!product.check;
            }

        },
        clickAll:function (flag) {
            this.checkAllFlag=flag;
            var _this=this;
            this.productList.forEach(function (product,index) {
                if (typeof product.check=="undefined"){  //商品没有check属性
                    _this.$set(product,"check",_this.checkAllFlag)
                }else{
                    product.check=_this.checkAllFlag
                }
            })

        }

    },
    //局部过滤器
    filters:{
        formatMoney:function (value,type) {
            return "￥"+value.toFixed(2)+type; //fixed代表四舍五入
        }
    }
})
// Vue.filter("formatMoney",function (value,type) {
//     return "￥"+value.toFixed(2)+type;
// })