<template>
  <div class="kanbanContainer">
    <div class="topHeader">
      <div class="xuqiu-header base-header">
        <div class="xuqiu-header-top top-base">需求规划阶段</div>
        <div class="xuqiu-header-bottom">
          <div class="xuqiu-left"></div>
          <div class="xuqiu-pool">需求POOL</div>
          <div class="xuqiu-chengqing">需求澄清</div>
        </div>
      </div>
      <div class="sheji-header base-header">
        <div class="sheji-header-top top-base">设计阶段</div>
        <div class="sheji-header-bottom">
          <div class="sheji-xuqiufenxi">
            <div class="sheji-xqiufenxi-top">需求分析</div>
            <div class="sheji-xqiufenxi-bottom">
              <div class="todo">todo</div>
              <div class="doing">doing</div>
            </div>
          </div>
          <div class="sheji-jishupinggu">
            <div class="sheji-jishupinggu-top">技术评估（架构，安全等）</div>
            <div class="sheji-jishupinggu-bottom">
              <div class="todo">todo</div>
              <div class="doing">doing</div>
            </div>
          </div>
          <div class="sheji-jiuxu">就绪</div>
        </div>
      </div>
      <div class="shishi-header base-header">
        <div class="shishi-header-top top-base">实施阶段</div>
        <div class="shishi-header-bottom">
          <div class="shishi-zhipin">在制品队列</div>
          <div class="shishi-team">TEAM</div>
          <div class="shishi-kaifa">
            <div class="shishi-kaifa-top">开发、自测（单元测试）</div>
            <div class="shishi-kaifa-bottom">
              <div class="shishi-kaifa-todo">todo</div>
              <div class="shishi-kaifa-doing">doing</div>
            </div>
          </div>
          <div class="shishi-liantiao">
            <div class="shishi-liantiao-top">联调</div>
            <div class="shishi-liantiao-bottom">
              <div class="shishi-liantiao-todo">todo</div>
              <div class="shishi-liantiao-doing">doing</div>
            </div>
          </div>
          <div class="shishi-fengxian">风险</div>
          <div class="shishi-daijiaofu">交付（条目粒度交付）</div>
        </div>
      </div>
      <div class="yanshou-header base-header">
        <div class="yanshou-header-top top-base">验收阶段</div>
        <div class="yanshou-header-bottom">
          <div class="yanshou-leixing">验收类型</div>
          <div class="yanshou-ceshi">
            <div class="yanshou-ceshi-top">测试验收（功能性、体验性）</div>
            <div class="yanshou-ceshi-bottom">
              <div class="yanshou-ceshi-todo">todo</div>
              <div class="yanshou-ceshi-doing">doing</div>
            </div>
          </div>
          <div class="yanshou-daishangxian">待上线（需求条目粒度）</div>
        </div>
      </div>
      <div class="shangxian-header base-header">
        <div class="shangxian-header-top top-base">上线及运营阶段</div>
        <div class="shangxian-header-bottom">
          <div class="shangxian-huidu">灰度发布</div>
          <div class="shangxian-shangxian">正式上线</div>
          <div class="shangxian-jiazhipinggu">用户故事反馈及价值评估</div>
        </div>
      </div>
    </div>
    <div class="content-body">
      <div class="content-4">
        <div class="content4-up">
          <div class="xuqiu-gaojia">
            <div class="xuqiu-gaojia-left">高价值</div>
            <div class="xuqiu-gaojia-todo"></div>
            <div class="xuqiu-gaojia-doing"></div>
          </div>
          <div class="sheji-gaojia">
            <div class="gaojia-fenxi-todo common"></div>
            <div class="gaojia-fenxi-doing common"></div>
            <div class="gaojia-pinggu-todo common"></div>
            <div class="gaojia-pinggu-doing common"></div>
            <div class="gaojia-jiuxu common"></div>
          </div>
          <div class="shishi-gaojia"></div>
          <div class="yanshou-gaojia"></div>
        </div>
        <div class="content4-down">
          <div class="xuqiu-changgui">
            <div class="xuqiu-changgui-left">常规</div>
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
          <div class="shishi-changgui"></div>
          <div class="yanshou-changgui"></div>
        </div>
      </div>

      <div class="content-1"></div>
    </div>
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
    min-height 300px;
    background-color #fff
    .topHeader
      width 100%;
      height 120px;
      display flex;
      flex-direction row
      .base-header
        height 100%;
        border-right 1px solid #ddd;
        .top-base
          width 100%;
          height 30px;
          line-height 30px;
          text-align center;
          border-bottom 1px solid #ddd;
          font-size 20px;
          font-weight bold;
      .xuqiu-header
        flex 2
        font-size 16px;
        .xuqiu-header-top
          background-color #ADCDE4
          color #2D5174
        .xuqiu-header-bottom
          display flex
          height 90px
          text-align center
          background-color #E7EEF8
          color #2D5174
          .xuqiu-left
            flex 0 0 22px
            width 22px;
            border-bottom 1px solid #ddd;
            border-right 1px solid #ddd
          .xuqiu-pool
            flex 1
            border-bottom 1px solid #ddd;
            border-right 1px solid #ddd
            line-height 90px
          .xuqiu-chengqing
            flex 1
            line-height 90px
            border-bottom 1px solid #ddd;

      .sheji-header
        flex 5
        font-size 16px;
        .sheji-header-top
          background-color #BCDBA2
          color #14612D
        .sheji-header-bottom
          display flex
          height 90px
          text-align center
          background-color #E9F5EB
          color #14612D
          .sheji-xuqiufenxi
            flex 2
            border-right 1px solid #ddd;
            display flex
            flex-direction column
            .sheji-xqiufenxi-top
              flex 1
              border-bottom 1px solid #ddd
              line-height 44px;
              height 44px
            .sheji-xqiufenxi-bottom
              flex 1
              display flex
              flex-direction row
              .todo, .doing
                flex 1
                height 45px
                line-height 45px;
                border-bottom 1px solid #ddd
              .todo
                border-right 1px solid #ddd
          .sheji-jishupinggu
            flex 2
            border-right 1px solid #ddd;
            display flex
            flex-direction column
            .sheji-jishupinggu-top
              flex 1
              border-bottom 1px solid #ddd
              line-height 44px;
              height 44px
            .sheji-jishupinggu-bottom
              flex 1
              display flex
              flex-direction row
              .todo, .doing
                flex 1
                height 45px
                line-height 45px;
                border-bottom 1px solid #ddd
              .todo
                border-right 1px solid #ddd
          .sheji-jiuxu
            flex 1
            text-align center
            line-height 90px;
            border-bottom 1px solid #ddd
      .shishi-header
        flex 8
        font-size 16px;
        .shishi-header-top
          background-color #B2DDE3
          color #246898;
        .shishi-header-bottom
          display flex;
          height 90px
          text-align center;
          background-color #EAF5F9;
          color #246898;
          .shishi-zhipin
            flex 1
            border-right 1px solid #dddddd
            border-bottom 1px solid #ddd
            line-height 90px;
          .shishi-team
            flex 1
            border-right 1px solid #dddddd
            border-bottom 1px solid #ddd
            line-height 90px;
          .shishi-kaifa
            flex 2
            border-right 1px solid #dddddd
            border-bottom 1px solid #ddd
            display flex
            flex-direction column
            .shishi-kaifa-top
              flex 1
              border-bottom 1px solid #ddd
              line-height 44px
            .shishi-kaifa-bottom
              flex 1
              display flex
              .shishi-kaifa-todo
                flex 1
                line-height 44px
                border-right 1px solid #ddd
              .shishi-kaifa-doing
                flex 1
                line-height 44px
          .shishi-liantiao
            flex 2
            border-right 1px solid #dddddd
            border-bottom 1px solid #ddd
            display flex
            flex-direction column
            .shishi-liantiao-top
              flex 1
              border-bottom 1px solid #ddd
              line-height 44px
            .shishi-liantiao-bottom
              flex 1
              display flex
              .shishi-liantiao-todo
                flex 1
                line-height 44px
                border-right 1px solid #ddd
              .shishi-liantiao-doing
                flex 1
                line-height 44px
          .shishi-fengxian
            flex 1
            border-right 1px solid #dddddd
            border-bottom 1px solid #ddd
            line-height 90px
          .shishi-daijiaofu
            flex 1
            border-bottom 1px solid #ddd
            line-height 90px
      .yanshou-header
        flex 4
        font-size 16px;
        .yanshou-header-top
          background-color #E8CA96
          color #6B4B1C
        .yanshou-header-bottom
          display flex;
          height 90px
          text-align center;
          background-color #FBF1E7;
          color #6B4B1C
          .yanshou-leixing
            flex 1
            border-right 1px solid #dddddd
            border-bottom 1px solid #ddd
            line-height 90px;
          .yanshou-ceshi
            flex 2
            border-right 1px solid #dddddd
            border-bottom 1px solid #ddd
            display flex
            flex-direction column
            .yanshou-ceshi-top
              flex 1
              border-bottom 1px solid #ddd
              line-height 44px
            .yanshou-ceshi-bottom
              flex 1
              display flex
              .yanshou-ceshi-todo
                flex 1
                line-height 44px
                border-right 1px solid #ddd
              .yanshou-ceshi-doing
                flex 1
                line-height 44px
          .yanshou-daishangxian
            flex 1
            border-bottom 1px solid #ddd
            line-height 90px;
      .shangxian-header
        flex 3
        font-size 16px;
        background-color #DB9F9F;
        color #9F2832;
        .shangxian-header-bottom
          display flex
          height 90px;
          line-height 90px
          text-align center
          background-color #FAEBE6;
          .shangxian-huidu
            flex 1
            border-right 1px solid #dddddd
            border-bottom 1px solid #ddd
          .shangxian-shangxian
            flex 1
            border-right 1px solid #dddddd
            border-bottom 1px solid #ddd
          .shangxian-jiazhipinggu
            flex 1
            border-bottom 1px solid #ddd
    .content-body
      display flex
      flex-direction row
      min-height 700px;
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
              border-right 1px solid #dddddd
              border-bottom 1px solid #ddd
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
          .yanshou-gaojia
            flex 4
            border-right 1px solid #ddd
            border-bottom 1px solid #ddd
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
          .yanshou-changgui
            flex 4
            border-right 1px solid #ddd
            border-bottom 1px solid #ddd
      .content-1
        flex 3
        border-right 1px solid #ddd
        border-bottom 1px solid #ddd
</style>
