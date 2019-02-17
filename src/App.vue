<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {getLoginUserInfo} from '@http/api';
  import * as types from './store/type'
  export default {
    name: 'App',
    mounted(){
      getLoginUserInfo().then(res => {
        let {code, data, errMsg} = res.data;
        if (code == 200) {
          this.$store.commit(types.LOGIN, data);
        }
      })
    },
  }
</script>
<style>
  html, body {
    margin: 0;
    padding: 0;
  }
</style>
