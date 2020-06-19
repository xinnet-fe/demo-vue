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
      <el-button type="warning" size="mini" @click="showModal('businessModalVisible')">业务归属</el-button>
      <el-button type="warning" size="mini" @click="showModal('financeModalVisible')">财务归属</el-button>
      <el-button type="warning" size="mini" @click="showModal('levelModalVisible')">修改级别</el-button>
    </div>

    <div class="table-section">
      <el-table
        ref="table"
        v-loading="loading"
        border
        tooltip-effect="dark"
        style="width: 100%"
        :data="list"
        @selection-change="handleSelectionChange"
      >
        <el-table-column fixed type="selection" width="55" />
        <el-table-column
          prop="agentCode"
          label="代理编号"
        />
        <el-table-column
          prop="organizeNameCn"
          label="渠道名称"
        />
        <el-table-column
          prop="startDate"
          label="开通时间"
        />
        <el-table-column
          prop="organName"
          label="所属分公司"
          show-overflow-tooltip
        />
        <el-table-column
          prop="financeName"
          label="财务归属"
          show-overflow-tooltip
        />
        <el-table-column
          prop="saleName"
          label="绑定销售"
          show-overflow-tooltip
        />
        <el-table-column
          prop="gradeName"
          label="级别"
          show-overflow-tooltip
        />
        <el-table-column label="状态" width="100">
          <template v-slot="scope">
            <span v-if="scope.row.state === '01'">未开通</span>
            <span v-if="scope.row.state === '02'">已开通</span>
            <span v-if="scope.row.state === '03'">已冻结</span>
            <span v-if="scope.row.state === '04'">已关闭</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="180">
          <template v-slot="scope">
            <el-button size="mini" type="primary" @click="showDetailModal(scope.row)">
              详情
            </el-button>
            <el-button size="mini" type="primary" @click="showAccountModal(scope.row)">
              修改账号
            </el-button>
            <el-popconfirm
              title="确定终止吗？"
              v-if="scope.row.state !== '04'"
              @onConfirm="stop(scope.row)"
            >
              <el-button slot="reference" size="mini" type="warning">
                终止
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
    <dialog-detail v-if="detailModalVisible" :visible.sync="detailModalVisible" :row.sync="row" />
    <dialog-business-form v-if="businessModalVisible" :visible.sync="businessModalVisible" :selected="multipleSelection" />
    <dialog-finance-form :visible.sync="financeModalVisible" :selected="multipleSelection" />
    <dialog-level-form :visible.sync="levelModalVisible" :selected="multipleSelection" />
    <dialog-account-form v-if="accountModalVisible" :visible.sync="accountModalVisible" :row.sync="row" @onSearch = "onSearch" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import assign from 'lodash/assign'
import DialogDetail from './detail'
import DialogBusinessForm from './businessForm'
import DialogFinanceForm from './financeForm'
import DialogLevelForm from './levelForm'
import DialogAccountForm from './accountForm'
import Pagination from '@/components/Pagination'
export default {
  name: 'AgentManageInfo',
  components: {
    DialogDetail,
    DialogBusinessForm,
    DialogFinanceForm,
    DialogLevelForm,
    DialogAccountForm,
    Pagination
  },
  data() {
    return {
      detailModalVisible: false,
      businessModalVisible: false,
      financeModalVisible: false,
      levelModalVisible: false,
      accountModalVisible: false,
      row: {},
      // table中复选框选中值
      multipleSelection: [],
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
      ],
      companyOptions: [
        { label: '第一份公司', value: 'one' },
        { label: '第二分公司', value: 'two' }
      ],
      marketOptions: [
        { label: '复兴', value: 'fuxing' },
        { label: '王伟', value: 'wangwei' }
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
  computed: {
    ...mapState({
      loading: state => state.loading.effects['userManager/findDlInfo'],
      loading: state => state.loading.effects['userManager/breakInfomation']
    })
  },
  methods: {
    ...mapActions('userManager', ['findDlInfo', 'breakInfomation']),
    onSearch(page) {
      const query = {
        ...this.form
      }
      if (page) {
        query.pageNum = page.page
      } else {
        query.pageNum = 1
      }
      this.findDlInfo(query).then(res => {
        if (!res.code) {
          this.list = res.data.list
          this.page.total = res.data.count
        }
      }).catch(error => {})
    },
    resetForm() {
      const { searchForm } = this.$refs
      searchForm.resetFields()
      searchForm.clearValidate('searchForm')
    },
    showDetailModal(row) {
      this.detailModalVisible = true
      this.row = row
    },
    showAccountModal(row) {
      this.accountModalVisible = true
      this.row = row
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    convertIdToName(row, item) {
      const options = this.$parent[`${item}Options`]
      const option = find(options, { value: row[item] })
      return option.label
    },
    stop(row) {
      console.log(row)
      this.breakInfomation({ agentCode: row.agentCode }).then(res => {
        if (!res.code) {
          if (res.data.isSuccess === '1') {
            this.$message.success('操作成功！')
            this.onSearch()
          } else {
            this.$message.error(res.msg)
          }
        } else {
          this.$message.error(res.msg)
        }
      }).catch(error => {})
    },
    showModal(modalVisible) {
      const selected = this.multipleSelection
      if (selected.length) {
        // console.log(selected)
        this[modalVisible] = true
      } else {
        this.$message.warning('请选择代理商！')
      }
    }
  },
  mounted() {
    this.onSearch(1)
    // 获取级别数据

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
