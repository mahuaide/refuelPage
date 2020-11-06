const REFUEL = '/refuel';
const STATION = '/station';
const USER = '/user';
const GITLAB = '/gitlab';
const URL = '/url';
export default {
  register:USER + '/register',
  getRefuelLogAll:REFUEL+'/query/all',
  delRefuelLogById:REFUEL+'/delete/{id}',
  getStationAll: STATION + '/query/all',
  newRefuelLog:REFUEL+'/create',
  updateRefuelLogById:REFUEL + '/updateInfo/{id}',
  login:USER +'/login/{userName}/{password}',
  getLoginUserInfo:USER +'/getLoginUserInfo',
  checkUserExist:USER + '/checkUserExist/{userName}',
  getRefuelLogInStation:REFUEL + '/query/instation',
  /*********************看板 start ********************/
  getKanbanInfo:'/getKanBanInfo/{kanbanId}', //获取看板信息
  createBoard:'/createBoard', //新建泳道
  delBoard:'/delete/{kanbanId}/{boardId}', //删除泳道
  moveBoard:'/changeBoardOrder', //移动泳道
  createTask:'/createTask',//创建任务
  delTask:'/deleteTask/{kanbanId}/{taskId}',//删除任务
  moveTask:'/changeTaskOrder',//移动任务
  /*********************看板 end ********************/
  /*********************getlab start***************************/
  getGitProjects:GITLAB+'/getProjects',
  getGitDiff:GITLAB+'/getDiff/{project}/{sha}',
  getCommits:GITLAB+'/getCommits/{project}/{branch}',
  getBranches:GITLAB+'/getBranches/{project}',
  /*********************getlab end***************************/
  /*********************动态路由加载***********************/
  getRounts:'/getRouter',
  /*********************动态路由加载***********************/
  redirectAjax:URL + "/backToIndex",
}

