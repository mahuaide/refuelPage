<template>
  <div style="width: 2400px">
    <cx-header :lane="lane"></cx-header>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './complexKanbanHeaderCustom.vue'
  export default{
    data(){
      return {
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
              },
              {
                id: 23,
                label: '就绪',
              }
            ]
          },
          {
            id: 3,
            label: '实施阶段',
            children: [
              {
                id: 31,
                label: '在制品队列'
              },
              {
                id: 32,
                label: '开发、自测（单元测试）',
                children: [
                  {
                    id: 321,
                    label: "todo"
                  },
                  {
                    id: 322,
                    label: "doing"
                  }
                ]
              },
              {
                id: 33,
                label: '联调',
                children: [
                  {
                    id: 331,
                    label: "todo"
                  },
                  {
                    id: 332,
                    label: "doing"
                  }
                ]
              },
              {
                id: 34,
                label: '风险',
                children: []
              },
              {
                id: 35,
                label: '交付',
                children: []
              }
            ]
          },
          {
            id: 4,
            label: '验收阶段',
            children: [
              {
                id: 41,
                label: '测试验收（功能性、体验性）',
                children: [
                  {
                    id: 411,
                    label: 'todo'
                  },
                  {
                    id: 412,
                    label: 'doing'
                  }
                ]
              },
              {
                id: 42,
                label: "待上线"
              }
            ]
          },
          {
            id: 5,
            label: "上线及运营阶段",
            children: [
              {
                id: 51,
                label: '灰度发布'
              },
              {
                id: 52,
                label: '正式上线'
              },
              {
                id: 53,
                label: '反馈及价值'
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
    components: {
      'cx-header': header
    },
    watch: {
      lane: {
        handler(newLane, oldLane){
          this.lane.forEach((level1, index) => {
            level1.deepNum = 0;
            level1.children.forEach((level2,index)=>{
                if(!level2.children || level2.children.length ==0){
                  level1.deepNum++;
                }else{
                  level1.deepNum += level2.children.length;
                }
            })
          })
        },
        immediate: true,
        deep: true
      },

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
