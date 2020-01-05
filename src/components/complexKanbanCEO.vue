<template>
  <div style="width: 5000px">
    <table cellspacing="0" cellpadding="0">
      <thead id="cxHeader" :style="headerStyle">
      <tr>
        <template v-for="(level_1,index1) in lane">
          <th :style="{'backgroundColor':level_1.backgroundColor || 'rgb(255,255,255)'}">
      <tr>
        <td
          :colspan="level_1.deepNum"
          :rowspan="((level_1.children && level_1.children.length>0)?'':3)">
          {{level_1.label}}
          <i class="el-icon-delete" v-show="index1 !=0" @click="del(level_1.id)"></i>
          <i class="el-icon-arrow-right" title="向右增一列" @click="showDialog('1right',index1)"></i>
          <i class="el-icon-arrow-down" title="向下增两列" v-show="level_1.children.length ==0 && index1 !=0"
             @click="showDialog('1donw',index1)"></i>
        </td>
      </tr>
      <tr>
        <template v-for="(level_2,index2) in level_1.children">
          <!-- 如果二级表头无子节点，需要向下合并一行 -->
          <template v-if="!level_2.children || level_2.children.length ==0">
            <td rowspan="2">{{level_2.label}}
              <i class="el-icon-delete" v-show="index1 !=0" @click="del(level_2.id)"></i>
              <i class="el-icon-arrow-right" title="向右增一列" v-show="index1!=0"
                 @click="showDialog('2right',level_1.id,index2)"></i>
              <i class="el-icon-arrow-down" title="向下增两列" v-show="index1 !=0"
                 @click="showDialog('2down',level_1.id,index2)"></i>
            </td>
          </template>
          <!-- 如果二级表头有子节点，需要向右合并，有多少子节点合并多少列 -->
          <template v-else>
            <td :colspan="level_2.children.length">{{level_2.label}}
              <i class="el-icon-delete" @click="del(level_2.id)"></i>
              <i class="el-icon-arrow-right" title="向右增一列" v-show="index1!=0"
                 @click="showDialog('2right',level_1.id,index2)"></i></td>
          </template>
        </template>
      </tr>
      <tr>
        <template v-for="(level_2,index) in level_1.children">
          <template v-for="(level_3,index3) in level_2.children">
            <td>{{level_3.label}}
              <i class="el-icon-delete" v-show="index1 !=0" @click="del(level_3.id)"></i>
              <i class="el-icon-arrow-right" title="向右增一列"
                 @click="showDialog('3right',level_1.id,level_2.id,index3)""></i></td>
          </template>
        </template>
      </tr>
      </th>
</template>
</tr>
</thead>
<tbody>
<tr v-for="backlog in backlogs" class="row">
  <td v-for="(level1,indexLane) in lane">
<tr>
  <template v-if="level1.deepNum ==0">
    <td class="column">
      <template v-if="indexLane ==0">
        {{backlog.backlogName}}
      </template>
      <template v-else>
        <ul class="card-list"
            @drop="drop($event)"
            @dragover="dragOver($event)"
            @dragenter="dragEnter"
            @dragleave="dragLeave"
            :data-s="level1.id"
            :data-line='backlog.backlogId'
        >
          <li class="card" draggable="true" v-for="card in backlog.cards" v-if="card.state==level1.id"
              @dragstart="dragStart($event)"
              :id="card.cardId"
              @dragend="dragEnd"
          >
            <div :touchId='card.cardId'
                 @touchstart="touchstart($event)"
                 @touchmove="touchmove($event)"
                 @touchend="touchend($event)"
            >

              {{card.cardName}}
            </div>
          </li>
        </ul>
      </template>
    </td>
  </template>
  <template v-else>
    <template v-for="(id,indexInlane) in level1.childrenIds">
      <td class="column">
        <template v-if="indexLane ==0 && indexInlane ==0">
          {{backlog.backlogName}}
        </template>
        <template v-else="">
          <ul class="card-list"
              @drop="drop($event)"
              @dragover="dragOver($event)"
              @dragenter.stop="dragEnter"
              @dragleave="dragLeave"
              :data-s="id"
              :data-line='backlog.backlogId'
          >
            <li class="card" draggable="true" v-for="card in backlog.cards" v-if="card.state==id"
                @dragstart="dragStart($event)"
                :id="card.cardId"
                @dragend="dragEnd"
            >
              <div :touchId='card.cardId'
                   @touchstart="touchstart($event)"
                   @touchmove="touchmove($event)"
                   @touchend="touchend($event)"
              >

                {{card.cardName}}
              </div>
            </li>
          </ul>
        </template>
      </td>
    </template>
  </template>
