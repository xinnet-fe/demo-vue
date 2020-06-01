import Mock from 'mockjs'

Mock.Random.extend({
  phone() {
    var phonePrefixs = ['132', '135', '189']
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/)
  }
})

const applyList = []
const count = 100

for (let i = 0; i < count; i++) {
  applyList.push(Mock.mock({
    agentCode: '@increment',
    phone: '@phone',
    domain: '@domain',
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
      const { name, state, page = 1, limit = 10 } = config.query

      // 筛选条件
      const mockList = applyList.filter(item => {
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
  }
]

