import request from '@/utils/request'

const chartsApi = {
  defectAge: 'http://localhost:8899/api/charts/defectage'
}

export function getDefectAge() {
  return request({
    url: chartsApi.defectAge,
    method: 'get',
  })
}