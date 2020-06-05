import Mock from 'mockjs'

Mock.Random.extend({
  phone() {
    var phonePrefixs = ['132', '135', '189']
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/)
  }
})

const applyList = []
const infoList = []
const count = 100

for (let i = 0; i < count; i++) {
  applyList.push(Mock.mock({
    agentCode: '@increment',
    phone: '@phone',
    email: '@email',
    contacts: '@cname',
    province: '@province',
    city: '@city',
    applyTime: '@date',
    'state|1': [0, 1]
  }))

  infoList.push(Mock.mock({
    agentCode: '@increment',
    name: '@cname',
    date: '@date',
    'company|1': ['one', 'two'],
    'finance|1': ['beijing', 'shanghai'],
    'level|1': ['putong', 'baijin'],
    sale: '@cname',
    'state|1': [0, 1]
  }))
}

export default [
  {
    url: '/agentManage/applyList',
    type: 'get',
    response: config => {
      const { page = 1, limit = 10 } = config.query
      const mockList = applyList

      // 筛选分页
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      const total = mockList.length
      const pageCount = Math.ceil(total / limit)
      const hasPrev = page === 1
      const hasNext = page === pageCount

      return {
        code: 20000,
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
          hasPrev: !hasPrev,
          hasNext: !hasNext
        }
      }
    }
  },
  {
    url: '/agentManage/infoList',
    type: 'get',
    response: config => {
      const { page = 1, limit = 10 } = config.query
      const mockList = infoList

      // 筛选分页
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      const total = mockList.length
      const pageCount = Math.ceil(total / limit)
      const hasPrev = page === 1
      const hasNext = page === pageCount

      return {
        code: 20000,
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
          hasPrev: !hasPrev,
          hasNext: !hasNext
        }
      }
    }
  }
]

