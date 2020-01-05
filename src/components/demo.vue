<template>
  <div>
    <router-link to="/dndEcharts" tag="li">可拖拽式仪表盘</router-link>
    <!--<router-link to="/customLane" tag="li">自定义泳道（单屏）</router-link>-->
    <router-link to="/customLanelong" tag="li">自定义泳道（多屏）</router-link>
    <router-link to="/customLaneCitic" tag="li">自定义泳道（citic）</router-link>
    <router-link to="/complexKanban" tag="li">复合型看板（固定格式）</router-link>
    <router-link to="/complexKanbanUserCustomPerson" tag="li">人员复合型看板（用户自定义泳道）</router-link>
    <router-link to="/gitlabdiff" tag="li">gitlab diff</router-link>
    <router-link to="/wbsTree" tag="li">wbsTree</router-link>
    <router-link to="/complexKanbanUserCustom" tag="li">华融项目看板</router-link>
    <router-link to="/complexKanbanManager" tag="li">华融系统看板</router-link>
    <router-link to="/complexKanbanCEO" tag="li">华融公司看板</router-link>
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
