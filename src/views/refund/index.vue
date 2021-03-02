<template>
  <div class="order-form">
    <div v-if="showBillList_Dialog.visible === false">
      <div>
        <el-form ref="form" :inline="true" :model="form" :rules="rules" class="search-form" style="line-height:400%;">
          <el-form-item label="用户ID" label-width="100px" prop="agentCode">
            <el-input v-model="form.agentCode" placeholder="请输入用户ID" />
          </el-form-item>

          <el-form-item label="服务编号" label-width="100px" prop="serviceCode">
            <el-input v-model="form.serviceCode" placeholder="请输入商品服务编号" />
          </el-form-item>
          <el-form-item label="服务开通日期" label-width="100px" prop="opentime" class="refund">
            <el-date-picker
              v-model="form.opentime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item label="服务状态" label-width="100px" prop="businessState">
            <el-select v-model="form.serviceState" placeholder="请选择服务状态">
              <el-option label="全部" value="" />
              <el-option label="正常" value="2" />
              <el-option label="已到期" value="4" />
              <el-option label="冻结中" value="8" />
              <el-option label="已删除" value="64" />
              <el-option label="未开通" value="128" />
              <el-option label="开通失败" value="256" />
            </el-select>
          </el-form-item>
          <el-form-item label="商品分类" label-width="100px" prop="productType">
            <el-select v-model="form.productType" placeholder="请选择商品分类">
              <el-option label="云主机" value="ARROW" />
              <el-option label="云数据库" value="MYSQL" />
              <el-option label="负载均衡" value="LOAD_BALANCE" />
              <el-option label="弹性IP" value="FLOAT_IP" />
              <el-option label="NAT网关" value="NATGW" />
              <el-option label="Redis" value="REDIS" />
              <el-option label="RabbitMQ" value="RABBITMQ" />
            </el-select>
          </el-form-item>
          <el-form-item class="form-btn">
            <span class="form-btnleft"><el-button size="medium" @click="onReset('form')">重置</el-button></span>
            <span class="form-btnright"><el-button type="primary" size="medium" @click="onSubmit('form')">查询</el-button></span>
          </el-form-item>
        </el-form>
      </div>
      <div class="box-list">
        <el-table v-loading="loading" :data="listdata" style="width: 100%; margin-top:20px">
          <el-table-column prop="serviceCode" label="服务编号" width="150" />
          <el-table-column prop="agentCode" label="用户ID" width="180" />
          <el-table-column label="商品分类" width="110">
            <template slot-scope="scope">
              {{ deProductType(scope.row.productType) }}
            </template>
          </el-table-column>
          <el-table-column prop="productName" label="商品名称" />
          <el-table-column label="服务开通日期" width="140">
            <template slot-scope="scope">
              {{ YMDHMS(scope.row.beginTime) }}
            </template>
          </el-table-column>
          <el-table-column label="服务到期日期" width="140">
            <template slot-scope="scope">
              {{ YMDHMS(scope.row.endTime) }}
            </template>
          </el-table-column>
          <el-table-column label="服务状态" width="100">
            <template slot-scope="scope">
              {{ scope.row.serviceState | serviceState }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="70">
            <template slot-scope="scope">
              <el-button v-if="scope.row.canRefund" type="text" @click="showBillList(scope.row)">退款</el-button>
              <span v-else />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="box-page" style="margin-top:20px">
        <el-pagination
          background
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <div v-if="showBillList_Dialog.visible === true" style="margin:0px 20px 20px 20px">
      <el-row>
        <el-col :span="24">
          <span style="margin-right:20px">服务编号：{{ showBillList_Dialog.serviceCode }}</span>
          <el-button @click="instanceRefund('SERVICE')">退订所有服务</el-button>
        </el-col>
      </el-row>
      <div style="margin: 20px 0px">
        <el-table
          v-loading="showBillList_Dialog.loading"
          :data="showBillList_Dialog.data"
          style="width: 100%"
        >
          <el-table-column label="账单编号" width="270">
            <template slot-scope="scope">
              <span>{{ scope.row.billCode }}</span>
            </template>
          </el-table-column>
          <el-table-column label="账单类型" width="110">
            <template slot-scope="scope">
              <span>{{ deBillLineType(scope.row.billLineType) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品类型" width="110">
            <template slot-scope="scope">
              <span>{{ deGoodsType(scope.row.goodsType) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="账单实付金额">
            <template slot-scope="scope">
              <span>{{ RMB(scope.row.shouldRefund) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="退款金额">
            <template slot-scope="scope">
              <span>{{ RMB(scope.row.transMoney) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生成时间">
            <template slot-scope="scope">
              <span>{{ scope.row.operateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.isReturns === '01'">已退款</span>
              <el-button v-if="scope.row.isReturns === '02'" type="text" @click="instanceRefund('ORDER', scope.row)">退款</el-button>
              <span v-if="scope.row.isReturns === '03'" title="后付费(不能退费)" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span class="dialog-footer">
        <el-button type="primary" size="medium" @click="back">返 回</el-button>
      </span>
    </div>

    <el-dialog
      title=""
      :visible.sync="instanceRefund_Dialog.visible"
      width="30%"
      :destroy-on-close="true"
    >
      <el-form ref="instanceRefund_Dialog" :model="instanceRefund_Dialog" :rules="instanceRefund_Dialog.rules">
        <div>
          <span class="dz">系统建议退款金额：</span>
          <span>{{ RMB(instanceRefund_Dialog.shouldRefund) }}</span></div>
        <div style="margin: 30px 0px 70px 0px">
          <span class="dz" style="float:left; padding-top:8px">实际退款金额：</span>
          <span style="float:left">
            <el-form-item label="" prop="transMoney_Inp">
              <el-input v-model="instanceRefund_Dialog.transMoney_Inp">
                <template slot="prepend">¥</template>
              </el-input>
            </el-form-item>
          </span>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="instanceRefund_Dialog.visible = false">取 消</el-button>
        <el-button type="primary" :disabled="instanceRefund_Dialog.disabled" size="medium" @click="confirmRefund()">{{ instanceRefund_Dialog.btnText }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title=""
      :visible.sync="refundError_Dialog.visible"
      width="30%"
    >
      <div class="dz" style="text-align:center;">
        <span>该资源/账单不可退订！</span>
      </div>
      <div style="margin: 25px 0px 0px 0px; text-align:center; font-size:15px;">
        <i>{{ refundError_Dialog.text }}</i>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" size="medium" @click="refundError_Dialog.visible = false">知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import formatTime from '@/utils/formatTime.js'
import { mapState } from 'vuex'
import { Message } from 'element-ui'

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
    },
    // 服务状态（2 正常 4 已到期 8 冻结中 64 已删除 128 未开通 256 开通失败）
    serviceState(i) {
      switch (i) {
        case 2:
          return '正常'
        case 4:
          return '已到期'
        case 8:
          return '冻结中'
        case 64:
          return '已删除'
        case 128:
          return '未开通'
        case 256:
          return '开通失败'
      }
    }
  },
  data() {
    var validateAlphanumeric = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (/^[a-zA-Z0-9]+$/.test(value)) {
        callback()
      } else {
        callback(new Error('只允许输入字母和数字'))
      }
    }
    return {
      form: {
        productType: 'ARROW',
        agentCode: '',
        serviceCode: '',
        opentime: '',
        serviceState: ''
      },
      rules: {
        agentCode: [
          { validator: validateAlphanumeric, trigger: 'blur' }
        ],
        serviceCode: [
          { validator: validateAlphanumeric, trigger: 'blur' }
        ],
        productType: [
          { required: true, message: '请输入商品分类', trigger: 'blur' }
        ]
      },
      loading: false,
      listdata: [],
      page: {
        currentPage: 1,
        total: 0, // 总条目数
        pageSize: 20
      },
      showBillList_Dialog: {
        item: {},
        visible: false,
        serviceCode: '',
        loading: false,
        data: []
      },
      instanceRefund_Dialog: {
        item: {},
        visible: false,
        shouldRefund: '', // 建议退费
        transMoney: '', // 实际退费（后端返回值）
        transMoney_Inp: '', // 实际退费（前端输入框）
        rules: {
          transMoney_Inp: [
            { required: true, message: '请输入实际退费价格', trigger: 'blur' },
            { validator: (rule, value, callback) => {
              // if (this.instanceRefund_Dialog.transMoney_Inp > this.instanceRefund_Dialog.shouldRefund) {
              // console.log(Number(this.instanceRefund_Dialog.transMoney_Inp) , Number(this.instanceRefund_Dialog.maxRefund))
              if (Number(this.instanceRefund_Dialog.transMoney_Inp) > Number(this.instanceRefund_Dialog.maxRefund)) {
                callback(new Error('实际退费价格不能大于实际花费总金额')) // 建议退费价格  就是  实际花费金额
              } else if (Number(this.instanceRefund_Dialog.transMoney_Inp) <= 0) {
                callback(new Error('实际退费价格必须大于零'))
              } else if (Number(this.instanceRefund_Dialog.transMoney_Inp) !== parseFloat(this.instanceRefund_Dialog.transMoney_Inp)) {
                callback(new Error('请输入数字'))
              } else {
                callback()
              }
            }, trigger: 'blur' }
          ]
        },
        disabled: false, // 退费按钮是否可用
        btnText: '确 定' // 退费按钮文字
      },
      refundError_Dialog: {
        visible: false,
        text: '显示退费原因'
      }
    }
  },
  computed: {
    ...mapState({
      refundProduct_List: state => state.refund.refundProduct_List,
      refundProduct_BillList: state => state.refund.refundProduct_BillList,
      instance_Refund_Money: state => state.refund.instance_Refund_Money,
      instance_Refund: state => state.refund.instance_Refund
    })
  },
  mounted() {
    this.onSubmit('form')
  },
  methods: {
    YMD(dt) {
      return formatTime(dt, 'YYYY-MM-DD')
    },
    YMDHMS(dt) {
      return formatTime(dt, 'YYYY-MM-DD HH:mm:ss')
    },
    RMB(v) {
      if (v === undefined || v === null || v === '') {
        return ''
      } else {
        return '¥' + v
      }
    },
    deProductType(val) {
      switch (val) {
        case 'ARROW':
          return '云主机'
        case 'MYSQL':
          return '云数据库'
        case 'LOAD_BALANCE':
          return '负载均衡'
        case 'FLOAT_IP':
          return '弹性IP'
        case 'NATGW':
          return 'NAT网关'
        case 'REDIS':
          return 'Redis'
        case 'RABBITMQ':
          return 'RabbitMQ'
        default:
          return ''
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
    deGoodsType(val) {
      switch (val) {
        case '01':
          return '单品'
        case '05':
          return '附属'
        default:
          return ''
      }
    },
    onSubmit(formName) {
      this.page.currentPage = 1
      this.GetList()
    },
    GetList() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const { productType, agentCode, serviceCode, opentime, serviceState } = this.form
          const payload = {
            page: this.page.currentPage,
            limit: this.page.pageSize,
            agentCode: agentCode,
            serviceCode: serviceCode,
            serviceState: serviceState,
            productType: productType
          }
          if (opentime && opentime.length === 2) {
            payload.startDate = this.YMD(opentime[0].getTime())
            payload.endDate = this.YMD(opentime[1].getTime())
          }
          this.loading = true
          // 查询
          this.$store.dispatch('refund/refundProduct_List', payload).then(res => {
            this.loading = false
            if (res.success) {
              this.listdata = this.refundProduct_List.data
              this.page.total = this.refundProduct_List.page.total_count
            } else {
              this.refundError_Dialog.visible = true
              this.refundError_Dialog.text = res.message
            }
          }).catch(err => {
            this.loading = false
            msgError(err)
          })
        } else {
          console.log('表单错误')
          return false
        }
      })
    },
    back() {
      this.showBillList_Dialog.visible = false
      this.$nextTick(() => {
        this.GetList()
      })
    },
    onReset(formName) {
      this.$refs[formName].resetFields()
      this.form.productType = 'ARROW'
      this.form.agentCode = ''
      this.form.serviceCode = ''
      this.form.opentime = ''
      this.form.serviceState = ''
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      // console.log(`每页 ${val} 条`);
      this.GetList()
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
      // console.log(`当前页: ${val}`);
      this.GetList()
    },
    handleClose(done) {
      done()
    },
    // 显示子账单
    showBillList(item) {
      // console.log('item=', item)
      const payload = {
        agentCode: item.agentCode,
        // billCode: item.第一个接口中没有账单编号,
        serviceCode: item.serviceCode,
        startDate: formatTime(item.beginTime, 'YYYY-MM-DD'),
        endDate: formatTime(item.endTime, 'YYYY-MM-DD'),
        productType: item.productType
      }
      this.showBillList_Dialog.item = item
      this.showBillList_Dialog.visible = true
      this.showBillList_Dialog.serviceCode = item.serviceCode
      this.showBillList_Dialog.loading = true
      this.refundProduct_BillList.data = []
      // console.log('dispatch -> refund/refundProduct_BillList', payload)
      this.$store.dispatch('refund/refundProduct_BillList', payload).then(res => {
        this.showBillList_Dialog.loading = false
        if (res.success) {
          this.showBillList_Dialog.data = this.refundProduct_BillList.data
        } else {
          this.refundError_Dialog.visible = true
          this.refundError_Dialog.text = res.message
        }
      }).catch(err => {
        this.showBillList_Dialog.loading = false
        msgError(err)
      })
    },
    // 显示退费窗口
    instanceRefund(refundType, item) {
      // this.showBillList_Dialog.item  是一级账单
      // item 是子账单
      if (item) {
        // 子账单单独退
        this.instanceRefund_Dialog.item = item
        this.instanceRefund_Dialog.item.refundType = refundType
      } else {
        // 整单退
        this.instanceRefund_Dialog.item = {
          refundType,
          // billCode: this.showBillList_Dialog.item.billCode,// 整单没有billCode
          productType: this.showBillList_Dialog.item.productType
        }
      }

      const payload = {}
      if (refundType === 'SERVICE') {
        // 整单退费
        item = this.showBillList_Dialog.item
        payload.agentCode = item.agentCode
        // payload.billCode = item.id  // 整单没有billCode
        payload.serviceCode = item.serviceCode
        payload.refundType = refundType
        payload.productType = item.productType
      } else if (refundType === 'ORDER') {
        // 退单个订单
        payload.agentCode = this.showBillList_Dialog.item.agentCode
        payload.billCode = item.billCode
        payload.serviceCode = this.showBillList_Dialog.item.serviceCode
        payload.refundType = refundType
        payload.productType = item.productType
      } else {
        console.log('错误的refundType')
        return
      }

      this.$store.dispatch('refund/instance_Refund_Money', payload).then((res) => {
        if (res.success) {
          this.instanceRefund_Dialog.visible = true
          this.instanceRefund_Dialog.shouldRefund = this.instance_Refund_Money.data.shouldRefund
          this.instanceRefund_Dialog.transMoney = this.instance_Refund_Money.data.transMoney
          this.instanceRefund_Dialog.transMoney_Inp = this.instance_Refund_Money.data.transMoney
          this.instanceRefund_Dialog.maxRefund = this.instance_Refund_Money.data.maxRefund
        } else {
          this.refundError_Dialog.visible = true
          this.refundError_Dialog.text = res.message
        }
      }).catch(err => {
        this.refundError_Dialog.visible = true
        this.refundError_Dialog.text = err
      })
    },
    // 确认退费
    confirmRefund() {
      // console.log('是一级账单 showBillList_Dialog.item=', this.showBillList_Dialog.item)
      // console.log('子账单单独退 instanceRefund_Dialog.item=', this.instanceRefund_Dialog.item)
      this.$refs['instanceRefund_Dialog'].validate((valid) => {
        if (valid) {
          // 整单退费
          const payload = {
            agentCode: this.showBillList_Dialog.item.agentCode,
            // billCode: this.instanceRefund_Dialog.item.billCode,// 整单没有billCode
            serviceCode: this.showBillList_Dialog.item.serviceCode,
            transMoney: this.instanceRefund_Dialog.transMoney_Inp, // 工作人员输入的实际退费金额
            refundType: this.instanceRefund_Dialog.item.refundType,
            productType: this.instanceRefund_Dialog.item.productType
          }
          // 退单个订单
          if (this.instanceRefund_Dialog.item.refundType === 'ORDER') {
            payload.billCode = this.instanceRefund_Dialog.item.billCode
          }
          // 退费
          this.instanceRefund_Dialog.disabled = true
          this.instanceRefund_Dialog.btnText = '处理中..'
          this.$store.dispatch('refund/instance_Refund', payload).then(res => {
            if (res.success) {
              this.$alert('退费成功', '提示', { callback: () => {
                // this.GetList() // 刷新页面
                this.showBillList(this.showBillList_Dialog.item) // 重新显示子账单
              } })
              // this.showBillList_Dialog.visible = false
            } else {
              this.refundError_Dialog.visible = true
              this.refundError_Dialog.text = res.message
            }
            this.instanceRefund_Dialog.visible = false

            this.instanceRefund_Dialog.disabled = false
            this.instanceRefund_Dialog.btnText = '确 定'
          }).catch(err => {
            this.instanceRefund_Dialog.visible = false
            this.showBillList_Dialog.visible = false
            this.instanceRefund_Dialog.disabled = false
            this.instanceRefund_Dialog.btnText = '确 定'
            msgError(err)
          })
        } else {
          console.log('表单错误')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-container{
  border-bottom: 20px solid #f3f7fa;
  padding: 20px 0px;
  .box-list{
    margin: 0px 20px 20px 20px;
  }
  .box-page{
    margin: 0px 20px;
  }
}

.dz{
  font-size: 18px;
  font-weight: bold;
}

.form-btn{
  .form-btnleft{
    display:inline-block;
    width: 100px;
    box-sizing: border-box;
    text-align: right;
    padding-right: 10px;
    float: none !important;
  }
  .form-btnright{
    display:inline-block;
  }
}

</style>
<style lang="scss">
.refund{
  .el-range-editor {
    width: 435px !important;
  }
}
.box-form{
  .el-range-separator{
    font-size: 12px !important;
  }
}
.box-page{
  .el-pagination__total,.el-pagination__jump{
    font-size: 12px !important;
  }
}
</style>

