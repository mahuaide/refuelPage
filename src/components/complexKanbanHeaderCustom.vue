<template>
  <div class="header">
    <table cellspacing="0" cellpadding="0">
      <tbody>
      <tr>
        <template v-for="(level_1,index) in lane">
          <td>
            <tr>
              <td :colspan="level_1.deepNum">{{level_1.label}}</td>
            </tr>
            <tr>
               <template v-for="(level_2,index) in level_1.children">
                 <template v-if="!level_2.children || level_2.children.length ==0">
                   <td rowspan="2">{{level_2.label}}</td>
                 </template>
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
          </td>
        </template>
      </tr>
      </tbody>
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
      tbody tr
        height 30px;
      tbody tr td tr td
        box-sizing border-box
        width 140px !important
        text-align center
        border-top 1px solid #ddd
        border-bottom: 1px solid #ddd
        border-right 1px solid #ddd
</style>
