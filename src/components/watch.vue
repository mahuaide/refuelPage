<template>
  <div>
    <el-input v-model="obj.a" placeholder="" size="normal"></el-input>
    <el-input v-model="obj.b" placeholder="" size="normal"></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      obj: {
        a: "",
        b: "",
      },
    };
  },
  watch: {
    obj: {
      handler: function(n,o) {
        console.log(JSON.stringify(n));
      },
      deep:true,
      immediate:true
    },
  },
};
</script>

<style lang="scss" scoped>
</style>