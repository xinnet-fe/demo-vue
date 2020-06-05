<template>
  <div class="agent-manage-apply">
    <!-- search -->
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="会员ID" prop="memberId">
        <el-select v-model="form.memberId">
          <el-option v-for="item in memberType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="keywords">
        <el-input v-model="form.keywords" placeholder="请输入关键词" />
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

    <apply-table :visible.sync="formVisible" :row.sync="row" />
    <dialog-apply-form :visible.sync="formVisible" :row.sync="row" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import assign from 'lodash/assign'
import ApplyTable from './table'
import DialogApplyForm from './form'

export default {
  name: 'AgentManageApply',
  components: {
    ApplyTable,
    DialogApplyForm
  },
  data() {
    return {
      formVisible: false,
      row: {},
      form: {
        memberId: '',
        date: '',
        keywords: '',
        state: 0
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
      loading: state => state.loading.effects['agentManage/getApplyList']
    })
  },
  methods: {
    ...mapActions('agentManage', ['getApplyList']),
    onSearch(page) {
      const query = {
        ...this.form
      }
      if (page) {
        assign(query, page)
      }
      this.getApplyList(query)
    },
    resetForm() {
      const { form } = this.$refs
      form.resetFields()
      form.clearValidate('form')
    }
  }
}
</script>

<style lang="scss" scoped>
.agent-manage-apply {
  margin: 20px;
}
</style>
