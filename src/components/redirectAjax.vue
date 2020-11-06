<template>
  <div></div>
</template>

<script>
import {
    redirectAjax
} from "@http/api.js";
export default {
  mounted() {
      redirectAjax().then(res=>{
          
      })
  },
};
</script>

<style lang="scss" scoped>
</style>