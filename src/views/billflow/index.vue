<template>
  <div class="order-form">
    <!-- search -->
    <el-form ref="form" :model="form" :inline="true" class="search-form">
      <el-form-item label="用户编号">
        <el-input v-model="form.agentCode" placeholder="" :clearable="true" />
      </el-form-item>
      <el-form-item label="交易类型">
        <el-select v-model="form.transactionType">
          <el-option v-for="item in transactionType" :key="item.transactionType" :label="item.transactionName" :value="item.transactionType" />
        </el-select>
      </el-form-item>
      <el-form-item label="交易时间">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" size="medium" @click="onSearch()">查 询</el-button>
        <el-button size="medium" @click="resetForm">重 置</el-button>
      </el-form-item>
    </el-form>
    <!-- search -->

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
          label="用户编号"
          width="150"
        />
        <el-table-column
          prop="transactionName"
          label="交易类型"
        />
        <el-table-column
          prop="money"
          label="交易金额"
        />
        <el-table-column
          prop="balance"
          label="余额"
        />
        <el-table-column
          prop="operateTime"
          label="交易时间"
        />
        <el-table-column label="账单号" fixed="right" width="180">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleEdit(scope.row)"
            >
              {{ scope.row.orderCode }}
            </el-button>
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
    <dialog-bill-form v-if="formVisible" :visible.sync="formVisible" :row.sync="row" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import DialogBillForm from './form'
import Pagination from '@/components/Pagination'
import clearFormDate from '@/utils/clearFormData'
export default {
  name: 'BillFlow',
  components: {
    DialogBillForm,
    Pagination
  },
  data() {
    return {
      formVisible: false,
      row: {},
      placeholder: '请输入关键字',
      date: '',
      form: {
        agentCode: '',
        startDate: '',
        endDate: '',
        transactionType: '',
        pageSkip: 1,
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
      ]
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['accountDetail/list']
    })
  },
  watch: {
    date: function(val) {
      const v = val || ['', '']
      this.form.startDate = v[0] ? v[0] : ''
      this.form.endDate = v[1] ? v[1] : ''
    }
  },
  mounted() {
    this.getTransactionType().then(res => {
      if (!res.code) {
        this.transactionType = this.transactionType.concat(res)
      }
    }).catch(error => {
      console.log(error)
    })
    // this.onSearch()
  },
  methods: {
    ...mapActions('accountDetail', ['list', 'getTransactionType']),
    handleSelectChange(v) {
      console.log(v)
    },
    onSearch(page) {
      console.log("--------")
      console.log(this.form)
      if (!this.form.agentCode.length) {
        this.$message({
          message: '请填写用户编号！',
          type: 'warning'
        });
        return false
      }
      console.log("**********")
      console.log(this.form)
      console.log("**********")
      const query = {
        agentCode: this.form.agentCode,
        startDate: this.form.startDate,
        endDate: this.form.endDate,
        transactionType: this.form.transactionType,
        pageSkip: 1,
        pageSize: 20
      }

      if (page) {
        query.pageSkip = page.page
        query.pageSize = page.limit
      } else {
        query.pageSkip = 1
        query.pageSize = 20
        this.page.limit = 20
        this.page.page = 1
      }
      this.list(query).then(res => {
        if (!res.code) {
          console.log(res)
          this.listTable = res.pageInfo.list
          this.page.total = res.pageInfo.total
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
      this.date = ''
    }
  }
}
</script>
