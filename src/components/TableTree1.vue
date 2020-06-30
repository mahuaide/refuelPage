<template>
  <div class="table-tree">
    <el-table
      @row-click="handleclick"
      ref="tableTreeChild"
      v-loading="tableTreeLoading"
      element-loading-text="正在加载中"
      element-loading-spinner="el-icon-loading"
      :data="OrgStructureList"
      style="width: 100%;"
      :row-key="idFn"
      lazy
      :load="loadLevelData"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="orgName" label="机构层级" width="260"></el-table-column>
      <el-table-column prop="orgType" label="机构类型" width="180"></el-table-column>
      <el-table-column prop="orgOwner" label="机构负责人">
        <template slot-scope="scope">
          <span v-for="item in scope.row.orgOwner" :key="item.orgId">{{item.ownerName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="orgStatus" label="机构状态"></el-table-column>
      <el-table-column prop="operate" label="操作" width="260">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            v-hasPermission="'org:edit'"
          >
            <i class="iconfont icon-bianji" @click="handleEdit(scope)"></i>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            v-hasPermission="'org:delete'"
          >
            <i class="iconfont icon-lajitong" @click="handleDelete(scope)"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="新建" placement="top">
            <i class="iconfont icon-tianjia" @click="handleAdd(scope)" v-hasPermission="'org:add'"></i>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="上移"
            placement="top"
            v-hasPermission="'org:switch'"
          >
            <i class="iconfont icon-shengxu" @click="handleUp(scope)" v-if="scope.row.up"></i>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="下移"
            placement="top"
            v-hasPermission="'org:switch'"
          >
            <i class="iconfont icon-jiangxu" @click="handleDown(scope)" v-if="scope.row.down"></i>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Sortable from "sortablejs";

export default {
  components: {},
  props: {
    OrgStructureList: {
      type: Array
    },
    loadLevelData: {
      type: Function
    },
    tableTreeLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    handleEdit(scope) {
      this.operateDrawer(true, "edit", scope);
    },
    handleAdd(scope) {
      this.operateDrawer(true, "add", scope);
    },
    handleDelete(scope) {
      this.operateDrawer(true, "del", scope);
    },
    handleUp(scope) {
      this.operateDrawer(false, "up", scope);
    },
    handleDown(scope) {
      this.operateDrawer(false, "down", scope);
    },
    operateDrawer(show, tag, scope) {
      this.$emit("operateDrawer", show, tag, scope);
    },
    handleclick(val, row, value) {
      console.log(val);
      console.log(row);
      console.log(value);
    },
    idFn(row) {
      return row.orgId;
    }
  },
  mounted() {
    const table = document.querySelector(".el-table__body-wrapper tbody");
    // console.log(table);
    const self = this;
    Sortable.create(table, {
      filter: ".el-table__row--level-0",
      //  draggable: ".el-table__row el-table__row--level-1",
      //  dragClass: ".el-table__row.el-table__row--level-1", //拖动项的类名
      onChoose({ oldIndex }) {
        // const Row = self.OrgStructureList;
        // const Rowcontent = self.OrgStructureList.splice(oldIndex, 1)[0];
        // self.$emit("changeitem", 111);
        // console.log(Row);
        // console.log(Rowcontent);
      },
      onEnd({ newIndex, oldIndex }) {
        const targetRow = self.OrgStructureList.splice(oldIndex, 1)[0];
        self.OrgStructureList.splice(newIndex, 0, targetRow);

        console.log(self.OrgStructureList);
      }
    });
  }
};
</script>
<style lang='scss' scoped>
.table-tree {
  // height: calc(100% - 56px);
  .iconfont {
    // font-size: 14px;
    margin-right: 25px;
    cursor: pointer;
  }
}
</style>
