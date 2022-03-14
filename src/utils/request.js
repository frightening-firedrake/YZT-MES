import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      config.headers['Authorization'] = "Bearer " + getToken()
    }
    //这里下面两行的逻辑我不太懂啦
    // const token = window.localStorage.getItem("token") ? window.localStorage.getItem("token") : "";
    // token && (config.headers.Authorization = "Bearer " + token);

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // console.log(res,'response')
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 200) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
      return res
    // }
  },
  error => {
    // console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    // return Promise.reject(error)
    if (error.response.status) {
      switch (error.response.status) {
        // 401-Unauthorized，表示没有提供授权信息或者提供的授权信息不正确(未登录)
        case 401:
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
    
        // 404-Not Found，表示请求的资源不存在
        case 404:
          Message({
            message: "网络请求不存在",
            type: "error"
          });
          break;
    
        // 500-Internal server error，表示服务器出现了错误
        case 500:
          if (error.response.data.error.message == 'An internal error occurred during your request!') {
            Message({
              message: "网络请求错误",
              type: "error"
            });
          } else if (error.response.data.error.message == 'Login failed!') {
            Message({
              message: "账号或密码错误",
              type: "error"
            });
          }
          break;
    
        // 其他错误，直接抛出错误提示
        default:
          var str = error.response.data.error.message ? error.response.data.error.message : "找不到错误原因";
          Message({
            message: str,
            type: "error"
          });
      }
      return Promise.reject(error.response);
    }
  }
)

export default service
