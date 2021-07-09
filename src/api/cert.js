import request from '@/utils/request'

const certApi = {
  RegionList: 'http://localhost:8899/api/cert/region/get/all',
  TaskList: 'http://localhost:8899/api/cert/task/get/all',
  TaskNoList: 'http://localhost:8899/api/cert/task/no/get/',
  CertTask: 'http://localhost:8899/api/cert/task/get/',
}

export function getRegionList() {
  return request({
    url: certApi.RegionList,
    method: 'get'
  })
}

export function getCertTaskList() {
  return request({
    url: certApi.TaskList,
    method: 'get'
  })
}

export function getCertTask(taskNo) {
  return request({
    url: certApi.CertTask + taskNo,
    method: 'get'
  })
}

export function getCertTaskNoList(taskNoSeg) {
  return request({
    url: certApi.TaskNoList + taskNoSeg,
    method: 'get'
  })
}
