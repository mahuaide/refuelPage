<template>
  <div>
    <div class="wrapper">
      <canvas id="stars" ></canvas>
      <div class="mask">
        <dl>
          <dt>
            <img src="./mobile.png" width="120px" height="120px" alt="" />
          </dt>
          <dd>
            <i class="iconfont icon-android"></i><span>Android 5.0+</span>
          </dd>
          <dd><i class="iconfont icon-ios"></i><span>IOS 9+</span></dd>
        </dl>
        <div class="right">&copy; Ayitubie.Inc</div>
      </div>
      <div class="login" v-show="loginShow" v-waterMaker="'Ayitubie'">
        <p class="sys-title">加油宝</p>
        <el-form ref="login" :model="form" label-width="80px">
          <el-form-item label="用户名" prop="userName" required>
            <el-input
              name="userName"
              v-autoFocus
              v-model.trim="form.userName"
              placeholder="请输入用户名"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密 码" prop="password" required>
            <el-input
              name="password"
              type="password"
              v-model="form.password"
              placeholder="请输入密码"
              autocomplete="off"
              @keyup.13.native="_login"
            ></el-input>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary" @click="_login">登录</el-button>
            <el-button type="primary" @click="openRegister">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="register">
        <el-dialog
          title="注册"
          top="8vh"
          width="40%"
          append-to-body="true"
          :visible.sync="dialogFormRegister"
          @close="closeRegister"
          custom-class="registerDialog"
          :close-on-click-modal="false"
          :modal="false"
        >
          <el-form :model="formRegister" :rules="rules" ref="register">
            <el-form-item label="用户名" label-width="80" prop="userName">
              <el-input
                v-model="formRegister.userName"
                placeholder="登录时使用"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="车牌号" label-width="80" prop="license">
              <el-input
                v-model="formRegister.license"
                placeholder="京X·XXXXX"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="车型" label-width="80" prop="carType">
              <el-input
                v-model="formRegister.carType"
                placeholder="2018款迈锐宝1.5T豪华"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="80" prop="password">
              <el-input
                type="password"
                v-model="formRegister.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="确认密码"
              label-width="80"
              prop="confirmPassword"
            >
              <el-input
                type="password"
                v-model="formRegister.confirmPassword"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeRegister">取 消</el-button>
            <el-button type="primary" @click="_regist">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<script type="text/ecmascript-6">
