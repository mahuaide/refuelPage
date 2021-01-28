<template>
  <div>
      <keep-alive>
          <child v-if="flag"></child>
      </keep-alive>
      <el-button type="primary" @click="flag = !flag">子组件</el-button>
  </div>
</template>

<script>
import child from '@/components/lifeCycle/child'
export default {
    data() {
        return {
            flag:false
        }
    },
    components: {
        child,
    },
    beforeCreate () {
        console.log("father-beforeCreate");
    },
    created () {
        console.log("father-created");
    },
    beforeMount () {
       console.log("father-beforeMount");
    },
    mounted () {
        console.log("father-mounted");
    },
    beforeUpdate () {
        console.log("father-beforeUpdate");
    },
    updated () {
        console.log("father-updated");
    },
    beforeDestroy() {
       console.log("father-beforeDestroy"); 
    },
    destroyed () {
        console.log("father-destroyed"); 
    },
};
</script>

<style lang="scss" scoped>
</style>