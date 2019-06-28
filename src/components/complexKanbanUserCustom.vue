<template>

</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        laneWidth: 200,
        lane: [
          {
            id: 1,
            label: '需求规划阶段',
            children: [
              {
                id: 11,
                label: "需求POOL"
              },
              {
                id: 12,
                label: '需求澄清'
              }
            ]
          },
          {
            id: 2,
            label: '设计阶段',
            children: [
              {
                id: 21,
                label: '需求分析',
                children: [
                  {
                    id: 211,
                    label: "todo"
                  },
                  {
                    id: 212,
                    label: "doing"
                  }
                ]
              },
              {
                id: 22,
                label: '技术评估（结构、安全等）',
                children: [
                  {
                    id: 221,
                    label: "todo"
                  },
                  {
                    id: 222,
                    label: "doing"
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    methods: {},
    mounted(){
    },
    computed: {},
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
