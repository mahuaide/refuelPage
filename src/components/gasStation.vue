<template>
  <div>
    <div id="bdmap" style="width: 100%;"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
      data(){
        return {

        }
      },
      methods:{

      },
      mounted(){
        document.getElementById('bdmap').style.height = window.innerHeight+'px';
        var mp = new BMap.Map("bdmap");
        mp.centerAndZoom(new BMap.Point(116.3964,39.9093), 10);
        mp.addControl(new BMap.NavigationControl());
        mp.addControl(new BMap.ScaleControl());
        mp.addControl(new BMap.OverviewMapControl());
        mp.addControl(new BMap.MapTypeControl());
        mp.enableScrollWheelZoom();
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(r.point);
            mp.addOverlay(mk);
            mp.panTo(r.point);
            alert('您的位置：'+r.point.lng+','+r.point.lat);
          }
          else {
            alert('failed'+this.getStatus());
          }
        });
      },
      computed:{

      },
      components:{
      }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
