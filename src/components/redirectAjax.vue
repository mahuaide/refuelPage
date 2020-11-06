<template>
  <div></div>
</template>

<script>
import {
    redirectAjax
} from "@http/api.js";
export default {
  mounted() {
      window.location.href = redirectAjax;
  },
};
</script>

<style lang="scss" scoped>
</style>