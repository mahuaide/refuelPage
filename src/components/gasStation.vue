<template>
  <div>
    <div id="bdmap" style="width: 100%;"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getRefuelLogInStation} from '@http/api.js'
  export default{
    data(){
      return {}
    },
    methods: {},
    mounted(){
      getRefuelLogInStation().then(res => {
        let {code, data, errMsg} = res.data;
        if (code == 200) {
          document.getElementById('bdmap').style.height = window.innerHeight + 'px';
          var mp = new BMap.Map("bdmap");
          //初始定位
          mp.centerAndZoom(new BMap.Point(116.36048, 39.888909), 13);
          //工具
          mp.addControl(new BMap.NavigationControl());
          mp.addControl(new BMap.ScaleControl());
          mp.addControl(new BMap.OverviewMapControl());
          mp.addControl(new BMap.MapTypeControl());
          mp.enableScrollWheelZoom();
          //加油站经纬度
          for (var i = 0; i < data.length; i++) {
            var marker = new BMap.Marker(new BMap.Point(data[i].lng, data[i].lat));
            mp.addOverlay(marker);
            (function (i) {
              marker.addEventListener("click",function(){
                bdwin(this,data[i]);
              });
            })(i);
          }
          //绘制窗口提示
          function bdwin(marker,data) {
            var opts = {
              width: 250,     // 信息窗口宽度
              height: 100,     // 信息窗口高度
              title: data.station_address  // 信息窗口标题
            }
            var infoWindow = new BMap.InfoWindow(`${data.station_name}：加油${data.count}次，共${data.total_money.toFixed(2)}元`, opts);  // 创建信息窗口对象
            marker.openInfoWindow(infoWindow, new BMap.Point(data.lng, data.lat));
          }
        } else {
          this.$notify({
            title: 'wrong',
            message: errMsg || 'getRefuelLogInStation error!',
            type: 'error'
          })
        }
      })
    },
    computed: {},
    components: {}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
