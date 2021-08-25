import Mock from 'mockjs2'
import { builder } from '../util'
// let data = [
//   {type:'配件', period: 'DOA', value: 7},
//   {type:'配件', period: '<3M', value: 11},
//   {type:'配件', period: '3-6M', value: 10},
//   {type:'配件', period: '6-12M', value: 13},
//   {type:'配件', period: '>1Y', value: 5},
//   {type:'主机', period: 'DOA', value: 2},
//   {type:'主机', period: '<3M', value: 0},
//   {type:'主机', period: '3-6M', value: 0},
//   {type:'主机', period: '6-12M', value: 1},
//   {type:'主机', period: '>1Y', value: 0},
//   {type:'收银机', period: 'DOA', value: 1},
//   {type:'收银机', period: '<3M', value: 0},
//   {type:'收银机', period: '3-6M', value: 0},
//   {type:'收银机', period: '6-12M', value: 1},
//   {type:'收银机', period: '>1Y', value: 0},
//   {type:'拼接屏', period: 'DOA', value: 6},
//   {type:'拼接屏', period: '<3M', value: 10},
//   {type:'拼接屏', period: '3-6M', value: 11},
//   {type:'拼接屏', period: '6-12M', value: 6},
//   {type:'拼接屏', period: '>1Y', value: 4},
//   {type:'广告机', period: 'DOA', value: 22},
//   {type:'广告机', period: '<3M', value: 58},
//   {type:'广告机', period: '3-6M', value: 47},
//   {type:'广告机', period: '6-12M', value: 24},
//   {type:'广告机', period: '>1Y', value: 13},
// ];
const data = [
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
    'data': data
  }).result
}


Mock.mock(/\/api\/charts\/defectage/, 'get', defectAge())