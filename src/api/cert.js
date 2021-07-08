import request from '@/utils/request'

const certApi = {
  TaskList: 'http://localhost:8899/api/cert/task/get/all',
}

export function getCertTaskList() {
  return request({
    url: certApi.TaskList,
    method: 'get'
  })
}
