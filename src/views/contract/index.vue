<template>
  <div class="order-form">
    <!-- search -->
    <el-form ref="form" :model="form" :inline="true" class="search-form">
      <el-form-item label="合同编号">
        <el-input v-model="form.code" placeholder="" :clearable="true" maxlength="100" />
      </el-form-item>
      <el-form-item label="代理编号">
        <el-input v-model="form.agentCode" placeholder="" :clearable="true" maxlength="50" />
      </el-form-item>
      <el-form-item label="合同类型">
        <el-select v-model="form.type">
          <el-option v-for="item in memberType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="合同版本">
        <el-select v-model="form.ver">
          <el-option v-for="item in memberType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="有效期">
        <el-date-picker
          v-model="form.date"
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
          prop="title"
          label="合同编号"
          width="200"
        />
        <el-table-column
          prop="title"
          label="代理编号"
        />
        <el-table-column
          prop="type"
          label="合同类型"
        />
        <el-table-column
          prop="top"
          label="合同版本"
        />
        <el-table-column
          prop="tag"
          label="操作时间"
        />
        <el-table-column
          prop="date"
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
    <dialog-contract-form v-if="formVisible" :visible.sync="formVisible" :row.sync="row" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import DialogContractForm from './form'
import Pagination from '@/components/Pagination'
export default {
  name: 'AgentManageApply',
  components: {
    DialogContractForm,
    Pagination
  },
  data() {
    return {
      formVisible: false,
      row: {},
      placeholder: '请输入关键字',
      form: {
        code: '',
        agentCode: '',
        type: '',
        ver: '',
        date: ''
      },
      list: [
        {
          title: '标题',
          type: '类型',
          top: 'true',
          tag: '标签',
          date: '2020-8-8',
          author: '小新',
          dateUpate: '2020-9-9',
          updatePeople: '小新小新'
        }
      ],
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
        { label: '已冻结', value: '03' },
        { label: '已关闭', value: '04' }
      ]
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['userManager/findDlApply']
    })
  },
  mounted() {
    this.onSearch(1)
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
        query.pageNum = page.page
        query.pageSize = page.limit
      } else {
        query.pageNum = 1
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
    resetForm() {
      const { form } = this.$refs
      form.resetFields()
      form.clearValidate('form')
    }
  }
}
</script>
