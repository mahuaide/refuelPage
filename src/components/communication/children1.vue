<template>
  <div>
      {{sayHello}}
      <el-button type="primary" @click="hello">按钮</el-button>
      <grandson12 v-bind="$attrs"></grandson12>
  </div>
</template>

<script>
import grandson12 from '@/components/communication/grandson12'
export default {
  inheritAttrs: false,
  props: {
    sayHello: {
      type: String,
      default: "",
    },
  },
  methods: {
    hello(){
      this.$emit("hello1","你好组件2")
    },
    sonCall(){
      alert("叫你爸干嘛")
    }
  },
  components: {
    grandson12,
  },
};
</script>

<style lang="scss" scoped>
</style>