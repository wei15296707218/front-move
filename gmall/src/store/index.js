import Vue from 'Vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

//vue全局注册
Vue.use(Vuex)

 const state={
    userInfo:{},
   isShowfootbar:true,
   car:[]//将购物车中的商品数据用数组存储起来,在car数组中,存储一些商品对象,格式为:商品描述,购买的数量,单价,选择的状态,


}


 export const store=new Vuex.Store({

  state,
  actions,
  getters,
  mutations

})
