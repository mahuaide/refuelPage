<template>
  <div class="wrapper">
    <div class="mask"></div>
    <div class="login" v-show="loginShow">
      <p class="sys-title">加油记录系统</p>
      <el-form ref="login" :model="form" label-width="80px">
        <el-form-item label="用户名" prop="userName" required>
          <el-input name="userName" v-model="form.userName" placeholder="请输入用户名" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="password" required>
          <el-input name="password" type="password" v-model="form.password" placeholder="请输入密码" autocomplete="off"
                    @keyup.13.native="_login"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="_login">登录</el-button>
          <el-button type="primary" @click="openRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="register">
      <el-dialog title="注册" top="8vh" width="40%"  append-to-body="true"
                 :visible.sync="dialogFormRegister"
                 @close="closeRegister" custom-class="registerDialog"
                 :close-on-click-modal="false" :modal="false">
        <el-form :model="formRegister" :rules="rules" ref="register">
          <el-form-item label="用户名" label-width="80" prop="userName">
            <el-input v-model="formRegister.userName" placeholder="登录时使用" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="车牌号" label-width="80" prop="license">
            <el-input v-model="formRegister.license" placeholder="京X·XXXXX" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="车型" label-width="80" prop="carType">
            <el-input v-model="formRegister.carType" placeholder="2018款迈锐宝1.5T豪华" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="80" prop="password">
            <el-input type="password" v-model="formRegister.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" label-width="80" prop="confirmPassword">
            <el-input type="password" v-model="formRegister.confirmPassword" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeRegister">取 消</el-button>
          <el-button type="primary" @click="_regist">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {login, getLoginUserInfo,register,checkUserExist} from '@http/api';
  import * as types from '../store/type'
  import md5 from 'blueimp-md5'
  export default{
    data(){
      var checkName = (rule, value, callback) => {
        setTimeout(() => {
          let params = {
            userName: value
          }
          checkUserExist(params).then(res => {
            let {data}  = res.data
            if (data[0] && data[0].count >0) {
              callback(new Error('用户已存在'));
            } else {
              callback();
            }
          })
        }, 200);
      };
      var checkPwdSame = (rule, value, callback) => {
        if (value == "") {
          return callback(new Error('请确认密码！'));
        } else {
          setTimeout(() => {
            if (value !== this.formRegister.password) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          }, 0)
        }
      };
      return {
        form: {
          userName: '',
          password: ''
        },
        loginShow: true,
        dialogFormRegister: false,
        formRegister: {
          userName: '',
          license: '',
          carType: '',
          password: '',
          confirmPassword: ''
        },
        rules: {
          userName: [
            {validator: checkName, trigger: 'blur',required:true},
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          license: [
            {required: true, message: '请输入车牌', trigger: 'blur'},
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          carType: [
            {required: true, message: '请输入车型', trigger: 'blur'},
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            { min: 6, max: 6, message: '长度在 6字符', trigger: 'blur' }
          ],
          confirmPassword: [
            {validator: checkPwdSame, trigger: 'blur', required: true},
          ],
        }
      }
    },
    methods: {
      _login(){
        this.$refs.login.validate(valid => {
          if (valid) {
            //console.log(md5(md5(this.form.password)+this.form.userName))
            login(Object.assign({},this.form)).then(res => {
              let {code, data, errMsg} = res.data;
              if (code == 200) {
                getLoginUserInfo().then(res => {
                  let {code, data, errMsg} = res.data;
                  if (code == 200) {
                    this.$store.commit(types.LOGIN, data);
                    this.$router.push('/refuel');
                  }
                })
              } else {
                this.form.userName = '';
                this.form.password = '';
                document.getElementsByName('userName')[0].value = ""
                document.getElementsByName('password')[0].value = ""
                this.$notify({
                  title: '错误',
                  type: 'error',
                  message: '用户名密码错误'
                })
              }
            })
          }
        })
      },
      openRegister(){
        this.dialogFormRegister = true;
        this.loginShow = false;
      },
      closeRegister(){
        this.dialogFormRegister = false;
        this.loginShow = true;
      },
      _regist(){
        this.$refs.register.validate((valid)=>{
            if(valid){
              register(Object.assign({},this.formRegister)).then(res=>{
                  let {code,data,errMsg} = res.data;
                  if(code ==200){
                    getLoginUserInfo().then(res => {
                      let {code, data, errMsg} = res.data;
                      if (code == 200) {
                        this.$store.commit(types.LOGIN, data);
                        this.$router.push('/refuel');
                      }
                    })
                  }else{

                  }
              })
            }
        })
      }
    },
    mounted(){

    },
    computed: {},
    components: {}
  }
</script>
<style>
  .registerDialog .el-dialog__body {
    padding: 4px 50px 20px 50px
  }

  .registerDialog .el-dialog__body .el-form-item {
    margin-bottom: 20px
  }
  .registerDialog .el-dialog__body .el-form-item__label{
    line-height: 20px;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    position fixed
    background url('./login.jpg') 50% 50% / cover no-repeat fixed
    width 100%
    height 100%
    z-index 0
    .mask
      position fixed
      width 100%
      height 100%
      background-color rgba(0, 0, 0, 0.4)
      z-index 1
    .login
      position fixed
      width 420px
      top 30%
      right 15%
      box-sizing border-box
      padding 20px 60px 20px 10px
      height 300px
      border-radius 5px
      background-color rgba(255, 255, 255, 0.9)
      z-index 2
      .sys-title
        margin-left 60px
        text-align center
        font-size 24px
</style>
