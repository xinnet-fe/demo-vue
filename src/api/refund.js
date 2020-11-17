import request from '@/utils/request'

// 1、产品列表查询
export function refundProduct_List(data) {
  var url = ''
  switch (data.productType) {
    case 'ARROW':
    case 'MYSQL':
    case 'LOAD_BALANCE':
    case 'FLOAT_IP':
      url = '/refundProduct/list'
      break
    case 'RABBITMQ':
    case 'NATGW':
    case 'REDIS':
      url = '/v1/makino/refundProduct/list'
      break
    default:
      url = ''
  }
  return request({
    url,
    method: 'get',
    params: data
  })
}

// 2、产品下账单列表查询
export function refundProduct_BillList(data) {
  var url = ''
  switch (data.productType) {
    case 'ARROW':
    case 'MYSQL':
    case 'LOAD_BALANCE':
    case 'FLOAT_IP':
      url = '/refundProduct/billList'
      break
    case 'RABBITMQ':
    case 'NATGW':
    case 'REDIS':
      url = '/v1/makino/refundProduct/billList'
      break
    default:
      url = ''
  }
  return request({
    url,
    method: 'get',
    params: data
  })
}

// 3、获取退费建议价格
export function instance_Refund_Money(data) {
  var url = ''
  switch (data.productType) {
    case 'ARROW':
    case 'MYSQL':
    case 'LOAD_BALANCE':
    case 'FLOAT_IP':
      url = '/instance/refund/money'
      break
    case 'RABBITMQ':
    case 'NATGW':
    case 'REDIS':
      url = '/v1/makino/refund/money'
      break
    default:
      url = ''
  }
  return request({
    url,
    method: 'post',
    data
  })
}

// 4、进行退费
export function instance_Refund(data) {
  var url = ''
  switch (data.productType) {
    case 'ARROW':
    case 'MYSQL':
    case 'LOAD_BALANCE':
    case 'FLOAT_IP':
      url = '/instance/refund'
      break
    case 'RABBITMQ':
    case 'NATGW':
    case 'REDIS':
      url = '/v1/makino/refund'
      break
    default:
      url = ''
  }
  return request({
    url,
    method: 'post',
    data
  })
}
