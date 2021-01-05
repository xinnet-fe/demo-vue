<template>
  <div class="order-form">
    <el-form ref="searchForm" class="search-form" :inline="true">
      <el-form-item label="输入订单号">
        <el-input
          v-model="listQuery.buyOrderCode"
          placeholder="请输入订单号"
          @input="changeOrderid"
          @keyup.enter.native="handleFilter"
        />
      </el-form-item>
      <el-form-item label="用户账号">
        <el-input
          v-model="listQuery.agentCode"
          placeholder="请输入用户账号"
          @input="changeAgentCode"
          @keyup.enter.native="handleFilter"
        />
      </el-form-item>
      <el-form-item label="服务编号">
        <el-input
          v-model="listQuery.serviceCode"
          placeholder="请输入服务编号"
          @input="changeServiceCode"
          @keyup.enter.native="handleFilter"
        />
      </el-form-item>
      <el-form-item label="订单类型">
        <el-select
          v-model="listQuery.businessType"
          placeholder="请选择订单类型"
          clearable
        >
          <el-option
            v-for="item in businessType"
            :key="item.num"
            :label="item.name"
            :value="item.num"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="提交时间">
        <el-date-picker
          v-model="value1"
          type="daterange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          :clearable="false"
          :editable="false"
        />
        <el-tooltip class="item" effect="dark" content="查询时间范围仅限90天" placement="top">
          <i class="el-icon-warning" style="position:absolute;top:50%;left:100%;margin-left: 3px;margin-top: -7px;color:#e6a23c;" />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="商品类别">
        <el-select
          v-model="listQuery.superProductClassCode"
          placeholder="请选择商品类别"
          clearable
        >
          <el-option
            v-for="item in superProductClassCode"
            :key="item.num"
            :label="item.name"
            :value="item.num"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select
          v-model="listQuery.orderStatus"
          placeholder="请选择订单状态"
          clearable
        >
          <el-option
            v-for="item in orderStatus"
            :key="item.num"
            :label="item.name"
            :value="item.num"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品内容">
        <el-input
          v-model="listQuery.productContent"
          placeholder="请输入商品内容"
          maxlength="10"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="medium"
          @click="handleFilter"
        >查询</el-button>
        <el-button size="medium" @click="resetModal">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- operate -->
    <el-form ref="operateForm" class="operate-form" :inline="true">
      <el-form-item>
        <el-button
          v-waves
          size="mini"
          :loading="downloadLoading"
          @click="handleDownload"
        >导出</el-button>
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
      <el-table-column align="center" width="185" label="订单编号">
        <template slot-scope="{ row }">
          <span>{{ row.buyOrderCode }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" width="215" label="服务编号">
        <template slot-scope="{row}">
          <span>{{ row.batchId }}</span>
        </template>
      </el-table-column> -->

      <el-table-column align="center" width="100" label="商品分类">
        <template slot-scope="{ row }">
          <span>{{ row.supProductClassa }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" width="185" label="商品名称">
        <template slot-scope="{ row }">
          <span>{{ row.goodsName }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" width="185" label="商品内容">
        <template slot-scope="{ row }">
          <span v-html="row.goodsContent" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="订单提交时间" width="140">
        <template slot-scope="{ row }">
          <span>{{
            row.createTime | parseTime("{y}-{m}-{d} {h}:{i}:{s}")
          }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" label="用户账号">
        <template slot-scope="{ row }">
          <span>{{ row.agentCode }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120" label="订单原价">
        <template slot-scope="{ row }">
          <span>￥{{ row.totalOriginalPrices }}</span>
          <!-- <span>￥{{ row.totalOriginalPrices.toFixed(2) }}</span> -->
        </template>
      </el-table-column>

      <el-table-column width="120" label="订单实付金额">
        <template slot-scope="{ row }">
          <span>￥{{ row.totalTradingPrices }}</span>
          <!-- <span>￥{{ row.totalTradingPrices.toFixed(2) }}</span> -->
        </template>
      </el-table-column>

      <el-table-column label="订单类型">
        <template slot-scope="{ row }">
          <span>{{ row.businessTypes }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="付费类型" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.goodsPaytypes }}</span>
        </template>
      </el-table-column> -->

      <el-table-column label="订单状态" align="center" width="80">
        <template slot-scope="{ row }">
          <span>{{ row.orderStatusa }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        width="150"
        fixed="right"
      >
        <template slot-scope="{ row }">
          <el-button
            style="color: #0069ff"
            type="text"
            size="small"
            @click="getDetail(row.buyOrderCode)"
          >订单详情</el-button>
          <el-button
            v-if="row.orderStatus === '1' && orderVisible"
            style="color: #0069ff"
            type="text"
            size="small"
            @click="orderModify(row)"
          >订单改价</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :list.sync="resetListquery"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import waves from '@/directive/demos/waves' // waves directive
import Pagination from '@/components/demos/Pagination' // secondary package based on el-pagination
import clearFormDate from '@/utils/clearFormData'

export default {
  name: 'OrderHy',
  components: { Pagination },
  directives: { waves },
  filters: {
  },
  props: {
    downloadLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      resetListquery: {},
      orderhao: '',
      zhanghao: '',
      servicehao: '',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        buyOrderCode: undefined,
        pageNum: 1,
        pageSize: 10,
        // sort: '+id',
        businessType: '',
        superProductClassCode: '',
        title: undefined,
        classId: undefined,
        auditState: undefined,
        publishState: undefined,
        // publishState: '1591924192000',
        startTime: undefined,
        endTime: undefined,
        orderStatus: '',
        orderType: 'HY',
        agentCode: undefined,
        serviceCode: undefined,
        productContent: ''
      },
      orderStatus: [
        { name: '全部', num: '' },
        { name: '待支付', num: '1' },
        { name: '支付中', num: '2' },
        { name: '已取消', num: '3' },
        { name: '已支付', num: '4' },
        { name: '支付失败', num: '5' }
      ],
      businessType: [
        { name: '全部', num: '' },
        { name: '新开', num: 'N' },
        { name: '续费', num: 'R' },
        { name: '升级', num: 'U' }
      ],
      superProductClassCode: [
        { name: '全部', num: '' },
        { name: '域名', num: 'D' },
        { name: '虚机', num: 'V' },
        { name: '邮局', num: 'M' },
        { name: '建站', num: 'W' },
        { name: '应用', num: 'A' },
        { name: '服务产品', num: 'S' },
        { name: '租用托管', num: 'Z' },
        { name: '轻应用服务器', num: 'E' },
        { name: '云产品', num: 'N' },
        { name: '云产品(老)', num: 'C' }
      ],
      value1: '',
      orderVisible: false,
      choiceDate: '',
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.choiceDate = minDate.getTime()
          if (maxDate) {
            this.choiceDate = ''
          }
        },
        disabledDate: (time) => {
          if (this.choiceDate !== '') {
            const one = 90 * 24 * 3600 * 1000
            const minTime = this.choiceDate - one
            const maxTime = this.choiceDate + one
            return time.getTime() < minTime || time.getTime() > maxTime
          }
        }
      }
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading.effects['tradeOrder/orderList']
    })
  },
  created() {
    this.resetDate()
    this.handleFilter()
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
    resetDate() {
      const dt1 = new Date()
      dt1.setDate(dt1.getDate() - 90) // 默认为最近90天
      const dt2 = new Date()

      this.value1 = [
        this.$moment(dt1).format('YYYY-MM-DD HH:mm:ss'),
        this.$moment(dt2).format('YYYY-MM-DD HH:mm:ss')
      ]
    },
    getList() {
      if (JSON.stringify(this.resetListquery) === '{}') {
        this.resetListquery = this.listQuery
      }
      this.$store
        .dispatch('tradeOrder/orderList', this.listQuery)
        .then((res) => {
          res.data.list.map((row) => {
            if (row.supProductClass) {
              // const supProductClass = row.supProductClass.substring(row.supProductClass.lastIndexOf('_') + 1)
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
            }
            if (row.businessType) {
              row.businessTypes =
                row.businessType === 'N'
                  ? '新开'
                  : row.businessType === 'R'
                    ? '续费'
                    : row.businessType === 'U'
                      ? '升级'
                      : ''
            }
            if (row.goodsPaytype) {
              row.goodsPaytypes =
                row.goodsPaytype === '01' ? '包年包月' : '单次'
            }
            if (row.orderStatus) {
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
            }
            if (row.totalOriginalPrice) {
              row.totalOriginalPrices = this.shuzi(
                row.totalOriginalPrice.toFixed(2)
              )
            }
            if (row.totalTradingPrice || row.totalTradingPrice === 0) {
              row.totalTradingPrices = this.shuzi(
                row.totalTradingPrice.toFixed(2)
              )
            }
            row.link = `/order-detail/index?id=${row.buyOrderCode}&showLayout=false`
          })
          this.list = res.data.list
          this.total = res.data.total
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getDetail(buyOrderCode) {
      this.$emit('getDetail', buyOrderCode)
    },
    orderModify(row) {
      this.$emit('orderModify', row)
    },
    shuzi(num) {
      var reg = /\d(?=(?:\d{3})+\b)/g
      return String(num).replace(reg, '$&,')
    },
    resetModal() {
      clearFormDate(this.listQuery)
      this.resetDate()
    },
    handleDownload() {
      this.$emit('download', this.listQuery)
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
      const service = this.listQuery.serviceCode.replace(
        /^\.+|[^\da-zA-Z]/g,
        ''
      )
      if (service.length <= 30) {
        this.servicehao = service
        this.listQuery.serviceCode = service
      } else {
        this.listQuery.serviceCode = this.servicehao
      }
    }
  }
}
</script>
