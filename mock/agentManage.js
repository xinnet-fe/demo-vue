import Mock from 'mockjs'

// Mock.Random.extend({
//   phone() {
//     var phonePrefixs = ['132', '135', '189']
//     return this.pick(phonePrefixs) + Mock.mock(/\d{8}/)
//   }
// })

const applyList = []
const count = 100

for (let i = 0; i < count; i++) {
  applyList.push(Mock.mock({
    agentCode: '@increment',
    phone: '13766668888',
    email: '@email',
    contacts: '@cname',
    province: '@province',
    city: '@city',
    applyTime: '@date',
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
      console.log(222)

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

