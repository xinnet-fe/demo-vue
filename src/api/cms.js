import request from '@/utils/request'

export function advertGroupList(query) {
  return request({
    url: '/advert/group/list',
    method: 'get',
    params: query
  })
}

export function addAdvertGroup(data) {
  return request({
    url: '/advert/group/add',
    method: 'post',
    data
  })
}

export function updateAdvertGroup(data) {
  return request({
    url: '/advert/group/update',
    method: 'post',
    data
  })
}

export function destroyAdvertGroup(ids) {
  return request({
    url: '/advert/group/destroy',
    method: 'post',
    params: { ids }
  })
}

export function advertList(query) {
  return request({
    url: '/advert/list/list',
    method: 'get',
    params: query
  })
}

export function addAdvertList(data) {
  return request({
    url: '/advert/list/add',
    method: 'post',
    data
  })
}

export function updateAdvertList(data) {
  return request({
    url: '/advert/list/update',
    method: 'post',
    data
  })
}

export function destroyAdvertList(ids) {
  return request({
    url: '/advert/list/destroy',
    method: 'post',
    params: { ids }
  })
}

export function carouselList(query) {
  return request({
    url: '/carousel/list',
    method: 'get',
    params: query
  })
}

export function addCarousel(data) {
  return request({
    url: '/carousel/add',
    method: 'post',
    data
  })
}

export function updateCarousel(data) {
  return request({
    url: '/carousel/update',
    method: 'post',
    data
  })
}

export function destroyCarousel(ids) {
  return request({
    url: '/carousel/destroy',
    method: 'post',
    params: { ids }
  })
}

export function navList(query) {
  return request({
    url: '/carousel/list',
    method: 'get',
    params: query
  })
}

export function addNav(data) {
  return request({
    url: '/carousel/add',
    method: 'post',
    data
  })
}

export function updateNav(data) {
  return request({
    url: '/carousel/update',
    method: 'post',
    data
  })
}

export function destroyNav(ids) {
  return request({
    url: '/carousel/destroy',
    method: 'post',
    params: { ids }
  })
}
