<template>
  <div style="width: 100%;height: 100%;margin-bottom: 100px">
    <div class="newone">
      <el-button type="primary" plain style="float: right" @click="newone">新建需求</el-button>
    </div>
    <table class="wbsTree" id="wbsTableTree" style="width: 100%">
      <thead>
      <tr>
        <th><span v-show="!allCollapse" class="iconfont  icon-jiahao" @click="allOpen"></span>
          <span v-show="allCollapse" class="iconfont  icon-jianhao" @click="allClose"></span>
          标题
        </th>
        <th>编号</th>
        <th style="width: 200px">操作人</th>
        <th style="width: 200px">日期</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody @drop="drop"
             @dragover="dragover"
             @dragenter="dragenter"
             @dragleave="dragleave">
      <template v-for="(item,index) in tabledata">
        <tr :draggable="item.level ==2 || item.level ==3"
            @dragstart="dragstart"
            @dragend="dragend"
            :id="item.id"
            :data-level="item.level"
            v-if="item.id"
        >
          <td style="width: 450px">
            <div :style=titleStyle>
            <span v-show="item.count>0">
              <template v-if="item.level==2">
                <div v-show="item.isChild && !item.isLast" class="child">
                  <div class="child-whippletree"></div>
                </div>
                <div v-show="item.isChild && item.isLast" class="child-last">
                  <div class="child-whippletree-last"></div>
                </div>
              </template>
              <span v-show="item.collapse" class="iconfont  icon-jiahao" @click="open(item.id,true)"></span>
              <span v-show="!item.collapse" class="iconfont icon-jianhao" @click="close(item.id,true)"></span>
            </span>
              <span v-show="item.count==0">
               <template v-if="item.level==1">
                  <span style="display: inline-block;width: 16px"></span>
               </template>
              <template v-if="item.level==3">
                <div v-show="item.isChild && !item.lastTask" class="child"></div>
                <div v-show="item.isChild && item.lastTask" class="child" style="border-color: transparent"></div>
              </template>
              <div v-show="item.isChild && !item.isLast" class="child">
                <div class="child-whippletree"></div>
              </div>
              <div v-show="item.isChild && item.isLast" class="child-last">
                <div class="child-whippletree-last"></div>
              </div>
            </span>
              <span v-show="item.titleFlag" @click.stop=""
                    style="display: inline-block;vertical-align: middle;width: 70%;height: 100%">
              <el-input v-model.trim="form.title"
                        size="mini"
                        placeholder="请输入"
                        @blur="modifyColumn(item)"
                        @keyup.13.native="modifyColumn(item)" style="vertical-align: middle"></el-input>
            </span>
              <span v-show="!item.titleFlag" @click.stop="clickColumn(item,'titleFlag')">{{item.title}}</span>
            </div>
          </td>
          <td>
            <div :style={width:widthId}>{{item.id}}</div>
          </td>
          <td>
            <div :style={width:widthUser}>
             <span v-show="item.userFlag" @click.stop=""
                   style="display: inline-block;vertical-align: middle;width: 140px;height: 100%">
              <el-select v-model="form.user"
                         size="mini"
                         @change="modifyColumn(item)" style="vertical-align: middle">
                <el-option label="Tom" value="Tom"></el-option>
                    <el-option label="Jerry" value="Jerry"></el-option>
                    <el-option label="mohammed" value="mohammed"></el-option>
                    <el-option label="steven" value="steven"></el-option>
                    <el-option label="alihan" value="alihan"></el-option>
                </el-select>
            </span>
              <span v-show="!item.userFlag" @click.stop="clickColumn(item,'userFlag')">{{item.user}}</span>
            </div>
          </td>
          <td>
            <div :style={width:widthTime}>
            <span v-show="item.timeFlag" @click.stop=""
                  style="display: inline-block;vertical-align: middle;width: 140px;height: 100%">
               <el-date-picker type="date" placeholder="选择日期"
                               size="mini"
                               :clearable="false"
                               :editable="false"
                               style="width: 100%;vertical-align: middle"
                               v-model="form.time"
                               @change="modifyColumn(item)">
               </el-date-picker>
            </span>
              <span v-show="!item.timeFlag"
                    @click.stop="clickColumn(item,'timeFlag')">{{item.time | timeFormate('YYYY-MM-DD')}}</span>
            </div>
          </td>
          <td>
            <div :style={width:widthOperation}>
              <span v-if="item.level==1 || item.level==2" class="iconfont icon-ziliucheng" @click="addRow(item)"></span>
              <span v-if="item.level==3" class="iconfont icon-ziliucheng" style="color:#ddd"></span>
              <el-popover
                placement="right"
                width="100"
                trigger="click">
                <ul class="popover-ul">
                  <li @click="copy(item)">复制</li>
                  <li @click="del(item)">删除</li>
                </ul>
                <span class="iconfont icon-moreif" slot="reference"></span>
              </el-popover>
            </div>
          </td>
        </tr>
        <tr v-if="!item.id">
          <td colspan="5">
            <div style="width: 100%">
              <el-form ref="form" :model="form" label-width="50px">
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="标题">
                      <el-input v-model="form.title"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="操作人">
                      <el-select v-model="form.user" placeholder="请选择">
                        <el-option label="Tom" value="Tom"></el-option>
                        <el-option label="Jerry" value="Jerry"></el-option>
                        <el-option label="mohammed" value="mohammed"></el-option>
                        <el-option label="steven" value="steven"></el-option>
                        <el-option label="alihan" value="alihan"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="日期">
                      <el-date-picker
                        v-model="form.time"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item>
                      <el-button type="primary" @click="onSubmit" size="mini">确定</el-button>
                      <el-button size="mini" @click="cancelRow">取消</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </template>
      <template v-if="tabledata.length==0">
        <tr>
          <td>
            <div></div>
          </td>
          <td>
            <div></div>
          </td>
          <td>
            <div></div>
          </td>
          <td>
            <div></div>
          </td>
          <td>
            <div></div>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script type="text/ecmascript-6">
  import {lsRead, lsWrite,lsClear} from '../common/js/ls'
  export default{
    data(){
      return {
        allCollapse: false,
        dragEle: {
          id: '',
          level: ''
        },
        titleStyle: {
          width: '480px',
          textAlign: 'left'
        },
        widthId: '100%',
        widthUser: '200px',
        widthTime: '200px',
        widthOperation: '100%',
        tabledata: [],
        origndata: [
          {
            id: '1',
            title: '需求A',
            user: 'Tom',
            time: 1572660777347,
            titleFlag: false,
            userFlag: false,
            timeFlag: false,
            children: [
              {
                id: '11',
                title: '故事A',
                user: 'steven',
                time: 1572660777347,
                titleFlag: false,
                userFlag: false,
                timeFlag: false,
                children: [
                  {
                    id: '111',
                    title: '任务A',
                    user: 'steven',
                    time: 1572660777347,
                    titleFlag: false,
                    userFlag: false,
                    timeFlag: false,
                  },
                  {
                    id: '112',
                    title: '任务B',
                    user: 'mohammed',
                    time: 1572660777347,
                    titleFlag: false,
                    userFlag: false,
                    timeFlag: false,
                  }
                ]
              },
              {
                id: '12',
                title: '故事B',
                user: 'Jerry',
                time: 1572660777347,
                titleFlag: false,
                userFlag: false,
                timeFlag: false,
                children: [
                  {
                    id: '211',
                    title: '任务C',
                    user: 'Jerry',
                    time: 1572660777347,
                    titleFlag: false,
                    userFlag: false,
                    timeFlag: false,
                  },
                  {
                    id: '212',
                    title: '任务D',
                    user: 'alihan',
                    time: 1572660777347,
                    titleFlag: false,
                    userFlag: false,
                    timeFlag: false,
                  }
                ]
              }
            ]
          }, {
            id: '2',
            title: '需求B',
            user: 'alihan',
            time: 1572660777347,
            titleFlag: false,
            userFlag: false,
            timeFlag: false,
            children: [
              {
                id: '21',
                title: '故事C',
                user: 'steven',
                time: 1572660777347,
                titleFlag: false,
                userFlag: false,
                timeFlag: false,
                children: [
                  {
                    id: '1211',
                    title: '任务E',
                    user: 'steven',
                    time: 1572660777347,
                    titleFlag: false,
                    userFlag: false,
                    timeFlag: false,
                  },
                  {
                    id: '1212',
                    title: '任务F',
                    user: 'steven',
                    time: 1572660777347,
                    titleFlag: false,
                    userFlag: false,
                    timeFlag: false,
                  }
                ]
              },
              {
                id: '22',
                title: '故事D',
                user: 'steven',
                time: 1572660777347,
                titleFlag: false,
                userFlag: false,
                timeFlag: false,
                children: []
              }
            ]
          },
          {
            id: '3',
            title: '需求C',
            user: 'steven',
            time: 1572660777347,
            titleFlag: false,
            userFlag: false,
            timeFlag: false,
            children: []
          }
        ],
        form: {
          title: '',
          user: '',
          time: '',
        },
        row: ''
      }
    },
    methods: {
      dragover(ev){
        if (ev.preventDefault) {
          ev.preventDefault();
        } else {
          window.event.returnValue = false;
        }
      },
      dragstart(ev) {
        ev.dataTransfer.setData("Text", ev.target.id);
        this.tabledata.forEach(item => {
          if (item.id == ev.target.id) {
            this.dragEle.id = item.id;
            this.dragEle.level = item.level;
          }
        })
        ev.target.style.color = '#bbb'
      },
      dragend(ev){
        this.$nextTick(() => {
          $("#templateTr").remove();
          $("tbody tr").css('color', 'black')
        })
      },
      dragenter(ev){
        if (ev.preventDefault) {
          ev.preventDefault();
        } else {
          window.event.returnValue = false;
        }
        var liText = '<tr id="templateTr" class="templateTr"><td colspan="5">Drop Here</td></tr>'
        var $target = $(ev.target)
        if ($target[0].id == 'templateTr' || ($target.parents('TR')[0] && $target.parents('TR')[0].id == 'templateTr')) {
          return;
        }
        $("#templateTr").remove();
        if ($target.parents("TR") != undefined) {
          if (this.dragEle.level == 2 && $target.parents("TR").data('level') == 1) {
            $target.parents("TR").after(liText)
          }
          if (this.dragEle.level == 3 && ($target.parents("TR").data('level') == 3 || $target.parents("TR").data('level') == 2)) {
            $target.parents("TR").after(liText)
          }
        }
      },
      dragleave(ev){
      },
      drop(ev) {
        if (ev.preventDefault) {
          ev.preventDefault();
          ev.stopPropagation();
        } else {
          window.event.cancelBubble = true;
          window.event.returnValue = false;
        }
        var sourceId = this.dragEle.id;
        var sourceLevel = this.dragEle.level;
        var sourceObject = null;
        var targetId = "";
        var targetLevel = "";
        if ($("#templateTr")[0]) {
          targetId = this.tabledata[$("#templateTr").index() - 1].id;
          targetLevel = this.tabledata[$("#templateTr").index() - 1].level;
          if (sourceLevel == 2 && targetLevel == 1 && targetId != sourceId) {
            this.origndata.forEach(item => {
              item.children.forEach((subitem, index) => {
                if (subitem.id == sourceId) {
                  sourceObject = item.children.splice(index, 1)[0]
                }
              })
            })
            this.origndata.forEach(item => {
              if (item.id == targetId) {
                item.children.unshift(sourceObject)
              }
            })
          }
          if (sourceLevel == 3 && targetId != sourceId) {
            this.origndata.forEach(item => {
              item.children.forEach((subitem) => {
                subitem.children.forEach((lastItem, index) => {
                  if (lastItem.id == sourceId) {
                    sourceObject = subitem.children.splice(index, 1)[0]

                  }
                })
              })
            })
            if (targetLevel == 3) {
              this.origndata.forEach(item => {
                item.children.forEach((subitem) => {
                  subitem.children.forEach((lastItem, index) => {
                    if (lastItem.id == targetId) {
                      subitem.children.splice(index + 1, 0, sourceObject)
                    }
                  })
                })
              })
            } else if (targetLevel == 2) {
              this.origndata.forEach(item => {
                item.children.forEach((subitem) => {
                  if (subitem.id == targetId) {
                    subitem.children.splice(0, 0, sourceObject)
                  }
                })
              })
            }
          }
        }
        $("#templateTr").remove();
        $("tbody tr").css('color', 'black');
        this.init();
      },
      open(id, pageClick){
        var level = 2;
        var children = [];
        var temp = this.origndata.filter(item => {
          return item.id == id;
        })
        if (temp.length > 0) {
          children = temp[0].children
        }
        //如果需求没有故事，需要找任务
        if (children.length == 0) {
          this.origndata.forEach(item => {
            item.children.forEach((subItem, index) => {
              level = 3;
              if (subItem.id == id) {
                children = subItem.children;
                if (index == item.children.length - 1) {
                  children.forEach(lastChild => {
                    this.$set(lastChild, 'lastTask', true)
                  })
                } else {
                  children.forEach(lastChild => {
                    this.$set(lastChild, 'lastTask', false)
                  })
                }
              }
            })
          })
        }
        //循环所有的故事或者任务，设定是否最后一个元素，是否有子，和level
        children.forEach((item, index) => {
          item.isChild = true;
          if (index == children.length - 1) {
            item.isLast = true;
          } else {
            item.isLast = false;
          }
          if (item.children && item.children.length > 0) {
            this.$set(item, 'count', item.children.length)
            this.$set(item, 'collapse', true)
          } else {
            this.$set(item, 'count', 0)
          }
          this.$set(item, 'level', level)
        })
        //将点击的元素下面的子，插入到table中，并展开
        this.tabledata.forEach((item, index) => {
          if (item.id == id) {
            item.collapse = false;
            this.tabledata.splice(index + 1, 0, ...children)
          }
        })
        //将临时增加录入元素删除
        this.tabledata.forEach((item, index) => {
          if (!item.id) {
            this.tabledata.splice(index, 1)
          }
        })
        //如果是从页面点击的，需要记录下来，下次刷新自动点开
        if (pageClick) {
          var ids = lsRead('ids');
          if (ids && ids.length > 0) {
            ids.push(id)
          } else {
            ids = [id];
          }
          lsWrite('ids', ids);
        }
      },
      findChild(id){
        var ids = [];
        this.origndata.forEach(item => {
          if (item.id == id) {
            item.children.forEach(child => {
              ids.push(child.id)
              if (child.children && child.children.length > 0) {
                child.children.forEach(subChild => {
                  ids.push(subChild.id)
                })
              }
            })
          } else {
            item.children.forEach(child => {
              if (child.id == id) {
                if (child.children && child.children.length > 0) {
                  child.children.forEach(subChild => {
                    ids.push(subChild.id)
                  })
                }
              }
            })
          }
        })
        return ids;
      },
      close(id, pageClick){
        var children = [];
        children = this.findChild(id)
        children.forEach(id => {
          this.tabledata.forEach((row, index) => {
            if (id == row.id) {
              this.tabledata.splice(index, 1)
            }
          })
        })
        this.tabledata.forEach(item => {
          if (item.id == id) {
            item.collapse = true;
          }
        })
        this.tabledata.forEach((item, index) => {
          if (!item.id) {
            this.tabledata.splice(index, 1)
          }
        })
        if (pageClick) {
          var ids = lsRead('ids');
          ids.forEach((lsId, index) => {
            if (id == lsId) {
              ids.splice(index, 1);
            }
          })
          lsWrite('ids', ids);
        }
      },
      addRow(row){
        this.initForm();
        this.row = row;
        var rownum = 0;
        this.tabledata.forEach((item, index) => {
          if (!item.id) {
            this.tabledata.splice(index, 1)
          }
        })
        this.tabledata.forEach((item, index) => {
          if (item.id == row.id) {
            rownum = index;
          }
        })
        this.tabledata.splice(rownum + 1, 0, {});
      },
      cancelRow(){
        this.tabledata.forEach((item, index) => {
          if (!item.id) {
            this.tabledata.splice(index, 1)
          }
        })
      },
      onSubmit(){
        if (this.row != null) {
          this.origndata.forEach(item => {
            if (item.id == this.row.id) {
              item.children.unshift({
                id: new Date().getTime(),
                title: this.form.title,
                user: this.form.user,
                time: new Date(this.form.time).getTime(),
                titleFlag: false,
                userFlag: false,
                timeFlag: false,
                children: []
              })
            } else {
              item.children.forEach(subItem => {
                if (subItem.id == this.row.id) {
                  subItem.children.unshift({
                    id: new Date().getTime(),
                    title: this.form.title,
                    user: this.form.user,
                    time: new Date(this.form.time).getTime(),
                    titleFlag: false,
                    userFlag: false,
                    timeFlag: false,
                  })
                }
              })
            }
          })
          var ids = lsRead('ids');
          if (ids.filter(id => {
              return id == this.row.id
            }).length == 0) {
            ids.push(this.row.id)
            lsWrite('ids', ids)
          }
        } else {
          this.origndata.unshift({
            id: new Date().getTime(),
            title: this.form.title,
            user: this.form.user,
            time: new Date(this.form.time).getTime(),
            titleFlag: false,
            userFlag: false,
            timeFlag: false,
            children: []
          })
        }
        this.init();
      },
      del(row){
        this.$confirm(`是否删除《${row.title}》及其子工作项?`, '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.origndata.forEach((item, index) => {
            if (item.id == row.id) {
              this.origndata.splice(index, 1);
            } else {
              item.children.forEach((subItem, index) => {
                if (subItem.id == row.id) {
                  item.children.splice(index, 1);
                } else {
                  subItem.children.forEach((lastItem, index) => {
                    if (lastItem.id == row.id) {
                      subItem.children.splice(index, 1);
                    }
                  })
                }
              })
            }
          })
          this.init();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      newone(){
        this.row = null;
        this.initForm();
        this.cancelRow();
        this.tabledata.splice(0, 0, {});
      },
      initForm(){
        this.form = {
          titel: '',
          user: '',
          time: ''
        }
      },
      copy(row){
        var copyItem = {
          id: new Date().getTime(),
          title: row.title,
          user: row.user,
          time: row.time,
          titleFlag: false,
          userFlag: false,
          timeFlag: false,
        }
        if (row.level != 3) {
          copyItem.children = []
        }
        this.origndata.forEach((item, index) => {
          if (item.id == row.id) {
            this.origndata.splice(index + 1, 0, copyItem);
          } else {
            item.children.forEach((subItem, index) => {
              if (subItem.id == row.id) {
                item.children.splice(index + 1, 0, copyItem);
              } else {
                subItem.children.forEach((lastItem, index) => {
                  if (lastItem.id == row.id) {
                    subItem.children.splice(index + 1, 0, copyItem);
                  }
                })
              }
            })
          }
        })
        this.init();
      },
      modifyColumn(item){
        this.cancelRow();
        this.origndata.forEach(child => {
          if (child.id == item.id) {
            child.title = this.form.title;
            child.user = this.form.user;
            child.time = new Date(this.form.time).getTime();
          } else {
            child.children.forEach(subChild => {
              if (subChild.id == item.id) {
                subChild.title = this.form.title;
                subChild.user = this.form.user;
                subChild.time = new Date(this.form.time).getTime();
              } else {
                subChild.children.forEach(lastChild => {
                  if (lastChild.id == item.id) {
                    lastChild.title = this.form.title;
                    lastChild.user = this.form.user;
                    lastChild.time = new Date(this.form.time).getTime()
                  }
                })
              }
            })
          }
        })
        this.returnColumn();
        this.init();
      },
      clickColumn(item, flag){
        this.cancelRow();
        this.form = Object.assign({}, item)
        var id = item.id
        this.returnColumn();
        this.origndata.forEach(child => {
          if (child.id == id) {
            child[flag] = true;
          } else {
            child.children.forEach(subChild => {
              if (subChild.id == id) {
                subChild[flag] = true;
              } else {
                subChild.children.forEach(lastChild => {
                  if (lastChild.id == id) {
                    lastChild[flag] = true;
                  }
                })
              }
            })
          }
        })
      },
      allOpen(){
        this.allCollapse = true;
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        this.origndata.forEach(item => {
          arr1.push(item.id)
          item.children.forEach(subItem=>{
            arr2.push(subItem.id)
            subItem.children.forEach(lastItem=>{
              arr3.push(lastItem.id)
            })
          })
        })
        lsWrite('ids',arr1.concat(arr2,arr3))
        this.init();
      },
      allClose(){
        lsWrite('ids',[])
        this.init();
        this.allCollapse = false;
      },
      returnColumn(){
        this.origndata.forEach(child => {
          child['titleFlag'] = false;
          child['userFlag'] = false;
          child['timeFlag'] = false;
          child.children.forEach(subChild => {
            subChild['titleFlag'] = false;
            subChild['userFlag'] = false;
            subChild['timeFlag'] = false;
            subChild.children.forEach(lastChild => {
              lastChild['titleFlag'] = false;
              lastChild['userFlag'] = false;
              lastChild['timeFlag'] = false;
            })
          })
        })
      },
      init(){
        this.tabledata = [];
        this.origndata.forEach(item => {
          if (item.children.length > 0) {
            this.$set(item, 'count', item.children.length)
            this.$set(item, 'collapse', true)
          } else {
            this.$set(item, 'count', 0)
          }
          this.$set(item, 'level', 1)
          this.tabledata.push(item);
        })
        var ids = Array.from(new Set(lsRead('ids') || []));
        var level1 = [];
        var level2 = [];
        var level3 = [];
        ids.forEach(id => {
          this.origndata.forEach(item => {
            if (item.id == id) {
              level1.push(id);
            } else {
              item.children.forEach(subItem => {
                if (subItem.id == id) {
                  level2.push(id)
                } else {
                  subItem.children.forEach(lastItem => {
                    if (lastItem.id == id) {
                      level3.push(id);
                    }
                  })
                }
              })
            }
          })
        })
        level1.concat(level2, level3).forEach((lsId, index) => {
          this.$nextTick(() => {
            this.open(lsId)
          })
        })
        lsWrite('origndata3', this.origndata);
      },
    },
    mounted(){
      let vue_this = this;
      window.onclick = function () {
        vue_this.returnColumn();
      }
      if (lsRead('origndata3') && lsRead('origndata3').length > 0) {
        this.origndata = lsRead('origndata3');
      }
      this.init();
    },
    computed: {},
    components: {}
  }
