/**
 * Created by Administrator on 2017/8/24.
 */
var express = require('express');
var fs = require('fs');
var path = require('path');
// var formidable = require('formidable') //post请求接收参数或者上传文件时候可能会用到
// var gm = require('gm');

const IP = "localhost";
// const IP = "172.18.9.211";
// const IP = "10.1.45.18";
const PORT = "3002";
const FILEPATH = path.join(__dirname, `./mock/`);

var app = express();


//静态文件地址
app.use('/oss/download', express.static(path.join(__dirname, '/oss/download')));

app.use('*', function (req, res, next) {
  res.setHeader('Content-Type', 'text/json;charset=UTF-8');
  res.setHeader('Access-Control-Allow-Origin', req.headers['origin'] || req.headers['referer'] || "*");
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization,userId,projectId,tenant');
  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    // res.send(401);
    next();
  }
});

//查询看板下所有泳道
app.get('/getKanBanInfo/:kanbanId', (req, res, next) => {
  fs.readFile(path.join(FILEPATH, `kanbanInfo.json`), 'utf-8', (err, data) => {
    if (err) {
      res.send(404)
    } else {
      res.send(data)
    }
  })
});

//新建泳道：
app.post('/createBoard', (req, res, next) => {
  fs.readFile(path.join(FILEPATH, `createBoard.json`), 'utf-8', (err, data) => {
    if (err) {
      res.send(404)
    } else {
      res.send(data)
    }
  })
});

//删除泳道
app.delete('/delete/:kanbanId/:boardId', (req, res, next) => {
  fs.readFile(path.join(FILEPATH, `delBoard.json`), 'utf-8', (err, data) => {
    if (err) {
      res.send(404)
    } else {
      res.send(data)
    }
  })
});

//泳道移动
app.post('/changeBoardOrder', (req, res, next) => {
  fs.readFile(path.join(FILEPATH, `moveBoard.json`), 'utf-8', (err, data) => {
    if (err) {
      res.send(404)
    } else {
      res.send(data)
    }
  })
});

//创建任务
app.post('/createTask', (req, res, next) => {
  fs.readFile(path.join(FILEPATH, `createTask.json`), 'utf-8', (err, data) => {
    if (err) {
      res.send(404)
    } else {
      res.send(data)
    }
  })
});

//删除任务
app.delete('/deleteTask/:kanbanId/:taskId', (req, res, next) => {
  fs.readFile(path.join(FILEPATH, `delTask.json`), 'utf-8', (err, data) => {
    if (err) {
      res.send(404)
    } else {
      res.send(data)
    }
  })
});

//移动任务
app.post('/changeTaskOrder', (req, res, next) => {
  fs.readFile(path.join(FILEPATH, `moveTask.json`), 'utf-8', (err, data) => {
    if (err) {
      res.send(404)
    } else {
      res.send(data)
    }
  })
});

//移动任务
app.get('/getRounts', (req, res, next) => {
  fs.readFile(path.join(FILEPATH, `getRounts.json`), 'utf-8', (err, data) => {
    if (err) {
      res.send(404)
    } else {
      res.send(data)
    }
  })
});


app.listen(PORT, IP, (err) => {
  if (err) {
    console.log(err);
    return
  }
  console.log('fileResfulServer Listening at http://' + IP + ':' + PORT + '\n')
})

