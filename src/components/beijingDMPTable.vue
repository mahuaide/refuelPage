<template>
  <div>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column label="需求名称" prop="bizNum" align="center">
        <template slot-scope="scope">
          {{ scope.row.bizNum }}<br />
          {{ scope.row.title }}<br />
          {{ scope.row.epicHandler ? "(" + scope.row.epicHandler + ")" : ""
          }}<br />
          {{ scope.row.epicStatus ? "(" + scope.row.epicStatus + ")" : ""
          }}<br />
        </template>
      </el-table-column>
      <el-table-column label="系统分支" align="center">
        <template slot-scope="scope">
          {{ scope.row.systemName }}<br />
          {{
            scope.row.featureHandler
              ? "(" + scope.row.featureHandler + ")"
              : ""
          }}<br />
          {{ scope.row.featureStatus ? "(" + scope.row.featureStatus + ")" : ""
          }}<br />
        </template>
      </el-table-column>
      <el-table-column prop="module" label="故事/模块" align="center">
        <template slot-scope="scope">
          {{ scope.row.sotryName }}<br />{{
            scope.row.moduleName ? "(" + scope.row.moduleName + ")" : ""
          }}<br />
        </template>
      </el-table-column>
      <el-table-column prop="devTasks" label="需求开发" align="center">
        <template slot-scope="scope">
          <ul>
            <li v-for="(item, index) in scope.row.devTasks" :key="index">
              {{ item.handler }}
              {{ item.taskStatus ? "(" + item.taskStatus + ")" : "" }}
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column prop="funcTest" label="功能测试" align="center">
        <template slot-scope="scope">
          <ul>
            <li v-for="(item, index) in scope.row.funTestTasks" :key="index">
              {{ item.handler }}
              {{ item.taskStatus ? "(" + item.taskStatus + ")" : "" }}
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column prop="sysTest" label="联调测试" align="center">
        <template slot-scope="scope">
          {{ scope.row.sysTester }}
          {{
            scope.row.sysTestStatus ? "(" + scope.row.sysTestStatus + ")" : ""
          }}
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
                title: "呼叫中心故事1",
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
                    handler: "刘星宝",
                    taskStatus: "进行中",
                  },
                ],
              },
              {
                issueId: 20002,
                title: "营业故事1",
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
                  {
                    handler: "张勋",
                    taskStatus: "已领取",
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
                title: "BOSS接口故事1",
                moduleName: "BOSS接口",
                devTasks: [
                  {
                    issueId: 31001,
                    handler: "张涛",
                    taskStatus: "已领取",
                  },
                  {
                    issueId: 31002,
                    handler: "赵林进",
                    taskStatus: "进行中",
                  },
                ],
                funTestTasks: [
                  {
                    handler: "刘星宝",
                    taskStatus: "进行中",
                  },
                ],
              },
              {
                issueId: 30002,
                title: "BOSS接口故事2",
                moduleName: "短信接口",
                devTasks: [
                  {
                    issueId: 31001,
                    handler: "麻槐德",
                    taskStatus: "已领取",
                  },
                  {
                    issueId: 31002,
                    handler: "赵前进",
                    taskStatus: "进行中",
                  },
                ],
                funTestTasks: [
                  {
                    handler: "付波",
                    taskStatus: "已领取",
                  },
                ],
              },
              {
                issueId: 30002,
                title: "BOSS接口故事3",
                moduleName: "短信接口",
                devTasks: [
                  {
                    issueId: 31001,
                    handler: "麻槐德",
                    taskStatus: "已领取",
                  },
                  {
                    issueId: 31002,
                    handler: "赵前进",
                    taskStatus: "进行中",
                  },
                ],
                funTestTasks: [
                  {
                    handler: "付波",
                    taskStatus: "已领取",
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
      tableData: [],  // table数据
      rowspan_067: 1, // 第1，7，8列合并数
      rowspan_15: [], // 第2，6列合并数组
    };
  },
  methods: {
    demandTransTable() {
      this.initData();
      // epic上没有feature，只往tableDate中放入一层数据
      if (!this.data.features || this.data.features.length == 0) {
        this.tableData.push({
          //epic
          epicIssueId: this.data.issueId,
          bizNum: this.data.bizNum,
          title: this.data.title,
          epicHandler: this.data.handler,
          epicStatus: this.data.epicSatus,
          release: this.data.release,
          finish: this.data.finish,
        });

        // 没有feature，只有一行，1，5列不合并
        this.rowspan_15.push(1);
      } else {
        // 第1,7,8列缩进，先以feature的个数赋值
        this.rowspan_067 = this.data.features.length;
        this.data.features.forEach((feature, index) => {
          // 如果feature上没有故事，只把epic+feature放入talbeData中
          if (!feature.stories || feature.stories.length == 0) {
            let obj = {
              // epic
              epicIssueId: this.data.issueId,
              bizNum: this.data.bizNum,
              title: this.data.title,
              epicHandler: this.data.handler,
              epicStatus: this.data.epicSatus,
              release: this.data.release,
              finish: this.data.finish,

              // feature
              featureIssueId: feature.issueId,
              systemName: feature.systemName,
              featureHandler: feature.handler,
              featureStatus: feature.featureStatus,
              sysTester: feature.sysTester,
              sysTestStatus: feature.sysTestStatus,
            };
            this.tableData.push(obj);
            
            // 由于feature下没有故事，所以不合并1，5列单元格
            this.rowspan_15.push(1);
          } else {
            // 第1,7,8列缩进，先以feature的个数赋值,再以sotry个数-1累加
            this.rowspan_067 += feature.stories.length - 1;
            feature.stories.forEach((story, index) => {
              // 如果是第一个故事，需要把故事总数，当作rowspan
              if(index ===0){
                this.rowspan_15.push(feature.stories.length);
              // 如果不是第一个，不显示当前行
              }else{
                this.rowspan_15.push(0);
              }
              let obj = {
                // epic
                epicIssueId: this.data.issueId,
                bizNum: this.data.bizNum,
                title: this.data.title,
                epicHandler: this.data.handler,
                epicStatus: this.data.epicSatus,
                release: this.data.release,
                finish: this.data.finish,

                // feature
                featureIssueId: feature.issueId,
                systemName: feature.systemName,
                featureHandler: feature.handler,
                featureStatus: feature.featureStatus,
                sysTester: feature.sysTester,
                sysTestStatus: feature.sysTestStatus,

                //sotry
                storyIssueId: story.issueId,
                sotryName: story.title,
                moduleName: story.moduleName,

                //开发任务
                devTasks: story.devTasks,

                // 功能测试任务
                funTestTasks: story.funTestTasks,
              };
              this.tableData.push(obj);
            });
          }
        });
      }
    },

    initData(){
      this.tableData = []; 
      this.rowspan_067 = 1;
      this.rowspan_15 = [];
    },

    // 合并单元格
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 第1列需求名称，第7列上线发布，第8列完成
      if (columnIndex === 0 || columnIndex === 6 || columnIndex === 7) {
        if (rowIndex === 0) {
          return {
            rowspan: this.rowspan_067,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }

      // 第2列系统分支，第6列系统联调
      if (columnIndex === 1 || columnIndex === 5) {
        return {
          rowspan: this.rowspan_15[rowIndex],
          colspan: this.rowspan_15[rowIndex] > 0 ? 1 : 0
        };
      }
    },
  },
  mounted() {
    this.demandTransTable();
  },
};
</script>

<style lang="scss" scoped>
</style>