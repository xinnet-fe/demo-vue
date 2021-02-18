<template>
  <div class="order-form">
    <!-- search -->
    <el-form ref="form" :model="form" :inline="true" class="search-form">
      <el-form-item label="用户ID">
        <el-input v-model="form.agentCode" placeholder="" :clearable="true" maxlength="30" @input="handleAgentCodeClick" />
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="form.consumerType">
          <el-option v-for="item in consumerTypeList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="复核状态">
        <el-select v-model="form.checkState">
          <el-option v-for="item in checkStateList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="收款方式">
        <el-select v-model="form.gatheringModeCode">
          <el-option v-for="item in gatheringModeCodeList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="交易号">
        <el-input v-model="form.billNumber" placeholder="" :clearable="true" maxlength="30" @input="handleBillNumberClick" />
      </el-form-item>
      <el-form-item label="充值日期">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
        />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" size="medium" @click="onSearch()">查 询</el-button>
        <el-button size="medium" @click="resetForm">重 置</el-button>
      </el-form-item>
    </el-form>
    <!-- search -->
    <!-- operate -->
    <el-form ref="operateForm" class="operate-form" :inline="true">
      <el-form-item>
        <el-button size="mini" :loading="downloadLoading" @click="handleDownload">导出</el-button>
      </el-form-item>
    </el-form>
    <!-- operate -->
    <div class="table-section">
      <el-table
        ref="table"
        v-loading="loading"
        tooltip-effect="dark"
        style="width: 100%"
        :data="listTable"
      >
        <el-table-column
          prop="agentCode"
          label="用户ID"
          width="150"
        />
        <el-table-column
          prop="organizeNameCn"
          label="用户名称"
        />
        <el-table-column
          prop="billNumber"
          label="交易号"
        />
        <el-table-column
          prop="gatheringmode"
          label="收款方式"
        />
        <el-table-column
          prop="pay"
          label="金额"
        >
          <template v-slot="scope">
            {{ scope.row.pay.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="orgName"
          label="收款公司"
        />
        <el-table-column
          prop="saleName"
          label="销售人员"
        />
        <el-table-column
          prop="checkName"
          label="复核人员"
        />
        <el-table-column
          prop="checkTime"
          label="充值到账时间"
        />
        <el-table-column
          label="复核状态"
        >
          <template v-slot="scope">
            {{ checkStateText(scope.row.checkState) }}
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="page.total"
        :page.sync="page.page"
        :limit.sync="page.limit"
        @pagination="onSearch"
      />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import clearFormDate from '@/utils/clearFormData'
import querystring from 'querystring'
export default {
  name: 'BillFlow',
  components: {
    Pagination
  },
  data() {
    return {
      formVisible: false,
      row: {},
      placeholder: '请输入关键字',
      date: '',
      downloadLoading: false,
      form: {
        agentCode: '',
        consumerType: '',
        checkState: '',
        gatheringModeCode: '',
        billNumber: '',
        startDate: '',
        endDate: '',
        ipage: 1,
        pageSize: 20
      },
      listTable: [],
      page: {
        total: 0,
        page: 0,
        limit: 20
      },
      transactionType: [
        {
          transactionName: '全部',
          transactionType: ''
        }
      ],
      consumerTypeList: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '会员',
          value: 'HY'
        },
        {
          label: '代理',
          value: 'DL'
        }
      ],
      checkStateList: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '未复核',
          value: '01'
        },
        {
          label: '复核通过',
          value: '02'
        },
        {
          label: '复核未通过',
          value: '03'
        }
      ],
      gatheringModeCodeList: [
        {
          label: '全部',
          value: ''
        }
      ],
      choiceDate: '',
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.choiceDate = minDate.getTime();
          if (maxDate) {
            this.choiceDate = "";
          }
        },
        disabledDate: (time) => {
          if (this.choiceDate !== "") {
            let one = 90 * 24 * 3600 * 1000;
            const minTime = this.choiceDate - one;
            const maxTime = this.choiceDate + one;
            return time.getTime() < minTime || time.getTime() > maxTime;
          }
        },
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['recharge/gatheringDetailPage']
    })
  },
  watch: {
    date: function(val) {
      const v = val || ['', '']
      this.form.startDate = v[0] ? v[0] : ''
      this.form.endDate = v[1] ? v[1] : ''
    }
  },
  created() {
    this.resetDate()
    this.handleGetGatheringModes()
  },
  mounted() {
    this.$nextTick(()=>{
      this.onSearch()
    })
  },
  methods: {
    ...mapActions('recharge', ['gatheringDetailPage', 'getGatheringModes']),
    handleAgentCodeClick() {
      this.form.agentCode = this.form.agentCode.replace(/[\W]/g,'')
    },
    handleBillNumberClick() {
      this.form.billNumber = this.form.billNumber.replace(/[\W]/g,'')
    },
    checkStateText(type) {
      const text = this.checkStateList.filter((v) => {
        return v.value === type
      })
      return text[0].label
    },
    resetDate() {
      let dt1 = new Date()
      dt1.setDate(dt1.getDate() - 90) // 默认为最近90天
      let dt2 = new Date()
      this.date = [
        this.$moment(dt1).format('YYYY-MM-DD'),
        this.$moment(dt2).format('YYYY-MM-DD')
      ]
    },
    onSearch(page) {
      const query = {
        ...this.form
      }

      if (page) {
        query.ipage = page.page
        query.pageSize = page.limit
      } else {
        query.ipage = 1
        query.pageSize = 10
        this.page.limit = 10
        this.page.page = 1
      }
      this.gatheringDetailPage(query).then(res => {
        if (res.code === 'success') {
          console.log(res)
          this.listTable = res.pageData.list
          this.page.total = res.pageData.total
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleGetGatheringModes() {
      this.getGatheringModes({}).then(res => {
        if (res.code === 'success') {
          console.log(res)
          res.modes.map((v)=>{
            let item = {}
            item.label = v.gatheringmode
            item.value = v.gatheringmodeCode
            this.gatheringModeCodeList.push(item)
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleEdit(row) {
      this.formVisible = true
      this.row = row
    },
    resetForm() {
      clearFormDate(this.form)
      this.resetDate()
    },
    handleDownload() {
      // this.downloadLoading = true
      window.open('/recharge/exportGatheringDetail?' + querystring.stringify(this.form))
    }
  }
}
</script>
