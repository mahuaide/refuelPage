<template>
  <div>
    <div class="grad" id="mydiv"
         @dragover="dragover($event)"
         @dragenter="dragenter"
         @drop="drop($event)"
         @dragleave="dragLeave($event)">
      <div class="dropBackground" id="dropBackground"></div>
      <div id='echarts1'
           draggable="true"
           @dragstart="dragStart($event)"
           @dragend="dragEnd"
           class="echarts_2X2"
           data-w="2"
           data-h="2"
      >
      </div>
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
  </div>
</template>
<script type="text/ecmascript-6">
  import echarts from 'echarts'
  export default{
    data(){
      return {
          dragEleId:''
      }
    },
    methods: {
      dragover(ev){
        if (ev.preventDefault) {
          ev.preventDefault();
        } else {
          window.event.returnValue = false;
        }
        console.log('over')
        var div = document.getElementById('mydiv');
        var dropBack = document.getElementById('dropBackground');
        var x = ev.clientX - div.clientLeft;
        var y = ev.clientY - (div.offsetTop - document.documentElement.scrollTop)
        var axis_x = (Math.round(x / 177)) - 1 < 0 ? 0 : (Math.round(x / 177)) - 1;
        var axis_y = (Math.round(y / 177)) - 1 < 0 ? 0 : (Math.round(y / 177)) - 1;
        var dragEle = document.getElementById(this.dragEleId)
        dropBack.style.width = window.getComputedStyle(dragEle).width
        dropBack.style.height = window.getComputedStyle(dragEle).height
        dropBack.style.left = axis_x * (177) + 5 + 'px';
        dropBack.style.top = axis_y * (177) + 7 + 'px';
        console.log('axis_x=' + axis_x + ' axis_y=' + axis_y);
      },
      dragenter(ev){
        console.log('enter')
      },
      drop(ev){
        console.log('drop')
        if (ev.preventDefault) {
          ev.preventDefault();
          ev.stopPropagation();
        } else {
          window.event.cancelBubble = true;
          window.event.returnValue = false;
        }
        var id = ev.dataTransfer.getData("Text");
        var ele = document.getElementById(id)
        var dropBack = document.getElementById('dropBackground');
        ele.style.left = dropBack.style.left;
        ele.style.top = dropBack.style.top;
        dropBack.style.width = 0 + 'px';
        dropBack.style.height = 0 + 'px';
        dropBack.style.left = 0 + 'px';
        dropBack.style.top = 0 + 'px';
      },
      dragStart(ev){
        ev.dataTransfer.setData("Text", ev.target.id);
        this.dragEleId = ev.target.id;
        console.log('start' + ev.target.id)
      },
      dragLeave(ev){
        console.log('leave')
        var dropBack = document.getElementById('dropBackground');
      },
      dragEnd(ev){
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
          data:['蒸发量','降水量','平均温度']
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
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
            name:'蒸发量',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            name:'降水量',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
          },
          {
            name:'平均温度',
            type:'line',
            yAxisIndex: 1,
            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
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
      top -(unit*2)
      width: unit*2;
      height: unit*2
      border: 1px solid #ddd;
      box-sizing: border-box;
      background-color: #fff
      cursor move
    .echarts_3X2
      position absolute
      left 344px
      top -342px
      width: unit*3+5
      height: unit*2
      border: 1px solid #ddd;
      box-sizing: border-box;
      background-color: #fff
      cursor move
    .dropBackground
      position absolute
      left 0
      top 0
      width 0
      height 0
      background rgba(0, 0, 0, 0.3)
      cursor move

</style>
