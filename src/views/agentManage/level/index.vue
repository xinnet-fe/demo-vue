<template>
  <div class="agent-manage-apply">
    <!-- search -->
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="级别名称" prop="level">
        <el-select v-model="form.type" @change="handleSelectChange">
          <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="keywords">
        <el-input v-model="form.keywords" :placeholder="placeholder" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="default" @click="onSearch">查 询</el-button>
        <el-button type="primary" @click="add">添加级别</el-button>
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
          prop="gradeName"
          label="级别名称"
        />
        <el-table-column
          prop="id"
          label="级别ID"
        />
        <el-table-column
          prop="updateTime"
          label="更新时间"
        />
        <el-table-column
          prop="updateName"
          label="更新人"
          show-overflow-tooltip
        />
        <el-table-column
          prop="remark"
          label="备注"
          show-overflow-tooltip
        />
        <el-table-column label="操作" fixed="right" width="150">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="text"
              @click="edit(scope.row)"
            >
              修改
            </el-button>
            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="destroy(scope.row)"
            >
              <el-button style="margin-left: 10px" slot="reference" size="mini" type="text">
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
    <dialog-apply-form v-if="formVisible" :visible.sync="formVisible" :row.sync="row" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import DialogApplyForm from './form'
import Pagination from '@/components/Pagination'
import map from 'lodash/map'
import find from 'lodash/find'

export default {
  name: 'AgentManageLevel',
  components: {
    DialogApplyForm,
    Pagination
  },
  data() {
    return {
      formVisible: false,
      row: {},
      placeholder: '请输入关键字',
      form: {
        type: 'gradleName',
        keywords: ''
      },
      list: [],
      page: {
        total: 0,
        page: 0,
        limit: 20
      },
      levelOptions: [
        { label: '级别名称', value: 'gradleName' }
      ]
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['userManager/queryGradleInfoList'],
      allGrade (state) {
        return state.userManager.allGrade
      }
    })
  },
  methods: {
    ...mapActions('userManager', ['queryGradleInfoList', 'delGradeById']),
    handleSelectChange(v) {
      console.log(this.form.type)
    },
    onSearch(page) {
      const query = {
        gradleName: this.form.type === 'gradleName' ? this.form.keywords : '',
        name: this.form.type === 'name' ? this.form.keywords : ''
      }
      if (page) {
        query.pageNum = page.page
      } else {
        query.pageNum = 1
      }
      this.queryGradleInfoList(query).then(res => {
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
    add() {
      this.formVisible = true
      this.row.title = '添加级别'
    },
    edit(row) {
      console.log(row)
      this.formVisible = true
      this.row = row
      this.row.title = '修改级别'
    },
    destroy(row) {
      console.log(row)
      this.delGradeById({ id: row.id }).then(res => {
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
  },
  mounted() {
    this.onSearch(1)
  }
}
</script>

<style lang="scss" scoped>
.agent-manage-apply {
  margin: 20px;
}
</style>
