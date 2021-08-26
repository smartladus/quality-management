import Mock from 'mockjs2'
import { builder } from '../util'

const defectAgeData = [
  {type:'配件', period: '>1Y', value: 5},
  {type:'拼接屏', period: '>1Y', value: 4},
  {type:'广告机', period: '>1Y', value: 13},
  {type:'配件', period: '6-12M', value: 13},
  {type:'主机', period: '6-12M', value: 1},
  {type:'收银机', period: '6-12M', value: 1},
  {type:'拼接屏', period: '6-12M', value: 6},
  {type:'广告机', period: '6-12M', value: 24},
  {type:'配件', period: '3-6M', value: 10},
  {type:'拼接屏', period: '3-6M', value: 11},
  {type:'广告机', period: '3-6M', value: 47},
  {type:'配件', period: '<3M', value: 11},
  {type:'拼接屏', period: '<3M', value: 10},
  {type:'广告机', period: '<3M', value: 58},
  {type:'配件', period: 'DOA', value: 7},
  {type:'主机', period: 'DOA', value: 2},
  {type:'收银机', period: 'DOA', value: 1},
  {type:'拼接屏', period: 'DOA', value: 6},
  {type:'广告机', period: 'DOA', value: 22},
];

const defectAge = () => {
  return builder({
    'result': 'SUCCESS',
    'msg': 'mock data of defect age',
    'data': defectAgeData
  }).result
}

const cumulativeDefectRateData = [
  {type:'广告机', device: 0.0202, accessory: 0.0005},
  {type:'拼接屏', device: 0.0171, accessory: 0.0086},
  {type:'收银机', device: 0.0142, accessory: 0},
  {type:'主机', device: 0.0160, accessory: 0.1120},
]

const cumulativeDefectRate = () => {
  return builder({
    'result': 'SUCCESS',
    'msg': 'mock data of cumulative defect rate',
    'data': cumulativeDefectRateData
  }).result
}

const cumulativeDefectTrendData = {
  'byRepairment': [
    {'supplier': '捷翔', '2019': 0.0017,	'2020-01': 0.0037, '2020-02': 0.0037, '2020-03': 0.0036, '2020-04': 0.0067, '2020-05': 0.0082, '2020-06': 0.0108, '2020-07': 0.0111, '2020-08': 0.0093, '2020-09': 0.0097, '2020-10': 0.0103, '2020-11': 0.0099, '2020-12': 0.0097, '2021-01': 0.0106, '2021-02': 0.0112, '2021-03': 0.0121, '2021-04': 0.0138, '2021-05': 0.0146, '2021-06': 0.0157, '2021-07': 0.0166},
    {'supplier': '新视', '2019': 0.0000,	'2020-01': 0.0007, '2020-02': 0.0000, '2020-03': 0.0000, '2020-04': 0.0000, '2020-05': 0.0000, '2020-06': 0.0000, '2020-07': 0.0006, '2020-08': 0.0010, '2020-09': 0.0009, '2020-10': 0.0012, '2020-11': 0.0014, '2020-12': 0.0018, '2021-01': 0.0023, '2021-02': 0.0027, '2021-03': 0.0030, '2021-04': 0.0032, '2021-05': 0.0036, '2021-06': 0.0036, '2021-07': 0.0043},
    {'supplier': '安康', '2019': 0.0000,	'2020-01': 0.0000, '2020-02': 0.0000, '2020-03': 0.0000, '2020-04': 0.0000, '2020-05': 0.0000, '2020-06': 0.0007, '2020-07': 0.0015, '2020-08': 0.0022, '2020-09': 0.0019, '2020-10': 0.0021, '2020-11': 0.0020, '2020-12': 0.0017, '2021-01': 0.0017, '2021-02': 0.0017, '2021-03': 0.0018, '2021-04': 0.0018, '2021-05': 0.0021, '2021-06': 0.0020, '2021-07': 0.0019},
    {'supplier': '清投', '2019': 0.0000,	'2020-01': 0.0000, '2020-02': 0.0000, '2020-03': 0.0000, '2020-04': 0.0010, '2020-05': 0.0019, '2020-06': 0.0017, '2020-07': 0.0015, '2020-08': 0.0015, '2020-09': 0.0015, '2020-10': 0.0014, '2020-11': 0.0018, '2020-12': 0.0018, '2021-01': 0.0021, '2021-02': 0.0024, '2021-03': 0.0023, '2021-04': 0.0023, '2021-05': 0.0026, '2021-06': 0.0025, '2021-07': 0.0025},
    {'supplier': '其他', '2019': 0.0000,	'2020-01': 0.0000, '2020-02': 0.0000, '2020-03': 0.0000, '2020-04': 0.0000, '2020-05': 0.0000, '2020-06': 0.0000, '2020-07': 0.0006, '2020-08': 0.0005, '2020-09': 0.0004, '2020-10': 0.0004, '2020-11': 0.0004, '2020-12': 0.0003, '2021-01': 0.0003, '2021-02': 0.0003, '2021-03': 0.0003, '2021-04': 0.0005, '2021-05': 0.0005, '2021-06': 0.0006, '2021-07': 0.0007},
  ],
  'byDelivery': [
    {'date': '2019' ,'defectRate': 0.0309, 'shipment': 583},
    {'date': '2020-01' ,'defectRate': 0.0352, 'shipment': 196},
    {'date': '2020-02' ,'defectRate': 0.0360, 'shipment': 0},
    {'date': '2020-03' ,'defectRate': 0.0251, 'shipment': 587},
    {'date': '2020-04' ,'defectRate': 0.0257, 'shipment': 154},
    {'date': '2020-05' ,'defectRate': 0.0265, 'shipment': 572},
    {'date': '2020-06' ,'defectRate': 0.0283, 'shipment': 298},
    {'date': '2020-07' ,'defectRate': 0.0278, 'shipment': 268},
    {'date': '2020-08' ,'defectRate': 0.0267, 'shipment': 843},
    {'date': '2020-09' ,'defectRate': 0.0250, 'shipment': 559},
    {'date': '2020-10' ,'defectRate': 0.0240, 'shipment': 485},
    {'date': '2020-11' ,'defectRate': 0.0236, 'shipment': 508},
    {'date': '2020-12' ,'defectRate': 0.0221, 'shipment': 885},
    {'date': '2021-01' ,'defectRate': 0.0238, 'shipment': 571},
    {'date': '2021-02' ,'defectRate': 0.0237, 'shipment': 52},
    {'date': '2021-03' ,'defectRate': 0.0237, 'shipment': 212},
    {'date': '2021-04' ,'defectRate': 0.0239, 'shipment': 415},
    {'date': '2021-05' ,'defectRate': 0.0238, 'shipment': 353},
    {'date': '2021-06' ,'defectRate': 0.0231, 'shipment': 416},
    {'date': '2021-07' ,'defectRate': 0.0229, 'shipment': 247},
  ]
}

const cumulativeDefectTrend = (options) => {
  // console.log({ options })
  return builder({
    'result': 'SUCCESS',
    'msg': 'mock data of cumulative defect rate',
    'data': cumulativeDefectTrendData,
  }).result
}

Mock.mock(/\/api\/charts\/defectage/, 'get', defectAge)
Mock.mock(/\/api\/charts\/cumulativedefectrate/, 'get', cumulativeDefectRate)
Mock.mock(/\/api\/charts\/cumulativedefecttrend/, 'get', cumulativeDefectTrend)