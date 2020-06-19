<template>
  <div class="agent-manage-apply">
    <!-- search -->
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="会员ID" prop="memberId">
        <el-select v-model="form.memberId" @change="handleSelectChange">
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
        />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select v-model="form.state">
          <el-option v-for="item in stateType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSearch">查 询</el-button>
        <!-- <el-button type="primary" @click="resetForm">重 置</el-button> -->
      </el-form-item>
    </el-form>
    <!-- search -->

    <div class="table-section">
      <el-table
        ref="table"
        v-loading="loading"
        border
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
              type="primary"
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
    <dialog-apply-form :visible.sync="formVisible" :row.sync="row" />
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
      placeholder: '',
      form: {
        agentCode: '',
        telenumber: '',
        userNameEmail: '',
        organizeNameCn: '',
        startDate: '',
        endDate: '',
        pageNum: '',
        state: ''
      },
      list: [],
      page: {
        total: 0,
        page: 0,
        limit: 20
      },
      memberType: [
        { label: '代理编号', value: 'agentCode' },
        { label: '手机号', value: 'phone' },
        { label: '邮箱', value: 'email' },
        { label: '联系人', value: 'contacts' }
      ],
      stateType: [
        { label: '未开通', value: 0 },
        { label: '已开通', value: 1 }
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
      const query = {
        ...this.form
      }
      if (page) {
        query.pageNum = page.page
      } else {
        query.pageNum = 1
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
