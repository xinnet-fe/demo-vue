<template>
  <div class="agent-manage-apply">
    <!-- search -->
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="会员ID" prop="memberId">
        <el-select v-model="form.memberId">
          <el-option v-for="item in memberType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
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
        <el-button type="primary" @click="onSearch">查 询</el-button>
        <!-- <el-button type="primary" @click="resetForm">重 置</el-button> -->
      </el-form-item>
    </el-form>
    <!-- search -->

    <!-- table -->
    <el-table
      ref="table"
      border
      tooltip-effect="dark"
      style="width: 100%"
      :data="list"
    >
      <el-table-column
        prop="agentCode"
        label="代理编号"
      />
      <el-table-column
        prop="phone"
        label="手机号"
        width="120"
      />
      <el-table-column
        prop="email"
        label="邮箱"
      />
      <el-table-column
        prop="contacts"
        label="联系人"
        show-overflow-tooltip
      />
      <el-table-column
        prop="province"
        label="省份"
        show-overflow-tooltip
      />
      <el-table-column
        prop="city"
        label="城市"
        show-overflow-tooltip
      />
      <el-table-column
        prop="applyTime"
        label="申请时间"
        show-overflow-tooltip
      />
      <el-table-column
        prop="state"
        label="状态"
        show-overflow-tooltip
      />
      <el-table-column label="操作" fixed="right">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="primary"
            @click="showModal(scope.row)"
          >
            开通
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <pagination
      :total="page.total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="getList"
    /> -->
    <!-- table -->
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'AgentManageApply',
  components: {
  },
  data() {
    return {
      form: {
        memberId: '',
        date: '',
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
      ],
      list: []
    }
  },
  methods: {
    ...mapActions('agentManage', ['getApplyList']),
    onSearch(formName) {
      this.getApplyList(this.form)
    },
    resetForm(formName) {
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
