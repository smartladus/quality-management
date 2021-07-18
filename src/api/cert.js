import request from '@/utils/request'

const certApi = {
  RegionList: 'http://localhost:8899/api/cert/region/get/all',
  TaskList: 'http://localhost:8899/api/cert/task/get/all',
  TaskNoList: 'http://localhost:8899/api/cert/task/no/get/',
  GetCertTask: 'http://localhost:8899/api/cert/task/get/',
  UpdateCertTask: 'http://localhost:8899/api/cert/task/update',
  UploadTask: 'http://localhost:8899/api/cert/task/upload',
  TaskListTemplateDownload: 'http://localhost:8899/api/cert/task/download/template',
  DeleteTask: 'http://localhost:8899/api/cert/task/delete/',
  InsertTask: 'http://localhost:8899/api/cert/task/insert/',
  CertCategoryOfRegion: 'http://localhost:8899/api/cert/category/get',
  GetTaskRecord: 'http://localhost:8899/api/cert/task/record/get/',
  InsertTaskRecord: 'http://localhost:8899/api/cert/task/record/insert',
  DeleteTaskRecord: 'http://localhost:8899/api/cert/task/record/delete/',
  UpdateTaskRecord: 'http://localhost:8899/api/cert/task/record/update/',
  CategoryList: 'http://localhost:8899/api/cert/category/get/all',
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
    url: certApi.GetCertTask + taskNo,
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

export function updateTask(task) {
  return request({
    url: certApi.UpdateCertTask,
    method: 'post',
    data: task
  })
}

export function insertTask(task) {
  return request({
    url: certApi.InsertTask,
    method: 'post',
    data: task
  })
}

export const templateDownloadUrl = certApi.TaskListTemplateDownload;

export function getCategoriesByRegion(region) {
  return request({
    url: certApi.CertCategoryOfRegion,
    method: 'get',
    params: {
      region: region
    }
  })
}

export function getTaskRecord(taskNo) {
  return request({
    url: certApi.GetTaskRecord + taskNo,
    method: 'get'
  })
}

export function insertTaskRecord(record) {
  return request({
    url: certApi.InsertTaskRecord,
    method: 'post',
    data: record
  })
}

export function updateTaskRecord(record) {
  return request({
    url: certApi.UpdateTaskRecord,
    method: 'post',
    data: record
  })
}

export function deleteTaskRecord(recNo) {
  return request({
    url: certApi.DeleteTaskRecord + recNo,
    method: 'delete'
  })
}

export function getCategories() {
  return request({
    url: certApi.CategoryList,
    method: 'get'
  })
}




