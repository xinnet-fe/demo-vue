<template>
  <div class="agent-manage-apply">
    <!-- search -->
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="会员编号" prop="type">
        <el-select v-model="form.type" @change="handleSelectChange">
          <el-option v-for="item in memberType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="keywords">
        <el-input v-model="form.keywords" :placeholder="placeholder" />
      </el-form-item>
      <el-form-item label="申请时间" prop="registerDate">
        <el-date-picker
          v-model="form.registerDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="绑定时间" prop="bindingDate">
        <el-date-picker
          v-model="form.bindingDate"
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
          prop="customerCode"
          label="用户ID"
        />
        <el-table-column
          prop="realName"
          label="实名信息"
        />
        <el-table-column
          prop="registerTime"
          label="注册时间"
        />
        <el-table-column
          prop="agentCode"
          label="绑定代理商"
          show-overflow-tooltip
        />
        <el-table-column
          prop="createTime"
          label="绑定时间"
          show-overflow-tooltip
        />
        <el-table-column label="状态" width="100">
          <template v-slot="scope">
            <span v-if="scope.row.bindStatus === '1'">已绑定</span>
            <span v-if="scope.row.bindStatus === '0'">未绑定</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150">
          <template v-slot="scope">
            <el-popconfirm
              title="确定解绑吗？"
              v-if="scope.row.bindStatus === '1'"
              @onConfirm="unbind(scope.row)"
            >
              <el-button slot="reference" size="mini" type="text">
                解绑
              </el-button>
            </el-popconfirm>
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

export default {
  name: 'AgentManageClient',
  components: {
    Pagination
  },
  data() {
    return {
      formVisible: false,
      row: {},
      placeholder: '请输入关键字',
      form: {
        type: 'agentCode',
        keywords: '',
        registerDate: '',
        bindingDate: '',
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
        { label: '会员编号', value: 'hyCode' },
        { label: '邮箱', value: 'userEmail' }
      ],
      stateType: [
        { label: '全部', value: '' },
        { label: '已绑定', value: 1 },
        { label: '未绑定', value: 0 }
      ]
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['userManager/queryAgentCustomerList']
    })
  },
  mounted() {
    this.onSearch()
  },
  methods: {
    ...mapActions('userManager', ['queryAgentCustomerList', 'unBund']),
    handleSelectChange(v) {
      // console.log(v)
    },
    onSearch(page) {
      const query = {
        hyCode: this.form.type === 'hyCode' ? this.form.keywords : '',
        userEmail: this.form.type === 'userEmail' ? this.form.keywords : '',
        agentCode: this.form.type === 'agentCode' ? this.form.keywords : '',
        bindStatus: this.form.state,
        registerStartTime: this.form.registerDate[0] ? `${this.form.registerDate[0]} 00.00.00` : '',
        registerEndTime: this.form.registerDate[1] ? `${this.form.registerDate[1]} 23.59.59` : '',
        bindStartTime: this.form.bindingDate[0] ? `${this.form.bindingDate[0]} 00.00.00` : '',
        bindEndTime: this.form.bindingDate[1] ? `${this.form.bindingDate[1]} 23.59.59` : ''
      }
      if (page) {
        query.pageIndex = page.page
      } else {
        query.pageIndex = 1
      }
      this.queryAgentCustomerList(query).then(res => {
        if (!res.code) {
          this.list = res.data.list
          this.page.total = res.data.count
        }
      }).catch(error => {})
    },
    resetForm() {
      const { form } = this.$refs
      form.resetFields()
      form.clearValidate('form')
    },
    unbind(row) {
      this.unBund({ agentCode: row.agentCode, customerCode: row.customerCode }).then(res => {
        if (!res.code) {
          if (res.data.isSuccess === '1') {
            this.$message.success('操作成功！')
            this.onSearch()
          } else {
            this.$message.error('操作失败！')
          }
        } else {
          this.$message.error(res.msg)
        }
      }).catch(error => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.agent-manage-apply {
  margin: 20px;
}
</style>
