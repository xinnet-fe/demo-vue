import request from '@/utils/request'

export function findSafeGrade(query) {
  return request({
    url: '/usersafe/findSafeGrade',
    method: 'GET',
    params: query
  })
}

