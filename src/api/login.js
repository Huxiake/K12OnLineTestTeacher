import request from '@/utils/request'
import qs from 'qs'

export function login(loginName, password) {
  let loginInfo = {
    'loginName': loginName,
    'password': password
  }
  loginInfo = qs.stringify(loginInfo)
  return request({
    url: '/v1/login/teacherPortal/web/login',
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

export function register(params) {
  const data = qs.stringify(params)
  return request({
    url: '/v1/teacher/register/register?' + data,
    method: 'post'
  })
}

// 发送验证码
export function sendSmsCode(params) {
  const data = qs.stringify(params)
  return request({
    url: '/v1/base/teacherSmsCode/send?' + data,
    method: 'post'
  })
}

// 验证验证码
export function verCode(code, phone, type) {
  return request({
    url: '/v1/base/studentSmsCode/verify?code=' + code + '&phone=' + phone + '&type=' + type,
    method: 'post'
  })
}

// 验证手机号码是否注册过
export function isNoRegister(params) {
  const data = qs.stringify(params)
  return request({
    url: '/v1/teacher/register/isNoRegister?' + data,
    method: 'get'
  })
}

// 修改密码
export function changePassword(params) {
  const data = qs.stringify(params)
  return request({
    url: '/v1/teacher/register/forgetPwd?' + data,
    method: 'put'
  })
}

// 科目列表
export function getSubjects() {
  return request({
    url: '/v1/teacher/subjects?pageNum=0&pageSize=100',
    method: 'get'
  })
}

// 学校列表
export function getSchools() {
  return request({
    url: '/v1/teacher/schools',
    method: 'get'
  })
}
