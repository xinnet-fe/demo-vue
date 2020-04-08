import Mock from 'mockjs'
import find from 'lodash/find'
// import remove from 'lodash/remove'
import forEach from 'lodash/forEach'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@cname',
    domain: '@domain',
    datetime: '@date',
    // region: '@province',
    'region|1': ['shanghai', 'beijing'],
    'resource|1': ['1', '2'],
    'delivery|1': [true, false],
    type: ['1', '2'],
    desc: '@cparagraph(2)',
    'state|1': [
      {
        name: '新增',
        value: 'add'
      },
      {
        name: '变更',
        value: 'change'
      }
    ]
  }))
}

export default [
  {
    url: '/order/list',
    type: 'get',
    response: config => {
      const { name, state, page = 1, limit = 10 } = config.query

      // 筛选条件
      const mockList = List.filter(item => {
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
        code: 200,
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
    url: '/order/create',
    type: 'post',
    response: config => {
      const {
        name,
        domain,
        region,
        date1,
        desc,
        type,
        delivery,
        resource
      } = config.body

      const datetime = date1

      List.unshift(Mock.mock({
        id: '@increment',
        name,
        domain,
        datetime,
        region,
        resource,
        state: {
          name: '新增',
          value: 'add'
        },
        desc,
        type,
        delivery
      }))
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  {
    url: '/order/update',
    type: 'post',
    response: config => {
      const { id, ...restProps } = config.body
      const row = find(List, { id })
      if (row) {
        forEach(restProps, (v, k) => {
          row[k] = v
        })
      }
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  {
    url: '/order/destroy',
    type: 'delete',
    response: {
      code: 200
    }
  }
]

