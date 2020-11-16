<template>
  <div class="order-form">
    <!-- search -->
    <el-form ref="form" :model="form" :inline="true" class="search-form">
      <el-form-item label="合同编号">
        <el-input v-model="form.contractNo" placeholder="" :clearable="true" maxlength="100" />
      </el-form-item>
      <el-form-item label="代理编号">
        <el-input v-model="form.agentCode" placeholder="" :clearable="true" maxlength="50" />
      </el-form-item>
      <el-form-item label="合同类型">
        <el-select v-model="form.contractType">
          <el-option label="全部" value="" />
          <el-option v-for="item in contractType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="合同版本">
        <el-select v-model="form.contractVersion">
          <el-option label="全部" value="" />
          <el-option v-for="item in contractVersion" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="有效期">
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
        <!-- <el-button type="primary" @click="resetForm">重 置</el-button> -->
      </el-form-item>
    </el-form>
    <!-- search -->
    <!-- operate -->
    <el-form ref="operateForm" class="operate-form" :inline="true">
      <el-form-item>
        <el-button type="default" size="mini" @click="handleAdd('businessModalVisible')">添加</el-button>
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
      >
        <el-table-column
          prop="contractNo"
          label="合同编号"
          width="200"
        />
        <el-table-column
          prop="agentCode"
          label="代理编号"
        />
        <el-table-column label="合同类型">
          <template v-slot="scope">
            {{ getContractType(scope.row.contractType) }}
          </template>
        </el-table-column>
        <el-table-column label="合同版本">
          <template v-slot="scope">
            {{ getContractVersion(scope.row.contractVersion) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="操作时间"
        />
        <el-table-column
          prop="updateName"
          label="操作人"
        />
        <el-table-column label="操作" fixed="right" width="150">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="handleDel(scope.row)"
            >
              <el-button slot="reference" style="margin-left:10px" size="mini" type="text">
                删除
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
    <dialog-contract-form v-if="formVisible" :visible.sync="formVisible" :row.sync="row" :contract-type="contractType" :contract-version="contractVersion" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import DialogContractForm from './form'
import Pagination from '@/components/Pagination'
export default {
  name: 'AgentContract',
  components: {
    DialogContractForm,
    Pagination
  },
  data() {
    return {
      formVisible: false,
      row: {},
      placeholder: '请输入关键字',
      date: '',
      form: {
        contractNo: '',
        agentCode: '',
        contractType: '',
        contractVersion: '',
        contractStartTime: '',
        contractEndTime: '',
        pageNum: 1,
        pageSize: 20
      },
      list: [

      ],
      page: {
        total: 0,
        page: 0,
        limit: 20
      },
      contractType: [
        { label: '纸质合同', value: '1' },
        { label: '电子合同', value: '2' }
      ],
      contractVersion: [
        { label: 'V0', value: 'V0' },
        { label: 'V1', value: 'V1' }
      ]
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['userManager/findAgentContract']
    })
  },
  watch: {
    date: function(val) {
      const v = val || ['', '']
      this.form.contractStartTime = v[0] ? `${v[0]} 00:00:00` : ''
      this.form.contractEndTime = v[1] ? `${v[1]} 23:59:59` : ''
    }
  },
  mounted() {
    this.onSearch(1)
  },
  methods: {
    ...mapActions('userManager', ['findAgentContract', 'deleteAgentContract']),
    handleSelectChange(v) {
      console.log(v)
    },
    getContractType(type) {
      const text = this.contractType.filter((v) => {
        return v.value === type
      })
      return text[0].label
    },
    getContractVersion(ver) {
      const text = this.contractVersion.filter((v) => {
        return v.value === ver
      })
      return text[0].label
    },
    onSearch(page) {
      console.log(this.form.date)
      const query = this.form

      if (page) {
        query.pageNum = page.page
        query.pageSize = page.limit
      } else {
        query.pageNum = 1
        query.pageSize = 20
      }
      this.findAgentContract(query).then(res => {
        if (!res.code) {
          console.log(res)
          this.list = res.data.list
          this.page.total = res.data.count
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleAdd() {
      this.formVisible = true
      this.row = {}
    },
    handleEdit(row) {
      this.formVisible = true
      this.row = row
    },
    handleDel(row) {
      console.log(row)
      this.deleteAgentContract({ id: row.id }).then(res => {
        if (!res.code) {
          if (res.data.isSuccess === '1') {
            this.$message.success('删除成功！')
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
    resetForm() {
      const { form } = this.$refs
      form.resetFields()
      form.clearValidate('form')
    }
  }
}
</script>
