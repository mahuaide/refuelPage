<template>
  <div class="header">
    <table cellspacing="0" cellpadding="0">
      <thead>
      <!-- 表头采用table单行模式 -->
      <tr>
        <!-- 按顶级节点循环，每个顶级节点作为一列 -->
        <template v-for="(level_1,index) in lane">
          <th>
            <tr>
              <!-- 一级表头的列合并，取决于有多少个最底层元素，具体算法在父组件watch里面
                   一级表头的行合并，取决于是否有children元素，有则不合并，没有向下合并3行
              -->
              <td
                :colspan="level_1.deepNum"
                :rowspan="((level_1.children && level_1.children.length>0)?'':3)">
                {{level_1.label}}
              </td>
            </tr>
            <tr>
              <!-- 二级表头需要对列和行分别合并 -->
               <template v-for="(level_2,index) in level_1.children">
                 <!-- 如果二级表头无子节点，需要向下合并一行 -->
                 <template v-if="!level_2.children || level_2.children.length ==0">
                   <td rowspan="2">{{level_2.label}}</td>
                 </template>
                 <!-- 如果二级表头有子节点，需要向右合并，有多少子节点合并多少列 -->
                 <template v-else>
                   <td :colspan="level_2.children.length">{{level_2.label}}</td>
                 </template>
               </template>
            </tr>
            <tr>
                <template v-for="(level_2,index) in level_1.children">
                  <template v-for="(level_3,index) in level_2.children">
                    <td>{{level_3.label}}</td>
                  </template>
              </template>
            </tr>
          </th>
        </template>
      </tr>
      </thead>
    </table>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: ['lane'],
    data(){
      return {}
    },
    methods: {},
    mounted(){
    },
    computed: {

    },
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .header
    width 100%;
    table
      margin 0
      border-collapse: collapse
      thead tr
        height 30px;
      thead tr th tr td
        box-sizing border-box
        width 150px !important
        text-align center
        border-top 1px solid #ddd
        border-bottom: 1px solid #ddd
        border-right 1px solid #ddd
</style>
