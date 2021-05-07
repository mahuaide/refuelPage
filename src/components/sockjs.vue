<template>
  <div></div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "stompjs";
export default {
  mounted() {
    let socket = new SockJS("http://192.168.246.9:9400/socket.io"); //连接SockJS的endpoint名称为"bullet"
    // 获取STOMP子协议的客户端对象
    let stompClient = Stomp.over(socket);
    // 定义客户端的认证信息,按需求配置
    let headers = {
      Authorization: 12345,
    };

    // 拦截输出的一大堆垃圾信息
    stompClient.debug = function (str) {
      $("#debug").append(str + "\n");
    };

    stompClient.connect(
      headers,
      () => {
        stompClient.subscribe("/taskLog?taskInstanceId=840160535960174592", (response) => {
            console.log(response)
          // 订阅服务端提供的某个topic
        });
      },
      (err) => {
        // 连接发生错误时的处理函数
        console.log(err);
      }
    );
  },
};
</script>

<style lang="scss" scoped>
</style>