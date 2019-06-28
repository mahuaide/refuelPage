<template>
  <div>
    <router-link to="/dndEcharts" tag="li">可拖拽式仪表盘</router-link>
    <router-link to="/customLane" tag="li">自定义泳道（单屏）</router-link>
    <router-link to="/customLanelong" tag="li">自定义泳道（多屏）</router-link>
    <router-link to="/complexKanban" tag="li">复合型看板</router-link>
    <router-link to="/complexKanbanUserCustom" tag="li">复合型看板（用户自定义泳道）</router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {}
    },
    methods: {},
    mounted(){
    },
    computed: {},
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  li
    list-style decimal
    text-decoration underline
    cursor pointer
    margin 20px
</style>
