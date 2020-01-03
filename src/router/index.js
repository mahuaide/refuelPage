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
import customLaneCitic from '@/components/customLaneCitic'
import wbsTree from '@/components/wbsTree'
import gitlabdiff from '@/components/gitlabdiff'
import complexKanbanManager from '@/components/complexKanbanManager'
import complexKanbanCEO from '@/components/complexKanbanCEO'
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
      path: '/customLaneCitic',
      name: 'customLaneCitic',
      component: customLaneCitic
    },
    {
      path: '/gitlabdiff',
      name: 'gitlabdiff',
      component: gitlabdiff
    },
    {
      path: '/wbsTree',
      name: 'wbsTree',
      component: wbsTree
    },
    {
      path: '/complexKanbanManager',
      name: 'complexKanbanManager',
      component: complexKanbanManager
    },
    {
      path: '/complexKanbanCEO',
      name: 'complexKanbanCEO',
      component: complexKanbanCEO
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    }
  ]
})
