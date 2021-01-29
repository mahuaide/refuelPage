<template>
  <div></div>
</template>

<script>
import {login, getLoginUserInfo,register,checkUserExist} from '@http/api';
export default {
  data() {
    return {
    }
  },
  mounted () {
    // this.testPromise().then(res=>{
    //   console.log(res)
    //   return this.testPromise()
    // }).then(res=>{
    //   console.log(res)
    // })

    this.testAsyncAwait()
  },
  methods: {
    testPromise(){
      return new Promise((resole,reject)=>{
        let params = {
          userName:"mahd",
          password:"123456"
        }
        login(params).then(res=>{
          let {code,data} = res.data;
          if(code === 200){
            resole(data);
          }else{
            reject();
          }
        })
      })
    },

    async testAsyncAwait(){
      let params = {
          userName:"mahd",
          password:"123456"
      }
      let login1 = await login(params);
      // console.log(login1.data.data[0].userName)
      let params1 = {
        userName:login1.data.data[0].userName,
        password:"123456"
      }
      let login2 = await login(params1);
      return login2;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>