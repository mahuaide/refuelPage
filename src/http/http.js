﻿/**
 * Created by Administrator on 2017/3/20.
 */
import axios from 'axios'
import {
  router
} from '../router/index.js';

// axios 公共配置
axios.defaults.timeout = 60000;
// axios.defaults.baseURL = "http://refuel.applinzi.com";
// axios.defaults.baseURL = "http://k2321512s9.imwork.net:16607";
if (process.env.NODE_ENV === 'production') {
  // axios.defaults.baseURL = "http://2w30215129.goho.co:31152";
  axios.defaults.baseURL = "api";
} else {
  axios.defaults.baseURL = "http://localhost:3002";
}
axios.defaults.withCredentials = true;

// http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers.authorization += "1";
    config.url = config.url + '?_=' + new Date().getTime();
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

axios.interceptors.request.use(
  config => {
    config.headers.authorization += "2";
    config.url = config.url + '?_=' + new Date().getTime();
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          if (router.currentRoute.path != '/login') {
            router.replace({
              path: '/login'
            })
          }
          break;
      }
    }
    return Promise.reject(error)
  });
export default axios;
