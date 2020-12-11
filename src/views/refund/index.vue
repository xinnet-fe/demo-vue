<template>
  <div class="box-container">

    <div>
      <div class="box-form order-form">
        <el-form ref="form" class="search-form" :inline="true" :model="form" :rules="rules" style="line-height:400%;">

          <el-form-item label="服务编号" prop="serviceCode">
            <el-input v-model="form.serviceCode" placeholder="请输入商品服务编号" />
          </el-form-item>

          <el-form-item label="用户ID" prop="agentCode">
            <el-input v-model="form.agentCode" placeholder="请输入用户ID" />
          </el-form-item>

          <el-form-item label="服务开通日期" label-width="100px" prop="opentime">
            <el-date-picker
              v-model="form.opentime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>

          <el-form-item label="退费状态" prop="refundState">
            <el-select v-model="form.refundState" placeholder="请选择">
              <el-option
                v-for="item in refundStateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="域名搜索" prop="domainNames">
            <el-input
              v-model="form.domainNames"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入域名(多个域名回车分割，最多输入10个)"
            />
          </el-form-item>

          <el-form-item>
            <el-button size="medium" @click="onReset('form')">重置</el-button>
            <el-button type="primary" size="medium" @click="onSubmit('form')">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-loading="loading" class="box-list">
        <div v-if="searchState === 0 && listdata.length === 0" class="listResult">
          请输入查询条件，进行查询。
        </div>
        <div v-else-if="loading" class="listResult">
          查询中..
        </div>
        <div v-else-if="searchState > 0 && listdata.length === 0" class="listResult">
          没有查询到结果
        </div>
        <div v-else-if="searchState > 0 && listdata.length > 0">
          <div class="list-title">
            <div>
              <el-checkbox v-model="refund_batch_val" :disabled="cbDisabled" @change="refund_batch_change" />
            </div>
            <div>
              <el-button :disabled="btnDisabled" @click="confirm_refund_batch()">批量退费</el-button>
            </div>
            <div>{{ domainSearchResult }}</div>
          </div>
          <div v-for="item in listdata" :key="item.serviceCode" class="list-item">
            <div class="item-title">
              <div>
                <el-checkbox v-model="item.checked" :disabled="!item.isOperateCurrent" />
              </div>
              <div>
                服务编号：{{ item.serviceCode }}
              </div>
              <div>
                服务起止日期：{{ item.applyDate + ' - ' + item.expireDate }}
              </div>
              <div>
                <el-checkbox v-model="item.isAuthReview" />
                命名失败
              </div>
              <div>
                <el-button :disabled="!item.isOperateCurrent" @click="confirm_refund_all(item)">退订整条服务</el-button>
              </div>
            </div>
            <div class="item-children">
              <el-table :data="item.billList" style="width: 100%">
                <el-table-column label="账单编号" width="220">
                  <template slot-scope="scope">
                    {{ scope.row.billCode }}
                  </template>
                </el-table-column>
                <el-table-column label="用户ID" width="120">
                  <template slot-scope="scope">
                    {{ scope.row.agentCode }}
                  </template>
                </el-table-column>
                <el-table-column label="账单类型" width="70">
                  <template slot-scope="scope">
                    {{ deBillLineType(scope.row.billLineType) }}
                  </template>
                </el-table-column>
                <el-table-column label="域名" width="180">
                  <template slot-scope="scope">
                    {{ scope.row.domainName }}
                  </template>
                </el-table-column>
                <el-table-column label="商品名称">
                  <template slot-scope="scope">
                    {{ scope.row.goodsName }}
                  </template>
                </el-table-column>
                <el-table-column label="年限">
                  <template slot-scope="scope">
                    {{ timeAmountUnit(scope.row.timeAmount, scope.row.timeUnit) }}
                  </template>
                </el-table-column>
                <el-table-column label="生成时间" width="150">
                  <template slot-scope="scope">
                    {{ scope.row.operateTime }}
                  </template>
                </el-table-column>
                <el-table-column label="账单实付金额" width="100">
                  <template slot-scope="scope">
                    {{ RMB(scope.row.price) }}
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button v-if="scope.row.isRefundFlag && scope.row.isReturns==='02'" slot="reference" type="text" @click="confirm_Refund(scope.row, item)">退费</el-button>
                    <span v-if="scope.row.isRefundFlag===false && scope.row.isReturns==='02'" class="no">退费</span>
                    <span v-if="scope.row.isReturns==='01'">已退费</span>
                    <span v-if="scope.row.loading"><i class="el-icon-loading" /></span>
                    <el-tooltip v-else-if="scope.row.loading === false && scope.row.state===2" effect="dark" :content="scope.row.res" placement="top-start">
                      <i class="el-icon-error error">失败</i>
                    </el-tooltip>
                    <i v-else-if="scope.row.loading === false && scope.row.state===1" class="el-icon-success success">成功</i>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="box-page">
            <el-pagination
              background
              :current-page="page.currentPage"
              :page-size="page.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="page.total"
              @current-change="handleCurrentChange"
            />
            <!-- , sizes :page-sizes="[10, 20, 30, 40, 50]"  @size-change="handleSizeChange"-->
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title=""
      :visible.sync="Msg_Dialog.visible"
      width="30%"
      :destroy-on-close="true"
    >
      <div class="dz" :style="{'text-align':'center'}">
        <span>{{ Msg_Dialog.title }}</span>
      </div>
      <div :style="{'margin':'20px 0px 0px 0px', 'text-align':Msg_Dialog.textAlign, 'font-size':'12px'}">
        <div v-if="Msg_Dialog.text !== ''" style="font-size:15px; padding-left: 40px; line-height:160%;" v-html="Msg_Dialog.text" />
        <i v-if="Msg_Dialog.text === ''" style="font-size:15px;">您本次操作退费域名 {{ Msg_Dialog.num }} / {{ Msg_Dialog.totalNum }} 个</i>
        <i v-if="Msg_Dialog.num != Msg_Dialog.totalNum" class="el-icon-loading" />
        <div style="margin: 10px 0px; line-height:160%" v-html="Msg_Dialog.resSuccess" />
        <div style="margin: 10px 0px; line-height:160%" v-html="Msg_Dialog.resFail" />
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" size="medium" @click="Msg_Dialog.visible = false">知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatEnUnit } from '@/utils/formatUnit.js'
import formatTime from '@/utils/formatTime.js'
import { mapState } from 'vuex'
import { Message } from 'element-ui'
// import { validUpperCase } from '@/utils/validate'
// import tableRouter from '@/router/demos/table'

