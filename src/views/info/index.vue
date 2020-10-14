<template>
  <div class="order-form agent-manage-apply">
    <!-- search -->
    <el-form ref="searchForm" :model="searchForm" :inline="true" class="search-form">
      <el-form-item label="" prop="type">
        <el-select v-model="searchForm.type">
          <el-option v-for="item in memberType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="关键词" prop="keywords">
        <el-input v-model="searchForm.keywords" placeholder="请输入关键词" :clearable="true" />
      </el-form-item>
      <el-form-item label="开通时间" prop="date">
        <el-date-picker
          v-model="searchForm.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select v-model="searchForm.state">
          <el-option v-for="item in stateType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="所属分公司" prop="organCode">
        <el-cascader
          v-model="searchForm.selectedOptions"
          :clearable="true"
          :change-on-select="true"
          :options="queryOrganSaleList"
        />
      </el-form-item>
      <el-form-item label="财务归属" prop="financeCode">
        <el-select v-model="searchForm.financeCode">
          <el-option v-for="item in queryFinanclAttrList" :key="item.financeCode" :label="item.financeName" :value="item.financeCode" />
        </el-select>
      </el-form-item>
      <el-form-item label="级别" prop="gradeCode">
        <el-select v-model="searchForm.gradeCode">
          <el-option v-for="item in allGrade" :key="item.id" :label="item.gradeName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" size="medium" @click="onSearch()">查 询</el-button>
        <!-- <el-button type="primary" @click="resetForm">重 置</el-button> -->
      </el-form-item>
    </el-form>
    <!-- search -->
    <!-- operate -->
    <el-form ref="operateForm" class="operate-form" :inline="true">
      <el-form-item>
        <el-button type="default" size="mini" @click="showModal('businessModalVisible')">业务归属</el-button>
        <el-button type="default" size="mini" @click="showModal('financeModalVisible')">财务归属</el-button>
        <el-button type="default" size="mini" @click="showModal('levelModalVisible')">修改级别</el-button>
      </el-form-item>
    </el-form>
    <!-- operate -->
    <div class="table-section">
      <el-table
        ref="table"
        v-loading="loading"
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
            <el-button size="mini" type="text" @click="showDetailModal(scope.row)">
              详情
            </el-button>
            <el-button size="mini" type="text" @click="showAccountModal(scope.row)">修改账号</el-button>
            <el-popconfirm
              v-if="scope.row.state !== '04'"
              title="确定终止吗？"
              @onConfirm="stop(scope.row)"
            >
              <el-button slot="reference" style="margin-left:10px" size="mini" type="text">
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
    <dialog-account-form v-if="accountModalVisible" :visible.sync="accountModalVisible" :row.sync="row" @onSearch="onSearch" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
// import assign from 'lodash/assign'
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
        type: 'agentCode',
        memberId: '',
        keywords: '',
        date: [],
        state: '',
        selectedOptions: '',
        financeCode: '',
        gradeCode: ''
      },
      list: [],
      page: {
        total: 0,
        page: 0,
        limit: 20
      },
      memberType: [
        { label: '代理编号', value: 'agentCode' },
        // { label: '销售编号', value: 'saleCode' },
        { label: '渠道名称', value: 'organizeNameCn' }
      ],
      stateType: [
        { label: '全部', value: '' },
        { label: '已开通', value: '02' },
        { label: '已冻结', value: '03' },
        { label: '已关闭', value: '04' }
      ]
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['userManager/findDlInfo'],
      allGrade(state) {
        return [{ gradeName: '全部', id: '' }, ...state.userManager.allGrade]
      },
      queryFinanclAttrList(state) {
        return [{ financeName: '全部', financeCode: '' }, ...state.userManager.queryFinanclAttrList]
      },
      queryOrganSaleList(state) {
        // console.log(JSON.stringify(state.userManager.queryOrganSaleList).replace(/(orgCode|ptid)/g, 'value'))
        // return JSON.parse(JSON.stringify(state.userManager.queryOrganSaleList).replace(/(orgCode|ptid)/g, 'value').replace(/(name)/g, 'label'))
        return state.userManager.queryOrganSaleList.map((v) => {
          const item = {
            label: v.name,
            value: v.orgCode
          }
          if (v.salemans && v.salemans.length) {
            item.children = []
            item.children = v.salemans.map((v2) => {
              return {
                label: v2.name,
                value: v2.ptid
              }
            })
          }
          return item
        })
      }
    })
  },
  mounted() {
    this.onSearch()
    // 获取级别数据
  },
  methods: {
    ...mapActions('userManager', ['findDlInfo', 'breakInfomation']),
    onSearch(page) {
      const query = {
        agentCode: this.searchForm.type === 'agentCode' ? this.searchForm.keywords : '',
        saleCode: this.searchForm.selectedOptions[1] ? this.searchForm.selectedOptions[1] : '',
        organizeNameCn: this.searchForm.type === 'organizeNameCn' ? this.searchForm.keywords : '',
        organCode: this.searchForm.selectedOptions[0] ? this.searchForm.selectedOptions[0] : '',
        financeCode: this.searchForm.financeCode,
        gradeCode: this.searchForm.gradeCode,
        startDate: this.searchForm.date && this.searchForm.date[0] ? `${this.searchForm.date[0]} 00.00.00` : '',
        endDate: this.searchForm.date && this.searchForm.date[1] ? `${this.searchForm.date[1]} 23.59.59` : '',
        state: this.searchForm.state
      }
      if (page) {
        query.pageNum = page.page
        query.pageSize = page.limit
      } else {
        query.pageNum = 1
        query.pageSize = 20
        this.page.limit = 20
        this.page.page = 1
      }
      this.findDlInfo(query).then(res => {
        if (!res.code) {
          this.list = res.data.list
          this.page.total = res.data.count
        }
      }).catch(error => {
        console.log(error)
      })
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
      }).catch(error => {
        console.log(error)
      })
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
