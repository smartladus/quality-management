import request from '@/utils/request'

const certApi = {
  RegionList: 'http://localhost:8899/api/cert/region/get/all',
  TaskList: 'http://localhost:8899/api/cert/task/get/all',
  TaskNoList: 'http://localhost:8899/api/cert/task/no/get/',
  CertTask: 'http://localhost:8899/api/cert/task/get/',
  UploadTask: 'http://localhost:8899/api/cert/task/upload',
  TaskListTemplateDownload: 'http://localhost:8899/api/cert/task/download/template',
  DeleteTask: 'http://localhost:8899/api/cert/task/delete/'
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

export function uploadTaskList(mode, data) {
  return request({
    url: certApi.UploadTask,
    method: 'post',
    params: {
      mode: mode
    },
    contentType: 'multipart/form-data',
    data: data
  })
}

export function deleteTask(taskNo) {
  return request({
    url: certApi.DeleteTask + taskNo,
    method: 'delete'
  })
}

export function templateDownloadUrl() {
  return certApi.TaskListTemplateDownload;
}


