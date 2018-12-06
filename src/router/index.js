import Vue from 'vue'
import Router from 'vue-router'
import refuel from '@/components/refuel'
import station from '@/components/station'
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
  ]
})
