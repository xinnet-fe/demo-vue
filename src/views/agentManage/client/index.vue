<template>
  <div class="agent-manage-apply">
    <!-- search -->
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="会员编号" prop="id">
        <el-select v-model="form.id" @change="handleSelectChange">
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
        />
      </el-form-item>
      <el-form-item label="绑定时间" prop="bindingDate">
        <el-date-picker
          v-model="form.bindingDate"
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
          prop="id"
          label="用户ID"
        />
        <el-table-column
          prop="info"
          label="实名信息"
        />
        <el-table-column
          prop="registerDate"
          label="注册时间"
        />
        <el-table-column
          prop="agent"
          label="绑定代理商"
          show-overflow-tooltip
        />
        <el-table-column
          prop="bindingDate"
          label="绑定时间"
          show-overflow-tooltip
        />
        <el-table-column label="状态" width="100">
          <template v-slot="scope">
            <span v-if="scope.row.state === 0">未开通</span>
            <span v-if="scope.row.state === 1">已开通</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150">
          <template v-slot="scope">
            <el-popconfirm
              title="确定解绑吗？"
              @onConfirm="unbind(scope.row)"
            >
              <el-button slot="reference" size="mini" type="danger">
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
        id: '',
        info: '',
        registerDate: '',
        bindingDate: '',
        agent: '',
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
        { label: '会员编号', value: 'xinnetCode' }
      ],
      stateType: [
        { label: '未开通', value: 0 },
        { label: '已开通', value: 1 }
      ]
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['agentManage/getClientList']
    })
  },
  mounted() {
    this.onSearch(1)
  },
  methods: {
    ...mapActions('agentManage', ['getClientList']),
    handleSelectChange(v) {
      // console.log(v)
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
      this.getClientList(query).then(res => {
        this.list = res.data
        this.page = res.page
      })
    },
    resetForm() {
      const { form } = this.$refs
      form.resetFields()
      form.clearValidate('form')
    },
    unbind() {}
  }
}
</script>

<style lang="scss" scoped>
.agent-manage-apply {
  margin: 20px;
}
</style>
