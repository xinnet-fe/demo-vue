<template>
  <div class="order-form">
    <!-- search -->
    <el-form ref="searchForm" :model="searchForm" :inline="true">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="searchForm.name" />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select v-model="searchForm.state">
          <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch('searchForm')">查 询</el-button>
        <el-button type="primary" @click="resetForm('searchForm')">重 置</el-button>
        <el-button type="primary" @click="showForm('searchForm')">添 加</el-button>
        <el-button type="danger" @click="handleDelete('searchForm')">删 除</el-button>
      </el-form-item>
    </el-form>
    <!-- search -->

    <!-- table -->
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      border
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed type="selection" width="55" />
      <el-table-column
        prop="id"
        label="ID"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="120"
      />
      <el-table-column
        prop="domain"
        label="域名"
      />
      <el-table-column
        prop="region"
        label="区域"
        show-overflow-tooltip
      />
      <el-table-column
        label="状态"
        sortable
        :sort-by="['state.name', 'id']"
      >
        <template v-slot="scope">
          {{ scope.row.state.name }}
        </template>
      </el-table-column>
      <el-table-column
        label="日期"
        width="120"
        sortable
        :sort-by="['datetime', 'id']"
      >
        <template v-slot="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 5px;">{{ scope.row.datetime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row, scope)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="page.total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="getList"
    />
    <!-- table -->

    <!-- form -->
    <el-dialog :before-close="beforeClose" title="添加" :visible.sync="formVisible">
      <el-form ref="form" :model="form" label-width="80px" :rules="formRules">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="上海" value="shanghai" />
            <el-option label="北京" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker v-model="form.date2" placeholder="选择时间" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="form.delivery" />
        </el-form-item>
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type" />
            <el-checkbox label="地推活动" name="type" />
            <el-checkbox label="线下主题活动" name="type" />
            <el-checkbox label="单纯品牌曝光" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助" />
            <el-radio label="线下场地免费" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button @click="resetForm('form')">重 置</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- form -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { fetchList, destroyOrder } from '@/api/order'
import assign from 'lodash/assign'
import reduce from 'lodash/reduce'
import remove from 'lodash/remove'
import forEach from 'lodash/forEach'

export default {
  name: 'Orders',
  components: {
    Pagination
  },
  props: {},
  data() {
    return {
      listLoading: true,
      formVisible: false,
      searchForm: {
        name: '',
        state: ''
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      stateOptions: [
        { label: '新增', value: 'add' },
        { label: '变更', value: 'change' }
      ],
      formRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      list: [],
      page: {
        total: 0,
        page: 1,
        limit: 10
      },
      multipleSelection: []
    }
  },
  computed: {
    ageRule() {
      const isNumber = (rule, value, callback) => {
        const reg = /^\d+$/g
        if (!value) {
          callback()
        } else if (!reg.test(value)) {
          callback(new Error('年龄必须是数字'))
        } else {
          callback()
        }
      }
      return [{ validator: isNumber, trigger: 'change' }]
    }
  },
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    getList(page) {
      this.listLoading = true
      const query = {
        ...this.searchForm
      }
      if (page) {
        assign(query, page)
      }
      return fetchList(query).then(res => {
        const { data, page } = res.data
        this.list = data
        this.page = page
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      })
    },
    destroyOrder() {
      const ids = reduce(this.multipleSelection, (r, item) => {
        r.push(item.id)
        return r
      }, [])
      return destroyOrder(ids).then(res => {
        this.$notify({
          title: 'Success',
          message: '删除成功！',
          type: 'success',
          duration: 1000
        })
        const newList = this.list
        forEach(ids, id => remove(newList, { id }))
        this.$set(this.list, newList)
      })
    },
    sortByDate(a, b) {
      console.log(a)
      console.log(b)
    },
    updateDate() {},
    onSearch(formName) {
      this.getList()
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form)
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    showForm() {
      this.formVisible = true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    beforeClose(done) {
      const { form } = this.$refs
      form.resetFields()
      form.clearValidate('form')
      done()
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleEdit(index, row, scope) {
      console.log(scope)
    },
    handleDelete() {
      if (this.multipleSelection.length) {
        this.destroyOrder()
      } else {
        this.$message.error({
          message: '请选择要删除的选项！'
        })
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.order-form {
  margin: 20px;
  overflow: hidden;

}
</style>
