import request from '@/utils/request'

const supplierApi = {
  UploadSuppliers: 'http://localhost:8899/api/quality/upload/suppliers',
  Suppliers: 'http://localhost:8899/api/quality/suppliers',
}

export function uploadSuppliers(mode, data) {
  return request({
    url: supplierApi.UploadSuppliers,
    method: 'post',
    params: {
      mode: mode
    },
    contentType: 'multipart/form-data',
    data: data
  })
}

export function getAllSuppliers() {
  return request({
    url: supplierApi.Suppliers,
    method: 'get'
  })
}