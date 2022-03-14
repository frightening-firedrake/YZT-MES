import request from '@/utils/request'

export function login(data) {
  // console.log('请求方法啦')
  return request({
    // url: '/vue-admin-template/user/login',
    url: '/api/TokenAuth/Authenticate',
    method: 'post',
    data
  })
}

export function getAuth() {
  return request({
    url: '/AbpUserConfiguration/GetAll',
    method: 'get',
    // params: { token }
  })
}

export function getInfo(id) {
  return request({
    // url: '/vue-admin-template/user/info',
    url: '/api/services/app/User/Get',
    method: 'get',
    params: { 'id':id }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
