import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '云至泰MES平台',
        icon: 'dashboard'
      }
    }]
  },

  {
    path: '/WarehouseModeling',
    component: Layout,
    redirect: '/WarehouseModeling/WarehouseDefinition',
    name: 'WarehouseModeling',
    meta: {
      title: '仓库建模',
      icon: 'el-icon-s-help'
    },
    children: [{
        path: 'WarehouseModeling/WarehouseDefinition',
        name: 'WarehouseDefinitionf',
        // redirect: '/WarehouseModeling/WarehouseDefinition/WarehouseDefinition',
        component: () => import('@/views//WarehouseModeling/WarehouseDefinition/index'), // Parent router-view
        meta: {
          title: '仓库定义',
          icon: 'table'
        },
        children: [
          {
            path: 'WarehouseModeling/WarehouseDefinition/WarehouseDefinition',
            name: 'WarehouseDefinition',
            component: () => import('@/views/WarehouseModeling/WarehouseDefinition/WarehouseDefinition'),
            meta: {
              title: '仓库定义',
              icon: 'table'
            }
          },
          {
            path: 'WarehouseModeling/WarehouseDefinition/CreateWarehouse',
            name: 'Table2',
            component: () => import('@/views/WarehouseModeling/WarehouseDefinition/CreateWarehouse'),
            meta: {
              title: '创建仓库',
              icon: 'table'
            }
          },
          {
            path: 'WarehouseModeling/WarehouseDefinition/EditWarehouse',
            name: 'Table3',
            component: () => import('@/views/WarehouseModeling/WarehouseDefinition/EditWarehouse'),
            meta: {
              title: '编辑仓库',
              icon: 'table'
            }
          },
        ]
      },

      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: {
          title: '仓位定义',
          icon: 'tree'
        }
      },
      {
        path: 'tree2',
        name: 'Tree2',
        component: () => import('@/views/tree/index2'),
        meta: {
          title: '关联仓位',
          icon: 'tree'
        }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Form',
      component: () => import('@/views/form/index'),
      meta: {
        title: '表单',
        icon: 'form'
      }
    }]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '嵌套的路由',
      icon: 'nested'
    },
    children: [{
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {
          title: '菜单一'
        },
        children: [{
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: {
              title: '菜单一-1'
            }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: {
              title: '菜单一-2'
            },
            children: [{
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: {
                  title: '菜单一-2-1'
                }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: {
                  title: '菜单一-2-2'
                }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: {
              title: '菜单一-3'
            }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: {
          title: '菜单二'
        }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [{
      path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
      meta: {
        title: '这是带着连接的',
        icon: 'link'
      }
    }]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]


//异步理由:不同的用户（角色），需要过滤筛选出的路由，称之为异步路由
//有的用户可以看见测试管理、有的看不见
export const asyncRoutes = [{
    name: 'Acl',
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    meta: {
      title: '权限管理',
      icon: 'el-icon-lock',
      auth: '',
    },
    children: [{
        name: 'User',
        path: 'user/list',
        component: () => import('@/views/acl/user/list'),
        meta: {
          title: '用户管理',
          auth: 'Users'
        },
      },
      {
        name: 'Role',
        path: 'role/list',
        component: () => import('@/views/acl/role/list'),
        meta: {
          title: '角色管理',
          auth: 'Roles',
        },
      },
      {
        name: 'RoleAuth',
        path: 'role/auth/:id',
        component: () => import('@/views/acl/role/roleAuth'),
        meta: {
          activeMenu: '/acl/role/list',
          title: '角色授权',
          auth: 'ZYAA00_FieldConfiguration',
        },
        hidden: true,
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    name: 'Users',
    meta: {
      title: '测试管理',
      icon: 'el-icon-goods',
      auth: 'father',
    },
    children: [{
        path: 'test1',
        name: 'Test1',
        component: () => import('@/views/Test/Test1'),
        meta: {
          title: '测试管理1',
          auth: '6666',
        }
      },
      {
        path: 'test2',
        name: 'Test2',
        component: () => import('@/views/Test/Test2'),
        meta: {
          title: '测试管理2',
          auth: '777',
        }
      },
    ]
  },
];


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
