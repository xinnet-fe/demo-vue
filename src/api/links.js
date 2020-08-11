import requests from '@/utils/requests'

export function links(query) {
  return requests({
    url: '/link/list',
    method: 'get',
    params: query
  })
}

export function addLink(data) {
  return requests({
    url: '/link/add',
    method: 'post',
    data
  })
}

export function modifyLink(data) {
  return requests({
    url: '/link/modify',
    method: 'post',
    data
  })
}

export function destroyLink(ids) {
  return requests({
    url: '/link/delete',
    method: 'post',
    params: {
      ids
    }
  })
}
