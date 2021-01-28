<template>
  <div>
    {{ name }}
    <children1 
      :say-hello="sayHellow1"
      :grandSonName="grandSonName"
      :grandAge="grandAge"
      @hello1="child1Hello"
    ></children1>
     <children2 
      :say-hello="sayHellow2"
      @hello2="child2Hello"
    ></children2>
  </div>
</template>

<script>
import children1 from "@/components/communication/children1";
import children2 from "@/components/communication/children2";
export default {
  provide(){
    return {
      base:this
    }
  },
  data() {
    return {
      name: "我是父组件",
      sayHellow1: "你好，父组件,我是子组件1",
      sayHellow2: "你好，父组件,我是子组件2",
      grandSonName:"chenyu",
      grandAge:4
    };
  },
  components: {
    children1,
    children2
  },
  mounted () {
  },
  methods: {
    child1Hello(text){
      console.log(text)
      this.sayHellow2 = text;
    },
    child2Hello(text){
      console.log(text)
      this.sayHellow1 = text;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>