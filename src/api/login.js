import request from '@/utils/request'
import qs from 'qs'

export function login(loginName, password) {
  let loginInfo = {
    'loginName': loginName,
    'password': password
  }
  loginInfo = qs.stringify(loginInfo)
  return request({
    url: '/v1/login/teacherPortal/web/login?loginName=123456&password=123456',
    method: 'post',
    data: loginInfo
  })
}

export function logout() {
  return request({
    url: '/v1/login/teacherPortal/web/logout',
    method: 'post'
  })
}
