<template>
  <div></div>
</template>

<script>
import { login, getLoginUserInfo, register, checkUserExist } from "@http/api";
export default {
  props:['id'],
  data() {
    return {};
  },
  mounted() {
    console.log(this.id);
    // this.testPromise().then(res=>{
    //   console.log(res)
    //   return this.testPromise()
    // }).then(res=>{
    //   console.log(res)
    // })

    this.testAsyncAwait();

    async function async1() {
      console.log("async1 start");
      await async2();
      console.log("async1 end");
    }

    async function async2() {
      console.log("async2");
    }

    console.log("script start");

    setTimeout(function () {
      console.log("setTimeout");
    }, 0);

    async1();

    new Promise(function (resolve) {
      console.log("promise1");
      resolve();
    }).then(function () {
      console.log("promise2");
    });

    console.log("script end");
  },
  methods: {
    testPromise() {
      return new Promise((resole, reject) => {
        let params = {
          userName: "mahd",
          password: "123456",
        };
        login(params).then((res) => {
          let { code, data } = res.data;
          if (code === 200) {
            resole(data);
          } else {
            reject();
          }
        });
      });
    },

    async testAsyncAwait() {
      let params = {
        userName: "mahd",
        password: "123456",
      };
      let login1 = await login(params);
      // console.log(login1.data.data[0].userName)
      let params1 = {
        userName: login1.data.data[0].userName,
        password: "123456",
      };
      let login2 = await login(params1);
      return login2;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>