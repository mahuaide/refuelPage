<template>
  <div>
    项目
    <el-select v-model="project" placeholder="选择项目" @change="changeProject()">
      <el-option
        v-for="item in projectOptions"
        :key="item.id"
        :label="item.path_with_namespace"
        :value="item.id">
      </el-option>
    </el-select>
    分支
    <el-select v-model="branch" placeholder="选择分支" @change="changeBranch()">
      <el-option
        v-for="item in branchOptions"
        :key="item.name"
        :label="item.name"
        :value="item.name">
      </el-option>
    </el-select>
    commits
    <el-select v-model="sha" placeholder="选择提交记录" @change="changeCommits()">
      <el-option
        v-for="item in commitsOptions"
        :key="item.short_id"
        :label="item.title"
        :value="item.short_id">
      </el-option>
    </el-select>
    <div>
      <table style="font-size: 12px;width: 100%;">
        <tr v-for="item in diff" style="white-space: pre-wrap">
          <td><span>{{item}}</span></td><td><span>{{item}}</span></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getGitProjects, getBranches, getCommits, getGitDiff} from '@http/api';
  export default{
    data(){
      return {
        projectOptions: [],
        commitsOptions: [],
        branchOptions: [],
        project: '419',
        branch: 'master',
        sha: '4798296f',
        diff: ''
      }
    },
    methods: {
      changeProject(){
        getBranches({project: this.project}).then(res => {
          this.branchOptions = res.data.data;
          this.branch = '';
          this.sha = ''
        })
      },
      changeBranch(){
        getCommits({project: this.project, branch: this.branch}).then(res => {
          this.commitsOptions = res.data.data;
          this.sha = ''
        })
      },
      changeCommits(){
        getGitDiff({project: this.project, sha: this.sha}).then(res => {

          this.diff = res.data.data[0].diff.split(/\n+|\r\n+|\r+/);

        })
      },
    },
    mounted(){
      this.changeCommits();
      getGitProjects().then(res => {
        this.projectOptions = res.data.data
      })
    },
    computed: {},
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
