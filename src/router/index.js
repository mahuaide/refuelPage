import Vue from 'vue'
import Router from 'vue-router'
import refuel from '@/components/refuel'
import dndEcharts from '@/components/dndEcharts'
import demo from '@/components/demo'
import gasStation from '@/components/gasStation'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/refuel',
      name: 'refuel',
      component: refuel
    },
    {
      path: '/station',
      name: 'station',
      component: gasStation
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    },
    {
      path: '/dndEcharts',
      name: 'dndEcharts',
      component: dndEcharts
    }
  ]
})
