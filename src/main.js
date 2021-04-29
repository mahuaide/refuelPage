// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import store from './store/store'
import ElementUI from 'element-ui'
import './common/jsmind/style/jsmind.css';
import './font/iconfont.css'
import './common/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import filters from './filters' //自定义过滤器，挂在到Vue全局
import autoFocus from '@/directives/autoFocus'
import waterMaker from '@/directives/waterMaker'
const mime = require("mime");

Vue.prototype.$mime = mime

Vue.config.productionTip = false
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
Vue.use(ElementUI);
Vue.use(autoFocus);
Vue.use(waterMaker);


Vue.directive('hasPermission', {
  // bind: function (el, binding, vnode) {
  //   let permissionCode = binding.value
  //   // 判断是否有权限
  //   if (!Vue.prototype.$_hasPermission(permissionCode, vnode.context.$route.meta.permissions)) {
  //     // 没有权限，当前元素从页面上删除
  //     el.parentNode.removeChild(el)
  //   }
  // },
  inserted: function (el, binding, vnode) {
    let permissionCode = binding.value
    // 判断是否有权限
    if (
      !Vue.prototype.$_hasPermission(
        permissionCode,
        vnode.context.$route.meta.roles
      )
    ) {
      // 没有权限，当前元素从页面上删除
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      }
    }
  }
})

// 权限检查方法
Vue.prototype.$_hasPermission = function (val, permission) {
  if (!val) {
    return true
  }
  if (!permission) {
    return false
  }
  if (permission.includes(val)) {
    return true
  }
  return false
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
