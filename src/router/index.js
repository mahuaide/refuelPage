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
import tabNave from '@/components/tabNave'
import vue0 from '@/components/nav/0.vue'
import vue1 from '@/components/nav/1.vue'
import vue2 from '@/components/nav/2.vue'
import vue11 from '@/components/nav/11.vue'
import vue12 from '@/components/nav/12.vue'
import vue21 from '@/components/nav/21.vue'
import vue22 from '@/components/nav/22.vue'
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
      path: '/tabNave',
      name: 'tabNave',
      component: tabNave,
      children:[
        {
          path: 'vue0',
          component: vue0,
          name: 'vue0'
        },
        {
          path: 'vue1',
          component: vue1,
          name: 'vue1',
          children:[
            {
              path: 'vue11',
              component: vue11,
              name: 'vue11'
            },
            {
              path: 'vue12',
              component: vue12,
              name: 'vue12'
            },
          ]
        },
        {
          path: 'vue2',
          component: vue2,
          name: 'vue2',
          children:[
            {
              path: 'vue21',
              component: vue21,
              name: 'vue21'
            },
            {
              path: 'vue22',
              component: vue22,
              name: 'vue22'
            },
          ]
        }
      ]
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    }
  ]
})
