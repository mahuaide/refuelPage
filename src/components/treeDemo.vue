<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-tooltip
          class="item"
          effect="dark"
          :open-delay=500
          content="收藏"
          placement="bottom"
        >
          <i
            class="iconfont icon-xing"
            style="margin-right: 16px"
          ></i>
        </el-tooltip>
        <el-popover
          ref="popoverChildren"
          placement="left-start"
          width="335"
          trigger="click"
          popper-class="demand-tool-popover"
        >
          <div class="popover-wrapper-child">
            <p class="title">新建子工作项</p>
          </div>
        </el-popover>
        <el-tooltip
          class="item"
          :open-delay=1000
          effect="dark"
          content="快速新建子工作项"
          placement="bottom"
        >
          <i
            class="iconfont icon-youtong"
            style="margin-right: 16px"
            v-popover:popoverChildren
          ></i>
        </el-tooltip>
        <el-popover
          ref="popoverMore"
          placement="bottom"
          width="100"
          trigger="click"
          popper-class="demand-tool-popover"
        >
          <div class="popover-wrapper-more">
            <ul class="action-items">
              <li @click="">复制</li>
              <li @click="">删除</li>
            </ul>
          </div>
        </el-popover>
        <el-tooltip
          class="item"
          effect="dark"
          :open-delay=1000
          content="更多"
          placement="bottom"
        >
          <i
            class="iconfont icon-xinyongqia"
            style="margin-right: 20px"
            v-popover:popoverMore
          ></i>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script type="text/ecmascript-6">
  export default{
    components: {},
    data(){
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }]
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },
    mounted(){
    },
    computed: {}
  }
</script>

<style scoped>

</style>
