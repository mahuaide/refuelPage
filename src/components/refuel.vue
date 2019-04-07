<template>
  <div class="warpper">
    <div class="refuel-log">
      <p class="title"><span class="license">{{$store.state.user.license}}</span><b style="font-size: 14px;color: #999">
        ({{$store.state.user.carType}})</b>
        <span class="tip">车主：<b>{{$store.state.user.userName}}</b>，共 <b>{{count}}</b> 次，总计 <b>{{$store.state.user.payTotal || 0 }}</b> 元，总里程：<b>{{$store.state.user.mileage}}公里</b></span>
        <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="add"
                   style="float: right;margin: 8px 20px 0 0">新增
        </el-button>
        <el-button type="primary" size="small" icon="el-icon-circle-plus" @click="addSation"
                   style="float: right;margin: 8px 20px 0 0">加油站
        </el-button>
      </p>
      <template>
        <el-table
          :data="refuelLog"
          border
          style="width: 100%">
          <el-table-column
            label="日期"
            width="150">
            <template slot-scope="scope">
              {{scope.row.refuel_time | timeFormate('YYYY-MM-DD')}}
            </template>
          </el-table-column>
          <el-table-column
            prop="pay_money"
            label="金额（元）"
            width="120">
          </el-table-column>
          <el-table-column
            label="支付方式"
            width="120">
            <template slot-scope="scope">
              {{scope.row.pay_type | payType}}
            </template>
          </el-table-column>
          <el-table-column
            prop="oil_type"
            label="油号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="liters"
            label="升"
            width="80">
          </el-table-column>
          <el-table-column
            prop="station_name"
            align="left"
            label="加油站"
            width="100">
          </el-table-column>
          <el-table-column
            prop="station_address"
            label="地址"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="mileage"
            label="里程"
            align="left"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="small" @click="edit(scope.row,scope.$index)"
                           icon="el-icon-edit"></el-button>
                <el-button type="primary" size="small" @click="del(scope.row)" icon="el-icon-delete"></el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="float: right;margin-top: 10px"
                       @current-change="handleCurrentChange"
                       :current-page="page"
                       :page-size="pageSize"
                       layout="prev, pager, next"
                       :total="count">
        </el-pagination>
      </template>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="delConfirm"
      width="30%"
      center
    >
      <span style="color:red">是否删除{{refuelObj.refuel_time | timeFormate('YYYY-MM-DD')}}日的加油记录？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delConfirm = false">取 消</el-button>
        <el-button type="danger" @click="delConfirmSubmit()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="addorEdit=='add'?'新增记录':'编辑记录'" :visible.sync="addOne" @close="close">
      <el-form :model="form" ref="addOneForm">
        <el-form-item label="加油日期：" :label-width="formLabelWidth" prop="refuel_time" required>
          <el-date-picker
            v-model="form.refuel_time"
            type="date"
            placeholder="选择日期：">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="付款金额：" :label-width="formLabelWidth" prop="pay_money" required>
          <el-input-number v-model="form.pay_money" :precision="2" :step="0.1" :max="100000"></el-input-number>
        </el-form-item>
        <el-form-item label="付款方式：" :label-width="formLabelWidth" prop="pay_type" required>
          <el-select v-model="form.pay_type" placeholder="请选付款方式">
            <el-option label="现金" value="cash"></el-option>
            <el-option label="微信" value="wechat"></el-option>
            <el-option label="支付宝" value="alipay"></el-option>
            <el-option label="银行卡" value="card"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="油号：" :label-width="formLabelWidth" prop="oil_type" required>
          <el-radio v-model="form.oil_type" label="92">92</el-radio>
          <el-radio v-model="form.oil_type" label="95">95</el-radio>
        </el-form-item>
        <el-form-item label="升：" :label-width="formLabelWidth" prop="liters">
          <el-input-number v-model="form.liters" :precision="2" :step="0.1" :max="100000"></el-input-number>
        </el-form-item>
        <el-form-item label="加油站：" :label-width="formLabelWidth" prop="refuel_station_id" required>
          <el-select v-model="form.refuel_station_id" placeholder="请选加油站">
            <el-option v-for="item in stations"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">

            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="里程：" :label-width="formLabelWidth" prop="mileage">
          <el-input-number v-model="form.mileage" :precision="1" :step="100" :max="10000000"></el-input-number>
        </el-form-item>
      <el-form-item label="照片：" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          with-credentials="true"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addOne = false">取 消</el-button>
        <el-button v-if="addorEdit=='add'" type="primary" @click="addSubmit">新 增</el-button>
        <el-button v-if="addorEdit=='edit'" type="primary" @click="editSubmit">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getRefuelLogAll, delRefuelLogById, getStationAll, newRefuelLog, updateRefuelLogById,getLoginUserInfo} from '@http/api.js'
  import * as types from '../store/type'
  import axios from 'axios'
  export default {
    data () {
      return {
        imageUrl: '',
        uploadUrl:"",
        page: 1,
        pageSize: 10,
        count: 0,
        sum: 0,
        addorEdit: 'add',
        delConfirm: false,
        addOne: false,
        refuelLog: [],
        refuelObj: {},
        formLabelWidth: '120px',
        form: {
          refuel_time: '',
          pay_money: 0,
          pay_type: '',
          oil_type: '92',
          liters: '',
          refuel_station_id: '',
          mileage: '',
          photo:""
        },
        stations: []
      }
    },
    computed: {},
    mounted(){
      this._getRefuelLogAll();
      this._getStationAll();
      this.uploadUrl = axios.defaults.baseURL + '/oss/photo'
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.form.photo = file.response;
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        return isLt2M;
      },
      getLoginUser(){
        getLoginUserInfo().then(res => {
          let {code, data, errMsg} = res.data;
          if (code == 200) {
            this.$store.commit(types.LOGIN, data);
          }
        })
      },
      addSation(){
        this.$router.push('/station');
      },
      close(){
        this.$refs['addOneForm'].resetFields();
      },
      handleCurrentChange(val){
        this.page = val;
        this._getRefuelLogAll();
      },
      _getStationAll(){
        getStationAll().then(res => {
          let {code, data, errMsg} = res.data;
          if (code == 200) {
            this.stations = data.map((st) => {
              return {key: st.station_id, value: st.station_id, label: st.station_name}
            })
          } else {
            this.$notify({
              title: 'wrong',
              message: errMsg || 'getStationAll error!',
              type: 'error'
            })
          }
        })
      },
      _getRefuelLogAll(){
        getRefuelLogAll({page: this.page, pageSize: this.pageSize}).then(res => {
          let {code, log, count, sum, errMsg} = res.data;
          if (code == 200) {
            this.refuelLog = log;
            this.count = count;
            this.sum = sum.toFixed(2);
          } else {
            this.$notify({
              title: 'wrong',
              message: errMsg || 'getRefuelLogAll error!',
              type: 'error'
            })
          }
        })
      },
      edit(row, index){
        this.addorEdit = 'edit';
        this.refuelObj = row;
        this.addOne = true;
        this.form = Object.assign({}, this.refuelLog[index]);
        this.imageUrl = this.form.photo?axios.defaults.baseURL+'/oss/photo/'+this.form.photo:"";
      },
      editSubmit(){
        this.$refs['addOneForm'].validate((valid) => {
          if (valid) {
            updateRefuelLogById(Object.assign({id: this.refuelObj.refuel_id}, this.form)).then(res => {
              let {code, data, errMsg} = res.data;
              if (code == 200) {
                this._getRefuelLogAll();
                this.getLoginUser()
                this.addOne = false;
              } else {
                this.$notify({
                  title: 'wrong',
                  message: errMsg || 'newRefuelLog error!',
                  type: 'error'
                })
              }
            }).catch(e => {
              console.log(e)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      del(row){
        this.refuelObj = row;
        this.delConfirm = true;
      },
      delConfirmSubmit(){
          delRefuelLogById({id: this.refuelObj.refuel_id}).then(res => {
            let {code, data, errMsg} = res.data;
            if (code == 200) {
              this.delConfirm = false;
              this._getRefuelLogAll();
              this.getLoginUser()
            } else {
              this.$notify({
                title: 'wrong',
                message: errMsg || 'delRefuelLogById error!',
                type: 'error'
              })
            }
          })
      },
      add(){
        this.addorEdit = 'add';
        this.addOne = true;
        this.imageUrl = '';
      },
      addSubmit(){
        this.$refs['addOneForm'].validate((valid) => {
          if (valid) {
            newRefuelLog(Object.assign({}, this.form)).then(res => {
              let {code, data, errMsg} = res.data;
              if (code == 200) {
                this._getRefuelLogAll();
                this.getLoginUser()
                this.addOne = false;
              } else {
                this.$notify({
                  title: 'wrong',
                  message: errMsg || 'newRefuelLog error!',
                  type: 'error'
                })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .el-upload .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .warpper
    width 100%
    .refuel-log
      width 80%
      margin 0 auto
      .title
        text-align left
        font-size 22px
        height 30px
        font-family "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
        .license
          display inline-block
          height 30px
          text-align center
          padding 4px 10px
          margin-right 4px
          background-color blue
          border-radius 6px
          border 1px solid #ddd
          color #fff
        .el-icon-circle-plus
          display inline-block
          vertical-align middle
          font-size 26px
          color #409EFF
          cursor pointer
          opacity 0.8
          &:hover
            opacity 1
        .tip
          display inherit
          font-size 14px
          height 30px
          line-height 50px
          color #999
          float right
</style>
