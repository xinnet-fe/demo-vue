import Mock from 'mockjs'
import find from 'lodash/find'
// import remove from 'lodash/remove'
import forEach from 'lodash/forEach'

const advertGroup = []
const advertList = []
const carousels = []
const count = 100

for (let i = 0; i < count; i++) {
  advertGroup.push(Mock.mock({
    id: '@increment',
    code: '@increment',
    name: '@cname',
    'website|1': [1, 2, 3],
    createTime: '@date'
  }))

  advertList.push(Mock.mock({
    id: '@increment',
    number: '@increment',
    name: '@cname',
    'advertGroup|1': [1, 2],
    describe: '@cparagraph(2)',
    links: '@link',
    startTime: '@date',
    endTime: '@date',
    'state|1': [1, 0],
    config: '@link'
  }))

  carousels.push(Mock.mock({
    id: '@increment',
    number: '@increment',
    code: '@increment',
    name: '@cname',
    createTime: '@date',
    'state|1': [1, 0],
    'children|0-5': [
      {
        id: '@increment',
        number: '@increment',
        code: '@increment',
        name: '@cname',
        createTime: '@date',
        'state|1': [1, 0],
        'children|0-5': [
          {
            id: '@increment',
            number: '@increment',
            code: '@increment',
            name: '@cname',
            createTime: '@date',
            'state|1': [1, 0]
          }
        ]
      }
    ]
  }))
}

export default [
  // 广告组
  {
    url: '/advert/group/list',
    type: 'get',
    response: config => {
      const { name, state, page = 1, limit = 10 } = config.query

      // 筛选条件
      const mockList = advertGroup.filter(item => {
        if (name && item.name !== name) return false
        if (state && item.state.value !== state) return false
        return true
      })

      // 筛选分页
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      const total = mockList.length
      const pageCount = Math.ceil(total / limit)
      const hasFirst = page === 1
      const hasLast = page === total

      return {
        code: 20000,
        data: {
          data: pageList,
          page: {
            // 总条数
            total,
            // 总页数
            pageCount,
            // 当前页
            page: parseInt(page, 10),
            // 每页显示数
            limit: parseInt(limit, 10),
            // 是否有上一页,下一页
            hasFirst: !hasFirst,
            hasLast: !hasLast
          }
        }
      }
    }
  },

  {
    url: '/advert/group/add',
    type: 'post',
    response: config => {
      const {
        name,
        code,
        website
      } = config.body

      advertGroup.unshift(Mock.mock({
        id: '@increment',
        code,
        name,
        website,
        createTime: '@date'
      }))
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/advert/group/update',
    type: 'post',
    response: config => {
      const { id, ...restProps } = config.body
      const row = find(advertGroup, { id })
      if (row) {
        forEach(restProps, (v, k) => {
          row[k] = v
        })
      }
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/advert/group/destroy',
    type: 'post',
    response: {
      code: 20000
    }
  },

  // 广告列表
  {
    url: '/advert/list/list',
    type: 'get',
    response: config => {
      const { name, state, page = 1, limit = 10 } = config.query

      // 筛选条件
      const mockList = advertList.filter(item => {
        if (name && item.name !== name) return false
        if (state && item.state.value !== state) return false
        return true
      })

      // 筛选分页
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      const total = mockList.length
      const pageCount = Math.ceil(total / limit)
      const hasFirst = page === 1
      const hasLast = page === total

      return {
        code: 20000,
        data: {
          data: pageList,
          page: {
            // 总条数
            total,
            // 总页数
            pageCount,
            // 当前页
            page: parseInt(page, 10),
            // 每页显示数
            limit: parseInt(limit, 10),
            // 是否有上一页,下一页
            hasFirst: !hasFirst,
            hasLast: !hasLast
          }
        }
      }
    }
  },

  {
    url: '/advert/list/add',
    type: 'post',
    response: config => {
      advertList.unshift(Mock.mock({
        id: '@increment',
        ...config.body
      }))
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/advert/list/update',
    type: 'post',
    response: config => {
      const { id, ...restProps } = config.body
      const row = find(advertList, { id })
      if (row) {
        forEach(restProps, (v, k) => {
          row[k] = v
        })
      }
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/advert/list/destroy',
    type: 'post',
    response: {
      code: 20000
    }
  },

  // 轮播管理
  {
    url: '/carousel/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 10 } = config.query
      const mockList = carousels

      // 筛选分页
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      const total = mockList.length
      const pageCount = Math.ceil(total / limit)
      const hasFirst = page === 1
      const hasLast = page === total

      return {
        code: 20000,
        data: {
          data: pageList,
          page: {
            // 总条数
            total,
            // 总页数
            pageCount,
            // 当前页
            page: parseInt(page, 10),
            // 每页显示数
            limit: parseInt(limit, 10),
            // 是否有上一页,下一页
            hasFirst: !hasFirst,
            hasLast: !hasLast
          }
        }
      }
    }
  },

  {
    url: '/carousel/add',
    type: 'post',
    response: config => {
      carousels.unshift(Mock.mock({
        id: '@increment',
        ...config.body
      }))
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/carousel/update',
    type: 'post',
    response: config => {
      const { id, ...restProps } = config.body
      const row = find(carousels, { id })
      if (row) {
        forEach(restProps, (v, k) => {
          row[k] = v
        })
      }
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/carousel/destroy',
    type: 'post',
    response: {
      code: 20000
    }
  }
]
