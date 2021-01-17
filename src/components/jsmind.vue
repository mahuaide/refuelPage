<template>
  <div >
    <div id="jsmind_container"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import "../common/jsmind/js/jsmind.js";
export default {
  data() {
    return {
      mind:{
        "meta": {
          "name": "demo",
          "author": "hizzgdev@163.com",
          "version": "0.2",
        },
        "format": "node_array",
        "data": [{
            "id": "root",
            "isroot": true,
            "topic": "jsMind"
          },

          {
            "id": "sub1",
            "parentid": "root",
            "topic": "sub1",
            "background-color": "#0000ff"
          },
          {
            "id": "sub11",
            "parentid": "sub1",
            "topic": "sub11"
          },
          {
            "id": "sub12",
            "parentid": "sub1",
            "topic": "sub12"
          },
          {
            "id": "sub13",
            "parentid": "sub1",
            "topic": "sub13"
          },

          {
            "id": "sub2",
            "parentid": "root",
            "topic": "sub2"
          },
          {
            "id": "sub21",
            "parentid": "sub2",
            "topic": "sub21"
          },
          {
            "id": "sub22",
            "parentid": "sub2",
            "topic": "sub22",
            "foreground-color": "#33ff33"
          },

          {
            "id": "sub3",
            "parentid": "root",
            "topic": "sub3"
          },
        ]
      },
      options:{
        container: 'jsmind_container',
        editable: true,
        theme: 'primary'
      }
    };
  },
  mounted() {
    this.initJsMind();
  },
  methods: {
    initJsMind() {
      let obj = new jsMind(this.options);
      obj.show(this.mind);
    },
  },
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../common/jsmind/style/jsmind.css';
#jsmind_container {
      width: 800px;
      height: 500px;
      border: solid 1px #ccc;
      /*background:#f4f4f4;*/
      background: #f4f4f4;
    }
</style>