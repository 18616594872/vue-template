const constantRoutes = [{
    path: '/login',
    hidden: true, // 不显示在左侧栏
    component: 'views/vm/login/login',
  },
  {
    path: "/",
    hidden: true, // 不显示在左侧栏
    redirect: "/login"
  }
]

const asyncRoutes = [
  {
      path: '/visual',
      hidden: true,
      name: '可视化',
      component: "views/vm/visualizations/visualizations",
  },
  {   
      path: '/visualDetail',
      name: '可视化详情',
      hidden: true,
      redirect: '/visualDetail/environment',
      component: "views/vm/overviewMain/overviewMain.vue",
      children: [{
              path: 'environment',
              name: '综合监控',
              component: "views/vm/environmentMonitor/environmentMonitor"
          },
          {
              path: 'tunnelIntroduct',
              name: '管廊简介',
              component: "views/vm/tunnelIntroduction/tunnelIntroduction"
          },
          {
              path: 'PlanManage',
              name: '预案管理',
              component: "views/vm/planManage/planManage"
          },
          {
              path: 'operatManage',
              name: '运营管理',
              component: "views/vm/operatManage/operatManage"
          },
      ]
  },
  {
      path: '/mam',
      redirect: '/mam/overview',
      name: '综合监控',
      component: "views/um/mainPage/mainPage",
      children: [{
          path: 'overview',
          name: '监控总览',
          component: "views/um/mam/overview/integratedMonitoring/integratedMonitoring"
      },
      {
          path: 'details',
          redirect: '/mam/details/environmentalMonitor',
          name: '监控详情',
          component: "components/um/umDetailsMain",
          children: [{
              path: 'environmentalMonitor',
              name: '环境监测',
              component: "views/um/mam/details/environmentalMonitor/environmentalMonitor",
              meta: {
                  title: '环境监测', // 设置在侧边栏中展示的名字
                  icon: 'tips' // 设置左侧图标
              }
          },
          {
              path: 'securityMonitor',
              name: '安防监控',
              component: "views/um/mam/details/securityMonitor/securityMonitor",
              meta: {
                  title: '安防监控', // 设置在侧边栏中展示的名字
                  icon: 'tips' // 设置左侧图标
              }
          },
          {
              path: 'mechanicalMonitor',
              name: '机电监控',
              component: "views/um/mam/details/mechanicalMonitor/mechanicalMonitor.vue",
              meta: {
                  title: '机电监控', // 设置在侧边栏中展示的名字
                  icon: 'tips' // 设置左侧图标
              }
          }]
      }]
  },
  {
      path: '/oam',
      redirect: '/oam/overview',
      name: '运营管理',
      component: "views/um/mainPage/mainPage",
      children: [
          {
              path: 'overview',
              name: '运营管理总览',
              component: "views/um/oam/overview/operationManagement/operationManagement"
          },
          {
              path: 'details',
              redirect: '/oam/details/contract_list',
              name: '运营详情',
              component: "components/um/umDetailsMain",
              children:[
                  {
                      path: 'contract_list',
                      name: '合同管理',
                      component: "views/um/oam/details/listContract/listContract",
                      meta: {
                          title: '合同管理', // 设置在侧边栏中展示的名字
                          icon: 'tips' // 设置左侧图标
                      }
                  }
              ]
          }
      ]
  },
  {
      path: '/permission',
      redirect: '/permission/overview',
      name: '权限管理',
      component: "views/um/mainPage/mainPage",
      children: [
          {
              path: 'overview',
              name: '角色权限',
              component: "views/cm/permission/permission"
          },
      ]
  }
]

function deepCop(root){
  if (typeof root !== 'object') {
      return
  }
  let origin = root.constructor.name === 'Array' ? [] : {}
  Object.keys(root).forEach(key => {
      if (typeof root[key] === 'object') {
          origin[key] = deepCop(root[key])
      } else {
          origin[key] = root[key]
      }
  })

  return origin
}

export let routes = deepCop([...constantRoutes, ...asyncRoutes])