<template>
  <div>
    {{ sayHello }}
    <el-button type="primary" @click="hello">按钮</el-button>
  </div>
</template>

<script>
export default {
  props: {
    sayHello: {
      type: String,
      default: "",
    },
  },
  methods: {
    hello() {
      this.$emit("hello2", "你好组件1");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>