import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import {lsWrite,lsRead} from '../common/js/ls'
import * as types from '../store/type'
import {addRoutes} from './createRoutes'


Vue.use(Router)
if(lsRead("user").userId){
  store.commit(types.LOGIN, lsRead("user"));
}
export const staticRouter =[
    {
      path: '/',
      component: () => import('@/components/login.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login.vue')
    },
    {
      path: '/refuel',
      name: 'refuel',
      component: () => import('@/components/refuel.vue')
    },
    {
      path: '/station',
      name: 'station',
      component: () => import('@/components/gasStation')
    },
    {
      path: '/dndEcharts',
      name: 'dndEcharts',
      component: () => import('@/components/dndEcharts')
    },
    {
      path: '/customLane',
      name: 'customLane',
      component: () => import('@/components/customLane')
    },
    {
      path: '/customLaneLong',
      name: 'customLaneLong',
      component: () => import('@/components/customLaneLong')
    },
    {
      path: '/complexKanban',
      name: 'complexKanban',
      component: () => import('@/components/complexKanban')
    },
    {
      path: '/complexKanbanUserCustom',
      name: 'complexKanbanUserCustom',
      component: () => import('@/components/complexKanbanUserCustom')
    },
    {
      path: '/complexKanbanUserCustomPerson',
      name: 'complexKanbanUserCustomPerson',
      component: () => import('@/components/complexKanbanUserCustomPerson')
    },
    {
      path: '/customLaneCitic',
      name: 'customLaneCitic',
      component: () => import('@/components/customLaneCitic')
    },
    {
      path: '/gitlabdiff',
      name: 'gitlabdiff',
      component: () => import('@/components/gitlabdiff')
    },
    {
      path: '/wbsTree',
      name: 'wbsTree',
      component: () => import('@/components/wbsTree')
    },
    {
      path: '/complexKanbanManager',
      name: 'complexKanbanManager',
      component: () => import('@/components/complexKanbanManager')
    },
    {
      path: '/complexKanbanCEO',
      name: 'complexKanbanCEO',
      component: () => import('@/components/complexKanbanCEO')
    },
    // {
    //   path: '/tabNave',
    //   name: 'tabNave',
    //   component: () => import('@/components/tab/index.vue'),
    //   redirect:'/tabNave/vue0',
    //   children:[
    //     {
    //       path: 'vue0',
    //       component: () => import('@/components/nav/0.vue'),
    //       name: 'vue0'
    //     },
    //     {
    //       path: 'vue1',
    //       component: () => import('@/components/nav/1'),
    //       name: 'vue1',
    //       children:[
    //         {
    //           path: 'vue11',
    //           component: () => import('@/components/nav/11'),
    //           name: 'vue11'
    //         },
    //         {
    //           path: 'vue12',
    //           component: () => import('@/components/nav/12'),
    //           name: 'vue12'
    //         },
    //       ]
    //     },
    //     {
    //       path: 'vue2',
    //       component: () => import('@/components/nav/2'),
    //       name: 'vue2',
    //       children:[
    //         {
    //           path: 'vue21',
    //           component: () => import('@/components/nav/21'),
    //           name: 'vue21'
    //         },
    //         {
    //           path: 'vue22',
    //           component: () => import('@/components/nav/22'),
    //           name: 'vue22'
    //         },
    //       ]
    //     }
    //   ]
    // },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@/components/demo'),
    }
]
export const router = new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: staticRouter
})

router.beforeEach((to, from, next) => {
  addRoutes().then((res)=>{
    router.addRoutes(res)
  })
  next();
})
