<template>
  <div>
    <el-tabs
      v-show="!showDetail"
      v-model="activeName"
      style="padding: 0 20px;"
      @tab-click="handleTabClick"
    >
      <el-tab-pane label="会员订单信息管理" name="hy">
        <order-hy ref="listhy" :download-loading="downloadLoading" @getDetail="getDetail" @orderModify="orderModify" @download="handleDownload" />
      </el-tab-pane>
      <el-tab-pane label="代理订单信息管理" name="agent">
        <order-agent ref="listagent" :download-loading="downloadLoading" @getDetail="getDetail" @orderModify="orderModify" @download="handleDownload" />
      </el-tab-pane>
    </el-tabs>
    <div v-if="showDetail" class="order-detail">
      <div class="btnBack">
        <a href="javascript:;" @click="handleBack"> &lt; 返回</a>
      </div>
      <div class="contop">
        <h2 class="tit">
          <span />
          <p>基本信息</p>
        </h2>
        <div class="contables conmiddle-table">
          <el-table :data="tableDatas" style="width: 100%">
            <el-table-column prop="buyOrderCode" label="订单编号" />
            <el-table-column prop="batchId" label="批次编号" />
            <el-table-column prop="businessTypes" label="订单类型" />
            <el-table-column prop="goodsPaytypes" label="付费类型" />
            <el-table-column prop="buyTimeLimits" label="购买时长" />
            <el-table-column prop="createTimeString" label="订单提交时间" />
          </el-table>
          <el-table :data="tableDatas" style="width: 100%">
            <el-table-column prop="payDeadTime" label="剩余支付时间" />
            <el-table-column prop="payDateString" label="订单支付时间" />
            <el-table-column prop="updateDateString" label="订单取消/关闭时间" />
            <el-table-column prop="orderHolder" label="订单提交人" />
            <el-table-column prop="agentCode" label="订单付款人" />
            <el-table-column prop="buyChannel" label="下单渠道" />
          </el-table>
        </div>
      </div>
      <div class="contable conmiddle">
        <h2 class="tit">
          <span />
          <p>商品信息</p>
        </h2>
        <div class="contables conmiddle-table">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="goodsCode" label="商品编号" />
            <el-table-column prop="serviceCode" label="服务编码" />
            <el-table-column prop="goodsName" label="商品名称" />
            <el-table-column prop="supProductClassa" label="商品分类" />
            <el-table-column prop="tradingPrice" label="商品单价" />
            <el-table-column prop="orderStatusa" label="订单状态" />
          </el-table>
        </div>
      </div>
      <div class="contable conmiddle">
        <h2 class="tit">
          <span />
          <p>优惠信息</p>
        </h2>
        <div class="contables conmiddle-table">
          <el-table :data="promotionInUseVOList" style="width: 100%">
            <el-table-column prop="coupon01" label="购物车满折" />
            <el-table-column prop="coupon02" label="多年购买" />
            <el-table-column prop="coupon03" label="商品组合优惠" />
            <el-table-column prop="coupon04" label="批量购买优惠" />
            <el-table-column prop="coupon05" label="商品优惠券" />
            <el-table-column prop="coupon06" label="订单优惠券" />
            <el-table-column prop="coupon07" label="订单改价" />
            <el-table-column prop="couponprice" label="总优惠金额" />
          </el-table>
        </div>
        <div class="contables conmiddle-table">
          <el-table :data="promotionInUseVOList" style="width: 20%">
            <el-table-column prop="preDescs" label="买赠" />
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogLogout">
      <p v-if="shows === 0">当前数据为0条，无法导出</p>
      <p v-else>当前数据已超过6万条，无法导出</p>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="dialogLogout = false"
        >确定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="订单改价"
      :visible.sync="dialogOrderPriceShow"
      width="500px"
    >
      <el-form ref="formChangePrice" :model="form" :rules="rules2" label-width="120px">
        <el-form-item label="订单原价:">
          ￥ {{ row.totalTradingPrices }}
        </el-form-item>
        <el-form-item label="修改价格:" prop="price">
          <el-input v-model="form.price" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogOrderPriceShow = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="loadingBtn"
          @click="dialogOrderPriceSubmit()"
        >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import orderHy from './hy.vue'
import orderAgent from './agent.vue'
import isMoney from '@/utils/isMoney'

