import request from '@/utils/request'

const certApi = {
  UploadRegions: 'http://localhost:8899/api/cert/upload/regions',
  UploadTasks: 'http://localhost:8899/api/cert/upload/tasks',
  UploadCategories: 'http://localhost:8899/api/cert/upload/categories',
  Regions: 'http://localhost:8899/api/cert/regions',
  Tasks: 'http://localhost:8899/api/cert/tasks',
  TaskRecords: 'http://localhost:8899/api/cert/records',
  Categories: 'http://localhost:8899/api/cert/categories',

  TaskListTemplateDownload: 'http://localhost:8899/api/cert/task/download/template',
}
/**
 * ====================================================================================
 * Upload Api
 * ====================================================================================
 */

export function uploadRegions(mode, data) {
  return request({
    url: certApi.UploadRegions,
    method: 'post',
    params: {
      mode: mode
    },
    contentType: 'multipart/form-data',
    data: data
  })
}
export function uploadTasks(mode, data) {
  return request({
    url: certApi.UploadTasks,
    method: 'post',
    params: {
      mode: mode
    },
    contentType: 'multipart/form-data',
    data: data
  })
}

export function uploadCategories(mode, data) {
  return request({
    url: certApi.UploadCategories,
    method: 'post',
    params: {
      mode: mode
    },
    contentType: 'multipart/form-data',
    data: data
  })
}
/**
 * ====================================================================================
 * Region Api
 * ====================================================================================
 */
export function getAllRegions() {
  return request({
    url: certApi.Regions,
    method: 'get'
  })
}

export function insertRegion(region) {
  return request({
    url: certApi.Regions,
    method: 'post',
    data: region
  })
}

export function updateRegion(region) {
  return request({
    url: `${certApi.Regions}/${region.id}`,
    method: 'put',
    data: region
  })
}

export function deleteRegion(region) {
  return request({
    url: `${certApi.Regions}/${region.id}`,
    method: 'delete',
    data: region
  })
}

/**
 * ====================================================================================
 * Task Api
 * ====================================================================================
 */

export function getAllTasks() {
  return request({
    url: certApi.Tasks,
    method: 'get'
  })
}
export function getAllTaskNos() {
  return request({
    url: `${certApi.Tasks}/tasknos`,
    method: 'get'
  })
}

export function getTask(taskNo) {
  return request({
    url: `${certApi.Tasks}/${taskNo}`,
    method: 'get'
  })
}

export function insertTask(task) {
  return request({
    url: certApi.Tasks,
    method: 'post',
    data: task
  })
}


export function updateTask(task) {
  return request({
    url: `${certApi.Tasks}/${task.task_no}`,
    method: 'put',
    data: task
  })
}

export function deleteTask(taskNo) {
  return request({
    url: `${certApi.Tasks}/${taskNo}`,
    method: 'delete'
  })
}

/**
 * ====================================================================================
 * Task Record Api
 * ====================================================================================
 */
export function getRecordsOfTask(taskNo) {
  return request({
    url: certApi.TaskRecords,
    method: 'get',
    params: {
      task_no: taskNo
    },
  })
}

export function insertRecord(record) {
  return request({
    url: certApi.TaskRecords,
    method: 'post',
    data: record
  })
}

export function deleteRecord(recNo) {
  return request({
    url: `${certApi.TaskRecords}/${recNo}`,
    method: 'delete'
  })
}

export function updateRecord(record) {
  return request({
    url: `${certApi.TaskRecords}/${record.record_no}`,
    method: 'put',
    data: record
  })
}

/**
 * ====================================================================================
 * Category Api
 * ====================================================================================
 */
export function getAllCategories() {
  return request({
    url: certApi.Categories,
    method: 'get'
  })
}

export function getCategoriesByRegion(region) {
  return request({
    url: certApi.Categories,
    method: 'get',
    params: {
      region: region
    }
  })
}

//=========================================
/**
 * ====================================================================================
 * Download URL
 * ====================================================================================
 */

export const templateDownloadUrl = certApi.TaskListTemplateDownload;

