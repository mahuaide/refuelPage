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
  #app {
    height: 100%;
  }
</style>
