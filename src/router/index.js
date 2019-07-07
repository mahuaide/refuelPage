import Vue from 'vue'
import Router from 'vue-router'
import refuel from '@/components/refuel'
import dndEcharts from '@/components/dndEcharts'
import customLane from '@/components/customLane'
import customLaneLong from '@/components/customLaneLong'
import gasStation from '@/components/gasStation'
import login from '@/components/login'
import demo from '@/components/demo'
import store from '../store/store'
import complexKanban from '@/components/complexKanban'
import complexKanbanUserCustom from '@/components/complexKanbanUserCustom'
import complexKanbanUserCustomPerson from '@/components/complexKanbanUserCustomPerson'
import {lsWrite,lsRead} from '../common/js/ls'
import * as types from '../store/type'

Vue.use(Router)
if(lsRead("user").userId){
  store.commit(types.LOGIN, lsRead("user"));
}

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
      path: '/dndEcharts',
      name: 'dndEcharts',
      component: dndEcharts
    },
    {
      path: '/customLane',
      name: 'customLane',
      component: customLane
    },
    {
      path: '/customLaneLong',
      name: 'customLaneLong',
      component: customLaneLong
    },
    {
      path: '/complexKanban',
      name: 'complexKanban',
      component: complexKanban
    },
    {
      path: '/complexKanbanUserCustom',
      name: 'complexKanbanUserCustom',
      component: complexKanbanUserCustom
    },
    {
      path: '/complexKanbanUserCustomPerson',
      name: 'complexKanbanUserCustomPerson',
      component: complexKanbanUserCustomPerson
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    }
  ]
})
