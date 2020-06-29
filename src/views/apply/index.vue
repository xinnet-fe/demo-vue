<template>
  <div class="agent-manage-apply">
    <!-- search -->
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="" prop="memberId">
        <el-select v-model="form.type" @change="handleSelectChange">
          <el-option v-for="item in memberType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="keywords">
        <el-input v-model="form.keywords" :placeholder="placeholder" />
      </el-form-item>
      <el-form-item label="申请时间" prop="date">
        <el-date-picker
          v-model="form.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select v-model="form.state">
          <el-option v-for="item in stateType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="default" @click="onSearch">查 询</el-button>
        <!-- <el-button type="primary" @click="resetForm">重 置</el-button> -->
      </el-form-item>
    </el-form>
    <!-- search -->

    <div class="table-section">
      <el-table
        ref="table"
        v-loading="loading"
        tooltip-effect="dark"
        style="width: 100%"
        :data="list"
      >
        <el-table-column
          prop="agentCode"
          label="代理编号"
          width="150"
        />
        <el-table-column
          prop="telenumber"
          label="手机号"
          width="120"
        />
        <el-table-column
          prop="userNameEmail"
          label="邮箱"
        />
        <el-table-column
          prop="organizeNameCn"
          label="联系人"
          show-overflow-tooltip
        />
        <el-table-column
          prop="publicProvinceCn"
          label="省份"
          show-overflow-tooltip
        />
        <el-table-column
          prop="publicCityCn"
          label="城市"
          show-overflow-tooltip
        />
        <el-table-column
          prop="applyDate"
          label="申请时间"
          show-overflow-tooltip
        />
        <el-table-column label="状态" width="100">
          <template v-slot="scope">
            <span v-if="scope.row.state === '01'">未开通</span>
            <span v-if="scope.row.state === '02'">已开通</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150">
          <template v-slot="scope">
            <el-button
              v-if="scope.row.state === '01'"
              size="mini"
              type="text"
              @click="handleOpen(scope.row)"
            >
              开通
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
    <dialog-apply-form v-if="formVisible" :visible.sync="formVisible" :row.sync="row" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import DialogApplyForm from './form'
import Pagination from '@/components/Pagination'
export default {
  name: 'AgentManageApply',
  components: {
    DialogApplyForm,
    Pagination
  },
  data() {
    return {
      formVisible: false,
      row: {},
      placeholder: '请输入关键字',
      form: {
        type: 'agentCode',
        date: '',
        keywords: '',
        state: '01'
      },
      list: [],
      page: {
        total: 0,
        page: 0,
        limit: 20
      },
      memberType: [
        { label: '代理编号', value: 'agentCode' },
        { label: '手机号', value: 'telenumber' },
        { label: '邮箱', value: 'userNameEmail' },
        { label: '联系人', value: 'organizeNameCn' }
      ],
      stateType: [
        { label: '全部', value: '' },
        { label: '未开通', value: '01' },
        { label: '已开通', value: '02' },
        { label: '已锁定', value: '03' },
        { label: '已关闭', value: '04' }
      ]
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['userManager/findDlApply']
    })
  },
  methods: {
    ...mapActions('userManager', ['findDlApply']),
    handleSelectChange(v) {
      console.log(v)
    },
    onSearch(page) {
      console.log(this.form.date)
      const query = {
        agentCode: this.form.type === 'agentCode' ? this.form.keywords : '',
        telenumber: this.form.type === 'telenumber' ? this.form.keywords : '',
        userNameEmail: this.form.type === 'userNameEmail' ? this.form.keywords : '',
        organizeNameCn: this.form.type === 'organizeNameCn' ? this.form.keywords : '',
        pageNum: '',
        state: this.form.state,
        startDate: this.form.date && this.form.date[0] ? `${this.form.date[0]} 00.00.00` : '',
        endDate: this.form.date && this.form.date[1] ? `${this.form.date[1]} 23.59.59` : ''
      }

      if (page) {
        query.pageIndex = page.page
        query.pageSize = page.limit
      } else {
        query.pageIndex = 1
        query.pageSize = 20
        this.page.limit = 20
        this.page.page = 1
      }
      this.findDlApply(query).then(res => {
        if (!res.code) {
          console.log(res)
          this.list = res.data.list
          this.page.total = res.data.count
        }
      }).catch(error => {
      })
    },
    handleOpen(row) {
      this.formVisible = true
      this.row = row
    },
    resetForm() {
      const { form } = this.$refs
      form.resetFields()
      form.clearValidate('form')
    }
  },
  mounted(){
    this.onSearch(1)
  }
}
</script>

<style lang="scss" scoped>
.agent-manage-apply {
  margin: 20px;
}
</style>
