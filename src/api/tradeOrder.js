import request from '@/utils/request'
// 获取订单列表
export function orderList(data) {
  return request({
    url: '/boss/tradeOrder/findTradeOrderListPage',
    method: 'POST',
    params: data
  })
}

// 导出首页订单
export function exportExecl(data) {
  return request({
    url: '/boss/tradeOrder/exportExecl',
    method: 'get',
    params: data
  })
}

// 获取详情列表
export function orderDetail(data) {
  return request({
    url: '/boss/tradeOrder/findTradeOrderDetail',
    method: 'POST',
    params: data
  })
}
// 订单改价
export function changeOrderPrice(data) {
  return request({
    url: '/ui/tradeOrder/changeOrderPrice',
    method: 'POST',
    params: data
  })
}
