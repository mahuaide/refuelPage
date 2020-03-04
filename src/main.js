// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import store from './store/store'
import ElementUI from 'element-ui'
import './font/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import filters from './filters' //自定义过滤器，挂在到Vue全局

Vue.config.productionTip = false
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
