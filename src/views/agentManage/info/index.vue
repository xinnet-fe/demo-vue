<template>
  <div class="agent-manage-apply">
    <!-- search -->
    <el-form ref="searchForm" :model="searchForm" :inline="true">
      <el-form-item label="会员ID" prop="memberId">
        <el-select v-model="searchForm.memberId">
          <el-option v-for="item in memberType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="keywords">
        <el-input v-model="searchForm.keywords" placeholder="请输入关键词" />
      </el-form-item>
      <el-form-item label="开通时间" prop="date">
        <el-date-picker
          v-model="searchForm.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select v-model="searchForm.state">
          <el-option v-for="item in stateType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="所属分公司" prop="company">
        <el-select v-model="searchForm.company">
          <el-option v-for="item in companyOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="业务归属" prop="business">
        <el-select v-model="searchForm.business">
          <el-option v-for="item in businessOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="财务归属" prop="finance">
        <el-select v-model="searchForm.finance">
          <el-option v-for="item in financeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="级别" prop="level">
        <el-select v-model="searchForm.level">
          <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查 询</el-button>
        <el-button type="primary" @click="resetForm">重 置</el-button>
      </el-form-item>
    </el-form>
    <!-- search -->

    <div class="mult-operation">
      <el-button type="warning" size="mini" @click="onSearch">业务归属</el-button>
      <el-button type="warning" size="mini" @click="resetForm">财务归属</el-button>
      <el-button type="warning" size="mini" @click="resetForm">修改级别</el-button>
    </div>

    <info-table :visible.sync="formVisible" :row.sync="row" />
    <dialog-info-detail :visible.sync="formVisible" :row.sync="row" />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import assign from 'lodash/assign'
import InfoTable from './table'
import DialogInfoDetail from './detail'

export default {
  name: 'AgentManageInfo',
  components: {
    InfoTable,
    DialogInfoDetail
  },
  data() {
    return {
      formVisible: false,
      row: {},
      searchForm: {
        memberId: '',
        keywords: '',
        date: '',
        state: '',
        company: '',
        business: '',
        finance: '',
        level: ''
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
      ],
      companyOptions: [
        { label: '第一份公司', value: 'one' },
        { label: '第二分公司', value: 'two' }
      ],
      businessOptions: [
        { label: '业务1', value: 'one' },
        { label: '业务2', value: 'two' }
      ],
      financeOptions: [
        { label: '北京总部', value: 'beijing' },
        { label: '上海分部', value: 'shanghai' }
      ],
      levelOptions: [
        { label: '普通代理', value: 'putong' },
        { label: '白金代理', value: 'baijin' }
      ]
    }
  },
  methods: {
    ...mapActions('agentManage', ['getInfoList']),
    onSearch(page) {
      const query = {
        ...this.searchForm
      }
      if (page) {
        assign(query, page)
      }
      this.getInfoList(query)
    },
    resetForm() {
      const { searchForm } = this.$refs
      searchForm.resetFields()
      searchForm.clearValidate('searchForm')
    }
  }
}
</script>

<style lang="scss" scoped>
.agent-manage-apply {
  margin: 20px;

  .mult-operation {
    margin: 10px auto;
    text-align: right;
  }
}
</style>
