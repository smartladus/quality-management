import request from '@/utils/request'

const chartsApi = {
  DefectAge: 'http://localhost:8899/api/charts/defectage',
  CumulativeDefectRate: 'http://localhost:8899/api/charts/cumulativedefectrate',
  CumulativeDefectTrend: 'http://localhost:8899/api/charts/cumulativedefecttrend',
  ProductDefectTrend: 'http://localhost:8899/api/charts/productdefecttrend',
}

export function getDefectAge() {
  return request({
    url: chartsApi.DefectAge,
    method: 'get',
  })
}

export function getCumulativeDefectRate() {
  return request({
    url: chartsApi.CumulativeDefectRate,
    method: 'get',
  })
}

export function getCumulativeDefectTrend() {
  return request({
    url: chartsApi.CumulativeDefectTrend,
    method: 'get',
  })
}

export function getProductDefectTrend() {
  return request({
    url: chartsApi.ProductDefectTrend,
    method: 'get',
  })
}