</script>
<style>
  .templateTr {
    border-bottom: 1px solid #ccc;
    overflow: hidden;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #4194DA;
  }

  .el-popover {
    padding: 0;
  }

  #wbsTableTree .el-form-item__content {
    height: 40px;
  }

</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .newone
    width 100%;
    height 40px;

  .popover-ul
    width 100%;
    margin 0;
    padding 0;
    li
      padding 10px 10px 10px 20px
      cursor pointer
      border-radius 4px
      &:hover
        background-color #EEE;

  .el-form-item
    margin 0

  .wbsTree
    border-collapse collapse;
    border-spacing:0;
    margin-bottom 100px
    thead tr
      border-bottom 1px solid black
      height 30px;
      line-height 30px;
    tbody tr
      &:hover
        cursor pointer
        background-color #eee
    tbody tr td
      border-bottom 1px solid #ccc
      overflow hidden
      height 30px;
      line-height 30px;
      text-align center
      div
        overflow hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .child
          position: relative;
          display: inline-block;
          width: 20px;
          height: 30px;
          border-left: 1px solid #bbb;
          vertical-align: bottom;
          margin-left: 30px
          .child-whippletree
            position: absolute;
            width: 30px;
            height: 0;
            border-bottom: 1px solid #bbb;
            left: 0;
            top: 50%
        .child-last
          position: relative;
          display: inline-block;
          width: 20px;
          height: 15px;
          border-left: 1px solid #bbb;
          vertical-align: top;
          margin-left: 30px
          .child-whippletree-last
            position: absolute;
            width: 30px;
            height: 0;
            border-bottom: 1px solid #bbb;
            left: 0;
            bottom: 0
</style>
