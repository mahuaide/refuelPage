<template>
  <div class="topHeader" id="cxHeader" :style="headerStyle">
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
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        headerStyle: {
          position: 'static'
        }
      }
    },
    methods: {},
    mounted(){
      let that = this;
      let headerWidth = document.getElementById('cxHeader').offsetWidth;
      window.onscroll = function () {
        //屏幕滚动高度
        let scrollTop = document.documentElement.scrollTop;
        //屏幕左右滚动距离
        let scrollLeft = document.documentElement.scrollLeft;
        //hedaer本身高度
        let headerHeight = document.getElementById('cxHeader').offsetHeight;
        //其他元素偏移量
        let offSet = 0;
        if (scrollTop >= headerHeight + offSet) {
          that.headerStyle = {
            position: 'fixed',
            top: scrollTop,
            left: (-scrollLeft) + 'px',
            width: headerWidth + 'px',
            zIndex: 1000,
            opacity:0.77
          }
        } else {
          that.headerStyle = {
            position: 'static',
            zIndex: 0,
            opacity:1
          }
        }
      }
    },
    computed: {},
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .topHeader
    width 100%;
    height 80px;
    display flex;
    flex-direction row
    .base-header
      height 100%;
      border-right 1px solid #ddd;

      .top-base
        width 100%;
        height 20px;
        line-height 20px;
        text-align center;
        border-bottom 1px solid #ddd;
        font-size 18px;
        font-weight bold;
        box-sizing border-box
    .xuqiu-header
      flex 2
      font-size 16px;
      .xuqiu-header-top
        background-color #ADCDE4
        color #2D5174
      .xuqiu-header-bottom
        display flex
        height 60px
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
          line-height 60px
        .xuqiu-chengqing
          flex 1
          line-height 60px
          border-bottom 1px solid #ddd;

    .sheji-header
      flex 5
      font-size 16px;
      .sheji-header-top
        background-color #BCDBA2
        color #14612D
      .sheji-header-bottom
        display flex
        height 60px
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
            line-height 29px;
            height 29px
          .sheji-xqiufenxi-bottom
            flex 1
            display flex
            flex-direction row
            .todo, .doing
              flex 1
              height 29px
              line-height 29px
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
            line-height 29px;
            height 29px
          .sheji-jishupinggu-bottom
            flex 1
            display flex
            flex-direction row
            .todo, .doing
              flex 1
              height 29px
              line-height 29px
              border-bottom 1px solid #ddd
            .todo
              border-right 1px solid #ddd
        .sheji-jiuxu
          flex 1
          text-align center
          line-height 60px;
          border-bottom 1px solid #ddd
    .shishi-header
      flex 8
      font-size 16px;
      .shishi-header-top
        background-color #B2DDE3
        color #246898;
      .shishi-header-bottom
        display flex;
        height 60px
        text-align center;
        background-color #EAF5F9;
        color #246898;
        .shishi-zhipin
          flex 1
          border-right 1px solid #dddddd
          border-bottom 1px solid #ddd
          line-height 60px;
        .shishi-team
          flex 1
          border-right 1px solid #dddddd
          border-bottom 1px solid #ddd
          line-height 60px;
        .shishi-kaifa
          flex 2
          border-right 1px solid #dddddd
          border-bottom 1px solid #ddd
          display flex
          flex-direction column
          .shishi-kaifa-top
            flex 1
            border-bottom 1px solid #ddd
            line-height 29px
          .shishi-kaifa-bottom
            flex 1
            display flex
            .shishi-kaifa-todo
              flex 1
              line-height 29px
              border-right 1px solid #ddd
            .shishi-kaifa-doing
              flex 1
              line-height 29px
        .shishi-liantiao
          flex 2
          border-right 1px solid #dddddd
          border-bottom 1px solid #ddd
          display flex
          flex-direction column
          .shishi-liantiao-top
            flex 1
            border-bottom 1px solid #ddd
            line-height 29px
          .shishi-liantiao-bottom
            flex 1
            display flex
            .shishi-liantiao-todo
              flex 1
              line-height 29px
              border-right 1px solid #ddd
            .shishi-liantiao-doing
              flex 1
              line-height 29px
        .shishi-fengxian
          flex 1
          border-right 1px solid #dddddd
          border-bottom 1px solid #ddd
          line-height 60px
        .shishi-daijiaofu
          flex 1
          border-bottom 1px solid #ddd
          line-height 60px
          overflow hidden
    .yanshou-header
      flex 4
      font-size 16px;
      .yanshou-header-top
        background-color #E8CA96
        color #6B4B1C
      .yanshou-header-bottom
        display flex;
        height 60px
        text-align center;
        background-color #FBF1E7;
        color #6B4B1C
        .yanshou-leixing
          flex 1
          border-right 1px solid #dddddd
          border-bottom 1px solid #ddd
          line-height 60px;
        .yanshou-ceshi
          flex 2
          border-right 1px solid #dddddd
          border-bottom 1px solid #ddd
          display flex
          flex-direction column
          .yanshou-ceshi-top
            flex 1
            border-bottom 1px solid #ddd
            line-height 29px
          .yanshou-ceshi-bottom
            flex 1
            display flex
            .yanshou-ceshi-todo
              flex 1
              line-height 29px
              border-right 1px solid #ddd
            .yanshou-ceshi-doing
              flex 1
              line-height 29px
        .yanshou-daishangxian
          flex 1
          border-bottom 1px solid #ddd
          line-height 60px;
          overflow hidden
    .shangxian-header
      flex 3
      font-size 16px;
      background-color #DB9F9F;
      color #9F2832;
      .shangxian-header-bottom
        display flex
        height 60px;
        line-height 60px
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
          overflow hidden
          border-bottom 1px solid #ddd
</style>
