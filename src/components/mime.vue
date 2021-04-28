<template>
  <div>
   {{map}}
  </div>
</template>

<script>
const mime = require("mime");
export default {
  data() {
    return {
      map:""
    };
  },
  mounted() {
    let map = new Map();
    map.set("txt",mime.getType("txt")); 
    map.set("jar",mime.getType("jar")); 
    map.set("zip",mime.getType("zip")); 
    map.set("war",mime.getType("war")); 
    map.set("rar",mime.getType("rar")); 
    map.set("tar",mime.getType("tar")); 
    map.set("gz",mime.getType("gz")); 
    map.set("html",mime.getType("html")); 
    map.set("css",mime.getType("css")); 
    map.set("js",mime.getType("js")); 
    map.set("xlsx",mime.getType("xlsx")); 
    this.map = map;
  },
};
</script>

<style lang="scss" scoped>
</style>