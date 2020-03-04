<template>
  <div>1</div>
  <!--<div class="nav">-->
    <!--<div id="nav1">-->
      <!--<el-tabs v-model="activeName" @tab-click="handleClick1">-->
        <!--<template v-for="link in arr1">-->
          <!--<el-tab-pane :label="link.name" :name="link.path"></el-tab-pane>-->
        <!--</template>-->
      <!--</el-tabs>-->
    <!--</div>-->
    <!--<div id="nav2">-->
      <!--<el-tabs v-model="activeSubName" @tab-click="handleClick2" v-if="arr2.length>0">-->
        <!--<template v-for="link in arr2">-->
          <!--<el-tab-pane :label="link.name" :name="link.path"></el-tab-pane>-->
        <!--</template>-->
      <!--</el-tabs>-->
    <!--</div>-->
    <!--<router-view></router-view>-->
  <!--</div>-->
</template>
<script type="text/ecmascript-6">

  import Router from 'vue-router'

  export default{
    data(){
      return {
        activeName: "", //一级选中
        activeSubName: "",//二级选中
        arr1: [],//一级路由数组
        arr2: [],//二级路由数组
      }
    },
    methods: {
      //点击一级路由
      handleClick1(val){
        this.activeName = val.name
        var nav1 = this.arr1.filter(item => {
          return item.path == val.name;
        })
        if (nav1[0].children && nav1[0].children.length > 0) {
          this.arr2 = nav1[0].children;
          this.activeSubName = this.arr2[0].path;
          this.$router.push('/tabNave/' + this.activeName + '/' + this.activeSubName);
        } else {
          this.arr2 = [];
          this.$router.push('/tabNave/' + this.activeName);
        }
        this.setWidth();
      },
      //点击二级路由
      handleClick2(val){
        this.activeSubName = val.name;
        this.$router.push('/tabNave/' + this.activeName + '/' + this.activeSubName);
        this.setWidth();
      },
      //页面刷新
      reresh(){
        var obj = this.$router.currentRoute;
        //一级路由
        this.activeName = obj.matched[1].name;
        var nav1 = this.arr1.filter(item => {
          return item.path == this.activeName;
        })
        //二级路由
        if (nav1[0].children && nav1[0].children.length > 0) {
          this.arr2 = nav1[0].children;
          this.activeSubName = obj.matched[2].name;
        }
      },
      //动态调整宽度
      setWidth(){
        this.$nextTick(() => {
          var nav1 = document.getElementById('nav1');
          var nav2 = document.getElementById('nav2');
          var tabs1 = nav1.getElementsByClassName('el-tabs__nav')[0];
          var tabs2 = nav2.getElementsByClassName('el-tabs__nav')[0];
          nav1.style.width = window.getComputedStyle(tabs1, null).getPropertyValue('width')
          if (tabs2) {
            nav2.style.width = window.getComputedStyle(tabs2, null).getPropertyValue('width')
          }
        })
      },
    },
    mounted(){
//      //过滤出来tabNave的路由对象
//      var temp = this.$router.options.routes.filter(item => {
//        return item.name == 'tabNave';
//      })
//      this.arr1 = temp[0].children;
//      //一级，二级都默认第一个选中
//      this.activeName = this.arr1[0].path;
//      if (this.arr1[0].children && this.arr1[0].children.length > 0) {
//        this.arr2 = this.arr1[0].children;
//        this.activeSubName = this.arr2[0].path;
//      }
//      //刷新重新选择菜单
//      this.reresh();
//      //动态调整tab居中
//      this.setWidth();
    },
    computed: {},
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #nav1, #nav2
    margin 0 auto;

  .el-tabs--top
    .el-tabs__content {
      display none;
      .tablist {
        display block
        margin 0 auto;
      }
    }
</style>
