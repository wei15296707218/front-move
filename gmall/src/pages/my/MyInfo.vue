<template>
    <div>
      <mt-header title="用户中心">
        <router-link to="/my" slot="left">
          <mt-button icon="back" @click="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>

      <mt-field label="用户名" v-model="this.getUser.username" :readonly="readonly"></mt-field>
      <mt-field label="邮箱"  type="email" v-model="this.getUser.email" :readonly="readonly"></mt-field>
      <mt-field label="手机号"  type="tel" v-model="this.getUser.phone" :readonly="readonly"></mt-field>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
    export default {
        name: "MyInfo",
      data (){
        return {
          readonly:true
        }
      },
      methods:{
        back:function () {
          this.$router.go(-1);
        }
      },
      computed:{
          ...mapGetters(['getUser'])
      }
    }
</script>

<style scoped>

</style>
