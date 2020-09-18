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
export function exportExecl(param) {
  return request({
    url: '/tradeOrder/exportExecl',
    method: 'get',
    params: param
  })
}

// 获取详情列表
export function orderDetail(data) {
  return request({
    url: '/tradeOrder/findTradeOrderDetail',
    method: 'POST',
    params: data
  })
}
