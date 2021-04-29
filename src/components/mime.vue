<template>
  <div>
    {{ map }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: "",
    };
  },
  mounted() {
    let map = new Map();
    map.set("txt", this.$mime.getType("txt"));
    map.set("jar", this.$mime.getType("jar"));
    map.set("zip", this.$mime.getType("zip"));
    map.set("war", this.$mime.getType("war"));
    map.set("rar", this.$mime.getType("rar"));
    map.set("tar", this.$mime.getType("tar"));
    map.set("gz", this.$mime.getType("gz"));
    map.set("html", this.$mime.getType("html"));
    map.set("css", this.$mime.getType("css"));
    map.set("js", this.$mime.getType("js"));
    map.set("xlsx", this.$mime.getType("xlsx"));
    this.map = map;
  },
};
</script>

<style lang="scss" scoped>
</style>