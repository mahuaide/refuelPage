<template>
  <div>123</div>
</template>

<script>
export default {
    beforeCreate () {
        console.log("child-beforeCreate");
    },
    created () {
        console.log("child-created");
    },
    beforeMount () {
       console.log("child-beforeMount");
    },
    mounted () {
        console.log("child-mounted");
    },
    beforeUpdate () {
        console.log("child-beforeUpdate");
    },
    updated () {
        console.log("child-updated");
    },
    beforeDestroy() {
       console.log("child-beforeDestroy"); 
    },
    destroyed () {
        console.log("child-destroyed"); 
    },
    activated () {
        console.log("child-activated"); 
    },
    deactivated () {
        console.log("child-deactivated"); 
    },
};
</script>

<style lang="scss" scoped>
</style>