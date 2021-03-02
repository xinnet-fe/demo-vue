<template>
  <div>
    <div class="btnBack"><a href="javascript:;" @click="handleBack"> &lt; 返回</a></div>
    <div class="contop">
      <h2 class="tit">
        <span />
        <p>基本信息</p>
      </h2>
      <div class="contables conmiddle-table">
        <el-table
          :data="tableDatas"
          style="width: 100%"
        >
          <el-table-column
            prop="buyOrderCode"
            label="订单编号"
          />
          <el-table-column
            prop="batchId"
            label="批次编号"
          />
          <el-table-column
            prop="businessTypes"
            label="订单类型"
          />
          <el-table-column
            prop="goodsPaytypes"
            label="付费类型"
          />
          <el-table-column
            prop="buyTimeLimits"
            label="购买时长"
          />
          <el-table-column
            prop="createTimeString"
            label="订单提交时间"
          />
        </el-table>
        <el-table
          :data="tableDatas"
          style="width: 100%"
        >
          <el-table-column
            prop="payDeadTime"
            label="剩余支付时间"
          />
          <el-table-column
            prop="payDateString"
            label="订单支付时间"
          />
          <el-table-column
            prop="updateDateString"
            label="订单取消/关闭时间"
          />
          <el-table-column
            prop="orderHolder"
            label="订单提交人"
          />
          <el-table-column
            prop="agentCode"
            label="订单付款人"
          />
          <el-table-column
            prop="buyChannel"
            label="下单渠道"
          />
        </el-table>
      </div>
    </div>
    <div class="contable conmiddle">
      <h2 class="tit">
        <span />
        <p>商品信息</p>
      </h2>
      <div class="contables conmiddle-table">
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="goodsCode"
            label="商品编号"
          />
          <el-table-column
            prop="serviceCode"
            label="服务编码"
          />
          <el-table-column
            prop="goodsName"
            label="商品名称"
          />
          <el-table-column
            prop="supProductClassa"
            label="商品分类"
          />
          <el-table-column
            prop="tradingPrice"
            label="商品单价"
          />
          <el-table-column
            prop="orderStatusa"
            label="订单状态"
          />
        </el-table>
      </div>
    </div>
    <div class="contable conmiddle">
      <h2 class="tit">
        <span />
        <p>优惠信息</p>
      </h2>
      <div class="contables conmiddle-table">
        <el-table
          :data="promotionInUseVOList"
          style="width: 100%"
        >
          <el-table-column
            prop="coupon01"
            label="购物车满折"
          />
          <el-table-column
            prop="coupon02"
            label="多年购买"
          />
          <el-table-column
            prop="coupon03"
            label="商品组合优惠"
          />
          <el-table-column
            prop="coupon04"
            label="批量购买优惠"
          />
          <el-table-column
            prop="coupon05"
            label="商品优惠券"
          />
          <el-table-column
            prop="coupon06"
            label="订单优惠券"
          />
          <el-table-column
            prop="coupon07"
            label="订单改价"
          />
          <!-- <el-table-column
            prop="couponprice"
            label="总优惠金额"
          /> -->
          <el-table-column label="总优惠金额">
            <template slot-scope="{ row }">
              <span v-if="(row.couponprice * 1) < 0">0</span>
              <span else>{{ row.couponprice }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="contables conmiddle-table">
        <el-table
          :data="promotionInUseVOList"
          style="width:20%"
        >
          <el-table-column
            prop="preDescs"
            label="买赠"
          />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
// import { orderDetail } from '@/api/demos/order'
export default {
  name: 'ComplexTable',
  components: {
  },
  filters: {
  },
  data() {
    return {
      tableDatas: [],
      tableData: [],
      promotionInUseVOList: []
    }
  },
  created() {
    // const str = this.$route.query.id
    // const arr = {}
    // arr.buyOrderCode = str
    // this.getList(arr, 'buyOrderCode=' + str)
    this.getList()
  },
  methods: {
    getList() {
      this.$store.dispatch('tradeOrder/orderDetail', { 'buyOrderCode': this.$route.query.id }).then(res => {
        if (!res.data.orderHolder) {
          res.data.orderHolder = res.data.agentCode
        }
        res.data.orderStatusa = res.data.orderStatus === '1' ? '待支付' : res.data.orderStatus === '2' ? '支付中' : res.data.orderStatus === '3' ? '已取消' : res.data.orderStatus === '4' ? '已支付' : '支付失败'
        if (res.data.orderStatus === '1' || res.data.orderStatus === '2') {
          if (Date.parse(res.data.payDeadline) - Date.parse(new Date()) > 0) {
            res.data.payDeadTime = this.formatDuring(Date.parse(res.data.payDeadline) - Date.parse(new Date()))
          }
        }
        res.data.businessTypes = res.data.businessType === 'N' ? '新开' : res.data.businessType === 'R' ? '续费' : res.data.businessType === 'U' ? '升级' : ''
        res.data.goodsPaytypes = res.data.goodsPaytype === '01' ? '包年包月' : '单次'
        // res.data.buyTimeLimits = res.data.bodys[0].
        let buyTimeLimits = res.data.bodys[0].buyTimeLimit.substr(res.data.bodys[0].buyTimeLimit.length - 1, 1)
        buyTimeLimits = buyTimeLimits === 'M' ? '月' : buyTimeLimits === 'Y' ? '年' : buyTimeLimits === 'D' ? '日' : ''
        const buyTime = res.data.bodys[0].buyTimeLimit.substr(0, res.data.bodys[0].buyTimeLimit.length - 1)
        res.data.buyTimeLimits = buyTime + buyTimeLimits
        res.data.bodys.forEach(row => {
          if (row.tradingPrice) {
            row.tradingPrice = '￥' + this.shuzi(row.tradingPrice.toFixed(2))
          }
          row.orderStatusa = res.data.orderStatusa
          // row.supProductClass = row.supProductClass.substring(row.supProductClass.lastIndexOf('_') + 1)
          if (row.supProductClass === 'D') {
            row.supProductClassa = '域名'
          } else if (row.supProductClass === 'V') {
            row.supProductClassa = '虚机'
          } else if (row.supProductClass === 'M') {
            row.supProductClassa = '邮局'
          } else if (row.supProductClass === 'W') {
            row.supProductClassa = '建站'
          } else if (row.supProductClass === 'A') {
            row.supProductClassa = '应用'
          } else if (row.supProductClass === 'S') {
            row.supProductClassa = '服务产品'
          } else if (row.supProductClass === 'Z') {
            row.supProductClassa = '租用托管'
          } else if (row.supProductClass === 'E') {
            row.supProductClassa = '轻应用服务器'
          } else if (row.supProductClass === 'N') {
            row.supProductClassa = '云产品'
          } else if (row.supProductClass === 'C') {
            row.supProductClassa = '云产品(老)'
          }
        })
        let cou1 = 0
        let cou2 = 0
        let cou3 = 0
        let cou4 = 0
        let cou5 = 0
        let cou6 = 0
        let cou7 = 0
        if (res.data.promotionInUseVOList) {
          res.data.promotionInUseVOList.forEach(row => {
            if (row.preType === 'ACTIVITY_BUY_PRESENT') {
              res.data.promotionInUseVOList[0].preDescs = row.preDesc
              row.preDescs = row.preDesc
            }
            if (row.preType) {
              row.coupon01 = 0
              row.coupon02 = 0
              row.coupon03 = 0
              row.coupon04 = 0
              row.coupon05 = 0
              row.coupon06 = 0
              row.coupon07 = 0
              if (!row.preMoney) {
                row.preMoney = 0
              }
              console.log(row.preType === 'ACTIVITY_FULL_DISCOUNT', row.preType === 'PRICE_CHANGE', 'row.preType')
              if (row.preType === 'COUPON_ORDER') {
                cou6 = row.preMoney
                row.coupon06 = row.preMoney
              } else if (row.preType === 'COUPON_PRODUCT') {
                cou5 = row.preMoney
                row.coupon05 = row.preMoney
              } else if (row.preType === 'ACTIVITY_YEARS') {
                cou2 = row.preMoney
                row.coupon02 = row.preMoney
              } else if (row.preType === 'BATCH_PURCHASE') {
                cou4 = row.preMoney
                row.coupon04 = row.preMoney
              } else if (row.preType === 'GOODS_COMBINATION') {
                cou3 = row.preMoney
                row.coupon03 = row.preMoney
              } else if (row.preType === 'ACTIVITY_FULL_DISCOUNT') {
                cou1 = row.preMoney
                row.coupon01 = row.preMoney
              } else if (row.preType === 'PRICE_CHANGE') {
                cou7 = row.preMoney
                row.coupon07 = row.preMoney
              }
              row.couponprice = row.coupon01 + row.coupon02 + row.coupon03 + row.coupon04 + row.coupon05 + row.coupon06 + row.coupon07
            }
          })
        }
        const a = []
        a[0] = res.data
        this.tableDatas = a

        if (this.tableDatas[0].payDateString) {
          this.tableDatas[0].updateDateString = ' — —'
        }
        if (this.tableDatas[0].payDeadTime === undefined) {
          this.tableDatas[0].payDeadTime = ' — —'
        }
        if (this.tableDatas[0].payDateString === undefined) {
          this.tableDatas[0].payDateString = ' — —'
        }
        if (this.tableDatas[0].updateDateString === undefined) {
          this.tableDatas[0].updateDateString = ' — —'
        }
        if (res.data.orderStatus === '2') {
          this.tableDatas[0].payDateString = res.data.updateDateString
          this.tableDatas[0].updateDateString = ' — —'
        }
        this.tableData = res.data.bodys
        if (res.data.promotionInUseVOList) {
          res.data.promotionInUseVOList[0].coupon01 = cou1 !== 0 ? '￥' + this.shuzi(cou1.toFixed(2)) : 0
          res.data.promotionInUseVOList[0].coupon02 = cou2 !== 0 ? '￥' + this.shuzi(cou2.toFixed(2)) : 0
          res.data.promotionInUseVOList[0].coupon03 = cou3 !== 0 ? '￥' + this.shuzi(cou3.toFixed(2)) : 0
          res.data.promotionInUseVOList[0].coupon04 = cou4 !== 0 ? '￥' + this.shuzi(cou4.toFixed(2)) : 0
          res.data.promotionInUseVOList[0].coupon05 = cou5 !== 0 ? '￥' + this.shuzi(cou5.toFixed(2)) : 0
          res.data.promotionInUseVOList[0].coupon06 = cou6 !== 0 ? '￥' + this.shuzi(cou6.toFixed(2)) : 0
          res.data.promotionInUseVOList[0].coupon07 = cou7 !== 0 ? '￥' + this.shuzi(cou7.toFixed(2)) : 0
          const totalprice = cou1 + cou2 + cou3 + cou4 + cou5 + cou6 + cou7
          res.data.promotionInUseVOList[0].couponprice = totalprice !== 0 ? '￥' + this.shuzi(totalprice.toFixed(2)) : 0
          if (!res.data.promotionInUseVOList[0].preDescs) {
            res.data.promotionInUseVOList[0].preDescs = '暂无数据'
          }
          this.promotionInUseVOList = [res.data.promotionInUseVOList[0]]
        } else {
          const promotionInUseVOList = {}
          promotionInUseVOList.coupon01 = 0
          promotionInUseVOList.coupon02 = 0
          promotionInUseVOList.coupon03 = 0
          promotionInUseVOList.coupon04 = 0
          promotionInUseVOList.coupon05 = 0
          promotionInUseVOList.coupon06 = 0
          promotionInUseVOList.coupon07 = 0
          promotionInUseVOList.couponprice = 0
          promotionInUseVOList.preDescs = '暂无数据'
          this.promotionInUseVOList = [promotionInUseVOList]
        }
      }).catch(error => {
        console.log(error)
      })
      // orderDetail(id, data).then(res => {
      //   if (!res.data.orderHolder) {
      //     res.data.orderHolder = res.data.agentCode
      //   }
      //   res.data.orderStatusa = res.data.orderStatus === '1' ? '待支付' : res.data.orderStatus === '2' ? '支付中' : res.data.orderStatus === '3' ? '已取消' : res.data.orderStatus === '4' ? '已支付' : '支付失败'
      //   if (res.data.orderStatus === '1' || res.data.orderStatus === '2') {
      //     if (Date.parse(res.data.payDeadline) - Date.parse(new Date()) > 0) {
      //       res.data.payDeadTime = this.formatDuring(Date.parse(res.data.payDeadline) - Date.parse(new Date()))
      //     }
      //   }
      //   res.data.businessTypes = res.data.businessType === 'N' ? '新开' : res.data.businessType === 'R' ? '续费' : res.data.businessType === 'U' ? '升级' : ''
      //   res.data.goodsPaytypes = res.data.goodsPaytype === '01' ? '包年包月' : '次'
      //   // res.data.buyTimeLimits = res.data.bodys[0].
      //   let buyTimeLimits = res.data.bodys[0].buyTimeLimit.substr(res.data.bodys[0].buyTimeLimit.length - 1, 1)
      //   buyTimeLimits = buyTimeLimits === 'M' ? '月' : buyTimeLimits === 'Y' ? '年' : buyTimeLimits === 'D' ? '日' : ''
      //   const buyTime = res.data.bodys[0].buyTimeLimit.substr(0, res.data.bodys[0].buyTimeLimit.length - 1)
      //   res.data.buyTimeLimits = buyTime + buyTimeLimits
      //   res.data.bodys.forEach(row => {
      //     if (row.tradingPrice) {
      //       row.tradingPrice = '￥' + this.shuzi(row.tradingPrice.toFixed(2))
      //     }
      //     row.orderStatusa = res.data.orderStatusa
      //     row.supProductClass = row.supProductClass.substring(row.supProductClass.lastIndexOf('_') + 1)
      //     if (row.supProductClass === 'D') {
      //       row.supProductClassa = '域名'
      //     } else if (row.supProductClass === 'V') {
      //       row.supProductClassa = '虚机'
      //     } else if (row.supProductClass === 'C') {
      //       row.supProductClassa = '云计算'
      //     } else if (row.supProductClass === 'M') {
      //       row.supProductClassa = '邮局'
      //     } else if (row.supProductClass === 'W') {
      //       row.supProductClassa = '建站'
      //     } else if (row.supProductClass === 'A') {
      //       row.supProductClassa = '应用'
      //     } else if (row.supProductClass === 'S') {
      //       row.supProductClassa = '服务产品'
      //     } else if (row.supProductClass === 'I') {
      //       row.supProductClassa = '增值服务'
      //     } else if (row.supProductClass === 'MART') {
      //       row.supProductClassa = '服务市场'
      //     }
      //   })
      //   let cou1 = 0
      //   let cou2 = 0
      //   let cou3 = 0
      //   let cou4 = 0
      //   let cou5 = 0
      //   let cou6 = 0
      //   if (res.data.promotionInUseVOList) {
      //     res.data.promotionInUseVOList.forEach(row => {
      //       if (row.preType === 'ACTIVITY_BUY_PRESENT') {
      //         res.data.promotionInUseVOList[0].preDescs = row.preDesc
      //         row.preDescs = row.preDesc
      //       }
      //       if (row.preType) {
      //         row.coupon01 = 0
      //         row.coupon02 = 0
      //         row.coupon03 = 0
      //         row.coupon04 = 0
      //         row.coupon05 = 0
      //         row.coupon06 = 0
      //         if (!row.preMoney) {
      //           row.preMoney = 0
      //         }
      //         if (row.preType === 'COUPON_ORDER') {
      //           cou6 = row.preMoney
      //           row.coupon06 = row.preMoney
      //         } else if (row.preType === 'COUPON_PRODUCT') {
      //           cou5 = row.preMoney
      //           row.coupon05 = row.preMoney
      //         } else if (row.preType === 'ACTIVITY_YEARS') {
      //           cou2 = row.preMoney
      //           row.coupon02 = row.preMoney
      //         } else if (row.preType === 'BATCH_PURCHASE') {
      //           cou4 = row.preMoney
      //           row.coupon04 = row.preMoney
      //         } else if (row.preType === 'GOODS_COMBINATION') {
      //           cou3 = row.preMoney
      //           row.coupon03 = row.preMoney
      //         } else if (row.preType === 'ACTIVITY_FULL_DISCOUNT') {
      //           cou1 = row.preMoney
      //           row.coupon01 = row.preMoney
      //         }
      //         row.couponprice = row.coupon01 + row.coupon02 + row.coupon03 + row.coupon04 + row.coupon05 + row.coupon06
      //       }
      //     })
      //   }
      //   const a = []
      //   a[0] = res.data
      //   this.tableDatas = a

      //   if (this.tableDatas[0].payDeadTime === undefined) {
      //     this.tableDatas[0].payDeadTime = ' — —'
      //   }
      //   if (this.tableDatas[0].payDateString === undefined) {
      //     this.tableDatas[0].payDateString = ' — —'
      //   }
      //   if (this.tableDatas[0].updateDateString === undefined) {
      //     this.tableDatas[0].updateDateString = ' — —'
      //   }
      //   this.tableData = res.data.bodys
      //   if (res.data.promotionInUseVOList) {
      //     res.data.promotionInUseVOList[0].coupon01 = cou1 !== 0 ? '￥' + this.shuzi(cou1.toFixed(2)) : 0
      //     res.data.promotionInUseVOList[0].coupon02 = cou2 !== 0 ? '￥' + this.shuzi(cou2.toFixed(2)) : 0
      //     res.data.promotionInUseVOList[0].coupon03 = cou3 !== 0 ? '￥' + this.shuzi(cou3.toFixed(2)) : 0
      //     res.data.promotionInUseVOList[0].coupon04 = cou4 !== 0 ? '￥' + this.shuzi(cou4.toFixed(2)) : 0
      //     res.data.promotionInUseVOList[0].coupon05 = cou5 !== 0 ? '￥' + this.shuzi(cou5.toFixed(2)) : 0
      //     res.data.promotionInUseVOList[0].coupon06 = cou6 !== 0 ? '￥' + this.shuzi(cou6.toFixed(2)) : 0
      //     const totalprice = cou1 + cou2 + cou3 + cou4 + cou5 + cou6
      //     res.data.promotionInUseVOList[0].couponprice = totalprice !== 0 ? '￥' + this.shuzi(totalprice.toFixed(2)) : 0
      //     if (!res.data.promotionInUseVOList[0].preDescs) {
      //       res.data.promotionInUseVOList[0].preDescs = '暂无数据'
      //     }
      //     this.promotionInUseVOList = [res.data.promotionInUseVOList[0]]
      //   } else {
      //     const promotionInUseVOList = {}
      //     promotionInUseVOList.coupon01 = 0
      //     promotionInUseVOList.coupon02 = 0
      //     promotionInUseVOList.coupon03 = 0
      //     promotionInUseVOList.coupon04 = 0
      //     promotionInUseVOList.coupon05 = 0
      //     promotionInUseVOList.coupon06 = 0
      //     promotionInUseVOList.couponprice = 0
      //     promotionInUseVOList.preDescs = '暂无数据'
      //     this.promotionInUseVOList = [promotionInUseVOList]
      //   }
      // })
    },
    shuzi(num) {
      var reg = /\d(?=(?:\d{3})+\b)/g
      return String(num).replace(reg, '$&,')
    },
    formatDuring(mss) {
      var days = parseInt(mss / (1000 * 60 * 60 * 24))
      var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
      // var seconds = ((mss % (1000 * 60)) / 1000).toFixed(0)
      // return days + " 天 " + hours + " 时 " + minutes + " 分 " + seconds + " 秒 "
      return days + ' 天 ' + hours + ' 时 ' + minutes + ' 分 '
    },
    handleBack() {
      this.$router.go(-1)
      // this.$router.push({ path: '/boss-nav-tradingcenter/boss-nav-tradingcenter-ordermanagement' })
    }
  }
}
</script>
<style scoped>
  .btnBack{
    background: #f3f7fa;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    padding: 0 20px;
  }
  .contop, .contable {
    background: #fff;
    color: #333;
    margin-bottom: 20px;
  }
  .contop-con {
    padding: 11px 30px 38px 30px;
    box-sizing: border-box;
  }
  .contop-con > p {
    font-size: 12px;
    width: 100%;
    height: 49px;
    line-height: 49px;
  }
  .contop-con > p > span {
    display: inline-block;
    width: 24%;
  }
  .tit {
    height: 51px;
    font-size: 14px;
    /* line-height: 51px; */
    /* border-left: solid 2px #6282a9; */
    border-bottom: solid 1px #e5e5e5;
    margin: 0;
    display: flex;
  }
  .tit span {
    display: inline-block;
    height: 20px;
    width: 4px;
    margin-top: 17px;
    margin-right: 15px;
    background: #6282a9;
  }
  .tit p {
    height: 20px;
    line-break: 20px;
    font-size: 14px;
    font-weight: 400;
    margin: 20px 0 0 0;
  }
  .contables {
    padding: 20px 20px 57px 20px;
    box-sizing: border-box;
  }
  /* .tit p {
    font-size: 14px;
    height: 20px;
    border-left: solid 2px #6282a9;
    margin: 0;
  } */
</style>