export default {
  name: 'Order',
  components: { orderHy, orderAgent },
  data() {
    return {
      activeName: 'hy',
      dialogOrderPriceShow: false,
      row: {},
      form: {
        price: 0
      },
      shows: 0,
      showDetail: false,
      loadingBtn: false,
      downloadLoading: false,
      dialogLogout: false,
      rules: {
        // column: [{ required: true, message: '请选择文章所属栏目', trigger: 'change' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      },
      rules2: {
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { required: true, validator: isMoney, message: '货币格式错误', trigger: 'blur' }
        ]
      },
      orderVisible: false,
      tableDatas: [],
      tableData: [],
      promotionInUseVOList: []
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
    this.$store.getters.user.permissions.map((v) => {
      if (v.indexOf('changeprice') !== Number(-1)) {
        this.orderVisible = true
      }
    })
    this.$store.getters.user.roles.map((i) => {
      if (i === '超级管理员') {
        this.orderVisible = true
      }
    })
  },
  methods: {
    handleTabClick(tab, event) {
      console.log(tab, event)
    },
    getDetail(buyOrderCode) {
      this.$store
        .dispatch('tradeOrder/orderDetail', { buyOrderCode: buyOrderCode })
        .then((res) => {
          if (!res.data.orderHolder) {
            res.data.orderHolder = res.data.agentCode
          }
          res.data.orderStatusa =
            res.data.orderStatus === '1'
              ? '待支付'
              : res.data.orderStatus === '2'
                ? '支付中'
                : res.data.orderStatus === '3'
                  ? '已取消'
                  : res.data.orderStatus === '4'
                    ? '已支付'
                    : '支付失败'
          if (res.data.orderStatus === '1' || res.data.orderStatus === '2') {
            if (Date.parse(res.data.payDeadline) - Date.parse(new Date()) > 0) {
              res.data.payDeadTime = this.formatDuring(
                Date.parse(res.data.payDeadline) - Date.parse(new Date())
              )
            }
          }
          res.data.businessTypes =
            res.data.businessType === 'N'
              ? '新开'
              : res.data.businessType === 'R'
                ? '续费'
                : res.data.businessType === 'U'
                  ? '升级'
                  : ''
          res.data.goodsPaytypes =
            res.data.goodsPaytype === '01' ? '包年包月' : '单次'
          // res.data.buyTimeLimits = res.data.bodys[0].
          let buyTimeLimits = res.data.bodys[0].buyTimeLimit.substr(
            res.data.bodys[0].buyTimeLimit.length - 1,
            1
          )
          buyTimeLimits =
            buyTimeLimits === 'M'
              ? '月'
              : buyTimeLimits === 'Y'
                ? '年'
                : buyTimeLimits === 'D'
                  ? '日'
                  : ''
          const buyTime = res.data.bodys[0].buyTimeLimit.substr(
            0,
            res.data.bodys[0].buyTimeLimit.length - 1
          )
          res.data.buyTimeLimits = buyTime + buyTimeLimits
          res.data.bodys.forEach((row) => {
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
            res.data.promotionInUseVOList.forEach((row) => {
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
                console.log(
                  row.preType === 'ACTIVITY_FULL_DISCOUNT',
                  row.preType === 'PRICE_CHANGE',
                  'row.preType'
                )
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
                row.couponprice =
                  row.coupon01 +
                  row.coupon02 +
                  row.coupon03 +
                  row.coupon04 +
                  row.coupon05 +
                  row.coupon06 +
                  row.coupon07
              }
            })
          }
          const a = []
          a[0] = res.data
          this.tableDatas = a
          console.log('====================')
          console.log(this.tableDatas)
          console.log('====================')

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
            res.data.promotionInUseVOList[0].coupon01 =
              cou1 !== 0 ? '￥' + this.shuzi(cou1.toFixed(2)) : 0
            res.data.promotionInUseVOList[0].coupon02 =
              cou2 !== 0 ? '￥' + this.shuzi(cou2.toFixed(2)) : 0
            res.data.promotionInUseVOList[0].coupon03 =
              cou3 !== 0 ? '￥' + this.shuzi(cou3.toFixed(2)) : 0
            res.data.promotionInUseVOList[0].coupon04 =
              cou4 !== 0 ? '￥' + this.shuzi(cou4.toFixed(2)) : 0
            res.data.promotionInUseVOList[0].coupon05 =
              cou5 !== 0 ? '￥' + this.shuzi(cou5.toFixed(2)) : 0
            res.data.promotionInUseVOList[0].coupon06 =
              cou6 !== 0 ? '￥' + this.shuzi(cou6.toFixed(2)) : 0
            res.data.promotionInUseVOList[0].coupon07 =
              cou7 !== 0 ? '￥' + this.shuzi(cou7.toFixed(2)) : 0
            const totalprice = cou1 + cou2 + cou3 + cou4 + cou5 + cou6 + cou7
            res.data.promotionInUseVOList[0].couponprice =
              totalprice !== 0 ? '￥' + this.shuzi(totalprice.toFixed(2)) : 0
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
        })
        .catch((error) => {
          console.log(error)
        })
      this.showDetail = true
    },
    orderModify(row) {
      this.row = row
      if (row.totalTradingPrice) {
        this.form.price = row.totalTradingPrice
      } else {
        this.form.price = 0
      }
      this.dialogOrderPriceShow = true
    },
    dialogOrderPriceSubmit() {
      this.loadingBtn = true
      this.$refs.formChangePrice.validate((valid) => {
        if (valid) {
          const query = {
            buyOrderCode: this.row.buyOrderCode,
            price: this.form.price
          }
          this.$store
            .dispatch('tradeOrder/changeOrderPrice', query)
            .then((res) => {
              this.loadingBtn = false
              if (res.code === '0' && res.data.code === 200) {
                this.$message({
                  message: '改价成功',
                  type: 'success'
                })
                if (this.activeName === 'hy') {
                  this.$refs.listhy.handleFilter()
                } else {
                  this.$refs.listagent.handleFilter()
                }
                this.dialogOrderPriceShow = false
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
              }
            })
            .catch((error) => {
              this.loadingBtn = false
              console.log(error)
            })
        } else {
          this.loadingBtn = false
        }
      })
    },
    handleBack() {
      this.showDetail = false
    },
    getUrlparam(obj) {
      let c = ''
      Object.keys(obj).map((keys) => {
        if (obj[keys]) {
          c += keys + '=' + obj[keys] + '&'
        }
      })
      c = c.substring(c.length - 1, 0)
      return c
    },
    handleDownload(query) {
      this.downloadLoading = true
      this.$store
        .dispatch('tradeOrder/orderList', query)
        .then((res) => {
          this.downloadLoading = false
          if (res.data.list.length) {
            if (res.data.total < 60000) {
              const str = this.getUrlparam(query)
              window.open(
                window.location.origin + '/boss/tradeOrder/exportExecl?' + str
              )
            } else {
              this.dialogLogout = true
              this.shows = 60000
            }
          } else {
            this.dialogLogout = true
            this.shows = 0
          }
        })
        .catch((error) => {
          this.downloadLoading = false
          console.log(error)
        })
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
    }
  }
}
</script>

<style>
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>

<style scoped>
.order-form{
  padding-left: 0px;
  padding-right: 0px;
}
.icon-star {
  margin-right: 2px;
}
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.clored {
  color: rgb(255, 0, 0);
  font-size: 12px;
  margin: 0px 5px;
  position: absolute;
  width: 165px;
  left: 4px;
  top: 30px;
}
.order-detail .btnBack {
  background: #f3f7fa;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  padding: 0 20px;
}
.order-detail .contop,
.contable {
  background: #fff;
  color: #333;
  margin-bottom: 20px;
}
.order-detail .contop-con {
  padding: 11px 30px 38px 30px;
  box-sizing: border-box;
}
.order-detail .contop-con > p {
  font-size: 12px;
  width: 100%;
  height: 49px;
  line-height: 49px;
}
.order-detail .contop-con > p > span {
  display: inline-block;
  width: 24%;
}
.order-detail .tit {
  height: 51px;
  font-size: 14px;
  /* line-height: 51px; */
  /* border-left: solid 2px #6282a9; */
  border-bottom: solid 1px #e5e5e5;
  margin: 0;
  display: flex;
}
.order-detail .tit span {
  display: inline-block;
  height: 20px;
  width: 4px;
  margin-top: 17px;
  margin-right: 15px;
  background: #6282a9;
}
.order-detail .tit p {
  height: 20px;
  line-break: 20px;
  font-size: 14px;
  font-weight: 400;
  margin: 20px 0 0 0;
}
.order-detail .contables {
  padding: 20px 20px 57px 20px;
  box-sizing: border-box;
}
</style>
