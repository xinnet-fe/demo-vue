import request from '@/utils/request'
import querystring from 'querystring'

const baseurl = '/marketing'

export function checkAgentCode(data) {
  return request({
    url: baseurl + '/checkAgentCode',
    method: 'post',
    data: querystring.stringify(data)
  })
}

export function fetchList(data) {
  const sort = JSON.stringify(data.sort)
  delete data.sort
  return request({
    url: baseurl + '/marketingPage',
    method: 'post',
    data: querystring.stringify(data) + '&sort=' + sort
  })
}

export function createMarket(data) {
  // delete data.time
  // console.log('axios -> /addMarketing ->data=', querystring.stringify(data))
  return request({
    url: baseurl + '/addMarketing',
    method: 'post',
    data: querystring.stringify(data)
  })
}

export function updateMarket(data) {
  return request({
    url: baseurl + '/updateMarketing',
    method: 'post',
    data: querystring.stringify(data)
  })
}

// 某促销中，查询商品，返回的列表
export function getGoodsList(data) {
  return request({
    url: baseurl + '/getGoodsList',
    method: 'post',
    data: querystring.stringify(data)
  })
}

// 某促销中，查询商品，返回的列表，选中某些商品后，添加到促销中
export function insertMarketingPrice(data) {
  return request({
    url: baseurl + '/insertMarketingPrice',
    method: 'post',
    data: querystring.stringify(data)
  })
}

// 某促销对应的商品列表
export function getMarketingPrice(data) {
  return request({
    url: baseurl + '/getMarketingPrice',
    method: 'post',
    data: querystring.stringify(data)
  })
}

// 某促销对应的商品列表中，修改商品价格
export function modifyGoodsPrice(data) {
  return request({
    url: baseurl + '/updateMarketingPrice',
    method: 'post',
    data: querystring.stringify(data)
  })
}

// 某促销对应的商品，删除指定商品
export function delMarketingPrice(data) {
  return request({
    url: baseurl + '/delMarketingPrice',
    method: 'post',
    data: querystring.stringify(data)
  })
}
