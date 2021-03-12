// import request from '@/utils/request'
// import querystring from 'querystring'

// 图表概览
export function getOverviewSize(data) {
  // return request({
  //   url: '/dapan/getOverviewSize',
  //   method: 'post',
  //   data: querystring.stringify(data)
  // })
  return Promise.resolve({ 'success': true, 'message': 'success', 'data': { 'momGmv': -0.24, 'momOrderNumber': 0.06, 'momOrderUsers': 0.09, 'momRegisterNumber': 0.09, 'sumGmv': '1580278.67', 'sumOrderNumber': 8431, 'sumOrderUsers': 3716, 'sumRegisterNumber': 1578, 'yoyGmv': -0.22, 'yoyOrderNumber': -0.13, 'yoyOrderUsers': -0.21, 'yoyRegisterNumber': -0.35 } })
}

// 大盘数据图
export function getCurve(data) {
  // return request({
  //   url: '/dapan/getCurve',
  //   method: 'post',
  //   data: querystring.stringify(data)
  // })
  return Promise.resolve({'success':true,'message':'success','data':{'2021-03-07 00:00:00':{'id':0,'productId':0,'occurDate':'2021-03-07 00:00:00','atv':105.15,'atvAverageValue':372.42,'atvRisingValue':566.3,'atvFallingValue':231.65,'atvWarningValue':158.33,'registerNumber':0,'newUsers':0,'oldUsers':0,'orderUsers':0},'2021-03-06 00:00:00':{'id':0,'productId':0,'occurDate':'2021-03-06 00:00:00','atv':148.95,'atvAverageValue':372.52,'atvRisingValue':566.3,'atvFallingValue':231.51,'atvWarningValue':158.33,'registerNumber':0,'newUsers':0,'oldUsers':0,'orderUsers':0},'2021-03-05 00:00:00':{'id':0,'productId':0,'occurDate':'2021-03-05 00:00:00','atv':604.12,'atvAverageValue':372.6,'atvRisingValue':566.3,'atvFallingValue':231.34,'atvWarningValue':158.33,'registerNumber':0,'newUsers':0,'oldUsers':0,'orderUsers':0},'2021-03-04 00:00:00':{'id':0,'productId':0,'occurDate':'2021-03-04 00:00:00','atv':297.21,'atvAverageValue':372.73,'atvRisingValue':566.3,'atvFallingValue':231.26,'atvWarningValue':158.33,'registerNumber':0,'newUsers':0,'oldUsers':0,'orderUsers':0},'2021-03-03 00:00:00':{'id':0,'productId':0,'occurDate':'2021-03-03 00:00:00','atv':311.6,'atvAverageValue':372.72,'atvRisingValue':566.86,'atvFallingValue':231.26,'atvWarningValue':158.33,'registerNumber':0,'newUsers':0,'oldUsers':0,'orderUsers':0},'2021-03-02 00:00:00':{'id':0,'productId':0,'occurDate':'2021-03-02 00:00:00','atv':265.81,'atvAverageValue':372.08,'atvRisingValue':565.92,'atvFallingValue':231.26,'atvWarningValue':158.33,'registerNumber':0,'newUsers':0,'oldUsers':0,'orderUsers':0},'2021-03-01 00:00:00':{'id':0,'productId':0,'occurDate':'2021-03-01 00:00:00','atv':379.8,'atvAverageValue':371.52,'atvRisingValue':564.59,'atvFallingValue':230.95,'atvWarningValue':158.33,'registerNumber':0,'newUsers':0,'oldUsers':0,'orderUsers':0},'2021-02-28 00:00:00':{'id':0,'productId':0,'occurDate':'2021-02-28 00:00:00','atv':879.83,'atvAverageValue':370.89,'atvRisingValue':563.66,'atvFallingValue':230.95,'atvWarningValue':158.33,'registerNumber':0,'newUsers':0,'oldUsers':0,'orderUsers':0}}})
}

// 大盘明细图
export function getDetailedCurve(data) {
  // return request({
  //   url: '/dapan/getDetailedCurve',
  //   method: 'post',
  //   data: querystring.stringify(data)
  // })
  return Promise.resolve({'success':true,'message':'success','data':[{'id':0,'productId':0,'occurDate':'2021-02-28 00:00:00','registerNumber':0,'newUsers':34,'oldUsers':234,'orderUsers':0},{'id':0,'productId':0,'occurDate':'2021-03-01 00:00:00','registerNumber':0,'newUsers':59,'oldUsers':608,'orderUsers':0},{'id':0,'productId':0,'occurDate':'2021-03-02 00:00:00','registerNumber':0,'newUsers':60,'oldUsers':614,'orderUsers':0},{'id':0,'productId':0,'occurDate':'2021-03-03 00:00:00','registerNumber':0,'newUsers':80,'oldUsers':606,'orderUsers':0},{'id':0,'productId':0,'occurDate':'2021-03-04 00:00:00','registerNumber':0,'newUsers':176,'oldUsers':565,'orderUsers':0},{'id':0,'productId':0,'occurDate':'2021-03-05 00:00:00','registerNumber':0,'newUsers':139,'oldUsers':521,'orderUsers':0},{'id':0,'productId':0,'occurDate':'2021-03-06 00:00:00','registerNumber':0,'newUsers':94,'oldUsers':245,'orderUsers':0},{'id':0,'productId':0,'occurDate':'2021-03-07 00:00:00','registerNumber':0,'newUsers':48,'oldUsers':226,'orderUsers':0}]})
}

// 大盘新老用户数据
export function getNewAndOld(data) {
  // return request({
  //   url: '/dapan/getNewAndOld',
  //   method: 'post',
  //   data: querystring.stringify(data)
  // })
  return Promise.resolve({'success':true,'message':'success','data':[{'id':0,'productId':0,'occurDate':'2021-03-02 00:00:00','registerNumber':0,'newUsers':60,'newUserRisingValue':176.67,'newUserAverageValue':100.53,'newUserFallingValue':54.83,'newUserWarningValue':28.66,'oldUsers':614,'oldUserAverageValue':410.87,'oldUserRisingValue':799.3,'oldUserFallingValue':298.0,'oldUserWarningValue':28.66,'orderUsers':0}]})
}
