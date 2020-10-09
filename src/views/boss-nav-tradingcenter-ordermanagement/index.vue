<template>
  <div class="order-form">
    <el-form ref="searchForm" class="search-form" :inline="true">
      <el-form-item label="输入订单号">
        <el-input v-model="listQuery.buyOrderCode" placeholder="请输入订单号" @input="changeOrderid" @keyup.enter.native="handleFilter" />
      </el-form-item>
      <el-form-item label="用户账号">
        <el-input v-model="listQuery.agentCode" placeholder="请输入用户账号" @input="changeAgentCode" @keyup.enter.native="handleFilter" />
      </el-form-item>
      <el-form-item label="服务编号">
        <el-input v-model="listQuery.serviceCode" placeholder="请输入服务编号" @input="changeServiceCode" @keyup.enter.native="handleFilter" />
      </el-form-item>
      <el-form-item label="订单类型">
        <el-select v-model="listQuery.businessType" placeholder="请选择订单类型" clearable>
          <el-option v-for="item in businessType" :key="item.num" :label="item.name" :value="item.num" />
        </el-select>
      </el-form-item>
      <el-form-item label="提交时间">
        <el-date-picker v-model="value1" type="daterange" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
      </el-form-item>
      <el-form-item label="商品类别">
        <el-select v-model="listQuery.superProductClassCode" placeholder="请选择商品类别" clearable>
          <el-option v-for="item in superProductClassCode" :key="item.num" :label="item.name" :value="item.num" />
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="listQuery.orderStatus" placeholder="请选择订单状态" clearable>
          <el-option v-for="item in orderStatus" :key="item.num" :label="item.name" :value="item.num" />
        </el-select>
      </el-form-item>
      <el-form-item label="账号类型">
        <el-select v-model="listQuery.orderType" placeholder="请选择" clearable>
          <el-option v-for="item in orderTypeList" :key="item.num" :label="item.name" :value="item.num" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="handleFilter">查询</el-button>
        <el-button size="medium" @click="resetModal">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- operate -->
    <el-form ref="operateForm" class="operate-form" :inline="true">
      <el-form-item>
        <el-button v-waves size="mini" :loading="downloadLoading" @click="handleDownload">导出</el-button>
      </el-form-item>
    </el-form>
    <!-- operate -->

    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table
      ref="dragTable"
      :key="tableKey"
      v-loading="loading"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%"
    >
      <!-- @selection-change="handleSelectionChange" -->
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column align="center" width="175" label="订单编号">
        <template slot-scope="{row}">
          <span>{{ row.buyOrderCode }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="215" label="批次编号">
        <template slot-scope="{row}">
          <span>{{ row.batchId }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100" label="商品分类">
        <template slot-scope="{row}">
          <span>{{ row.supProductClassa }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" width="185" label="商品名称">
        <template slot-scope="{row}">
          <span>{{ row.goodsName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="订单提交时间" width="140">
        <template slot-scope="{row}">
          <span>{{ row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" label="用户账号">
        <template slot-scope="{row}">
          <span>{{ row.agentCode }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" label="订单原价">
        <template slot-scope="{row}">
          <span>￥{{ row.totalOriginalPrices }}</span>
          <!-- <span>￥{{ row.totalOriginalPrices.toFixed(2) }}</span> -->
        </template>
      </el-table-column>

      <el-table-column width="120" label="订单实付金额">
        <template slot-scope="{row}">
          <span>￥{{ row.totalTradingPrices }}</span>
          <!-- <span>￥{{ row.totalTradingPrices.toFixed(2) }}</span> -->
        </template>
      </el-table-column>

      <el-table-column label="订单类型">
        <template slot-scope="{row}">
          <span>{{ row.businessTypes }}</span>
        </template>
      </el-table-column>

      <el-table-column label="付费类型" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.goodsPaytypes }}</span>
        </template>
      </el-table-column>

      <el-table-column label="订单状态" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.orderStatusa }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="150" fixed="right">
        <template slot-scope="{row}">
          <el-button type="text" size="small" @click="orderLink(row.buyOrderCode)">查看订单</el-button>
          <el-button type="text" size="small" @click="orderModify(row)">订单改价</el-button>
          <!-- <router-link :to="row.link" class="link-type">
            <span style="color:#0069ff;cursor:pointer;">查看订单{{ row.buyOrderCode }}</span>
          </router-link> -->
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :list.sync="resetListquery" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="dialogLogouttit" :visible.sync="dialogLogout">
      <p v-if="shows === 'length'">当前数据为0条，无法导出</p>
      <p v-else>当前数据已超过6万条，无法导出</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogLogout = false">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="订单改价" :visible.sync="dialogOrderPriceShow" width="500px">
      <el-form ref="form" :model="form" :rules="rules2" label-width="120px">
        <el-form-item label="订单原价:">
          ￥ {{ row.totalTradingPrices }}
        </el-form-item>
        <el-form-item label="修改价格:" prop="price">
          <el-input v-model="form.price" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogOrderPriceShow = false">取 消</el-button>
        <el-button type="primary" @click="dialogOrderPriceSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { orderList } from '@/api/demos/order'
import { mapState } from 'vuex'
import waves from '@/directive/demos/waves' // waves directive
import $ from 'jquery'
import Pagination from '@/components/demos/Pagination' // secondary package based on el-pagination
import isMoney from '@/utils/isMoney'
const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'DragTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      row: {},
      dialogOrderPriceShow: false,
      form: {
        price: 0
      },
      resetListquery: {},
      shows: '',
      orderhao: '',
      zhanghao: '',
      servicehao: '',
      downloadLoading: false,
      tableKey: 0,
      orderid: undefined,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        buyOrderCode: undefined,
        pageNum: 1,
        pageSize: 10,
        // sort: '+id',
        businessType: undefined,
        superProductClassCode: undefined,
        title: undefined,
        classId: undefined,
        auditState: undefined,
        publishState: undefined,
        // publishState: '1591924192000',
        startTime: undefined,
        endTime: undefined,
        orderStatus: undefined,
        orderType: 'HY',
        agentCode: undefined,
        serviceCode: undefined
      },
      auditState: [{ name: '未审核', num: 0 }, { name: '已通过', num: 1 }, { name: '未通过', num: 2 }],
      publishState: [{ name: '未发布', num: 0 }, { name: '已发布', num: 1 }],
      orderStatus: [
        { name: '待支付', num: 1 },
        { name: '支付中', num: 2 },
        { name: '已取消', num: 3 },
        { name: '已支付', num: 4 },
        { name: '支付失败', num: 5 }
      ],
      businessType: [
        { name: '新开', num: 'N' },
        { name: '续费', num: 'R' },
        { name: '升级', num: 'U' }
      ],
      superProductClassCode: [
        { name: '域名', num: 'D' },
        { name: '虚机', num: 'V' },
        { name: '云计算', num: 'C' },
        { name: '邮局', num: 'M' },
        { name: '建站', num: 'W' },
        { name: '应用', num: 'A' },
        { name: '服务产品', num: 'S' },
        { name: '增值服务', num: 'I' },
        { name: '服务市场', num: 'S_MART' }
      ],
      orderTypeList: [
        { name: '会员订单', num: 'HY' },
        { name: '代理订单', num: 'DL' }
      ],
      calendarTypeOptions,
      temp: {
        businessType: undefined,
        productClass: undefined,
        title: undefined,
        categoryName: undefined,
        auditState: undefined,
        publishState: undefined,
        createTime: new Date(),
        orderStatus: undefined,
        originalValue: undefined,
        value: undefined
      },
      dialogLogout: false,
      dialogLogouttit: '提示',
      textMap: {
        update: '编辑标签',
        create: '新增标签',
        lock: '解锁',
        unlock: '锁定'
      },
      rules: {
        // column: [{ required: true, message: '请选择文章所属栏目', trigger: 'change' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      },
      rules2: {
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { validator: isMoney, message: '格式错误', trigger: 'blur' }
        ]
      },
      categorylist: [],
      newsbanWords: '',
      value1: ''
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['tradeOrder/orderList']
    })
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      // const str = this.getUrlparam(this.listQuery)
      if (JSON.stringify(this.resetListquery) === '{}') {
        this.resetListquery = this.listQuery
      }
      this.$store.dispatch('tradeOrder/orderList', this.listQuery).then(res => {
        res.data.list.forEach(row => {
          const supProductClass = row.supProductClass.substring(row.supProductClass.lastIndexOf('_') + 1)
          if (supProductClass === 'D') {
            row.supProductClassa = '域名'
          } else if (supProductClass === 'V') {
            row.supProductClassa = '虚机'
          } else if (supProductClass === 'C') {
            row.supProductClassa = '云计算'
          } else if (supProductClass === 'M') {
            row.supProductClassa = '邮局'
          } else if (supProductClass === 'W') {
            row.supProductClassa = '建站'
          } else if (supProductClass === 'A') {
            row.supProductClassa = '应用'
          } else if (supProductClass === 'S') {
            row.supProductClassa = '服务产品'
          } else if (supProductClass === 'I') {
            row.supProductClassa = '增值服务'
          } else if (supProductClass === 'MART') {
            row.supProductClassa = '服务市场'
          }
          row.businessTypes = row.businessType === 'N' ? '新开' : row.businessType === 'R' ? '续费' : row.businessType === 'U' ? '升级' : ''
          row.goodsPaytypes = row.goodsPaytype === '01' ? '包年包月' : '次'
          if (row.orderStatus === '1') {
            row.orderStatusa = '待支付'
          } else if (row.orderStatus === '2') {
            row.orderStatusa = '支付中'
          } else if (row.orderStatus === '3') {
            row.orderStatusa = '已取消'
          } else if (row.orderStatus === '4') {
            row.orderStatusa = '已支付'
          } else if (row.orderStatus === '5') {
            row.orderStatusa = '支付失败'
          }
          row.link = '/boss-nav-tradingcenter-orderdetail/' + row.buyOrderCode
          row.totalOriginalPrices = this.shuzi(row.totalOriginalPrice.toFixed(2))
          row.totalTradingPrices = this.shuzi(row.totalTradingPrice.toFixed(2))
          console.log(row.totalTradingPrices)
        })
        this.list = res.data.list
        this.total = res.data.total
      }).catch(error => {
        console.log(error)
      })
    },
    orderLink(id) {
      this.$router.push({
        path: '/boss-nav-tradingcenter/boss-nav-tradingcenter-detail/',
        query: { id: id }
      })
    },
    orderModify(row) {
      this.row = row
      this.dialogOrderPriceShow = true
    },
    shuzi(num) {
      var reg = /\d(?=(?:\d{3})+\b)/g
      return String(num).replace(reg, '$&,')
    },
    changeOrders() {
      const orderType = this.listQuery.orderType
      this.resetModal()
      this.listQuery.orderType = orderType
    },
    resetModal() {
      this.value1 = ''
      this.listQuery = {
        pageNum: 1,
        pageSize: 10,
        // sort: '+id',
        buyOrderCode: undefined,
        businessType: undefined,
        superProductClassCode: undefined,
        title: undefined,
        classId: undefined,
        auditState: undefined,
        publishState: undefined,
        startTime: undefined,
        endTime: undefined,
        orderStatus: undefined,
        orderType: 'HY',
        // orderType: '0',
        agentCode: undefined,
        serviceCode: undefined
      }
    },
    handleDownload() {
      // const str = this.getUrlparam(this.listQuery)
      this.$store.dispatch('tradeOrder/orderList', this.listQuery).then(res => {
        if (res.data.list.length) {
          if (res.data.total < 600000) {
            const str = this.getUrlparam(this.listQuery)

            window.open(window.location.origin + '/boss/tradeOrder/exportExecl?' + str)
          } else {
            this.dialogLogout = true
            this.shows = 'len'
          }
        } else {
          this.dialogLogout = true
          this.shows = 'length'
        }
      }).catch(error => {
        console.log(error)
      })
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
    handlePhone() {
      var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (!myreg.test(this.temp.phone)) {
        this.handleReset(this.temp.phones, this.temp.phone, $('#samePhone'))
        $('#rightPhone').show()
      } else {
        this.handleReset(this.temp.phones, this.temp.phone, $('#samePhone'))
        $('#rightPhone').hide()
      }
    },
    handleEmail() {
      var myreg = /^([A-Za-z0-9_+-.])+@([A-Za-z0-9\-.])+\.([A-Za-z]{2,22})$/
      if (!myreg.test(this.temp.email)) {
        this.handleReset(this.temp.emails, this.temp.email, $('#sameEmail'))
        $('#rightEmail').show()
      } else {
        this.handleReset(this.temp.emails, this.temp.email, $('#sameEmail'))
        $('#rightEmail').hide()
      }
    },
    handleReset(a, b, c) {
      if (a === b) {
        c.show()
      } else {
        c.hide()
      }
    },
    handleFilter() {
      if (this.value1) {
        this.listQuery.startTime = this.value1[0]
        this.listQuery.endTime = this.value1[1]
      } else {
        this.listQuery.startTime = undefined
        this.listQuery.endTime = undefined
      }
      this.listQuery.pageNum = 1
      this.resetListquery = this.listQuery
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    changeOrderid() {
      const buyorder = this.listQuery.buyOrderCode.replace(/^\.+|[^\d]/g, '')
      if (buyorder.length <= 30) {
        this.orderhao = buyorder
        this.listQuery.buyOrderCode = buyorder
      } else {
        this.listQuery.buyOrderCode = this.orderhao
      }
    },
    changeAgentCode() {
      const agent = this.listQuery.agentCode.replace(/^\.+|[^\da-zA-Z]/g, '')
      if (agent.length <= 30) {
        this.zhanghao = agent
        this.listQuery.agentCode = agent
      } else {
        this.listQuery.agentCode = this.zhanghao
      }
    },
    changeServiceCode() {
      const service = this.listQuery.serviceCode.replace(/^\.+|[^\da-zA-Z]/g, '')
      if (service.length <= 30) {
        this.servicehao = service
        this.listQuery.serviceCode = service
      } else {
        this.listQuery.serviceCode = this.servicehao
      }
    },
    changeOrderType() {
      const a = this.listQuery.orderType
      this.resetModal()
      this.listQuery.orderType = a
    },
    dialogOrderPriceSubmit() {
      const query = {
        buyOrderCode: this.row.buyOrderCode,
        price: this.form.price
      }
      this.$store.dispatch('tradeOrder/changeOrderPrice', query).then(res => {
        console.log(res)
        if (res.code === '0') {
          this.$message({
            message: '改价成功',
            type: 'success'
          })
          this.getList()
          this.dialogOrderPriceShow = false
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>

<style scoped>
.icon-star{
  margin-right:2px;
}
.drag-handler{
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.clored{
  color: rgb(255, 0, 0);
  font-size: 12px;
  margin: 0px 5px;
  position: absolute;
  width: 165px;
  left: 4px;
  top: 30px;
}
</style>