</tr>
</td>
</tr>
</tbody>
</table>
<el-dialog title="列定义" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
  <el-form :model="form" label-position="left" style="width: 70%" ref="form">
    <el-form-item label="列名称1" label-width="80px" prop="name1">
      <el-input v-model="form.name1" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="列名称2" label-width="80px" prop="name2" v-show="down">
      <el-input v-model="form.name2" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="列背景色" label-width="80px" prop="backgroundColor" v-show="color">
      <el-color-picker v-model="form.backgroundColor" show-alpha></el-color-picker>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addcolumn()">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        dialogFormVisible: false,//列编辑时的弹窗
        down: false,//列编辑时，是否需要拆分为两列，指向向下拆分时为true
        color: false,//只有最外层列新增时，允许选择背景颜色
        direction: '',//列拆分类型
        arg1: '',//传参
        arg2: '',//传参
        arg3: '',//传参
        form: {  //窗口表单
          name1: '',
          name2: '',
          backgroundColor: 'rgba(255,255,255,1)'
        },
        headerStyle: {  //表头thead样式
          position: 'static'
        },
        from: '',//拖住卡片起始状态
        to: '',  //拖住卡片目标状态
        formLine: '',//拖住卡片，在tbody中的那一行开始拖拽
        toLine: '',//拖住卡片，在tbody中的目标行，为了用来跨行不可拖拽
        dragCard: null,//被拖拽卡片对象
        dragIndex: 0,//被拖拽卡片落入新泳道的位置
        lane: [
          {
            id: 1,
            label: '开始',
            backgroundColor: 'rgba(255,255,255,1)',
            children: [
              {
                id: 11,
                label: "项目"
              },
              {
                id: 12,
                label: '未开始'
              }
            ]
          },
          {
            id: 2,
            label: '需求阶段',
            backgroundColor: 'rgba(255,255,255,1)',
            children: [
            ]
          },
          {
            id: 3,
            label: '需求就绪',
            backgroundColor: 'rgba(255,255,255,1)',
            children: [

            ]
          },
          {
            id: 4,
            label: '实现阶段',
            backgroundColor: 'rgba(255,255,255,1)',
            children: [

            ]
          },
          {
            id: 5,
            label: "待测试",
            backgroundColor: 'rgba(255,255,255,1)',
            children: [

            ]
          },
          {
            id: 6,
            label: "测试阶段",
            backgroundColor: 'rgba(255,255,255,1)',
            children: [

            ]
          },
          {
            id: 7,
            label: "待发布",
            backgroundColor: 'rgba(255,255,255,1)',
            children: [

            ]
          },
          {
            id: 8,
            label: "已发布",
            backgroundColor: 'rgba(255,255,255,1)',
            children: [

            ]
          }
        ],//泳道头的树形结构
        backlogs: [
          {
            backlogId: 1,
            backlogName: '项目A',
            cards: [
              {
                cardId: '1001',
                cardName: '33个',
                state: 12,
                type: 0,
              },
              {
                cardId: '1002',
                cardName: '33个',
                state: 12,
                type: 0,
              },
              {
                cardId: '1003',
                cardName: '33个',
                state: 12,
                type: 0,
              },
              {
                cardId: '1023',
                cardName: '34个',
                state: 12,
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
        ] //数据
      }
    },
    methods: {
      touchstart(ev){
        ev.stopPropagation();
        var top = $(window).scrollTop();
        var ele = document.elementFromPoint(ev.touches[0].pageX, ev.touches[0].pageY - top);
        this.from = $(ele).parents("UL.card-list").data('s') == undefined ? $(ele).data('s') : $(ele).parents("UL.card-list").data('s');
        this.formLine = $(ele).parents("UL.card-list").data('line') == undefined ? $(ele).data('line') : $(ele).parents("UL.card-list").data('line');
      },
      touchmove(ev){
        ev.preventDefault();
        var liText = '<li id="templateli" class="templateli"><div>放这里</div></li>'
        var top = $(window).scrollTop();
        var ele = document.elementFromPoint(ev.touches[0].pageX, ev.touches[0].pageY - top);
        if ($(ele)[0].id == 'templateli' || ($(ele).parents('LI')[0] && $(ele).parents('LI')[0].id == 'templateli')) {
          return;
        }
        $("#templateli").remove();
        this.toLine = $(ele).parents("UL.card-list").data('line') == undefined ? $(ele).data('line') : $(ele).parents("UL.card-list").data('line');
        if (this.formLine != this.toLine) {
          return;
        }
        if ($(ele)[0].tagName == 'UL') {
          $(ele).append(liText)
        } else if ($(ele)[0].tagName == 'LI') {
          $(ele).after(liText)
        } else if ($(ele).parents("LI") != undefined) {
          $(ele).parents("LI").before(liText)
        }
      },
      touchend(ev){
        if(!$("#templateli")[0])
          return;
        $("#templateli").text('同步中... ').append('<i class="el-icon-loading"></i>')
        var top = $(window).scrollTop();
        var ele = document.elementFromPoint(ev.changedTouches[0].pageX, ev.changedTouches[0].pageY - top);
        this.to = $(ele).parents("UL.card-list").data('s') == undefined ? $(ele).data('s') : $(ele).parents("UL.card-list").data('s');
        setTimeout(() => {
          var index = $("#templateli").index();
          var backlog_id = ''
          var id = ev.changedTouches[0].target.getAttribute('touchid')
          this.backlogs.forEach((backlog, index_backlog) => {
            backlog.cards.forEach((card, index_card) => {
              if (card.cardId == id) {
                backlog_id = backlog.backlogId;
                this.dragCard = backlog.cards.splice(index_card, 1)[0];
                this.dragIndex = index_card;
              }
            })
          })
          this.dragCard.state = this.to
          if (index == 0) {
            this.backlogs.forEach((backlog, index_backlog) => {
              if (backlog.backlogId == backlog_id) {
                backlog.cards.splice(index, 0, this.dragCard)
              }
            })
            //如果放到目标用到非首位，先找到上一元素ID和位置，再位置+1后插入
          } else {
            var prvCardId = $("#templateli").prev()[0].id;
            if (id == prvCardId) {
              this.backlogs.forEach((backlog, index_backlog) => {
                if (backlog.backlogId == backlog_id) {
                  backlog.cards.splice(this.dragIndex, 0, this.dragCard)
                }
              })
            } else {
              this.backlogs.forEach((backlog, index_backlog) => {
                if (backlog.backlogId == backlog_id) {
                  backlog.cards.splice(index + 1, 0, this.dragCard)
                }
              })
            }
          }

          $("#templateli").remove();
        }, 200)
        this.computedHeight();
      },
      /**
       * 所有列头编辑的方法，都需要先将卡片在看板上备份移除，列头修改好后，在恢复回来
       *  var obj = JSON.stringify(this.backlogs);
       this.backlogs = {}
       *  this.$nextTick(() => {
          this.backlogs = JSON.parse(obj)
        })
       * 上述操作可以避免因为拖拽时操作的实际DOM，而改变泳道是异步DOM操作，所引起的卡片位置混乱
       * */
      //删除列
      del(id){
        var obj = JSON.stringify(this.backlogs);
        this.backlogs = {}
        this.$nextTick(() => {
          this.lane.forEach((level1, index1) => {
            if (id == level1.id) {
              this.lane.splice(index1, 1)
            } else if (level1.children) {
              level1.children.forEach((level2, index2) => {
                if (id == level2.id) {
                  level1.children.splice(index2, 1)
                } else if (level2.children) {
                  level2.children.forEach((level3, index3) => {
                    if (id == level3.id) {
                      level2.children.splice(index3, 1)
                    }
                  })
                }
              })
            }
          })
        })
        this.$nextTick(() => {
          this.backlogs = JSON.parse(obj)
        })
      },
      //增加列点确定按钮时，根据direction确定调用那个方法
      addcolumn(){
        this.dialogFormVisible = false;
        switch (this.direction) {
          case '1right':
            this.level1AddRight(this.arg1);
            break;
          case '1donw':
            this.level1AddDown(this.arg1);
            break;
          case '2right':
            this.level2AddRight(this.arg1, this.arg2);
            break;
          case '2down':
            this.level2AddDown(this.arg1, this.arg2);
            break;
          case '3right':
            this.level3AddRight(this.arg1, this.arg2, this.arg3);
            break;
        }
      },
      //增加列弹窗输入列名称
      showDialog(direction, arg1, arg2, arg3){
        this.dialogFormVisible = true;
        this.direction = direction;
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.arg3 = arg3;
        if (direction == '1right' || direction == '3right' || direction == '2right') {
          this.down = false;
        } else {
          this.down = true;
        }
        if (direction == '1right') {
          this.color = true;
        } else {
          this.color = false;
        }
      },
      //第一行向下加两列
      level1AddDown(index){
        var obj = JSON.stringify(this.backlogs);
        this.backlogs = {}
        this.$nextTick(() => {
          this.lane[index].children.push({id: this.sequence(), label: this.form.name1, children: []})
          this.lane[index].children.push({id: this.sequence(), label: this.form.name2, children: []})
          this.$refs['form'].resetFields()
        })
        this.$nextTick(() => {
          this.backlogs = JSON.parse(obj)
        })
      },
      //第二行向下增加两列
      level2AddDown(level1_id, index){
        var obj = JSON.stringify(this.backlogs);
        this.backlogs = {}
        this.$nextTick(() => {
          this.lane.forEach(level1 => {
            if (level1.id == level1_id) {
              if (level1.children[index].children) {
                level1.children[index].children.push({id: this.sequence(), label: this.form.name1, children: []})
                level1.children[index].children.push({id: this.sequence(), label: this.form.name2, children: []})
                this.$refs['form'].resetFields()
              } else {
                let arr = []
                this.$set(level1.children[index], 'children', arr)
                level1.children[index].children.push({id: this.sequence(), label: this.form.name1, children: []})
                level1.children[index].children.push({id: this.sequence(), label: this.form.name2, children: []})
                this.$refs['form'].resetFields()
              }
            }
          })
        })
        this.$nextTick(() => {
          this.backlogs = JSON.parse(obj)
        })
      },
      //第一行向右加一列
      level1AddRight(index){
        var obj = JSON.stringify(this.backlogs);
        this.backlogs = {}
        this.$nextTick(() => {
          this.lane.splice(index + 1, 0, {
            id: this.sequence(),
            label: this.form.name1,
            backgroundColor: this.form.backgroundColor,
            children: []
          })
          this.$refs['form'].resetFields()
        })
        this.$nextTick(() => {
          this.backlogs = JSON.parse(obj)
        })

      },
      //第二行向右加一列
      level2AddRight(level1_id, index){
        var obj = JSON.stringify(this.backlogs);
        this.backlogs = {}
        this.$nextTick(() => {
          this.lane.forEach(level1 => {
            if (level1.id == level1_id) {
              level1.children.splice(index + 1, 0, {id: this.sequence(), label: this.form.name1, children: []})
              this.$refs['form'].resetFields()
            }
          })
        })
        this.$nextTick(() => {
          this.backlogs = JSON.parse(obj)
        })
      },

      //第三行向右加一列
      level3AddRight(level1_id, level2_id, index){
        var obj = JSON.stringify(this.backlogs);
        this.backlogs = {}
        this.$nextTick(() => {
          this.lane.forEach(level1 => {
            if (level1.id == level1_id) {
              level1.children.forEach(level2 => {
                if (level2.id == level2_id) {
                  level2.children.splice(index + 1, 0, {id: this.sequence(), label: this.form.name1, children: []})
                  this.$refs['form'].resetFields()
                }
              })
            }
          })
        })
        this.$nextTick(() => {
          this.backlogs = JSON.parse(obj)
        })
      },
      sequence(){
        return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
      },
      //添加一个卡片
      addCard(backlog){
        this.backlogs.forEach((item, index) => {
          if (item.backlogId == backlog.backlogId) {
            item.cards.unshift({
              cardId: this.sequence(),
              cardName: this.sequence(),
              state: 12,
              type: 0,
            })
            this.computedHeight()
          }
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
      computedHeight(){
        this.$nextTick(() => {
          $('tr.row').each((index, row) => {
            var arr = [];
            $(row).find('td.column>ul').each((index, item) => {
              if (item.children.length <= 2) {
                arr.push(300)
              } else {
                arr.push(130 * item.children.length + 140)
              }
            })
            $(row).find('td.column>ul').css('height', Math.max.apply(Math, arr) + 'px')
            $(row).find('td.column').css('height', Math.max.apply(Math, arr) + 'px')
          })
        })

      },
      dragStart(ev) {
        if (!ev.target.id) return;
        ev.dataTransfer.setData("Text", ev.target.id);
        let Ul = $("#" + ev.target.id).parents("UL.card-list")
        this.from = Ul.data('s');
        this.formLine = Ul.data('line');
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
        if (this.formLine != this.toLine) {
          return;
        }
        this.to = $target.parents("UL.card-list").data('s') == undefined ? $target.data('s') : $target.parents("UL.card-list").data('s');
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
            backlog.cards.forEach((card, index_card) => {
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
              if (backlog.backlogId == backlog_id) {
                backlog.cards.splice(index, 0, this.dragCard)
              }
            })
            //如果放到目标用到非首位，先找到上一元素ID和位置，再位置+1后插入
          } else {
            var prvCardId = $("#templateli").prev()[0].id;
            if (id == prvCardId) {
              this.backlogs.forEach((backlog, index_backlog) => {
                if (backlog.backlogId == backlog_id) {
                  backlog.cards.splice(this.dragIndex, 0, this.dragCard)
                }
              })
            } else {
              this.backlogs.forEach((backlog, index_backlog) => {
                if (backlog.backlogId == backlog_id) {
                  backlog.cards.splice(index + 1, 0, this.dragCard)
                }
              })
            }
          }

          $("#templateli").remove();
          this.dropping = false;
        }, 200)
        this.computedHeight();
      },
    },
    mounted(){
      let that = this;
      window.onscroll = function () {
        //屏幕滚动高度
        let scrollTop = document.documentElement.scrollTop;
        //屏幕左右滚动距离
        let scrollLeft = document.documentElement.scrollLeft;
        //hedaer本身高度
        let headerHeight = document.getElementById('cxHeader').offsetHeight;
        let headerWidth = document.getElementById('cxHeader').offsetWidth;
        //其他元素偏移量
        let offSet = 0;
        if (scrollTop >= headerHeight + offSet) {
          that.headerStyle = {
            position: 'fixed',
            top: scrollTop,
            left: (-scrollLeft) + 'px',
            width: headerWidth + 'px',
            zIndex: 1000,
            opacity: 0.9
          }
        } else {
          that.headerStyle = {
            position: 'static',
            width: headerWidth + 'px',
            zIndex: 0,
            opacity: 1
          }
        }
      }
      this.computedHeight();
    },
    computed: {},
    components: {},
    watch: {
      /**
       * 列合并需要知道下层元素有几个，一级猎头，拖拽区域泳道向右合并时，需要知道最底层节点个数
       * 方法实时监控lane变化，将最底层节点个数汇总到最上层的deepNum上,将最底层节点ID汇总到childrenIds
       * */
      'lane': {
        handler(newLane, oldLane){
          //先循环一级
          this.lane.forEach((level1, index) => {
            level1.deepNum = 0;
            level1.childrenIds = [];
            //如果一级有子元素
            if (level1.children && level1.children.length > 0) {
              level1.children.forEach((level2, index) => {
                //如果二级没有子元素
                if (!level2.children || level2.children.length == 0) {
                  level1.deepNum++;
                  //如果二级没有子元素  将二级ID放入临时数组
                  level1.childrenIds.push(level2.id);
                } else {
                  level1.deepNum += level2.children.length;
                  level2.children.forEach((level3, index) => {
                    //如果二级有子元素  将三级ID放入临时数组
                    level1.childrenIds.push(level3.id);
                  })
                }
              })
            } else {
              //如果一级没有子元素，将一级ID，放入数组中
              level1.childrenIds.push(level1.id);
            }
          })
          this.computedHeight()
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
      .el-icon-delete
        font-size 12px
        &:hover
          color red
          cursor pointer
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
    tbody > tr
      border-bottom 2px solid #aaa
    tbody > tr > td > tr > td
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
          cursor: pointer
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
