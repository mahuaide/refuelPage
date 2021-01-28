<template>
  <div>
    孙子姓名($attrs)
    {{ $attrs.grandSonName }}<br />
    孙子姓名(provide/inject)
    {{ base.grandSonName }}<br />
    孙子年龄($attrs)
    {{ $attrs.grandAge }}<br />
    孙子年龄(provide/inject)
    {{ base.grandAge }}<br />
    <el-button type="primary" @click="clickParent">叫爸爸</el-button>
  </div>
</template>

<script>
export default {
  inject: ["base"],
  data() {
    return {};
  },
  mounted() {
    console.log(this.$parent);
  },
  methods: {
    clickParent() {
      this.$parent.sonCall();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>