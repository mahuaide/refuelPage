<template>
  <div class="grad" id="mydiv"
       @dragover="dragOver($event)"
       @dragenter="dragEnter($event)"
       @drop="drop($event)"
       @dragleave="dragLeave($event)">
    <!--背景定位,初始时相对于父元素绝对定位到屏幕外，拖拽时随鼠标移动，被拖拽元素drop时，将此元素left、top赋值给被拖拽元素-->
    <div class="dropBackground" id="dropBackground"></div>
    <!--被拖拽元素 2X2 -->
    <div id='echarts1'
         draggable="true"
         @dragstart="dragStart($event)"
         @dragend="dragEnd($event)"
         class="echarts_2X2"
         data-w="2"
         data-h="2"
    >
      <i class="icon el-icon-close" @click="_del('echarts1')"></i>
      <div class="echarts_body" id="echarts1_body"></div>
    </div>
    <!--被拖拽元素 3X3 -->
    <div id='echarts2'
         draggable="true"
         @dragstart="dragStart($event)"
         @dragend="dragEnd"
         class="echarts_3X2"
         data-w="3"
         data-h="2"
    >
      <i class="icon el-icon-close" @click="_del('echarts2')"></i>
      <div class="echarts_body" id="echarts2_body"></div>
    </div>
    <!--被拖拽元素 2X2 -->
    <div id='echarts3'
         draggable="true"
         @dragstart="dragStart($event)"
         @dragend="dragEnd($event)"
         class="echarts_2X2"
         data-w="2"
         data-h="2"
    >
      <i class="icon el-icon-close" @click="_del('echarts3')"></i>
      <div class="echarts_body" id="echarts3_body"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import echarts from 'echarts'
  export default{
    data(){
      return {
        dragEleId: '', //被拖拽元素ID
        dragMap: (() => {
          return new Map();
        })(),  //已进入目标区域的被拖拽元素队列,结构为["ID",{"x":0,"y":0,"w":2,"h":2}]
        echartsMapImg: (() => {
          return new Map();//存放echarts微缩图，拖拽时使用
        })(),
      }
    },
    methods: {
      dragStart(ev){
        if(navigator.userAgent.indexOf("MSIE")==-1) {
          ev.dataTransfer.setData("Text", ev.target.id);
        }
        ev.dataTransfer.effectAllowed ='copy'
        ev.dataTransfer.setDragImage(this.echartsMapImg.get(ev.target.id), 177, 177);
        //记录被拖拽元素ID
        this.dragEleId = ev.target.id;
      },
      dragEnd(ev){
        //鼠标不在目标区域且松开时，隐藏背景图，也可以放入leave中但是chrome不支持
        this._hideBackground();
      },
      dragEnter(ev){
      },
      dragOver(ev){
        this._preventDefault(ev);
        //拖拽过程中计算鼠标距离，定位背景元素距离和宽高
        this._findPosition(ev);
      },
      drop(ev){
        this._preventDefault(ev);
        let id = ev.dataTransfer.getData("Text");
        //被拖拽元素
        let dragEle = document.getElementById(id);
        //设置被拖拽元素位置
        let backgroundEle = document.getElementById('dropBackground');
        let x = parseInt(backgroundEle.getAttribute('data-x'));
        let y = parseInt(backgroundEle.getAttribute('data-y'));
        let w = parseInt(dragEle.getAttribute('data-w'));
        let h = parseInt(dragEle.getAttribute('data-h'));
        //记录下拖拽前的数据
        let mapOldJSON = JSON.stringify(this.dragMap);
        //被拖拽元素更新拖拽队列
        this.dragMap.set(id, {x, y, w, h});
        //解决位置冲突，重新排列dragMap中拖拽元素位置
        this._resolveConflict([id]);
        //记录下拖拽后的数据
        let mapNewJSON = JSON.stringify(this.dragMap);
        //如果JSON前后不一致，说明位置变化，需要重新绘制页面，并发请求给后台
        if (mapOldJSON != mapNewJSON) {
          //重绘队列所有被拖拽元素位置
          this._drowDragEle();
          //给后台发请求，记录元素位置
        }
      },
      dragLeave(ev){
      },
      //删除目标区域中的图
      _del(id){
        if (!this.dragMap.has(id)) {
          return;
        } else {
          this.dragMap.delete(id);
          let Ele = document.getElementById(id);
          Ele.style.left = 0 + 'px';
          Ele.style.top = -342 + 'px';
          Ele.setAttribute('data-x', 0);
          Ele.setAttribute('data-y', 0);
        }
      },
      //解决位置冲突，重新排列dragMap中拖拽元素位置,（优先保证移动元素位置）
      _resolveConflict(moveIds){
        //如果map中就一个元素，或者没有可移动元素，退出
        if (this.dragMap.size <= 1 || !moveIds || moveIds.length == 0) {
          return;
        } else {
          let newMoveIds = [];
          //移动元素为M，map中元素为O
          for (let M of moveIds) {
            let M_position = this.dragMap.get(M);
            for (let [O, O_position] of this.dragMap) {
              //如果不是本身，需要比较位置冲突
              if (M != O) {
                //X轴差值小于距离Y轴近的元素的宽度，且Y轴差值小于距离X轴近元素的高度，则视为冲突
                let conflictY = Math.abs(M_position.y - O_position.y) < (M_position.y - O_position.y >= 0 ? O_position.h : M_position.h);
                let conflictX = Math.abs(M_position.x - O_position.x) < (M_position.x - O_position.x >= 0 ? O_position.w : M_position.w);
                //如果冲突
                if (conflictY && conflictX) {
                  //如果移动元素位于静止元素下方或者重叠
                  if (M_position.y - O_position.y >= 0) {
                    O_position.y += M_position.h + (M_position.y - O_position.y);
                    //如果移动元素位于静止元素上方
                  } else {
                    O_position.y += M_position.h - (O_position.y - M_position.y);
                  }
                  //重置静止元素新位置
                  this.dragMap.set(O, O_position);
                  //由于静止元素位置改变，再次递归时，视为移动元素
                  newMoveIds.unshift(O);
                }
              }
            }
          }
          this._resolveConflict(newMoveIds);
        }
      },
      //定位背景元素位置
      _findPosition(ev){
        //目标区域
        let wrapper = document.getElementById('mydiv');
        //背景元素
        let backgroundEle = document.getElementById('dropBackground');
        //被拖拽元素
        let dragEle = document.getElementById(this.dragEleId);
        //鼠标距目标区域左侧距离
        let off_x = ev.clientX - wrapper.clientLeft;
        //鼠标距目标区域上侧距离
        let off_y = ev.clientY - (wrapper.offsetTop - document.documentElement.scrollTop);
        //计算坐标X
        let axis_x = (Math.round(off_x / 177)) - 1 < 0 ? 0 : (Math.round(off_x / 177)) - 1;
        //计算坐标Y
        let axis_y = (Math.round(off_y / 177)) - 1 < 0 ? 0 : (Math.round(off_y / 177)) - 1;
        //背景元素要和被拖拽元素同宽
        backgroundEle.style.width = window.getComputedStyle(dragEle).width;
        //背景元素要和被拖拽元素同高
        backgroundEle.style.height = window.getComputedStyle(dragEle).height;
        this._changePosition(backgroundEle, axis_x, axis_y);
      },
      //重绘队列所有被拖拽元素位置
      _drowDragEle(){
        for (let [id, position] of this.dragMap) {
          this._changePosition(document.getElementById(id), position.x, position.y);
        }
      },
      //隐藏背景元素
      _hideBackground(){
        let backgroundEle = document.getElementById('dropBackground');
        backgroundEle.style.width = 0 + 'px';
        backgroundEle.style.height = 0 + 'px';
        backgroundEle.style.left = 0 + 'px';
        backgroundEle.style.top = 0 + 'px';
      },
      //阻止默认事件
      _preventDefault(ev){
        if (ev.preventDefault) {
          ev.preventDefault();
        } else {
          window.event.returnValue = false;
        }
        if (ev.stopPropagation) {
          ev.stopPropagation()
        } else {
          window.event.cancelBubble = true;
        }
      },
      //设置元素位置
      _changePosition(Ele, x, y){
        Ele.style.left = x * (177) + 5 + 'px';
        Ele.style.top = y * (177) + 7 + 'px';
        Ele.setAttribute('data-x', x);
        Ele.setAttribute('data-y', y);
      },
    },
    mounted(){
      //获得echart实例
      let echartsInstance1 = echarts.init(document.getElementById('echarts1_body'));
      let echartsInstance2 = echarts.init(document.getElementById('echarts2_body'));
      let echartsInstance3 = echarts.init(document.getElementById('echarts3_body'));
      //echarts实例绘图
      echartsInstance1.setOption({
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        backgroundColor: {
          color: '#fff'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ]
          }
        ]
      });
      echartsInstance2.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        backgroundColor: {
          color: '#fff'
        },
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          data: ['蒸发量', '降水量', '平均温度']
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '水量',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: '蒸发量',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            name: '降水量',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
          },
          {
            name: '平均温度',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      });
      echartsInstance3.setOption({
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        backgroundColor: {
          color: '#fff'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ]
          }
        ]
      });
      //为了在拖拽过程中显示echarts微缩图，先生成base64，由于echarts有过渡动画，所以间隔1秒
      setTimeout(()=>{
        var image1 = new Image();
        image1.src = echartsInstance1.getDataURL({
          pixelRatio: 1,
          backgroundColor: '#ddd'
        });
        this.echartsMapImg.set('echarts1',image1);
        var image2 = new Image();
        image2.src = echartsInstance2.getDataURL({
          pixelRatio: 1,
          backgroundColor: '#fff'
        });
        this.echartsMapImg.set('echarts2',image2);
        var image3 = new Image();
        image3.src = echartsInstance3.getDataURL({
          pixelRatio: 1,
          backgroundColor: '#fff'
        });
        this.echartsMapImg.set('echarts3',image3);
      },1000)
    },
    computed: {},
    components: {}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  unit = 171px;
  .grad
    margin-top 342px
    position relative
    width 100%
    height 1400px
    background-size: 177px 177px !important;
    border-left 1px solid #CAF1F3
    background-image: linear-gradient(90deg, #CAF1F3, #CAF1F3 1px, hsla(0, 0%, 91%, 0) 0px, hsla(0, 0%, 91%, 0) 172px, #CAF1F3 175px, #CAF1F3 177px),
      linear-gradient(0deg, #CAF1F3, #CAF1F3 1px, hsla(0, 0%, 91%, 0) 0px, hsla(0, 0%, 91%, 0) 172px, #CAF1F3 175px, #CAF1F3 177px) !important;
    .echarts_2X2
      position absolute
      left 0
      top -(unit* 2)
      width: unit* 2;
      height: unit* 2
      border: 1px solid #a9b197
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 0.6)
      cursor move
      transition top 0.3s, left 0.3s
      .icon
        position absolute
        top 5px
        right 5px
        font-size 22px
        color #000
        z-index 1000
        cursor pointer
      .echarts_body
        width 100%
        height 100%
    .echarts_3X2
      position absolute
      left 0x
      top -342px
      width: unit* 3 + 5
      height: unit* 2
      border: 1px solid #a9b197;
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 0.8)
      cursor move
      transition top 0.3s, left 0.3s
      .icon
        position absolute
        top 5px
        right 5px
        font-size 22px
        color #000
        z-index 1000
        cursor pointer
      .echarts_body
        width 100%
        height 100%
    .dropBackground
      position absolute
      left 0
      top 0
      width 0
      height 0
      background rgba(0, 0, 0, 0.3)
      cursor move
</style>
