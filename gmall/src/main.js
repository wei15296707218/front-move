// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//import App from './App'
import navbar from '@/pages/navbar'
//import Home from '@/pages/home/Home'
import router from './router'
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont.css'
import fastClick from 'fastclick'
fastClick.attach(document.body)
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.config.productionTip = false
Vue.use(MintUI)
import Vuex from 'vuex'
Vue.use(Vuex)
import Vant from 'vant';
import 'vant/lib/index.css';
import { Sku } from 'vant';

Vue.use(Sku);
Vue.use(Vant);
import  axios from 'axios'
/* eslint-disable no-new */
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)

var service=axios.create({

 // baseURL:"http://121.36.11.232:8080",
 baseURL:"http://localhost:8080",
  // 请求预处理函数 可以把你传的param进行处理
  withCredentials: true, // 允许携带cookie
  transformRequest: [
    data => {
      // data 就是你post请求传的值
      // 一下主要是吧数据拼接成 类似get格式
      let params = '';
      for (var index in data) {
        params += index + '=' + data[index] + '&'
      }
      return params
    }
  ]

});
Vue.prototype.service=service;

import {store} from './store/index'
new Vue({
  el: '#app',
  router,//开启路由
  store,
  components: { navbar },
  template: '<navbar/>'
});
