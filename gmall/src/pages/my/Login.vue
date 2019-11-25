<template>
    <div>
      <mt-header title="用户登录">
        <router-link to="/my" slot="left">
          <mt-button icon="back" @click="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>

      <mt-field label="用户名" placeholder="请输入用户名" name="username" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" name="password" type="password" v-model="password"></mt-field>

      <van-button round type="info" size="large" @click="login" color="linear-gradient(to right, #4bb0ff, #6149f6)">登录</van-button>
      <van-cell  >
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <span @click="forgetPass">忘记密码?</span><span >----------------------------------</span>
        <span @click="register"> 还没有账号?快速注册--></span>

      </van-cell>
    </div>
</template>

<script>

  import {mapActions} from 'vuex'
  import { Toast } from 'vant';
    export default {
        name: "Login",
      data (){
          return{
              username:"",
              password: ""
          }
      },
      methods:{
          ...mapActions(['setUserInfo']),
          login:function () {
            var _this = this;
            this.service.post("user/login",{
              "username":this.username,
              "password":this.password
            }).then(function (res) {
              console.log(res);

              if(res.data.status==0){
                //登陆成功 //登录成功后将用户信息保存到vuex中
                  _this.setUserInfo(res.data.data);
                _this.$router.push("My")//登陆成功后跳转到上一层
              }
            }).catch(function (err) {
              console.log(err)
            })
          },
        back:function () {
          this.$router.go(-1);
        },
        forgetPass(){
            Toast("忘记密码")
        },
        register(){
            Toast("注册!");
            this.$router.push('Register');

        }
      }
    }
</script>

<style scoped>

</style>
