import request from '@/utils/request'
import qs from 'qs'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function getStudentList(classId) {
  const classInfo = {
    'classId': classId
  }
  const params = qs.stringify(classInfo)
  return request({
    url: '/v1/teacher/studentMessage?' + params,
    method: 'get'
  })
}

// export function getList(params) {
//   return request({
//     url: '/table/list',
//     method: 'get',
//     params
//   })
// }
