<template>
    <div>
      <div>
        <van-nav-bar
          title="注册"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"

        /><!--@click-right="onClickRight"-->
      </div>
      <div>
        <van-cell-group>
          <van-field
            v-model="username"
            required
            clearable
            label="用户名"
            right-icon="question-o"
            placeholder="请输入用户名"
            @click-right-icon="$toast('question')"
          />

          <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
          />
          <van-field
            v-model="email"
            type="textarea"
            label="邮箱"
            placeholder="请输入邮箱"
            required
          />
          <van-field
            v-model="phone"
            type="tel"
            label="手机号"
            placeholder="请输入手机号"
            required
          />
          <van-field
            v-model="question"
            type="textarea"
            label="密保问题"
            placeholder="请输入密保问题"
            required
          />
          <van-field
            v-model="answer"
            type="textarea"
            label="密保答案"
            placeholder="请输入密保答案"
            required
          />
        </van-cell-group>
      </div>
      <div>
        <van-button round type="info" size="large" @click="register">注册</van-button>
      </div>
    </div>
</template>

<script>
  import { Toast } from 'vant';
    export default {
        name: "Register",
      data(){
        return{
          username:"",
          password:"",
          email:"",
          phone:"",
          question:"",
          answer:"",
        }


      },
      methods:{
        register(){
        this.service.get("/user/register.do",{
          params:{
            username:this.username,
            password:this.password,
            email:this.email,
            phone:this.phone,
            question:this.question,
            answer:this.answer
          }
        }).then(this.getRegister)
        },
        getRegister(res){
          console.log(res);
          if (res.data.status===0){
            Toast("注册成功!");
            this.$router.push("Login")
          } else if(res.data.status===2){
            Toast("用户名已存在!");
          }else if(res.data.status===3){
            Toast("邮箱已存在!");
          }
        },
        onClickLeft(){
          this.$router.go(-1);
        }
      }
    }
</script>

<style scoped>

</style>
