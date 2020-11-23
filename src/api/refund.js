import request from '@/utils/request'

// 1、产品列表查询
export function refundProduct_List(data) {
  var url = '/refundProduct/list/ec'
  return request({
    url,
    method: 'get',
    params: data
  })
}

// 2、产品下账单列表查询
export function refundProduct_BillList(data) {
  var url = '/refundProduct/billList'
  return request({
    url,
    method: 'get',
    params: data
  })
}

// 3、获取退费建议价格
export function instance_Refund_Money(data) {
  var url = '/refundProduct/refund/money'
  return request({
    url,
    method: 'post',
    data
  })
}

// 4、进行退费
export function instance_Refund(data) {
  var url = '/refundProduct/refund'
  return request({
    url,
    method: 'post',
    data
  })
}
