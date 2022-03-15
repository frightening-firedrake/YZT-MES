import {login,logout,getInfo,getAuth} from '@/api/user'
import {getToken,setToken,removeToken} from '@/utils/auth'
import {resetRouter,constantRoutes,asyncRoutes} from '@/router'
import router from '@/router'
import cloneDeep from 'lodash/cloneDeep'

const getDefaultState = () => {
  return {
    token: getToken(),
    userId: '',
    name: '',
    avatar: '',
    authRoutes: [], //储存匹配权限后筛选出的异步路由
    allroutes: constantRoutes //初始为原固定路由登陆后拼接异步筛选后的路由，形成总路由用于控制侧导航菜单的动态添加
  }
}

const state = getDefaultState()

//定制一个函数：格式化后台菜单权限数据
const computedAllPermissionsArr = (allPermissions) => {
  let arr = []
  for (var key in allPermissions) {
    if (key.indexOf("Pages") > -1) {
      arr.push(key.slice(6))
    } else {
      let sarr = key.split(".");
      arr.push(sarr[sarr.length - 2])
    }
  }
  return [...new Set(arr)];
}

//定义一个函数：两个数组进行对比，对比出当前用户到底显示哪些异步路由
const computedAsyncRoutes = (asyncRoutes, routes) => {
  //  //过滤出当前用户需要展示的异步路由

  // console.log('allPermissionsArr',routes,console.log(asyncRoutes))
  let res = asyncRoutes.filter(function(item) {
    if (routes.indexOf(item.meta.auth) > -1) {//包含根级菜单
      if (item.children) {//过滤子级
        item.children = computedAsyncRoutes(item.children, routes)
      }
      return true
    } else if (item.children) {//不包含根级但有子级过滤子级
      item.children = computedAsyncRoutes(item.children, routes)
      if (item.children.length) {
        return true
      }
    }
  })
  // console.log(res)
  return res
}

// const filterAsyncRoutes=(asyncRoutes, routes)=>{
// //   const authList = JSON.parse(window.localStorage.getItem('authList'))
//   console.log(asyncRoutes, routes)

//   const res = asyncRoutes.filter((route) => {
//     if (route.children) {
//       route.children = filterAsyncRoutes(route.children,routes)
//       if(route.children.length){
//         return true
//       }
//     } else {
//       if (routes.indexOf(route.meta.auth) >= 0) {
//         return true
//       }
//     }
//   })

//   console.log('---', res)
//   return res
// }



const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
    // console.log('RESET_STATE',state,constantRoutes,asyncRoutes)
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_ID: (state, userId) => {
    state.userId = userId
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_AUTHROUTES: (state, authRoutes) => {
    state.authRoutes = authRoutes
  },
  SET_ALLROUTES: (state, allroutes) => {
    // console.log('SET_ALLROUTES')
    state.allroutes = allroutes
  },
}

const actions = {
  // 登陆方法
  login({dispatch,commit,}, userInfo) {
    const {userNameOrEmailAddress,password,rememberMe} = userInfo

    // console.log(userNameOrEmailAddress, password ,rememberMe)

    return new Promise((resolve, reject) => {
      login({
        userNameOrEmailAddress: userNameOrEmailAddress.trim(),
        password: password,
        rememberMe: rememberMe
      }).then(response => {
        const {
          result
        } = response
        // console.log(result)

        commit('SET_TOKEN', result.accessToken);
        commit('SET_USER_ID', result.userId);
        // commit('SET_USER_ID', result.userId);

        // console.log(this)
        // getGrantedPermissions();
        //获取用户信息后获取权限
        dispatch('getAuth')
        setToken(result.accessToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getAuth({dispatch,commit,state}) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {
      getAuth().then(response => {
        // console.log(response)
        const {
          result
        } = response
        const {'auth': {allPermissions}} = result
        // console.log('allPermissions',allPermissions)
        if (!result) {
          return reject('验证失败请重新登录.')
        }

        // // const { name, avatar } = data
        // const { name} = result
        // commit('SET_NAME', name)
        // // commit('SET_AVATAR', avatar)
        let authRoutesres;
        // 调用方法格式化路由权限数组
        let allPermissionsArr=computedAllPermissionsArr(allPermissions)
        // console.log(allPermissionsArr)
        // 调用方法筛选权限路由
        authRoutesres=computedAsyncRoutes(cloneDeep(asyncRoutes),allPermissionsArr)
        // authRoutesres=computedAsyncRoutes(asyncRoutes,allPermissionsArr)
        // authRoutesres=computedAsyncRoutes(asyncRoutes,allPermissionsArr)
        // authRoutesres=filterAsyncRoutes(asyncRoutes,allPermissionsArr)
        //提交异步路由
        commit('SET_AUTHROUTES', authRoutesres)
        //设置异步路由
        dispatch('setAllroutes')
        // // resolve(data)
        // resolve(result)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    dispatch,
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {
      getInfo(state.userId).then(response => {
        const {
          result
        } = response

        if (!result) {
          return reject('验证失败请重新登录.')
        }

        // const { name, avatar } = data
        const {
          name
        } = result
        commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        // resolve(data)
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //设置动态路由方法待完成
  setAllroutes({ commit,state}) {
    // console.log(state.allroutes)
    //向路由添加异步路由
    let authRoutes = state.authRoutes;
    router.addRoutes(authRoutes)
    //合并总路由
    let allroutes = constantRoutes.concat(authRoutes)
    commit('SET_ALLROUTES', allroutes)
  },


  // user logout
  logout({ commit,state}) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
