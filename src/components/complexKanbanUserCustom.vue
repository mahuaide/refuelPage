<template>
  <div style="width: 3100px">
    <table cellspacing="0" cellpadding="0">
        <thead id="cxHeader" :style="headerStyle">
          <tr>
            <template v-for="(level_1,index1) in lane">
              <th>
                <tr>
                  <td
                    :colspan="level_1.deepNum"
                    :rowspan="((level_1.children && level_1.children.length>0)?'':3)">
                    {{level_1.label}}
                    <i class="el-icon-arrow-right" title="向右增一列" @click=""></i>
                    <i class="el-icon-arrow-down" title="向下增一列" v-show="level_1.children.length ==0 && index1 !=0"></i>
                  </td>
                </tr>
                <tr>
                  <template v-for="(level_2,index2) in level_1.children">
                  <!-- 如果二级表头无子节点，需要向下合并一行 -->
                  <template v-if="!level_2.children || level_2.children.length ==0">
                    <td rowspan="2">{{level_2.label}}
                      <i class="el-icon-arrow-right" title="向右增一列" v-show="index1!=0"></i>
                      <i class="el-icon-arrow-down" title="向下增一列" v-show="index1 !=0"></i>
                    </td>
                  </template>
                  <!-- 如果二级表头有子节点，需要向右合并，有多少子节点合并多少列 -->
                  <template v-else>
                    <td :colspan="level_2.children.length">{{level_2.label}}
                      <i class="el-icon-arrow-right" title="向右增一列" v-show="index1!=0"></i></td>
                  </template>
                </template>
                </tr>
                <tr>
                  <template v-for="(level_2,index) in level_1.children">
                    <template v-for="(level_3,index) in level_2.children">
                      <td>{{level_3.label}}
                        <i class="el-icon-arrow-right"></i></td>
                    </template>
                  </template>
                </tr>
              </th>
            </template>
          </tr>
        </thead>
        <tbody>
        <tr v-for="(backlog,index_line) in backlogs" class="row">
          <td v-for="(level1,index) in lane" >
            <tr>
              <template v-if="level1.deepNum ==0">
                <td class="column">
                  <template v-if="index ==0">
                    {{backlog.backlogName}}
                    <div class="addCard" @click="addCard(backlog)">加卡片</div>
                  </template>
                  <template v-else>
                  <ul class="card-list"
                      @drop="drop($event)"
                      @dragover="dragOver($event)"
                      @dragenter="dragEnter"
                      @dragleave="dragLeave"
                      :data-id="findLineId(level1.id,index_in_column-1)"
                      :data-line = 'backlog.backlogId'
                  >
                    <li class="card" draggable="true" v-for="card in backlog.cards" v-if="card.state==findLineId(level1.id,index_in_column-1)"
                        @dragstart="dragStart($event)"
                        :id="card.cardId"
                        @dragend="dragEnd"
                    >
                      <div>
                        ID:{{card.cardId}}<br>
                        state:{{card.state}}
                      </div>
                    </li>
                  </ul>
                  </template>
                </td>
              </template>
              <template v-else>
                <td v-for="index_in_column in level1.deepNum" class="column">
                  <template v-if="index_in_column==1 && index ==0">
                    {{backlog.backlogName}}
                    <div class="addCard" @click="addCard(backlog)">加卡片</div>
                  </template>
                  <template v-else="">
                  <ul class="card-list"
                                                        @drop="drop($event)"
                                                        @dragover="dragOver($event)"
                                                        @dragenter="dragEnter"
                                                        @dragleave="dragLeave"
                                                        :data-id="findLineId(level1.id,index_in_column-1)"
                                                        :data-line = 'backlog.backlogId'
                >
                  <li class="card" draggable="true" v-for="card in backlog.cards" v-if="card.state==findLineId(level1.id,index_in_column-1)"
                      @dragstart="dragStart($event)"
                      :id="card.cardId"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.cardId}}<br>
                      state:{{card.state}}<br>
                      req:{{card.cardName}}
                    </div>
                  </li>
                </ul>
                  </template>
                </td>
              </template>
            </tr>
          </td>
        </tr>
        </tbody>
      </table>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        headerStyle: {
          position: 'static'
        },
        from: '',
        to: '',
        formLine:'',
        toLine:'',
        dragCard: null,
        dragIndex: 0,
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
                label: '技术评估',
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
                label: '单元测试',
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
                label: '测试验收',
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
        ],//泳道头的树形结构
        cardLanes: '',//可拖拽区域泳道，由泳道头树形结构中各自的最底层节点组成
        backlogs: [
          {
            backlogId: 1,
            backlogName: '需求-个客网银',
            cards: [
              {
                cardId: '1001',
                cardName: '子需求-个人理财业务',
                state: 12,
                type: 0,
              },
              {
                cardId: '1002',
                cardName: '子需求-个人基金业务',
                state: 12,
                type: 0,
              },
              {
                cardId: '1003',
                cardName: '子需求-个人缴费',
                state: 12,
                type: 0,
              },
              {
                cardId: '1023',
                cardName: '子需求-个人缴费',
                state: 221,
                type: 0,
              }
            ]
          },
          {
            backlogId: 2,
            backlogName: '需求-企业网银',
            cards: [
              {
                cardId: '2004',
                cardName: '子需求-企业预约开户',
                state: 12,
                type: 0,
              },
              {
                cardId: '2005',
                cardName: '子需求-企业现金管理',
                state: 12,
                type: 0,
              },
              {
                cardId: '2006',
                cardName: '子需求-银企直联',
                state: 12,
                type: 0,
              }
            ]
          },
          {
            backlogId: 3,
            backlogName: '需求-手机银行',
            cards: [
              {
                cardId: '3005',
                cardName: '子需求-手机开户',
                state: 12,
                type: 0,
              },
              {
                cardId: '3006',
                cardName: '子需求-手机银行销户',
                state: 12,
                type: 0,
              },
              {
                cardId: '2007',
                cardName: '子需求-手机银行过户',
                state: 12,
                type: 0,
              }
            ]
          },
        ]
      }
    },
    methods: {
      addCard(backlog){
        this.backlogs.forEach((item,index)=>{
          if(item.backlogId == backlog.backlogId){
            item.cards.unshift({
              cardId: Math.floor(Math.random()*(99999-10000+1)+10000),
              cardName: Math.floor(Math.random()*(99999-10000+1)+10000),
              state: 12,
              type: 0,
            })
            this.computedHeight()
          }
        })
      },
      computedHeight(){
        this.$nextTick(()=>{
          $('tr.row').each((index,row)=>{
            var arr = [];
            $(row).find('td.column>ul').each((index,item)=>{
              if (item.children.length <= 2) {
                arr.push(300)
              } else {
                arr.push(130 * item.children.length + 140)
              }
            })
            $(row).find('td.column>ul').css('height',Math.max.apply(Math, arr)+'px')
            $(row).find('td.column').css('height',Math.max.apply(Math, arr)+'px')
          })
        })

      },
      dragOver(ev){
        if (ev.preventDefault) {
          ev.preventDefault();
        } else {
          window.event.returnValue = false;
        }
        //视口移动
        let clientX = ev.clientX;
        let clientY = ev.clientY;
        let scrollLeft = window.pageXOffset;
        let scrollTop = window.pageYOffset;
        if (clientX >= window.innerWidth - 200) {
          setTimeout(() => {
            window.scrollTo(scrollLeft + (clientX) / 68, window.pageYOffset)
          }, 1000 / 100)
        }
        if (clientX <= 200) {
          setTimeout(() => {
            window.scrollTo(scrollLeft - (window.innerWidth - clientX) / 68, window.pageYOffset)
          }, 1000 / 100)
        }
        if (clientY >= window.innerHeight - 100) {
          setTimeout(() => {
            window.scrollTo(window.pageXOffset, scrollTop + (clientY) / 68)
          }, 1000 / 100)
        }
        if (clientY <= 120) {
          setTimeout(() => {
            window.scrollTo(window.pageXOffset, scrollTop - (window.innerHeight - clientY) / 68)
          }, 0)
        }
        this.computedHeight();
      },
      dragStart(ev) {
        if (!ev.target.id) return;
        ev.dataTransfer.setData("Text", ev.target.id);
        let Ul = $("#" + ev.target.id).parents("UL.card-list")
        this.from = Ul.data('id');
        this.formLine =Ul.data('line');
      },
      dragEnd(ev){
        if (!this.dropping) {
          $("#templateli").remove();
        }
      },
      dragEnter(ev){
        var liText = '<li id="templateli" class="templateli"><div>放这里</div></li>'
        var $target = $(ev.target)
        if ($target[0].id == 'templateli' || ($target.parents('LI')[0] && $target.parents('LI')[0].id == 'templateli')) {
          return;
        }
        this.toLine = $target.parents("UL.card-list").data('line') == undefined ? $target.data('line') : $target.parents("UL.card-list").data('line');
        if(this.formLine != this.toLine){
            return;
        }
        this.to = $target.parents("UL.card-list").data('id') == undefined ? $target.data('id') : $target.parents("UL.card-list").data('id');
        $("#templateli").remove();
        if ($target[0].tagName == 'UL') {
          $target.append(liText)
        } else if ($target[0].tagName == 'LI') {
          $target.after(liText)
        } else if ($target.parents("LI") != undefined) {
          $target.parents("LI").before(liText)
        }
      },
      dragLeave(ev){
      },
      drop(ev) {
        this.dropping = true;
        if (ev.preventDefault) {
          ev.preventDefault();
          ev.stopPropagation();
        } else {
          window.event.cancelBubble = true;
          window.event.returnValue = false;
        }
        var id = ev.dataTransfer.getData("Text");
        $("#templateli").text('同步中... ').append('<i class="el-icon-loading"></i>')
        setTimeout(() => {
          var index = $("#templateli").index();
          var backlog_id = ''
          this.backlogs.forEach((backlog, index_backlog) => {
            backlog.cards.forEach((card,index_card)=>{
              if (card.cardId == id) {
                backlog_id = backlog.backlogId;
                this.dragCard = backlog.cards.splice(index_card, 1)[0];
                this.dragIndex = index_card;
              }
            })
          })
          this.dragCard.state = this.to;
          if (index == 0) {
            this.backlogs.forEach((backlog, index_backlog) => {
              if(backlog.backlogId == backlog_id){
                backlog.cards.splice(index, 0, this.dragCard)
              }
            })
            //如果放到目标用到非首位，先找到上一元素ID和位置，再位置+1后插入
          } else {
            var prvCardId = $("#templateli").prev()[0].id;
            if (id == prvCardId) {
              this.backlogs.forEach((backlog, index_backlog) => {
                if(backlog.backlogId == backlog_id){
                  backlog.cards.splice(this.dragIndex, 0, this.dragCard)
                }
              })
            } else {
              this.backlogs.forEach((backlog, index_backlog) => {
                if(backlog.backlogId == backlog_id){
                  backlog. cards.splice(index + 1, 0, this.dragCard)
                }
              })
            }
          }

          $("#templateli").remove();
          this.dropping = false;
        }, 200)
        this.$nextTick(()=>{
          this.computedHeight();
        })
      },
    },
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
            opacity:0.9
          }
        } else {
          that.headerStyle = {
            position: 'static',
            zIndex: 0,
            opacity:1
          }
        }
      }
      this.computedHeight();
    },
    computed: {
        findLineId(id,index){
            return function (id,index) {
              return this.cardLanes.get(id)[index];
            }
        }
    },
    components: {
    },
    watch: {
      /**
       * 列合并需要知道下层元素有几个，一级猎头，拖拽区域泳道向右合并时，需要知道最底层节点个数
       * 方法实时监控lane变化，将最底层节点个数汇总到最上层的deepNum上
       * cardLanes是为了展示拖拽泳道的，需要将每列的最底层节点汇总到一个Map里面
       * [id:[1,2,3,4,5]] id是顶层泳道id，后面的数组是最底层列的id
       * */
      lane: {
        handler(newLane, oldLane){
          this.cardLanes = new Map()
          //先循环一级
          this.lane.forEach((level1, index) => {
            level1.deepNum = 0;
            //如果一级有子元素
            if (level1.children && level1.children.length > 0) {
              let tempArr = [];
              level1.children.forEach((level2, index) => {
                //如果二级没有子元素
                if (!level2.children || level2.children.length == 0) {
                  level1.deepNum++;
                  //如果二级没有子元素  将二级ID放入临时数组
                  tempArr.push(level2.id);
                } else {
                  level1.deepNum += level2.children.length;
                  level2.children.forEach((level3, index) => {
                    //如果二级有子元素  将三级ID放入临时数组
                    tempArr.push(level3.id);
                  })
                }
              })
              //将一级ID，作为key，临时数组作为值，放入map中
              this.cardLanes.set(level1.id,tempArr)
            } else {
              //如果一级没有子元素，将一级ID，放入数组中
              this.cardLanes.set(level1.id,[level1.id])
            }

          })
        },
        immediate: true,
        deep: true
      },

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    table
      font-family "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
      position relative
      border-collapse: collapse
      margin-bottom 30px
      thead
        background-color #fff
      thead tr
        height 30px;
      thead tr th tr td
        position relative
        box-sizing border-box
        width 150px
        overflow hidden
        text-align center
        border-right 1px solid #aaa
        border-top 1px solid #aaa
        border-bottom 1px solid #aaa
        .el-icon-arrow-right
          font-size 12px
          position absolute
          right 5px
          top 50%
          margin-top -6px;
          &:hover
            cursor pointer
        .el-icon-arrow-down
          font-size 12px
          position absolute
          left 5px
          top 50%
          margin-top -6px;
          &:hover
            cursor pointer
      tbody
        padding 0
        margin 0
      tbody>tr
        border-bottom 2px solid #aaa
      tbody>tr>td>tr>td
        position relative
        padding 0
        margin 0
        box-sizing border-box
        width 150px
        min-height 35vh
        overflow hidden
        word-break break-all
        border-right 1px solid #ddd
        text-align center
        .addCard
          position absolute
          bottom 50px;
          left 50%;
          width 80px;
          height 40px;
          line-height 40px
          margin-left -40px
          text-align center;
          border 1px solid #ddd;
          border-radius 5px;
          &:hover
            cursor:pointer
        .card-list
          margin 0;
          padding: 0
          box-sizing border-box
          list-style none
          width 100%;
          height 300px
          height auto
          padding 10px;
          .card
            height 120px
            width 100%;
            box-sizing border-box;
            border 1px solid #ddd;
            border-radius 10px;
            margin-top 10px;
            text-align center;
            background-color #fff;
            overflow hidden
            &:hover
              cursor move
            > div
              padding 8px
              width 100%;
              height 100%;
              border-radius 10px
              box-sizing border-box
          .card:first-child
            margin-top 0px
</style>
<style>
  .templateli {
    height: 120px;
    background-color: #ddd;
    border-radius: 8px;
    text-align: center;
    line-height: 120px;
    margin-top: 10px;
  }

  .templateli:first-child {
    margin-top: 0px;
  }
</style>
