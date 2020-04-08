<template>
  <div class="order-form">
    <!-- search -->
    <el-form ref="searchForm" :model="searchForm" :inline="true">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="searchForm.name" />
      </el-form-item>
      <el-form-item label="年龄" prop="age" :rules="ageRule">
        <el-input v-model.number="searchForm.age" />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select v-model="searchForm.state">
          <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSearch('searchForm')">查 询</el-button>
        <el-button type="primary" @click="resetModal('searchForm')">重 置</el-button>
        <el-button type="primary" @click="showModal">添 加</el-button>
        <el-button type="danger" @click="handleDelete">删 除</el-button>
      </el-form-item>
    </el-form>
    <!-- search -->

    <!-- table -->
    <el-table
      ref="multipleTable"
      v-loading="loading"
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
        prop="regionName"
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
            @click="showModal(scope.row)"
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
    <el-dialog :before-close="beforeClose" destroy-on-close title="添加" :visible.sync="formVisible">
      <el-form ref="form" :model="form" label-width="80px" :rules="formRules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="域名" prop="domain">
          <el-input v-model="form.domain" />
        </el-form-item>
        <el-form-item label="区域" prop="region">
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
          <!-- <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker v-model="form.date2" placeholder="选择时间" style="width: 100%;" />
            </el-form-item>
          </el-col> -->
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="form.delivery" />
        </el-form-item>
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="1" name="type">美食/餐厅线上活动</el-checkbox>
            <el-checkbox label="2" name="type">地推活动</el-checkbox>
            <el-checkbox label="3" name="type">线下主题活动</el-checkbox>
            <el-checkbox label="4" name="type">单纯品牌曝光</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="form.resource">
            <el-radio label="1">线上品牌商赞助</el-radio>
            <el-radio label="2">线下场地免费</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal('form')">取 消</el-button>
        <el-button @click="resetModal('form')">重 置</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- form -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import assign from 'lodash/assign'
import reduce from 'lodash/reduce'
import remove from 'lodash/remove'
import forEach from 'lodash/forEach'
import { mapState } from 'vuex'
import clearFormData from '@/utils/clearFormData'
import isNumber from '@/utils/isNumber'

export default {
  name: 'Orders',
  components: {
    Pagination
  },
  props: {},
  data() {
    return {
      updateId: null,
      formVisible: false,
      searchForm: {
        name: '',
        age: '',
        state: ''
      },
      form: {
        name: '',
        domain: '',
        region: '',
        date1: '',
        // date2: '',
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
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        domain: [
          { required: true, message: '请输入域名', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        // date2: [
        //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        // ],
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
      multipleSelection: []
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['order/getList'],
      list: state => state.order.list,
      page: state => state.order.page
    }),
    ageRule() {
      return [
        { required: true, message: '年龄必须填写', trigger: 'change' },
        { validator: isNumber, message: '年龄必须是数字', trigger: 'change' }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(page) {
      const query = {
        ...this.searchForm
      }
      if (page) {
        assign(query, page)
      }
      this.$store.dispatch('order/getList', query)
    },
    destroyOrder() {
      const ids = reduce(this.multipleSelection, (r, item) => {
        r.push(item.id)
        return r
      }, [])
      this.$store.dispatch('order/destroyOrder', ids).then(res => {
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
    onSearch(formName) {
      this.getList()
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let action
          const data = this.form
          if (this.updateId) {
            action = 'updateOrder'
            data.id = this.updateId
          } else {
            action = 'addOrder'
          }
          this.$store.dispatch(`order/${action}`, data).then(() => {
            this.closeModal()
            this.getList()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    showFormData(row) {
      forEach(this.form, (item, key) => {
        if (key === 'date1') {
          this.form['date1'] = new Date(row.datetime)
        } else if (row[key]) {
          this.form[key] = row[key]
        }
      })
    },
    clearFormData() {
      forEach(this.form, (item, key) => (this.form[key] = ''))
    },
    showModal(row) {
      this.formVisible = true
      if (row && row.id) {
        this.updateId = row.id
        this.showFormData(row)
      } else {
        this.updateId = null
      }
    },
    // 取消关闭
    closeModal() {
      this.formVisible = false
      this.resetModal('form')
    },
    resetModal(formName) {
      clearFormData(this.form)
      this.$refs[formName].resetFields()
      this.$refs[formName].clearValidate(formName)
    },
    beforeClose(done) {
      this.resetModal('form')
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
    handleDelete() {
      if (this.multipleSelection.length) {
        this.destroyOrder()
      } else {
        this.$message.error({
          message: '请选择要删除的选项！'
        })
      }
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
