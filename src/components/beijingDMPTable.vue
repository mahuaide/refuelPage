<template>
  <div>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column label="需求名称" prop="reqId" align="center">
        <template slot-scope="scope">
          {{ scope.row.reqId }}<br />
          {{ scope.row.reqName }}<br />
          {{ scope.row.reqHandler }}<br />
          {{ scope.row.reqStatus }}<br />
        </template>
      </el-table-column>
      <el-table-column label="系统分支" align="center">
        <template slot-scope="scope">
          {{ scope.row.systemName }}<br />
          ({{ scope.row.systemHandler }})<br />
          ({{ scope.row.systemStatus }})<br />
        </template>
      </el-table-column>
      <el-table-column prop="module" label="模块" align="center">
        <template slot-scope="scope">
          {{ scope.row.moduleName }}<br />
        </template>
      </el-table-column>
      <el-table-column prop="dev" label="需求开发" align="center">
        <template slot-scope="scope">
          <ul>
            <li v-for="(item, index) in scope.row.dev" :key="index">
              {{ item.devHandler }} ({{ item.devStatus }})
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column prop="funcTest" label="功能测试" align="center">
        <template slot-scope="scope">
          <ul>
            <li v-for="(item, index) in scope.row.funTest" :key="index">
              {{ item.funcTestHandler }} ({{ item.funcTestStatus }})
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column prop="sysTest" label="联调测试" align="center">
        <template slot-scope="scope">
          {{ scope.row.sysTestHandler }} ({{ scope.row.sysTestStatus }})
        </template>
      </el-table-column>
      <el-table-column prop="release" label="上线发布" align="center">
        <template slot-scope="scope"> {{ scope.row.release }}<br /> </template>
      </el-table-column>
      <el-table-column prop="finish" label="完成" align="center">
        <template slot-scope="scope"> {{ scope.row.finish }}<br /> </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        issueId: 10000,
        bizNum: "CRM-BJ-REQ-11111111",
        title: "北京移动需求",
        handler: "殷总",
        epicSatus: "需求分析-进行中",
        release: "未发布",
        finish: "未完成",
        features: [
          {
            issueId: 10001,
            systemName: "CRM",
            handler: "郭海卫",
            featureStatus: "需求分析-进行中",
            sysTester: "成铭",
            sysTestStatus: "进行中",
            stories: [
              {
                issueId: 20001,
                title: "xxxx",
                moduleName: "呼叫中心",
                devTasks: [
                  {
                    issueId: 30001,
                    handler: "麻槐德",
                    taskStatus: "已领取",
                  },
                  {
                    issueId: 30002,
                    handler: "赵前进",
                    taskStatus: "进行中",
                  },
                ],
                funTestTasks: [
                  {
                    handler: "麻槐德",
                    taskStatus: "已领取",
                  },
                ],
              },
              {
                issueId: 20002,
                title: "xxxx",
                moduleName: "营业",
                devTasks: [
                  {
                    issueId: 40001,
                    handler: "庄强",
                    taskStatus: "进行中",
                  },
                  {
                    issueId: 40002,
                    handler: "周志勇",
                    taskStatus: "已完成",
                  },
                ],
                funTestTasks: [
                  {
                    handler: "刘星宝",
                    taskStatus: "进行中",
                  },
                ],
              },
            ],
          },
          {
            issueId: 10002,
            systemName: "BOSS",
            handler: "沈峰",
            featureStatus: "需求分析-已完成",
            sysTester: "成铭",
            sysTestStatus: "进行中",
            stories: [
              {
                issueId: 30001,
                title: "xxxx",
                moduleName: "BOSS接口",
                devTasks: [
                ],
                funTestTasks: [
                  {
                    handler: "刘星宝",
                    taskStatus: "进行中",
                  },
                ],
              },
            ],
          },
          {
            issueId: 10003,
            systemName: "电商",
            handler: "王神话",
            featureStatus: "需求分析-进行中",
            sysTester: "成铭",
            sysTestStatus: "未开始",
            stories: [],
          },
        ],
      },
      tableData: [
        {
          reqId: "BOSS-XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          reqName: " 北京移动XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX需求",
          reqHandler: "殷总",
          reqStatus: "分析中",
          systemName: "CRM",
          systemHandler: "郭海位",
          systemStatus: "进行中",
          moduleName: "呼叫中心",
          dev: [
            {
              devHandler: "麻槐德",
              devStatus: "已领取",
            },
            {
              devHandler: "赵前进",
              devStatus: "进行中",
            },
          ],
          funTest: [
            {
              funcTestHandler: "刘宝星",
              funcTestStatus: "进行中",
            },
          ],
          sysTestHandler: "成铭",
          sysTestStatus: "进行中",
          release: "未发布",
          finish: "未完成",
        },
        {
          reqId: "BOSS-XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          reqName: " 北京移动XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX需求",
          reqHandler: "殷总",
          reqStatus: "分析中",
          systemName: "CRM",
          systemHandler: "郭海位",
          systemStatus: "进行中",
          moduleName: "营业",
          dev: [
            {
              devHandler: "庄强",
              devStatus: "进行中",
            },
            {
              devHandler: "周智勇",
              devStatus: "已完成",
            },
          ],
          funTest: [
            {
              funcTestHandler: "刘宝星",
              funcTestStatus: "进行中",
            },
            {
              funcTestHandler: "张勋",
              funcTestStatus: "已领取",
            },
          ],
          sysTestHandler: "成铭",
          sysTestStatus: "进行中",
          release: "",
          finish: "",
        },
        {
          reqId: "BOSS-XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          reqName: " 北京移动XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX需求",
          reqHandler: "殷总",
          reqStatus: "分析中",
          systemName: "BOSS",
          systemHandler: "沈峰",
          systemStatus: "分析完成",
          moduleName: "BOSS接口",
          dev: [],
          funTest: [
            {
              funcTestHandler: "刘宝星",
              funcTestStatus: "进行中",
            },
          ],
          sysTestHandler: "成铭",
          sysTestStatus: "未开始",
          release: "",
          finish: "",
        },
        {
          reqId: "BOSS-XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          reqName: " 北京移动XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX需求",
          reqHandler: "殷总",
          reqStatus: "分析中",
          systemName: "电商",
          systemHandler: "王神话",
          systemStatus: "分析中",
          moduleName: "",
          dev: [],
          funTest: [],
          sysTestHandler: "成铭",
          sysTestStatus: "未开始",
          release: "",
          finish: "",
        },
      ],
    };
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log("row=" + row);
      console.log("column=" + column);
      console.log("rowIndex=" + rowIndex);
      console.log("columnIndex=" + columnIndex);
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 4,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
      if (columnIndex === 1) {
        if (rowIndex === 0) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else if (rowIndex === 1) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }

      if (columnIndex === 6 || columnIndex === 7) {
        if (rowIndex === 0) {
          return {
            rowspan: 4,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }

      if (columnIndex === 5) {
        if (rowIndex === 0) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 1,
            colspan: 1,
          };
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>