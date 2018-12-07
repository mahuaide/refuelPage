const REFUEL = '/refuel';
const STATION = '/station';
const USER = '/user'
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
}

