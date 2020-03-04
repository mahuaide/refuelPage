/**
 * Created by Administrator on 2020/3/4.
 */
const _import = require('@/router/_import_' + process.env.NODE_ENV)
import * as types from '../store/type'
import {getRounts} from '@http/api.js'
import store from '../store/store'
export const createRouter = (data) => {
  let routes = [];
  data.forEach(item => {
    let route = {};
    route.path = item.path;
    route.name = item.name;
    try {
      route.component = _import(item.component);
    } catch (e) {
      console.log(e);
      return
    }
    if (item.children && item.children.length > 0) {
      let children = createRouter(item.children);
      route.children = children && children.length > 0 ? children : null
      if (!route.path && route.children) {
        route.path = route.children[0].path
      }
    }
    if (route.path) {
      routes.push(route)
    }
  })
  routes = routes.sort(function (a, b) {
    return a.order - b.order
  })
  return routes;
}

export const addRoutes = () => {
  return new Promise((resolve, reject) => {
    getRounts().then(res => {
      let routes = createRouter(res.data.data);
      store.commit(types.CREATEROUTES, routes);
      resolve(routes);
    }).catch(e => {
      reject("");
    })
  }).catch((e) => { reject("");})
}
