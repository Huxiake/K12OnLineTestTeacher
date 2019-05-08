import request from '@/utils/request'
import qs from 'qs'

// 获取教师所在班级
export function getClassList() {
  return request({
    url: '/v1/teacher/schoolClass/listByTeacher',
    method: 'get'
  })
}

// 获取学生列表
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

// 获取试卷列表
export function getPaperList(condition) {
  const data = qs.stringify(condition)
  return request({
    url: '/v1/teacher/examPapers?' + data,
    method: 'get'
  })
}

// 新建试卷
export function newPaper(paper) {
  const data = qs.stringify(paper)
  return request({
    url: '/v1/teacher/examPapers?' + data,
    method: 'post'
  })
}

// 删除试卷
export function deletePaper(id) {
  return request({
    url: '/v1/teacher/examPapers/' + id,
    method: 'delete'
  })
}

// 获取试卷详情
export function getPaperDetails(id) {
  return request({
    url: '/v1/teacher/examPapers/' + id,
    method: 'get'
  })
}

// 删除题目
export function deleteQuestion(id) {
  return request({
    url: '/v1/teacher/examQuestions/' + id,
    method: 'delete'
  })
}

// 获取题目详情
export function getQuestionDetails(id) {
  return request({
    url: '/v1/teacher/examQuestions/' + id,
    method: 'get'
  })
}

// 更新题目详情
export function editQuestionDetails(id, question) {
  const data = qs.stringify(question)
  return request({
    url: '/v1/teacher/examQuestions/' + id + '?' + data,
    method: 'put'
  })
}

// 增加题目详情
export function addQuestionDetails(question) {
  console.log('que', question)
  const data = qs.stringify(question)
  return request({
    url: '/v1/teacher/examQuestions?' + data,
    method: 'post'
  })
}

// 获取考试列表
export function getExamList() {
  return request({
    url: '/v1/teacher/exams?pageNum=0&pageSize=100',
    method: 'get'
  })
}

// 新增考试信息
export function addExam(exam) {
  const data = qs.stringify(exam)
  return request({
    url: '/v1/teacher/exams?' + data,
    method: 'post'
  })
}

// 修改考试信息
export function editExam(id, exam) {
  const data = qs.stringify(exam)
  return request({
    url: '/v1/teacher/exams/' + id + '?' + data,
    method: 'put'
  })
}

// 获取考试详情
export function getExamDetails(id) {
  return request({
    url: '/v1/teacher/exams/' + id,
    method: 'get'
  })
}

// 删除考试
export function deleteExam(id) {
  return request({
    url: '/v1/teacher/exams/' + id,
    method: 'delete'
  })
}
