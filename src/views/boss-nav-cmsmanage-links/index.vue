<template>
  <div class="app-container">
    <div class="filter-container">
      友链名称：<el-input v-model="listQuery.title" placeholder="请输入友链名称" style="width: 200px;margin-right: 20px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <!-- <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select> -->
      <el-button v-waves class="filter-item" @click="handleFilter">
        搜索
      </el-button>
    </div>

    <div class="mult-operation">
      <el-button type="primary" class="filter-item" size="mini" @click="handleCreate">
        新增
      </el-button>
      <el-button type="danger" class="filter-item" size="mini" @click="handleDeletehints">批量删除</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        label="序号"
        prop="sort"
        align="center"
        width="80"
      />
      <el-table-column align="center" label="友链名称">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="URL">
        <template slot-scope="{row}">
          <span v-if="row.url && row.url.length < 20">{{ row.url }}</span>
          <span v-else>{{ row.url && row.url.substr(0, 20) }}...</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态">
        <template slot-scope="{row}">
          <el-switch
            v-model="row.state"
            :active-value="1"
            :inactive-value="0"
            @change="handleUpdateswitch(row)"
          />
          <!-- <span>{{ state[row.state] }}</span> -->
          <!-- <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag> -->
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间">
        <template slot-scope="{row}">
          <span>{{ row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="150px" label="操作">
        <template slot-scope="{row,$index}">
          <span style="color:#0069ff;cursor:pointer;" @click="handleUpdate(row)">
            编辑
          </span>
          <span v-if="row.status!='deleted'" style="color:#0069ff;cursor:pointer;" @click="handleDeletehint(row,$index)">
            删除
          </span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      :page-sizes="[10]"
      :total="page.total_count"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="110px" style="width: 400px; margin-left:50px;">
        <el-form-item label="友链名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="URL" prop="url">
          <el-input v-model="temp.url" />
        </el-form-item>
        <el-form-item label="序号" prop="sort">
          <el-input v-model="temp.sort" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="temp.state"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :title="textMap[dialogStatusdele]" :visible.sync="dialogPvVisible">
      <p v-if="dialogStatusdele==='deletes'">您确定要删除选中的数据吗？</p>
      <p v-else>您确定要删除此数据吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPvVisible = false">取消</el-button>
        <!-- <el-button type="primary" @click="handleDeletes()">确定</el-button> -->
        <el-button type="primary" @click="dialogStatusdele==='deletes'?handleDeletes():handleDelete()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/demos/waves' // waves directive
// import { parseTime } from '@/utils/demos'
import Pagination from '@/components/demos/Pagination' // secondary package based on el-pagination
import reduce from 'lodash/reduce'
import remove from 'lodash/remove'
import forEach from 'lodash/forEach'

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      page: {
        total_count: 0,
        page: 1,
        limit: 10
      },
      state: { 1: '显示', 0: '不显示' },
      listLoading: true,
      listQuery: {
        // page: 1,
        // limit: 20,
        title: '',
        type: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        id: '',
        name: '',
        url: '',
        state: 1,
        sort: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑标签',
        create: '新增标签'
      },
      dialogPvVisible: false,
      dialogStatusdele: '',
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        createTime: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        name: [{ required: true, message: '请输入友链名称', trigger: 'blur' }],
        url: [{ required: true, message: '请输入URL', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入序号', trigger: 'blur' }]
      },
      multipleSelection: [],
      values: true,
      curRow: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(page) {
      this.listLoading = true
      const payload = {
        name: this.listQuery.title,
        page: page && page.page ? page.page : 1
      }
      return this.$store.dispatch('links/links', payload).then(response => {
        this.list = response.data
        this.page = response.page

        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    handleUpdateswitch(row) {
      const { state, id } = row
      this.update({ id, state })
    },
    handleDeletehints() {
      if (this.multipleSelection.length) {
        this.dialogStatusdele = 'deletes'
        this.dialogPvVisible = true
      } else {
        this.$message({
          type: 'error',
          message: '请选择要删除的选项！'
        })
        this.dialogPvVisible = false
      }
    },
    handleDeletes() {
      this.destroyLink()
      this.dialogPvVisible = false
    },
    handleDeletehint(row, index) {
      this.dialogStatusdele = 'delete'
      this.dialogPvVisible = true
      this.curRow = row
    },
    handleDelete() {
      const id = this.curRow.id
      this.$store.dispatch('links/destroyLink', [id]).then(res => {
        this.$notify({
          title: 'Success',
          message: '删除成功！',
          type: 'success',
          duration: 1000
        })
        const newList = this.list
        remove(newList, { id })
        this.$set(this.list, newList)
        this.dialogPvVisible = false
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleFilter() {
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: '',
        name: '',
        url: '',
        state: 1,
        sort: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.temp.state = 1
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('links/addLink', this.temp).then(() => {
            this.getList()
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = {
        id: row.id,
        url: row.url,
        name: row.name,
        sort: row.sort,
        state: row.state === 1
      }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.temp)
          data.state = data.state ? 1 : 0
          this.update(data).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '修改成功！',
              type: 'success',
              duration: 1000
            })
          })
        }
      })
    },
    update(data) {
      return this.$store.dispatch('links/modifyLink', data).then(() => {
        return this.getList({ page: this.page.page, name: this.listQuery.title })
      })
    },
    destroyLink() {
      const ids = reduce(this.multipleSelection, (r, item) => {
        r.push(item.id)
        return r
      }, [])
      this.$store.dispatch('links/destroyLink', ids).then(res => {
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
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
<style scoped>
  .mult-operation {
    margin: 10px auto;
    text-align: right;
  }
</style>