function msgError(message) {
  Message({
    message,
    type: 'error',
    dangerouslyUseHTMLString: true
  })
}

export default {
  filters: {
    time(dt) {
      return formatTime(dt, 'YYYY-MM-DD')
    }
  },
  data() {
    return {
      refundBatchDomain: '', // 批量退费时（被选中）的域名
      cbDisabled: false, // 批量退费时复选框的 disabled
      btnDisabled: false, // 批量退费时按钮的 disabled
      refund_batch_val: false, // 批量退费时按钮前面的复选框  是否被选中  v-model
      refundBatchVal: false, // 批量退费时按钮前面的复选框  是否被选中    @change
      constRefundType: 2, // 1特殊退费 2 常规退费
      domainSearchResult: '', // 根据域名结果，例如：查询10条，此次查询范围内有8条有数据，2条无数据（1.cn、2.cn）。
      form: {
        serviceCode: '',
        agentCode: '',
        opentime: null,
        // agentCode: 'agent5648689',
        // opentime: ['2020-10-01', '2020-12-31'],
        domainNames: '', // '20201212xinnet.com\nxin2020120702.com\n1.com\n2.cn',
        refundState: 1 // 退款状态
      },
      refundStateOptions: [
        { value: 1, label: '未退费' },
        { value: 2, label: '已退费' }
      ],
      rules: {
        agentCode: [
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback()
            } else if (/^[a-zA-Z0-9]+$/.test(value)) {
              callback()
            } else {
              callback(new Error('只允许输入字母和数字'))
            }
          }, trigger: 'blur' }
        ],
        serviceCode: [
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback()
            } else if (/^[a-zA-Z0-9]+$/.test(value)) {
              callback()
            } else {
              callback(new Error('只允许输入字母和数字'))
            }
          }, trigger: 'blur' }
        ],
        domainNames: [
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback()
            } else {
              const arr = value.split(/\n/)
              if (arr.length > 10) {
                callback(new Error('最多输入10条域名'))
                return
              }
              arr.forEach(item => {
                if (item === '') {
                  callback(new Error('域名不能有空行'))
                  return
                }
                if (item && /^.+\..+$/.test(item) === false) {
                  callback(new Error('域名不合法'))
                  return
                }
              })
              callback()
            }
          }, trigger: 'blur' }
        ]
      },
      loading: false,
      listdata: [],
      searchState: 0, // 0 没有点击过查询， 1 点击过1次查询
      page: {
        currentPage: 1,
        total: 0, // 总条目数
        pageSize: 10
      },
      // 提示菜单
      Msg_Dialog: {
        visible: false,
        title: '',
        textAlign: 'center',
        text: '',
        resSuccess: '', // 成功的文本
        resSuccessObj: {},
        resFail: '', // 失败的文本
        resFailObj: {},
        num: 0, // 返回了的请求总数
        totalNum: 0 // 请求总数
      }
    }
  },
  computed: {
    ...mapState({
      queryRefundList: state => state.refund.queryRefundList,
      refundOrder: state => state.refund.refundOrder
    })
  },
  watch: {
    listdata: {
      handler(val) {
        // 每条服务都需符合（选中 或 不允许退费）
        const bln1 = val.every(item => item.checked || !item.isOperateCurrent)
        // bln2 为真时，表示当前页，每一条服务都不可以退费
        const bln2 = val.every(item => !item.isOperateCurrent)
        // 只要有一条服务被选中
        const bln3 = val.some(item => item.checked)

        if (bln2 === false) {
          // 如果 bln2 等于 false，表示至少有1条服务，允许用户选中
          this.refund_batch_val = bln1 // 批量退费时按钮前面的复选框  是否被选中
          this.cbDisabled = false // 批量退费时按钮前面的复选框  是否允许选中
        } else {
          this.refundBatchVal = false
          this.refund_batch_val = false
          this.cbDisabled = true
        }
        // 批量删除按钮的 disabled 状态
        this.btnDisabled = !bln3
        // 批量退费时的所有可退费的域名
        this.refundBatchDomain = val.filter(item => item.checked).map(item => item.domainName)
        // domainSearchResult
        if (this.form.domainNames !== '') {
          const domains = this.form.domainNames.split(/\n/)
          const domainsErrResult = domains.filter(item => val.every(obj => obj.domainName !== item))
          const allLen = domains.length
          const errLen = domainsErrResult.length
          if (errLen === 0) {
            this.domainSearchResult = '查询' + allLen + '条，此次查询范围内有' + (allLen - errLen) + '条有数据。'
          } else {
            this.domainSearchResult = '查询' + allLen + '条，此次查询范围内有' + (allLen - errLen) + '条有数据，' + errLen + '条无数据（' + domainsErrResult.join('、') + '）。'
          }
        } else {
          this.domainSearchResult = ''
        }
      },
      immediate: true, // 刷新加载 立马触发一次handler
      deep: true // 可以深度检测到 listdata 对象的属性值的变化
    }
  },
  mounted() {
    // this.onSubmit('form')
  },
  methods: {
    timeAmountUnit(a, u) {
      return a + formatEnUnit(u)
    },
    YMD(dt) {
      switch (typeof (dt)) {
        case 'string':
          return formatTime(new Date(dt).getTime(), 'YYYY-MM-DD')
        case 'object':
          return formatTime(dt.getTime(), 'YYYY-MM-DD')
        case 'number':
          return formatTime(dt, 'YYYY-MM-DD')
        default:
          return dt
      }
    },
    YMDHMS(dt) {
      switch (typeof (dt)) {
        case 'string':
          return formatTime(new Date(dt).getTime(), 'YYYY-MM-DD HH:mm:ss')
        case 'object':
          return formatTime(dt.getTime(), 'YYYY-MM-DD HH:mm:ss')
        case 'number':
          return formatTime(dt, 'YYYY-MM-DD HH:mm:ss')
        default:
          return dt
      }
    },
    RMB(v) {
      if (v === undefined || v === null || v === '') {
        return ''
      } else {
        return '¥' + v
      }
    },
    deBillLineType(val) {
      switch (val) {
        case 'N':
          return '新开'
        case 'R':
          return '续费'
        case 'C':
          return '退费'
        case 'U-C':
          return '升级退费'
        case 'U-N':
          return '升级新开'
        default:
          return ''
      }
    },
    onSubmit(formName) {
      this.page.currentPage = 1
      this.GetList()
    },
    GetList() {
      this.searchState++
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const { serviceCode, agentCode, domainNames, opentime, refundState } = this.form
          const payload = {
            pageNum: this.page.currentPage,
            pageSize: this.page.pageSize,
            refundType: this.constRefundType, // 1 特殊退费 2 常规退费
            serviceCode,
            agentCode,
            refundState,
            domainNames: domainNames.split(/\n/g).join(',')
          }
          if (opentime && opentime.length === 2) {
            payload.applyStartDate = this.YMD(opentime[0]) + ' 00:00:00'
            payload.applyEndDate = this.YMD(opentime[1]) + ' 23:59:59'
          }
          // 表单验证
          if ((agentCode && opentime && opentime.length === 2) || (serviceCode) || (domainNames)) {
            // 查询
            this.loading = true
            this.listdata = []
            this.$store.dispatch('refund/queryRefundList', payload).then(res => {
              this.loading = false
              if (res.code === null || res.code === undefined || res.code === '') {
                // 服务列表
                this.listdata = this.queryRefundList.data.list.map(item => {
                  // 退订整条服务的按钮是否允许被点击，及当前服务在批量退费时是否允许被选中
                  let isOperateCurrent = false // 默认不允许操作
                  const body = {
                    ...item,
                    checked: false, // 是否选中复选框
                    isAuthReview: false, // 是否选中命名失败
                    billList: item.billList.map(billItem => {
                      if (billItem.isRefundFlag && billItem.isReturns === '02') {
                        isOperateCurrent = true
                      }
                      return {
                        ...billItem,
                        loading: false, // 单条退费时 loading 效果
                        res: '', // 单条退费时 response 返回值
                        state: '' // 单条退费时 成功 or 失败
                      }
                    })
                  }
                  body.isOperateCurrent = isOperateCurrent
                  return body
                })
                this.page.total = this.queryRefundList.data.totalRows // 服务列表（数量）
                // btnDisabled 批量删除按钮的 disabled 状态
                // this.btnDisabled = !this.listdata.some(item => item.isOperateCurrent)
                // 批量退费时的所有可退费的域名
                // this.refundBatchDomain = this.listdata.filter(item => item.isOperateCurrent).map(item => item.domainName)
              } else {
                msgError(res.message || res.msg)
              }
            }).catch(err => {
              this.loading = false
              msgError(err)
            })
          } else {
            this.Msg_Dialog = {
              visible: true,
              title: '满足其中一种条件即可查询',
              textAlign: 'left',
              text: '1、根据用户ID与服务开通日期查询<br>2、根据服务编号查询<br>3、根据域名查询<br>'
            }
          }
        } else {
          console.log('表单错误')
          return false
        }
      })
    },
    onReset(formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      this.GetList()
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.GetList()
    },
    // 退费
    confirm_Refund(item, parentItem) {
      this.$confirm('退费将删除域名，操作不可逆，您是否确认退费？<br>' + item.domainName.replace(/\n/g, '<br>'), '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false,
        dangerouslyUseHTMLString: true
      }).then(() => {
        this.refund(item, parentItem)
      }).catch(() => {
        console.log('取消操作')
      })
    },
    refund(item, parentItem) {
      const payload = {
        agentCode: item.agentCode,
        serviceCode: item.serviceCode,
        billLineCode: item.billLineCode,
        billCode: item.billCode, // 账单编号
        domainName: item.domainName,
        price: item.price, // 退费交易价格
        transMoney: item.price, // 实际退费价格
        isAuthReview: parentItem.isAuthReview ? 1 : 2, // 1命名审核 2 非命名审核
        refundType: this.constRefundType // 1特殊退费 2 常规退费
      }
      item.loading = true
      this.$store.dispatch('refund/refundOrder', payload).then(res => {
        item.loading = false
        item.res = res.msg
        this.Msg_Dialog.num++

        let arr
        if (res.code === null || res.code === undefined || res.code === '') {
          // console.log('退费成功')
          item.state = 1
          if (this.Msg_Dialog.resSuccessObj === undefined || this.Msg_Dialog.resSuccessObj === null) {
            this.Msg_Dialog.resSuccessObj = {}
          }
          this.Msg_Dialog.resSuccessObj[payload.domainName] = '退费成功' // res.msg // 成功
          arr = Object.entries(this.Msg_Dialog.resSuccessObj)
          this.$set(this.Msg_Dialog, 'resSuccess', '成功' + arr.length + '个<br>' + arr.map(item => item[0] + ' ' + item[1]).join('<br>') + '')
        } else {
          // console.log('退费失败')
          item.state = 2
          if (this.Msg_Dialog.resFailObj === undefined || this.Msg_Dialog.resFailObj === null) {
            this.Msg_Dialog.resFailObj = {}
          }
          this.Msg_Dialog.resFailObj[payload.domainName] = res.msg // 失败原因
          arr = Object.entries(this.Msg_Dialog.resFailObj)
          this.$set(this.Msg_Dialog, 'resFail', '失败' + arr.length + '个<br>' + arr.map(item => item[0] + ' ' + item[1]).join('<br>') + '')
        }
      }).catch(err => {
        item.loading = false
        msgError(err)
      })
    },
    // 整个退费
    confirm_refund_all(item) {
      this.$confirm('退费将删除域名，操作不可逆，您是否确认退费？<br>' + item.domainName.replace(/\n/g, '<br>'), {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false,
        dangerouslyUseHTMLString: true
      }).then(() => {
        this.refund_all(item)
      }).catch(() => {
        console.log('取消操作')
      })
    },
    refund_all(item) {
      let i = 0
      item.billList.forEach(billItem => {
        if (billItem.isRefundFlag && billItem.isReturns === '02') {
          i++
          this.refund(billItem, item)
        }
      })
      if (i === 0) {
        msgError('此服务的子账单均不得退费')
      }
    },
    // 批量退费
    confirm_refund_batch() {
      this.$confirm('退费将删除域名，操作不可逆，您是否确认退费？<br>' + this.refundBatchDomain.join('<br>'), {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false,
        dangerouslyUseHTMLString: true
      }).then(() => {
        this.refund_batch()
      }).catch(() => {
        console.log('取消操作')
      })
    },
    refund_batch() {
      let n = 0
      this.listdata.forEach(item => {
        if (item.checked) {
          n++
          this.refund_all(item)
        }
      })
      this.Msg_Dialog = {
        visible: true,
        title: '批量退费操作结果',
        text: '',
        textAlign: 'center',
        num: 0,
        totalNum: n
      }
    },
    // 批量退费 复选框
    refund_batch_change(v) {
      this.refundBatchVal = v
      this.listdata.forEach(item => {
        if (item.isOperateCurrent) {
          item.checked = v
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-container{
  border-bottom: 20px solid #f3f7fa;

  .box-list{
    margin: 0px 20px 20px 20px;
    font-size: 12px;

    .no{
      color: #999;
    }
    .success{
      color: green;
    }
    .error{
      color: red;
    }
    .listResult{
      text-align:center; padding:20px;
    }
    .list-title{
      background: #f3f7fa;
      display: table;
      width: 100%;
      padding: 20px 0px;
      >div{
        display: table-cell;
      }
      >div:nth-child(1){
        width: 40px;
        text-align: center;
      }
      >div:nth-child(2){
        width: 120px;
        text-align: left;
      }
    }
    .list-item{
      .item-title{
        display: table;
        width: 100%;
        margin: 10px 0px 10px 0px;
        >div{
          display: table-cell;
        }
        >div:nth-child(1){
          width: 40px;
          text-align: center;
        }
        >div:nth-child(2){
          width: 200px;
        }
        >div:nth-child(3){

        }
        >div:nth-child(4){
          width: 15%;
        }
        >div:nth-child(5){
          width: 15%;
        }
      }
      .item-children{
        margin-bottom: 50px;
      }
    }
  }
  .dz{
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
<style lang="scss">
.box-container{
  .el-dialog__body{
    padding: 0px !important;
  }
}
.box-form{
  .el-range-separator{
    font-size: 12px !important;
  }
  .el-form .el-textarea__inner {
    min-height: 54px !important;
  }
}
.box-page{
  .el-pagination__total,.el-pagination__jump{
    font-size: 12px !important;
  }
}
</style>

