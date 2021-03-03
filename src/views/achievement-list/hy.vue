<template>
  <div class="order-form">
    <el-form ref="searchForm" class="search-form" :inline="true">
      <el-form-item label="用户ID">
        <el-input
          v-model="form.agentCode"
          placeholder="请输入用户ID"
        />
      </el-form-item>
      <el-form-item label="支付时间">
        <el-date-picker
          v-model="date"
          type="daterange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="defaultTime"
          :picker-options="pickerOptions"
          :clearable="false"
          :editable="false"
        />
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input
          v-model="form.goodsName"
          placeholder="请输入商品名称"
        />
      </el-form-item>
      <el-form-item label="服务状态">
        <el-select
          v-model="form.serviceStatus"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="item in serviceStatusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="分公司">
        <el-select
          v-model="company"
          placeholder="请选择"
          clearable
          :multiple="true"
        >
          <el-option
            v-for="item in companyList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="销售负责人">
        <el-select
          v-model="saleName"
          placeholder="请选择"
          clearable
          :multiple="true"
        >
          <el-option
            key="全部"
            label="全部"
            value=""
          />
          <el-option
            v-for="item in saleNameList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="产品分类">
        <el-select
          v-model="productType"
          placeholder="请选择"
          clearable
          :multiple="true"
        >
          <el-option
            v-for="item in productTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="medium"
          :loading="loading"
          @click="getList()"
        >查询</el-button>
        <el-button size="medium" @click="resetModal">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- operate -->
    <el-form ref="operateForm" class="operate-form" :inline="true">
      <el-form-item>
        <el-button
          size="mini"
          :loading="downloadLoading"
          @click="handleDownload"
        >导出</el-button>
      </el-form-item>
    </el-form>
    <!-- operate -->

    <el-table
      ref="dragTable"
      v-loading="loading"
      :data="list"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="用户ID" prop="agentCode" width="100" />
      <el-table-column label="商品名称" prop="goodsName" />
      <el-table-column label="服务编号" prop="serviceCode" />
      <el-table-column label="订单号" prop="orderCode" />
      <el-table-column label="商品类型">
        <template slot-scope="{ row }">
          {{ row.goodsType === '01' ? '主产品': '附属产品' }}
        </template>
      </el-table-column>

      <el-table-column label="产品分类">
        <template slot-scope="{ row }">
          {{ row.productClassName }}
        </template>
      </el-table-column>

      <el-table-column label="商品价格">
        <template slot-scope="{ row }">
          ￥{{ row.money }}
        </template>
      </el-table-column>
      <el-table-column label="订单方式">
        <template slot-scope="{ row }">
          <span>{{ row.businessType }}</span>
        </template>
      </el-table-column>

      <el-table-column label="支付成功时间" prop="operateTime" />
      <el-table-column label="是否退费">
        <template slot-scope="{ row }">
          <span v-if="row.isReturns === '01'">已退</span>
          <span v-if="row.isReturns === '02'">未退</span>
          <span v-if="row.isReturns === '03'">不可退</span>
        </template>
      </el-table-column>
      <el-table-column label="交易类型" prop="tradeType" />
      <el-table-column label="年限" prop="timeAmount" />
      <el-table-column label="年限单位">
        <template slot-scope="{ row }">
          <span v-if="row.timeUnit === 'Y'">年</span>
          <span v-if="row.timeUnit === 'M'">月</span>
          <span v-if="row.timeUnit === 'D'">天</span>
        </template>
      </el-table-column>
      <el-table-column label="销售负责人1" prop="salesmagFirst" />
      <el-table-column label="负责人1所属分公司" prop="salesmagCompanyFirst" />
      <el-table-column label="销售负责人2" prop="salesmagSecond" />
      <el-table-column label="负责人2所属分公司" prop="salesmagCompanySecond" />
      <el-table-column label="商品状态" prop="serviceStatus" />
      <el-table-column label="成单类型">
        <template slot-scope="{ row }">
          <span>{{ row.orderType }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="100"
        fixed="right"
      >
        <template slot-scope="{ row }">
          <el-button
            v-if="checkPermission(['Sales-Performmance-edit'])"
            type="text"
            size="small"
            @click="handleEdit(row)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="page.total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="getList"
    />
    <dialog-hy-edit v-if="dialogEditShow" :visible.sync="dialogEditShow" :row.sync="row" :sale-name-list="saleNameList" :business-type-list="businessTypeList" :order-type-list="orderTypeList" @getList="getList" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Pagination from '@/components/demos/Pagination' // secondary package based on el-pagination
import clearFormDate from '@/utils/clearFormData'
import checkPermission from '@/utils/demos/permission' // 权限判断函数
import DialogHyEdit from './dialogHyEdit'
export default {
  name: 'AchievementHy',
  components: { Pagination, DialogHyEdit },
  filters: {
  },
  props: {
    productTypeList: {
      type: Array,
      default: () => []
    },
    saleNameList: {
      type: Array,
      default: () => []
    },
    companyList: {
      type: Array,
      default: () => []
    },
    serviceStatusList: {
      type: Array,
      default: () => []
    },
    businessTypeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loadingBtn: false,
      downloadLoading: false,
      form: {
        performanceType: 'HY',
        goodsName: '',
        serviceStatus: '',
        agentCode: '',
        saleName: '',
        company: '',
        productType: '',
        businessType: '',
        operateTimeStart: '',
        operateTimeEnd: '',
        pageNum: 1,
        pageSize: 30
      },
      list: [],
      page: {
        total: 0,
        page: 0,
        limit: 30
      },
      date: '',
      defaultTime: ['00:00:00', '23:59:59'],
      props: {
        multiple: true
        // checkStrictly: true
      },
      row: {},
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
      },
      dialogEditShow: false,
      orderTypeList: [
        {
          label: '线上',
          value: '线上'
        },
        {
          label: '线下',
          value: '线下'
        }
      ],
      productType: [],
      saleName: [],
      company: []
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading.effects['performance/queryHyDlSalePerformanceData']
    })
  },
  watch: {
    date: function(val) {
      const v = val || ['', '']
      this.form.operateTimeStart = v[0] ? `${v[0]}` : ''
      this.form.operateTimeEnd = v[1] ? `${v[1]}` : ''
    },
    productType: function(val) {
      console.log(val)
      this.form.productType = val.length > 0 ? val.join(',') : ''
    },
    saleName: function(val) {
      console.log(val)
      this.form.saleName = val.length > 0 ? val.join(',') : ''
    },
    company: function(val) {
      console.log(val)
      this.form.company = val.length > 0 ? val.join(',') : ''
    }
  },
  created() {
    this.resetDate()
  },
  mounted() {
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    ...mapActions('performance', ['queryHyDlSalePerformanceData']),
    checkPermission,
    resetDate() {
      const dt1 = new Date()
      dt1.setDate(dt1.getDate() - 90) // 默认为最近90天
      const dt2 = new Date()
      this.date = [
        this.$moment(dt1).format('YYYY-MM-DD HH:mm:ss'),
        this.$moment(dt2).format('YYYY-MM-DD HH:mm:ss')
      ]
    },
    getList(page) {
      console.log(this.form)
      const query = {
        ...this.form
      }
      if (page) {
        query.pageNum = page.page
        query.pageSize = page.limit
      } else {
        query.pageNum = 1
        query.pageSize = this.page.limit
        this.page.page = 1
        // this.page.limit = 20;
      }
      this.queryHyDlSalePerformanceData(query).then((res) => {
        this.list = res.data.list
        this.page.total = res.data.count
      }).catch((error) => {
        this.$message.error('加载失败，请稍后再试或减少查询数据量')
        console.log(error)
      })
    },
    resetModal() {
      clearFormDate(this.form)
      this.resetDate()
      this.productType = []
      this.saleName = []
      this.company = []
      this.form.performanceType = 'HY'
    },
    handleDownload() {
      this.downloadLoading = true
      this.$alert('系统正在导出，稍后请在消息中心查看结果', {
        confirmButtonText: '知道了',
        callback: () => {}
      })
      this.$store.dispatch('performance/exportCsv', this.form).then((res) => {
        this.downloadLoading = false
        if (res.code === 200) {
          // this.$message.success('操作成功！')
        } else {
          this.$message.error(res.msg)
        }
      }).catch((error) => {
        this.downloadLoading = false
        console.log(error)
      })
    },
    handleEdit(row) {
      this.dialogEditShow = true
      this.row = row
      // this.form2.salesmagRemarkFirst = row.salesmagRemarkFirst
      // this.form2.salesmagRemarkSecond = row.salesmagRemarkSecond
      // this.form2.businessTypeRemark = row.businessTypeRemark
      // this.form2.orderTypeRemark = row.orderTypeRemark
    }
  }
}
</script>
<style scoped>

</style>
