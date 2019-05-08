import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: { title: '主页', icon: 'form' },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/class',
    component: Layout,
    name: 'class',
    meta: { title: '班级管理', icon: 'form' },
    children: [
      {
        path: '/class',
        name: 'classadmin',
        component: () => import('@/views/class/student'),
        children: [
          {
            path: 'student',
            name: 'student',
            meta: { title: '学生管理', icon: 'form' }
          }
        ]
      }
      // {
      //   path: '/class',
      //   name: 'classlist',
      //   component: () => import('@/views/class/classList'),
      //   children: [
      //     {
      //       path: 'list',
      //       name: 'list',
      //       meta: { title: '班级列表', icon: 'form' }
      //     }
      //   ]
      // }
    ]
  },

  {
    path: '/subject',
    component: Layout,
    name: 'subject',
    meta: { title: '试卷管理', icon: 'form' },
    children: [
      // {
      //   path: '/subject',
      //   name: 'subjectadmin',
      //   // component: () => import('@/vies/...'),
      //   children: [
      //     {
      //       path: 'question',
      //       name: 'question',
      //       // component: () => import(''),
      //       meta: { title: '题库管理', icon: 'form' }
      //     }
      //   ]
      // },
      {
        path: '/subject',
        name: 'subjectlist',
        // component: () => import('@/vies/...'),
        component: () => import('@/views/subject/paper'),
        children: [
          {
            path: 'list',
            name: 'list1',
            meta: { title: '试卷列表', icon: 'form' }
          }
        ]
      },
      {
        path: '/subject',
        name: 'subjectdetails',
        hidden: true,
        component: () => import('@/views/subject/details'),
        children: [
          {
            path: 'details/:id',
            name: 'paperdetails',
            meta: { title: '试卷详情', icon: 'form' }
          }
        ]
      },
      {
        path: '/subject/question',
        name: 'questionedit',
        hidden: true,
        component: () => import('@/views/subject/question/edit'),
        children: [
          {
            path: 'edit/:id',
            name: 'editquestion',
            meta: { title: '修改题目', icon: 'form' }
          }
        ]
      },
      {
        path: '/subject/question',
        name: 'questionadd',
        hidden: true,
        component: () => import('@/views/subject/question/add'),
        children: [
          {
            path: ':paperId/add',
            name: 'addquestion',
            meta: { title: '新增题目', icon: 'form' }
          }
        ]
      }
    ]
  },

  {
    path: '/test',
    component: Layout,
    name: 'test',
    meta: { title: '考试管理', icon: 'form' },
    children: [
      {
        path: '/test/release',
        name: 'testadmin',
        component: () => import('@/views/test/testDashboard'),
        children: [
          {
            path: 'dashboard',
            name: 'testdashboard',
            meta: { title: '考试看板', icon: 'form' }
          }
        ]
      },
      {
        path: '/test/list',
        name: 'tastlist',
        component: () => import('@/views/test/testList'),
        children: [
          {
            path: 'all',
            name: 'list2',
            meta: { title: '考试列表', icon: 'form' }
          }
        ]
      }
    ]
  },

  {
    path: '/score',
    component: Layout,
    name: 'score',
    meta: { title: '成绩分析', icon: 'form' },
    children: [{
      path: '/score',
      name: 'gradeanalysis',
      component: () => import('@/views/score'),
      children: [
        {
          path: 'index',
          name: 'analysis',
          meta: { title: '成绩分析表', icon: 'form' }
        }
      ]
    }]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
