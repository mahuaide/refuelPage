<template>
  <div class="kanbanContainer">
    <cx-header></cx-header>
    <div class="content-body" id="cxBody">
      <div class="content-4">
        <div class="content4-up">
          <div class="xuqiu-gaojia">
            <div class="xuqiu-gaojia-left"><span class="text">高价值</span></div>
            <div class="xuqiu-gaojia-todo">
            </div>
            <div class="xuqiu-gaojia-doing"></div>
          </div>
          <div class="sheji-gaojia">
            <div class="gaojia-fenxi-todo common"></div>
            <div class="gaojia-fenxi-doing common"></div>
            <div class="gaojia-pinggu-todo common"></div>
            <div class="gaojia-pinggu-doing common"></div>
            <div class="gaojia-jiuxu common"></div>
          </div>
          <div class="shishi-gaojia">
            <div class="shishi-zhipin"></div>
            <div class="shishi-team"><span class="qianduan">前端</span></div>
            <div class="shishi-right">
              <div class="shishi-right-up ">
                <div class="shishi-right-up-unit">
                </div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
              </div>
              <div class="shishi-right-down">
                <div class="shishi-right-up-unit">
                </div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
              </div>
            </div>
          </div>
          <div class="yanshou-gaojia">
            <div class="yanshouleixing-gaojie">
              <span class="text">功能测试</span>
            </div>
            <div class="ceshi-todo-gaojie"></div>
            <div class="ceshi-doing-gaojie"></div>
            <div class="daishangxian-gaojie"></div>
          </div>
        </div>
        <div class="content4-down">
          <div class="xuqiu-changgui">
            <div class="xuqiu-changgui-left"><span class="text">常规</span></div>
            <div class="xuqiu-changgui-todo"></div>
            <div class="xuqiu-changgui-doing"></div>
          </div>
          <div class="sheji-changgui">
            <div class="changgui-fenxi-todo common"></div>
            <div class="changgui-fenxi-doing common"></div>
            <div class="changgui-pinggu-todo common"></div>
            <div class="changgui-pinggu-doing common"></div>
            <div class="changgui-jiuxu common"></div>
          </div>
          <div class="shishi-changgui">
            <div class="shishi-zhipin"></div>
            <div class="shishi-team"><span class="fuwuduan">服务端</span></div>
            <div class="shishi-right">
              <div class="shishi-right-a">
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
              </div>
              <div class="shishi-right-b">
                <div class="shishi-right-up-unit">
                </div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
              </div>
              <div class="shishi-right-c">
                <div class="shishi-right-up-unit">
                </div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
              </div>
              <div class="shishi-right-d">
                <div class="shishi-right-up-unit">
                </div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
                <div class="shishi-right-up-unit"></div>
              </div>
            </div>
          </div>
          <div class="yanshou-changgui">
            <div class="yanshouleixing-changgui">
              <span class="text">功能测试</span>
            </div>
            <div class="ceshi-todo-changgui"></div>
            <div class="ceshi-doing-changgui"></div>
            <div class="daishangxian-changgui"></div>
          </div>
        </div>
      </div>

      <div class="content-1">
        <div class="huidu"></div>
        <div class="shangxian"></div>
        <div class="fankui"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import  header from './complexKanbanHeader.vue'
  export default{
    data(){
      return {}
    },
    methods: {},
    mounted(){
    },
    computed: {},
    components: {
      'cx-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .clearfix
    display block
    &:after
      display block
      content "."
      height 0
      line-height 0
      clear both
      visibility hidden

  .kanbanContainer
    @media screen and (max-width: 4400px) {
      width 4400px;
    }
    @media screen and (min-width: 4400px) {
      width 100%;
    }
    background-color #fff
    margin-bottom 100px;

    .content-body
      display flex
      flex-direction row
      .content-4
        flex 19
        display flex
        flex-direction column
        .content4-up
          flex 1
          display flex
          .xuqiu-gaojia
            flex 2
            display flex
            .xuqiu-gaojia-left
              flex 0 0 22px
              position relative
              border-right 1px solid #dddddd
              border-bottom 1px solid #ddd
              .text
                position absolute
                top 50%
                left 50%
                margin-top -50px;
                margin-left -8px;
                display block;
                width 100%;
                height 100px;
                font-size 16px;
                font-weight bold
            .xuqiu-gaojia-todo
              flex 1
              border-right 1px solid #dddddd
              border-bottom 1px solid #ddd
            .xuqiu-gaojia-doing
              flex 1
              border-right 1px solid #dddddd
              border-bottom 1px solid #ddd
          .sheji-gaojia
            flex 5
            border-right 1px solid #ddd
            display flex
            .common
              height 100%;
              flex 1
              border-bottom 1px solid #ddd;
              border-right 1px solid #ddd;
          .common:last-child
            border-right none;
          .shishi-gaojia
            flex 8
            border-right 1px solid #ddd
            border-bottom 1px solid #ddd
            display flex
            .shishi-zhipin
              flex 1
              border-right 1px solid #ddd
            .shishi-team
              flex 1
              border-right 1px solid #ddd
              position relative
              font-size 16px;
              font-weight bold
              text-align right
              .qianduan
                display block
                width 22px
                height 30px
                position absolute
                top: 50%
                left: 10px
                margin-top -15px;
              .app
                display block
                width 50px
                height 22px;
                position absolute
                top 25%;
                margin-top -11px;
                right 10px;
              .web
                display block
                width 50px
                height 22px;
                position absolute
                bottom 25%;
                margin-top 11px;
                right 10px;
            .shishi-right
              flex 6
              display flex
              flex-direction column
              .shishi-right-up
                flex 1
                border-bottom 1px solid #ddd
                display flex
                .shishi-right-up-unit
                  min-height 200px
                  flex 1
                  border-right 1px solid #ddd
                .shishi-right-up-unit:last-child
                  border-right none;
              .shishi-right-down
                min-height 200px
                flex 1
                display flex
                .shishi-right-up-unit
                  min-height 200px
                  flex 1
                  border-right 1px solid #ddd
                .shishi-right-up-unit:last-child
                  border-right none;
          .yanshou-gaojia
            flex 4
            border-right 1px solid #ddd
            border-bottom 1px solid #ddd
            display flex
            .yanshouleixing-gaojie
              flex 1
              border-right 1px solid #ddd;
              position relative;
              .text
                position absolute
                top 50%
                left 50%
                text-align center
                line-height 100px;
                margin-top -50px;
                margin-left -32px
                display block;
                height 100px;
                font-size 16px;
                font-weight bold
            .ceshi-todo-gaojie
              flex 1
              border-right 1px solid #ddd;
            .ceshi-doing-gaojie
              flex 1
              border-right 1px solid #ddd;
            .daishangxian-gaojie
              flex 1
        .content4-down
          flex 1
          display flex
          .xuqiu-changgui
            flex 2
            display flex
            .xuqiu-changgui-left
              flex 0 0 22px
              border-right 1px solid #dddddd
              border-bottom 1px solid #ddd
              position relative
              .text
                position absolute
                top 50%
                left 50%
                margin-top -50px;
                margin-left -8px;
                display block;
                width 100%;
                height 100px;
                font-size 16px;
                font-weight bold
            .xuqiu-changgui-todo
              flex 1
              border-right 1px solid #dddddd
              border-bottom 1px solid #ddd
            .xuqiu-changgui-doing
              flex 1
              border-right 1px solid #dddddd
              border-bottom 1px solid #ddd
          .sheji-changgui
            flex 5
            border-right 1px solid #ddd
            display flex
            .common
              height 100%;
              flex 1
              border-bottom 1px solid #ddd;
              border-right 1px solid #ddd;
            .common:last-child
              border-right none;
          .shishi-changgui
            flex 8
            border-right 1px solid #ddd
            border-bottom 1px solid #ddd
            display flex
            .shishi-zhipin
              flex 1
              border-right 1px solid #ddd
            .shishi-team
              flex 1
              border-right 1px solid #ddd
              position relative
              font-size 16px;
              font-weight bold
              text-align right
              .fuwuduan
                display block
                width 22px
                height 30px
                position absolute
                top: 50%
                left: 10px
                margin-top -15px;
            .shishi-right
              flex 6
              display flex
              flex-direction column
              .shishi-right-a
                flex 1
                border-bottom 1px solid #ddd
                display flex
                .shishi-right-up-unit
                  min-height 200px
                  flex 1
                  border-right 1px solid #ddd
                .shishi-right-up-unit:last-child
                  border-right none;
              .shishi-right-b
                flex 1
                display flex
                border-bottom 1px solid #ddd
                .shishi-right-up-unit
                  min-height 200px
                  flex 1
                  border-right 1px solid #ddd
                .shishi-right-up-unit:last-child
                  border-right none;
              .shishi-right-c
                flex 1
                display flex
                border-bottom 1px solid #ddd
                .shishi-right-up-unit
                  min-height 200px
                  flex 1
                  border-right 1px solid #ddd
                .shishi-right-up-unit:last-child
                  border-right none;
              .shishi-right-d
                flex 1
                display flex
                .shishi-right-up-unit
                  min-height 200px
                  flex 1
                  border-right 1px solid #ddd
                .shishi-right-up-unit:last-child
                  border-right none;

          .yanshou-changgui
            flex 4
            border-right 1px solid #ddd
            border-bottom 1px solid #ddd
            display flex
            .yanshouleixing-changgui
              flex 1
              border-right 1px solid #ddd;
              position relative;
              .text
                position absolute
                top 50%
                left 50%
                text-align center
                line-height 100px;
                margin-top -50px;
                margin-left -32px
                display block;
                height 100px;
                font-size 16px;
                font-weight bold
            .ceshi-todo-changgui
              flex 1
              border-right 1px solid #ddd;
            .ceshi-doing-changgui
              flex 1
              border-right 1px solid #ddd;
            .daishangxian-changgui
              flex 1
      .content-1
        flex 3
        border-right 1px solid #ddd
        border-bottom 1px solid #ddd
        display flex
        .huidu
          flex 1
          border-right 1px solid #ddd;
        .shangxian
          flex 1
          border-right 1px solid #ddd;
        .fankui
          flex 1
</style>
