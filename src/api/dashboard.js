import request from '@/utils/request'

const chartsApi = {
  DefectAge: 'http://localhost:8899/api/charts/defectage',
  CumulativeDefectRate: 'http://localhost:8899/api/charts/cumulativedefectrate',
  CumulativeDefectTrend: 'http://localhost:8899/api/charts/cumulativedefecttrend',
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
    url: chartsApi.CumulativeDefectTrend + '?by=xx',
    method: 'get',
  })
}