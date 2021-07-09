import request from '@/utils/request'

const certApi = {
  TaskList: 'http://localhost:8899/api/cert/task/get/all',
  TaskNoList: 'http://localhost:8899/api/cert/task/no/get/',
}

export function getCertTaskList() {
  return request({
    url: certApi.TaskList,
    method: 'get'
  })
}

export function getCertTaskNoList(taskNoSeg) {
  return request({
    url: certApi.TaskNoList + taskNoSeg,
    method: 'get'
  })
}
