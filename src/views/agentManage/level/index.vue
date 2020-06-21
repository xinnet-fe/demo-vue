<template>
  <div class="agent-manage-apply">
    <!-- search -->
    <el-form ref="form" :model="form" :inline="true">
      <el-form-item label="级别名称" prop="level">
        <el-select v-model="form.memberId" @change="handleSelectChange">
          <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="keywords">
        <el-input v-model="form.keywords" :placeholder="placeholder" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSearch">查 询</el-button>
        <el-button type="danger" @click="add">添加级别</el-button>
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
          prop="levelName"
          label="级别名称"
        />
        <el-table-column
          prop="levelId"
          label="级别ID"
        />
        <el-table-column
          prop="updateDate"
          label="更新时间"
        />
        <el-table-column
          prop="updatePerson"
          label="更新人"
          show-overflow-tooltip
        />
        <el-table-column
          prop="remarks"
          label="备注"
          show-overflow-tooltip
        />
        <el-table-column label="操作" fixed="right" width="150">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
              @click="edit(scope.row)"
            >
              修改
            </el-button>
            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="destroy(scope.row)"
            >
              <el-button slot="reference" size="mini" type="danger">
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
        name: '',
        remarks: ''
      },
      list: [],
      page: {
        total: 0,
        page: 0,
        limit: 20
      },
      levelOptions: [
        { label: '普通代理', value: 'putong' },
        { label: '白金代理', value: 'baijin' }
      ]
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['agentManage/getLevelList']
    })
  },
  methods: {
    ...mapActions('agentManage', ['getLevelList']),
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
      this.getLevelList(query).then(res => {
        this.list = map(res.data, o => {
          const level = find(this.levelOptions, { value: o.level })
          o.levelName = level ? level.label : ''
          return o
        })
        this.page = res.page
      })
    },
    resetForm() {
      const { form } = this.$refs
      form.resetFields()
      form.clearValidate('form')
    },
    add() {
      this.formVisible = true
    },
    edit(row) {
      this.formVisible = true
      this.row = row
    },
    destroy() {

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
