import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Product from '@/pages/product/Product'
import Detail from '@/pages/detail/Detail'
import navbar from '@/pages/navbar'
import main from '@/pages/main'
import My from '@/pages/my/My'
import SetInfo from '@/pages/my/SetInfo'
import MyInfo from '@/pages/my/MyInfo'
import Login from '@/pages/my/Login'
import Register from '@/pages/my/Register'

import MyOrder from '@/pages/order/MyOrder'
import ConfirmOrder from '@/pages/order/ConfirmOrder'
import SelectShipping from '@/pages/order/SelectShipping'
import IndSelectShipping from '@/pages/order/IndSelectShipping'

import AddShipping from '@/pages/order/AddShipping'
import ConfirmOrderCart from '@/pages/order/ConfirmOrderCart'
// import payment from '@/pages/order/payment'

import OrderDetail from '@/pages/order/OrderDetail'
import Cart from '@/pages/cart/Cart'
import Classify from '@/pages/classify/Classify'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',///home/:id
      name: 'Home',
      component: Home
    },
    {
      path: '/list',
      name: 'Product',
      component: Product
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/',
      redirect:'/home',
      name: 'navbar',
      component: navbar
    },
    {
      path: '/my',
      name: 'My',
      component: My
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/main',
      name: 'main',
      component: main
    },
    {
      path: '/myInfo',
      name: 'MyInfo',
      component: MyInfo
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/myOrder',
      name: 'MyOrder',
      component: MyOrder
    },
    {
      path: '/classify',
      name: 'Classify',
      component: Classify
    },
    {
      path: '/orderDetail/:orderNo',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/confirmOrder',
      name: 'ConfirmOrder',
      component: ConfirmOrder
    },
    {
      path: '/selectShipping',
      name: 'SelectShipping',
      component: SelectShipping
    },
    {
      path: '/indSelectShipping',
      name: 'IndSelectShipping',
      component: IndSelectShipping
    },
    {
      path: '/addShipping',
      name: 'AddShipping',
      component: AddShipping
    },
    {
      path: '/confirmOrderCart',
      name: 'ConfirmOrderCart',
      component: ConfirmOrderCart
    },
    /*{
      path: '/payment',
      name: 'payment',
      component: payment
    },*/
    {
      path: '/dialog',
      name: 'Dialog',
      component: () => import('../common/Dialog.vue')
    },
    {
      path: '/setInfo',
      name: 'SetInfo',
      component: SetInfo
    }
  ]
})
