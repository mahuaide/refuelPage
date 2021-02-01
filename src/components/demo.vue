<template>
  <div>
    <router-link to="/dndEcharts" tag="li">可拖拽式仪表盘</router-link>
    <!-- <router-link to="/customLane" tag="li">自定义泳道（单屏仿trello）</router-link> -->
    <router-link to="/customLanelong" tag="li">自定义泳道（多屏仿trello）</router-link>
    <router-link to="/customLaneCitic" tag="li">自定义泳道（citic）</router-link>
    <router-link to="/complexKanban" tag="li">复合型看板（citic固定）</router-link>
    <router-link to="/complexKanbanCEO" tag="li">华融公司看板</router-link>
    <router-link to="/complexKanbanUserCustom" tag="li">华融项目看板</router-link>
    <router-link to="/complexKanbanManager" tag="li">华融系统看板</router-link>
    <router-link to="/complexKanbanUserCustomPerson" tag="li">人员复合型看板</router-link>
    <router-link to="/tabNave/vue0" tag="li">水平导航</router-link>
    <router-link to="/gitlabdiff" tag="li">gitlab diff</router-link>
    <router-link to="/wbsTree" tag="li">wbsTree</router-link>
    <router-link to="/ip" tag="li">获取本机ip（chrome老版本）</router-link>
    <router-link to="/selectTable" tag="li">表格翻页连选</router-link>
    <!-- <router-link to="/tableTree" tag="li">tableTree</router-link> -->
    <router-link to="/dmpTree" tag="li">dmpTree</router-link>
    <router-link to="/beijingDMPTable" tag="li">beijingDMPTable</router-link>
    <router-link to="/testTable" tag="li">testTable</router-link>
    <router-link to="/jsmind" tag="li">jsmind</router-link>
    <!-- <router-link to="/disabledDate" tag="li">disabledDate</router-link> -->
    <router-link to="/redirectAjax" tag="li">重定向</router-link>
    <router-link to="/fatherAndChildren" tag="li">组件通讯</router-link>
    <router-link to="/lifeCycle" tag="li">lifeCycle</router-link>
    <router-link to="/slot" tag="li">slot</router-link>
    <router-link to="/async/1" tag="li">promise/async/await</router-link>
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
