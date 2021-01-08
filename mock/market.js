import Mock from 'mockjs'
import find from 'lodash/find'
// import remove from 'lodash/remove'
import forEach from 'lodash/forEach'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    agentCode: 'agent@integer(35130, 35140)',
    startTime: '@date 00:00:00',
    endTime: '@date 00:00:00',
    createPerson: '@cname',
    modifyTime: '@datetime',
  }))
}

// 促销活动中添加商品的列表
const goodsList = []

for (let i = 0; i < 15; i++) {
  goodsList.push(Mock.mock({
    id: '@increment',
    goodsCode: '1447233630146@integer(0, 9)',
    goodsName : '英文.co',
    priceCode : '956406746911@integer(0, 99)',
    productClass : 'DAEN',
    timeAmount : '@integer(1, 99)',
    timeUnit : 'Y',
    limitPrice : '@integer(1, 99)',
    marketingPrice : '@integer(1, 99)'
  }))
}

// 某促销活动，对应的商品列表
const marketGoodsList = {}  // agentCode: []

export default [
  // 【定向促销列表】首页的促销列表
  {
    url: '/marketingPage', 
    type: 'post',
    response: config => {
      const { agentCode, queryStartTime, queryEndTime, page = 1, limit = 10 } = config.body
      // 筛选条件
      const mockList = List.filter(item => {
        if (agentCode && item.agentCode !== agentCode) return false
        if (queryStartTime && item.startTime !== queryStartTime) return false
        if (queryEndTime && item.endTime !== queryEndTime) return false
        return true
      })

      // 筛选分页
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      const total = mockList.length
      const pageCount = Math.ceil(total / limit)
      const hasFirst = page === 1
      const hasLast = page === total
      // 输出格式与真实后端不一致
      return {
        code: 20000,
        data: {
          list: pageList,
          count: total,
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
  // 【添加促销】添加一条促销活动（首页）
  {
    url: '/addMarketing',
    type: 'post',
    response: config => {
      const {
        agentCode,
        startTime,
        endTime
      } = config.body

      List.unshift(Mock.mock({
        id: '@increment',
        agentCode,
        startTime,
        endTime,
        createPerson: '新@cname@integer(60, 100)',
        modifyTime: '@now'
      }))
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 【修改促销】修改促销活动
  {
    url: '/updateMarketing',
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
        code: 20000,
        data: 'success'
      }
    }
  },
  // 【根据商品名称，商品编码查询商品列表】
  // 某促销活动中，添加新商品时，查询出来的商品
  {
    url: '/getGoodsList',
    type: 'post',
    response: config => {
      const { agentCode, goodsCode, goodsName } = config.body
      // 筛选条件
      const mockList = goodsList.filter(item => {
        // if (agentCode && item.agentCode !== agentCode) return false
        if (goodsCode && item.goodsCode !== goodsCode) return false
        if (goodsName && item.goodsName !== goodsName) return false
        return true
      })

      return {
        // code: 20000,
        // data: {
          success: '',
          code: '',
          msg: '请求成功',
          data: mockList
        // }
      }
    }
  },
  // 【添加促销商品】
  // 向某个促销活动，添加商品
  {
    url: '/insertMarketingPrice',
    type: 'post',
    response: config => {
      const { agentCode, requestJson } = config.body
      if (!marketGoodsList[agentCode]) {
        marketGoodsList[agentCode] = []
      }
      marketGoodsList[agentCode] = marketGoodsList[agentCode].concat(requestJson)
      return {
        success: '',
        code: '',
        msg: '请求成功',
        data: {
          isSuccess: 1
        }
      }
    }
  },
  // 【促销商品】某促销活动，包含哪些商品
  // 某促销活动，自身对应的商品
  {
    url: '/getMarketingPrice',
    type: 'post',
    response: config => {
      const { agentCode } = config.body
      // 筛选条件
      const mockList = marketGoodsList[agentCode] || []

      return {
        success: '',
        code: '',
        msg: '请求成功',
        data: mockList
      }
    }
  },
  // 某促销活动，自身对应的商品，修改商品价格
  {
    url: '/update1MarketingPrice',
    type: 'post',
    response: config => {
      const { agentCode, requestJson } = config.body
      console.log('4 mock 修改前 requestJson = ', requestJson )
      // 筛选条件
      const arr = marketGoodsList[agentCode]    
      console.log('修改前 arr = ', arr )
      requestJson.forEach(item => {
        for ( let i = 0, len = arr.length; i < len; i++ ) {
          let itemObj = arr[i]
          if ( itemObj.priceCode === item.priceCode ) {
            if ( itemObj.marketingPrice !== item.marketingPrice ) {
              arr[i].marketingPrice = item.marketingPrice
            }
          }
        }
      })
      console.log('修改后 marketGoodsList[agentCode] = ', marketGoodsList[agentCode] )

      return {
        success: '',
        code: '',
        msg: '请求成功',
        data: {
          isSuccess: '1'
        }
      }
    }
  },
  // 【删除促销商品】某促销活动，删除指定的商品
  // delMarketingPrice 某促销活动，自身对应的商品列表中，删除指定的商品
  {
    url: '/delMarketingPrice',
    type: 'post',
    response: config => {
      const { id, agentCode } = config.body
      // 筛选条件
      const mockList = (marketGoodsList[agentCode] || []).filter(item => {
        if (item.id !== id) return true
        return false
      })
      marketGoodsList[agentCode] = mockList
      return {
        success: '',
        code: '',
        msg: '请求成功',
        data: {
          isSuccess: '1'
        }
      }
    }
  }
]

