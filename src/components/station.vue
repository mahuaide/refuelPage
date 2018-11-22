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
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import echarts from 'echarts'
  export default{
    data(){
      return {
        dragEleId: '' //被拖拽元素ID
      }
    },
    methods: {
      dragStart(ev){
        ev.dataTransfer.setData("Text", ev.target.id);
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
        this._findPosition(ev)
      },
      drop(ev){
        this._preventDefault(ev);
        var id = ev.dataTransfer.getData("Text");
        //被拖拽元素
        var dragEle = document.getElementById(id);
        //设置被拖拽元素位置
        var backgroundEle = document.getElementById('dropBackground');
        this._changePosition(dragEle,backgroundEle.getAttribute('x'),backgroundEle.getAttribute('y'))
        //拖拽完毕后背景元素隐藏
        this._hideBackground();
      },
      dragLeave(ev){
      },
      //定位背景元素位置
      _findPosition(ev){
        //目标区域
        var wrapper = document.getElementById('mydiv');
        //背景元素
        var backgroundEle = document.getElementById('dropBackground');
        //被拖拽元素
        var dragEle = document.getElementById(this.dragEleId);
        //鼠标距目标区域左侧距离
        var off_x = ev.clientX - wrapper.clientLeft;
        //鼠标距目标区域上侧距离
        var off_y = ev.clientY - (wrapper.offsetTop - document.documentElement.scrollTop)
        //计算坐标X
        var axis_x = (Math.round(off_x / 177)) - 1 < 0 ? 0 : (Math.round(off_x / 177)) - 1;
        //计算坐标Y
        var axis_y = (Math.round(off_y / 177)) - 1 < 0 ? 0 : (Math.round(off_y / 177)) - 1;
        //背景元素要和被拖拽元素同宽
        backgroundEle.style.width = window.getComputedStyle(dragEle).width;
        //背景元素要和被拖拽元素同高
        backgroundEle.style.height = window.getComputedStyle(dragEle).height;
        this._changePosition(backgroundEle,axis_x,axis_y);
      },
      //隐藏背景元素
      _hideBackground(){
        var backgroundEle = document.getElementById('dropBackground');
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
        if(ev.stopPropagation){
          ev.stopPropagation()
        }else{
          window.event.cancelBubble = true;
        }
      },
      //设置元素位置
      _changePosition(Ele,x,y){
        Ele.style.left = x * (177) + 5 + 'px';
        Ele.style.top = y * (177) + 7 + 'px';
        Ele.setAttribute('x',x)
        Ele.setAttribute('y',y)
      },
    },
    mounted(){
      var echartsInstance1 = echarts.init(document.getElementById('echarts1'))
      var echartsInstance2 = echarts.init(document.getElementById('echarts2'))
      echartsInstance1.setOption({
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        backgroundColor: {
          color: 'rgba(255,255,255,0.6)'
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
      })
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
    .echarts_3X2
      position absolute
      left 344px
      top -342px
      width: unit* 3 + 5
      height: unit* 2
      border: 1px solid #a9b197;
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 0.8)
      cursor move
      transition top 0.3s, left 0.3s
    .dropBackground
      position absolute
      left 0
      top 0
      width 0
      height 0
      background rgba(0, 0, 0, 0.3)
      cursor move
</style>
