<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      :row-key="getRowKey"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        :reserve-selection="true"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        label="日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <!--<el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>-->
      <!--<el-button @click="toggleSelection()">取消选择</el-button>-->
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      current-page.sync="1"
      :page-size="3"
      layout="prev, pager, next, jumper"
      :total="9">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      return {
        page1: [{
          id: 1,
          date: '2016-05-03',
          name: '张三',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-02',
          name: '李四',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 3,
          date: '2016-05-04',
          name: '王五',
          address: '上海市普陀区金沙江路 1518 弄'
        },],
        page2: [{
          id: 4,
          date: '2016-05-01',
          name: '赵六',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 5,
          date: '2016-05-08',
          name: '牛七',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 6,
          date: '2016-05-06',
          name: '马八',
          address: '上海市普陀区金沙江路 1518 弄'
        },],
        page3: [{
          id: 7,
          date: '2016-05-07',
          name: '咳咳',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 8,
          date: '2016-05-08',
          name: '哈哈',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 9,
          date: '2016-05-09',
          name: '呵呵',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        tableData: [],
        multipleSelection: [],
        database:[
          {
            id: 1,
            date: '2016-05-03',
            name: '张三',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ]
      }
    },

    mounted(){
      this.tableData = this.page1;
      this.database.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row);
      });
    },
    methods: {
      getRowKey (row) {
        console.log(row.id)
        return row.id
      },
      handleSizeChange(val) {
//        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        if(val ==1){
          this.tableData = this.page1;
        }else if(val ==2){
          this.tableData = this.page2;
        }else{
          this.tableData = this.page3;
        }

      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
