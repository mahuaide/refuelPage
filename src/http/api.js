/**
 * Created by Administrator on 2017/3/21.
 */
import axios from './http.js';
import qs from 'qs'
import Path from './path'
import {resfulParamsToUrl} from './resfulUrl'
//用户
export const login = params=>{return axios.post(resfulParamsToUrl(Path.login,params),params)}
export const register = params=>{return axios.post(resfulParamsToUrl(Path.register,params),params)}
export const getLoginUserInfo = params=>{return axios.get(resfulParamsToUrl(Path.getLoginUserInfo,params),{params})}
export const checkUserExist = params=>{return axios.get(resfulParamsToUrl(Path.checkUserExist,params),{params})}
//加油记录
export const getRefuelLogAll = params=>{return axios.get(resfulParamsToUrl(Path.getRefuelLogAll,params),{params})}
export const getRefuelLogInStation = params=>{return axios.get(resfulParamsToUrl(Path.getRefuelLogInStation,params),{params})}
export const delRefuelLogById = params=>{return axios.delete(resfulParamsToUrl(Path.delRefuelLogById,params),{params})}
export const newRefuelLog = params=>{return axios.post(resfulParamsToUrl(Path.newRefuelLog,params),params)}
export const updateRefuelLogById = params=>{return axios.post(resfulParamsToUrl(Path.updateRefuelLogById,params),params)}
//加油站
export const getStationAll = params=>{return axios.get(resfulParamsToUrl(Path.getStationAll,params),{params})}
//看板
export const getKanbanInfo = params=>{return axios.get(resfulParamsToUrl(Path.getKanbanInfo,params),{params})}
export const createBoard = params=>{return axios.post(resfulParamsToUrl(Path.createBoard,params),params)}
export const delBoard = params=>{return axios.delete(resfulParamsToUrl(Path.delBoard,params),{params})}
export const moveBoard = params=>{return axios.post(resfulParamsToUrl(Path.moveBoard,params),params)}
export const createTask = params=>{return axios.post(resfulParamsToUrl(Path.createTask,params),params)}
export const delTask = params=>{return axios.delete(resfulParamsToUrl(Path.delTask,params),{params})}
export const moveTask = params=>{return axios.post(resfulParamsToUrl(Path.moveTask,params),params)}