import { login, getLoginUserInfo, register, checkUserExist } from "@http/api";
import * as types from "../store/type";
import md5 from "blueimp-md5";
export default {
  data() {
    var checkName = (rule, value, callback) => {
      setTimeout(() => {
        let params = {
          userName: value,
        };
        checkUserExist(params).then((res) => {
          let { data } = res.data;
          console.log(data);
          if (data[0] && data[0].count > 0) {
            callback(new Error("用户已存在"));
          } else {
            callback();
          }
        });
      }, 200);
    };
    var checkPwdSame = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("请确认密码！"));
      } else {
        setTimeout(() => {
          if (value !== this.formRegister.password) {
            callback(new Error("两次输入密码不一致!"));
          } else {
            callback();
          }
        }, 0);
      }
    };
    return {
      form: {
        userName: "",
        password: "",
      },
      loginShow: true,
      dialogFormRegister: false,
      formRegister: {
        userName: "",
        license: "",
        carType: "",
        password: "",
        confirmPassword: "",
      },
      rules: {
        userName: [
          { validator: checkName, trigger: "blur", required: true },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        license: [
          { required: true, message: "请输入车牌", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        carType: [
          { required: true, message: "请输入车型", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 6, message: "长度在 6字符", trigger: "blur" },
        ],
        confirmPassword: [
          { validator: checkPwdSame, trigger: "blur", required: true },
        ],
      },
    };
  },
  methods: {
    _login() {
      this.$refs.login.validate((valid) => {
        if (valid) {
          //console.log(md5(md5(this.form.password)+this.form.userName))
          login(Object.assign({}, this.form)).then((res) => {
            let { code, data, errMsg } = res.data;
            if (code == 200) {
              getLoginUserInfo().then((res) => {
                let { code, data, errMsg } = res.data;
                if (code == 200) {
                  this.$store.commit(types.LOGIN, data);
                  this.$router.push("/refuel");
                }
              });
            } else {
              this.form.userName = "";
              this.form.password = "";
              document.getElementsByName("userName")[0].value = "";
              document.getElementsByName("password")[0].value = "";
              this.$notify({
                title: "错误",
                type: "error",
                message: "用户名密码错误",
              });
            }
          });
        }
      });
    },
    openRegister() {
      this.dialogFormRegister = true;
      this.loginShow = false;
    },
    closeRegister() {
      this.dialogFormRegister = false;
      this.loginShow = true;
    },
    _regist() {
      this.$refs.register.validate((valid) => {
        if (valid) {
          register(Object.assign({}, this.formRegister)).then((res) => {
            let { code, data, errMsg } = res.data;
            if (code == 200) {
              getLoginUserInfo().then((res) => {
                let { code, data, errMsg } = res.data;
                if (code == 200) {
                  this.$store.commit(types.LOGIN, data);
                  this.$router.push("/refuel");
                }
              });
            } else {
            }
          });
        }
      });
    },
  },
  mounted() {
    var context;
    var rains = new Array();
    var rainCount = 1; //数量
    var intervalOffset = 6000;// 间隔距离
    var windowWidth = 0;
    //初始化画布及context
    function init() {
      //获取canvas
      var stars = document.getElementById("stars");
      windowWidth = window.innerWidth; //当前的窗口的高度
      stars.width = windowWidth;
      stars.height = window.innerHeight;
      //获取context
      context = stars.getContext("2d");
    }

    /*流星雨开始*/
    var MeteorRain = function () {
      this.x = -1;
      this.y = -1;
      this.length = -1; //长度
      this.angle = 30; //倾斜角度
      this.width = -1; //宽度
      this.height = -1; //高度
      this.speed = 1; //速度
      this.offset_x = -1; //横轴移动偏移量
      this.offset_y = -1; //纵轴移动偏移量
      this.alpha = 1; //透明度
      this.color1 = ""; //流星的色彩
      this.color2 = ""; //流星的色彩
      /****************初始化函数********************/
      this.init = function () //初始化
      {
        this.getPos();
        this.alpha = 1; //透明度
        this.getRandomColor();
        //最小长度，最大长度
        var x = Math.random() * 80 + 150;
        this.length = Math.ceil(x);
        //         x = Math.random()*10+30;
        this.angle = 30; //流星倾斜角
        this.speed = 15; //流星的速度
        var cos = Math.cos((this.angle * 3.14) / 180);
        var sin = Math.sin((this.angle * 3.14) / 180);
        this.width = this.length * cos; //流星所占宽度
        this.height = this.length * sin; //流星所占高度
        this.offset_x = this.speed * cos;
        this.offset_y = this.speed * sin;
      };
      /**************获取随机颜色函数*****************/
      this.getRandomColor = function () {
        var a = Math.ceil(255 - 240 * Math.random());
        //中段颜色
        this.color1 = "rgba(" + a + "," + a + "," + a + ",1)";
        //结束颜色
        //this.color2 = "#090723";
      };
      /***************重新计算流星坐标的函数******************/
      this.countPos = function () //
      {
        //往左下移动,x减少，y增加
        this.x = this.x - this.offset_x;
        this.y = this.y + this.offset_y;
      };
      /*****************获取随机坐标的函数*****************/
      this.getPos = function () //
      {
        var tempX = Math.random();
        var xRange = tempX > 0.6 ? tempX : 0.6;
        var tempY = Math.random();
        var yRange = tempY > 0.4 ? 0.4 : tempY;
        this.x = xRange * window.innerWidth; //窗口高度
        this.y = yRange * window.innerHeight; //窗口宽度
      };
      /****绘制流星***************************/
      this.draw = function () //绘制一个流星的函数
      {
        context.save();
        context.beginPath();
        context.lineWidth = 1; //宽度
        context.globalAlpha = this.alpha; //设置透明度
        //创建横向渐变颜色,起点坐标至终点坐标
        var line = context.createLinearGradient(
          this.x,
          this.y,
          this.x + this.width,
          this.y - this.height
        );
        //分段设置颜色
        line.addColorStop(0, "white");
        line.addColorStop(1, this.color1);
        // line.addColorStop(1, this.color2);
        context.strokeStyle = line;
        //起点
        context.moveTo(this.x, this.y);
        //终点
        context.lineTo(this.x + this.width, this.y - this.height);
        context.closePath();
        context.stroke();
        context.restore();
      };
      this.move = function () {
        //清空流星像素
        var x = this.x + this.width - this.offset_x;
        var y = this.y - this.height;
        context.clearRect(x - 3, y - 3, this.offset_x + 5, this.offset_y + 5);
        //         context.strokeStyle="red";
        //         context.strokeRect(x,y-1,this.offset_x+1,this.offset_y+1);
        //重新计算位置，往左下移动
        this.countPos();
        //透明度增加
        this.alpha -= 0.002;
        //重绘
        this.draw();
      };
    };
    //绘制流星
    var playRains = function () {
      for (var n = 0; n < rainCount; n++) {
        var rain = rains[n];
        rain.move(); //移动
        if (rain.y > (window.innerHeight + intervalOffset)) {
          //超出界限后重来
          context.clearRect(
            rain.x,
            rain.y - rain.height,
            rain.width,
            rain.height
          );
          rains[n] = new MeteorRain();
          rains[n].init();
        }
      }
      setTimeout(() => {
        playRains();
      }, 0);
    };
    //页面加载的时候
    window.onload = function () {
      init();
      //画流星
      for (var i = 0; i < rainCount; i++) {
        var rain = new MeteorRain();
        rain.init();
        rain.draw();
        rains.push(rain);
      }
      playRains(); //绘制流星
    };

    /*流星雨结束*/
  },
  computed: {},
  components: {},
};
</script>
<style>
.registerDialog .el-dialog__body {
  padding: 4px 50px 20px 50px;
}

.registerDialog .el-dialog__body .el-form-item {
  margin-bottom: 20px;
}
.registerDialog .el-dialog__body .el-form-item__label {
  line-height: 20px;
}
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrapper {
  position: fixed;
  // background url('./xtrail-1.jpeg') 50% 50% / cover no-repeat fixed
  background: url('./backgroundImage.png') 50% 50% / cover no-repeat fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;

  .mask {
    position: absolute;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 1;

    dl {
      text-align: center;
      position: absolute;
      left: 20%;
      top: 48%;
      margin-top: -60px;

      dt {
        margin: 0 0 5px 0;
      }

      dd {
        text-align: left;
        margin: 0px 0 0 1px;

        span {
          color: #fff;
        }

        .icon-android {
          font-size: 20px;
          margin-right: 5px;
          color: #fff;
        }

        .icon-ios {
          font-size: 20px;
          margin-right: 5px;
          color: #fff;
        }
      }
    }

    .right {
      position: absolute;
      left: 50%;
      bottom: 0px;
      width: 100px;
      height: 20px;
      text-align: center;
      color: #fff;
      margin-left: -50px;
      font-size: 12px;
      font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    }
  }

  .login {
    position: fixed;
    width: 420px;
    top: 30%;
    right: 10%;
    box-sizing: border-box;
    padding: 20px 60px 20px 10px;
    height: 300px;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 2;

    .sys-title {
      margin: 20px 0 30px 60px;
      text-align: center;
      font-size: 24px;
    }
  }
}
</style>
