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
          @click="getList"
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
      <el-table-column label="订单号" prop="buyOrderCode" />
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
          <span>￥{{ row.businessType }}</span>
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
    <el-dialog
      title="编辑"
      :visible.sync="dialogEditShow"
      width="500px"
    >
      <el-form v-if="dialogEditShow" ref="formEdit" :model="form2" :rules="rules" label-width="120px">
        <el-form-item label="销售负责人1:" prop="salesmagFirst">
          <el-select
            v-model="form2.salesmagFirst"
            placeholder="请选择"
            clearable
            @focus="handleFocus(1)"
          >
            <el-option
              v-for="item in saleNameList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="mark1" label="备注:" prop="salesmagRemarkFirst">
          <el-input v-model="form2.salesmagRemarkFirst" maxlength="30" />
          <span class="operateUser">操作人：{{ name }}</span>
        </el-form-item>
        <el-form-item label="订单方式:" prop="businessType">
          <el-select
            v-model="form2.businessType"
            placeholder="请选择"
            clearable
            @focus="handleFocus(2)"
          >
            <el-option
              v-for="item in businessTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="mark2" label="备注:" prop="businessTypeRemark">
          <el-input v-model="form2.businessTypeRemark" maxlength="30" />
          <span class="operateUser">操作人：{{ name }}</span>
        </el-form-item>
        <el-form-item label="销售负责人2:" prop="salesmagSecond">
          <el-select
            v-model="form2.salesmagSecond"
            placeholder="请选择"
            clearable
            @focus="handleFocus(3)"
          >
            <el-option
              v-for="item in saleNameList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="mark3" label="备注:" prop="salesmagRemarkSecond">
          <el-input v-model="form2.salesmagRemarkSecond" maxlength="30" />
          <span class="operateUser">操作人：{{ name }}</span>
        </el-form-item>
        <el-form-item label="成单类型:" prop="orderType">
          <el-select
            v-model="form2.orderType"
            placeholder="请选择"
            clearable
            @focus="handleFocus(4)"
          >
            <el-option
              v-for="item in orderTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="mark4" label="备注:" prop="orderTypeRemark">
          <el-input v-model="form2.orderTypeRemark" maxlength="30" />
          <span class="operateUser">操作人：{{ name }}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditShow = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="loadingBtn"
          @click="dialogSubmit()"
        >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Pagination from '@/components/demos/Pagination' // secondary package based on el-pagination
import clearFormDate from '@/utils/clearFormData'
import checkPermission from '@/utils/demos/permission' // 权限判断函数
export default {
  name: 'AchievementHy',
  components: { Pagination },
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
      form2: {
        id: '',
        salesmagFirst: '',
        salesmagRemarkFirst: '',
        businessType: '',
        salesmagSecond: '',
        salesmagRemarkSecond: '',
        businessTypeRemark: '',
        orderType: '',
        orderTypeRemark: ''
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
      rules: {
        salesmagFirst: [{ required: true, message: '请选择', trigger: 'change' }],
        businessType: [{ required: true, message: '请选择', trigger: 'change' }],
        salesmagSecond: [{ required: true, message: '请选择', trigger: 'change' }],
        orderType: [{ required: true, message: '请选择', trigger: 'change' }],
        salesmagRemarkFirst: [{ required: true, message: '请输入', trigger: 'blur' }],
        salesmagRemarkSecond: [{ required: true, message: '请输入', trigger: 'blur' }],
        businessTypeRemark: [{ required: true, message: '请输入', trigger: 'blur' }],
        orderTypeRemark: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
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
      company: [],
      mark1: false,
      mark2: false,
      mark3: false,
      mark4: false
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading.effects['performance/queryHyDlSalePerformanceData']
    }),
    ...mapGetters(['name'])
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
    handleFocus(v) {
      this['mark' + v] = true
    },
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
        // query.pageSize = 30;
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
    dialogSubmit() {
      this.$refs.formEdit.validate((valid) => {
        if (valid) {
          this.loadingBtn = true
          const query = {
            ...this.form2
          }
          query.id = this.row.id
          console.log(query)
          this.$store.dispatch('performance/updatePerformance', query).then((res) => {
            this.loadingBtn = false
            if (res.code === 200) {
              this.$message.success('操作成功！')
              this.closeDialog()
              this.getList()
            } else {
              this.$message.error(res.msg)
            }
          }).catch((error) => {
            this.loadingBtn = false
            console.log(error)
          })
        } else {
          console.log(2)
        }
      })
    },
    closeDialog() {
      this.dialogEditShow = false
    },
    handleEdit(row) {
      this.dialogEditShow = true
      this.row = row
      this.form2.salesmagFirst = row.salesmagFirst
      this.form2.businessType = row.businessType
      this.form2.salesmagSecond = row.salesmagSecond
      this.form2.orderType = row.orderType

      // this.form2.salesmagRemarkFirst = row.salesmagRemarkFirst
      // this.form2.salesmagRemarkSecond = row.salesmagRemarkSecond
      // this.form2.businessTypeRemark = row.businessTypeRemark
      // this.form2.orderTypeRemark = row.orderTypeRemark
    }
  }
}
</script>
<style scoped>
  .operateUser{
    font-size: 12px;
  }
</style>
