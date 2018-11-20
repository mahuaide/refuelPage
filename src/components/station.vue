<template>
  <div>
    <!--<div style="display:none">-->
      <!--<el-form ref="form" :model="form" label-width="80px">-->
        <!--<el-form-item label="活动名称">-->
          <!--<el-input v-model="form.name"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="活动区域">-->
          <!--<el-select v-model="form.region" placeholder="请选择活动区域">-->
            <!--<el-option label="区域一" value="shanghai"></el-option>-->
            <!--<el-option label="区域二" value="beijing"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="活动时间">-->
          <!--<el-col :span="11">-->
            <!--<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>-->
          <!--</el-col>-->
          <!--<el-col class="line" :span="2">-</el-col>-->
          <!--<el-col :span="11">-->
            <!--<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2"-->
                            <!--style="width: 100%;"></el-time-picker>-->
          <!--</el-col>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="即时配送">-->
          <!--<el-switch v-model="form.delivery"></el-switch>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="活动性质">-->
          <!--<el-checkbox-group v-model="form.type">-->
            <!--<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>-->
            <!--<el-checkbox label="地推活动" name="type"></el-checkbox>-->
            <!--<el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
            <!--<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
          <!--</el-checkbox-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="特殊资源">-->
          <!--<el-radio-group v-model="form.resource">-->
            <!--<el-radio label="线上品牌商赞助"></el-radio>-->
            <!--<el-radio label="线下场地免费"></el-radio>-->
          <!--</el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="活动形式">-->
          <!--<el-input type="textarea" v-model="form.desc"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
          <!--<el-button type="primary" @click="onSubmit">立即创建</el-button>-->
          <!--<el-button>取消</el-button>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    <!--</div>-->
    <!--<div style="padding: 20px 50px 100px 20px">-->
      <!--<el-form ref="myForm" label-width="80px">-->
        <!--<template v-for="(item,index) in myFormData">-->
          <!--<template v-if="item.type == 'input'">-->
            <!--<el-form-item :label="item.label">-->
              <!--<el-input v-model="item.model" :placeholder="item.placeholder"></el-input>-->
            <!--</el-form-item>-->
          <!--</template>-->
          <!--<template v-if="item.type == 'select'">-->
            <!--<el-form-item :label="item.label">-->
              <!--<el-select v-model="item.model" :placeholder="item.placeholder">-->
                <!--<el-option v-for="(option,index) in item.options" :label="option.label"-->
                           <!--:value="option.value"></el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
          <!--</template>-->
          <!--<template v-if="item.type=='dataPicker'">-->
            <!--<el-form-item :label="item.label">-->
              <!--<el-date-picker type="date" :placeholder="item.placeholder" v-model="item.model"-->
                              <!--style="width: 50%;"></el-date-picker>-->
            <!--</el-form-item>-->
          <!--</template>-->
          <!--<template v-if="item.type=='timePicker'">-->
            <!--<el-form-item :label="item.label">-->
              <!--<el-time-picker type="fixed-time" :placeholder="item.placeholder" v-model="item.model"-->
                              <!--style="width: 50%;"></el-time-picker>-->
            <!--</el-form-item>-->
          <!--</template>-->
          <!--<template v-if="item.type=='checkbox'">-->
            <!--<el-form-item :label="item.label">-->
              <!--<el-checkbox-group v-model="item.model">-->
                <!--<el-checkbox v-for='(box,index) in item.boxes' :label="box.label" name="some"></el-checkbox>-->
              <!--</el-checkbox-group>-->
            <!--</el-form-item>-->
          <!--</template>-->
          <!--<template v-if="item.type=='radio'">-->
            <!--<el-form-item :label="item.label">-->
              <!--<el-radio-group v-model="item.model">-->
                <!--<el-radio v-for="(radio,index) in item.radios" :label="radio.label">{{radio.value}}</el-radio>-->
              <!--</el-radio-group>-->
            <!--</el-form-item>-->
          <!--</template>-->
        <!--</template>-->
      <!--</el-form>-->
    <!--</div>-->
    <!--<template>-->
      <!--<el-table-->
        <!--:data="tableData"-->
        <!--stripe-->
        <!--style="width: 100%">-->
        <!--<el-table-column-->
          <!--prop="date"-->
          <!--label="日期"-->
          <!--width="180">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="name"-->
          <!--label="姓名"-->
          <!--width="180">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="address"-->
          <!--label="地址">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="address"-->
          <!--label="地址">-->
        <!--</el-table-column>-->
        <!--<el-table-column v-for="head in tableHeader"-->
          <!--:prop="head.prop"-->
          <!--:label="head.label">-->
        <!--</el-table-column>-->
      <!--</el-table>-->
    <!--</template>-->
    <div class="grad" id="mydiv" @dragover="dragover($event)" @drop="drop($event)">
      <div class="dropBackground" id="dropBackground"></div>
      <div draggable="true" @dragstart="dragStart($event) " @dragend="dragEnd" class="echartsDiv">

      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import echarts from 'echarts'
  export default{
    data(){
      return {
        columns: [
          {prop: '男', label: '性别'}
        ],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        myFormData: [
          {type: 'input', label: '姓名', model: '', placeholder: '请输入姓名'},
          {
            type: 'select',
            label: '喜好',
            model: '',
            multple:false,
            options: [{label: '打球', value: '1'}, {label: '打牌', value: '2'},{label:'打人',value:'3'}],
            placeholder: '请选择'
          },
          {type: 'dataPicker', label: '日期', model: '', placeholder: '请选择'},
          {type: 'timePicker', label: '时间', model: '', placeholder: '请选择'},
          {type: 'checkbox', label: '语言', model: [], placeholder: '请选择', boxes: [{label: '英语'}, {label: '日语'}]},
          {
            type: 'radio',
            label: '性别',
            model: '',
            placeholder: '请选择',
            radios: [{label: '1', value: '男'}, {label: '2', value: '女'}]
          },
        ],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          gender: '男',
          age: 12
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          gender: '女',
          age: 17
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          gender: '男',
          age: 19
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          gender: '男',
          age: 20
        }],
        tableHeader:[{label:'性别',prop:'gender'},{label:'年龄',prop:'age'}]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      dragStart(){
      },
      dragEnd(){
      },
      dragover(event){
        console.log(event.target)
        var div = document.getElementById('mydiv');
        var dropBack = document.getElementById('dropBackground');
        var x = event.clientX-div.clientLeft;
        var y = event.clientY - (div.offsetTop-document.documentElement.scrollTop)
        var axis_x = (Math.round(x/177))-1<0?0:(Math.round(x/177))-1;
        var axis_y = (Math.round(y/177))-1<0?0:(Math.round(y/177))-1;
        dropBack.style.width = 342+'px';
        dropBack.style.height = 342+'px';
        dropBack.style.left = axis_x*(177)+ 5+'px';
        dropBack.style.top = axis_y*(177)+ 7+'px';
        console.log('axis_x='+axis_x+' axis_y='+axis_y);
      },
      dragenter(){
      },
      drop(event){
          alert(1);
          console.log(event.target)
      }
    },
    mounted(){

    },
    computed: {},
    components: {}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .grad
    margin-top 342px
    position relative
    width 100%
    height 1400px
    background-size: 177px 177px !important;
    border-left 1px solid #CAF1F3
    background-image:
      linear-gradient(90deg, #CAF1F3, #CAF1F3 1px, hsla(0, 0%, 91%, 0) 0px, hsla(0, 0%, 91%, 0) 172px, #CAF1F3 175px, #CAF1F3 177px),
      linear-gradient(0deg, #CAF1F3, #CAF1F3 1px, hsla(0, 0%, 91%, 0) 0px, hsla(0, 0%, 91%, 0) 172px, #CAF1F3 175px, #CAF1F3 177px) !important;
    .echartsDiv
      position absolute
      left 0;
      top -347px
      width: 342px;
      height: 342px;
      border: 1px solid #ddd;
      box-sizing: border-box;
      background-color: #000
      cursor move
    .dropBackground
      position absolute
      left 0
      top 0
      width 0
      height 0
      background rgba(0,0,0,0.3)
      cursor move
</style>
