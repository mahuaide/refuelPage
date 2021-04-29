<template>
  <div id='scrolldIV' v-html="log"></div>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      socket: null,
      log:""
    };
  },
  mounted() {
    var div = document.getElementById('scrolldIV');
    this.socket = io.connect('http://127.0.0.1:3003', {
      autoConnect: true,
      forceNew: true,
      reconnectionDelay: 5000,
      reconnectionDelayMax: 10000,
      reconnectionAttempts: 5,
      randomizationFactor: 0.8,
      transports: ['websocket'],
      query: {
          who:"mahuaide"
      },
    });
    this.socket.emit('getLog',);
    this.socket.on("sendLog", (msg) => {
        this.log = msg;
        this.$nextTick(()=>{
            var div = document.getElementById('scrolldIV');
            console.log(div.scrollTop)
            console.log(div.scrollHeight)   
            div.scrollTop = div.scrollHeight;
        })
    })
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
#scrolldIV{
    width:100%;
    height: 100%;
    overflow-x:hidden;
    overflow-y:auto;
    font-size: 12px;
}
</style>