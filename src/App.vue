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
    
    },
  }
</script>
<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  #app {
    height: 100%;
  }
</style>
