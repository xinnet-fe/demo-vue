<template>
  <div class="app-container">
    <div class="filter-container">
      ID： <el-input v-model="listQuery.id" placeholder="请输入ID" style="width: 200px;margin-right: 20px;" class="filter-item" @keyup.enter.native="handleFilter" />
      标签名称： <el-input v-model="listQuery.title" placeholder="请输入标签名称" style="width: 200px;margin-right: 20px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <span class="demonstration">创建时间： </span>
      <el-date-picker v-model="listQuery.createTime" type="datetime" class="filter-item" style="margin-right: 20px;" placeholder="选择日期时间" />
      所属栏目： <el-select v-model="listQuery.importance" clearable style="width: 90px;margin-right: 20px;" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" style="margin-right: 20px;" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" type="primary" style="margin-right: 20px;" @click="resetModal">
        重置
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;margin-right: 20px;" type="primary" @click="handleCreate">
        新增
      </el-button>
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
      <el-button v-waves :loading="downloadLoading" style="margin-right: 20px;" class="filter-item" type="primary" @click="handleDownload">
        导出
      </el-button>
      <el-button v-waves :loading="downloadLoading" style="margin-right: 20px;" class="filter-item" type="primary" @click="handleDownloads">
        下载模板
      </el-button>
      <el-button type="danger" class="filter-item" style="margin-right: 20px;" @click="handleDeletehints">批量删除</el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed type="selection" width="55" />
      <el-table-column label="ID" align="center">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签名称">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属类目" class-name="status-col">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDeletehint(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="标签名称：" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="所属栏目：" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
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
import { fetchList, createArticle, updateArticle } from '@/api/demos/article'
import UploadExcelComponent from '@/components/demos/UploadExcel/upload.vue'
import waves from '@/directive/demos/waves' // waves directive
import { parseTime } from '@/utils/demos'
import reduce from 'lodash/reduce'
import remove from 'lodash/remove'
import forEach from 'lodash/forEach'
import Pagination from '@/components/demos/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination, UploadExcelComponent },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      value1: '',
      total: 0,
      date1: '',
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 15,
        importance: undefined,
        title: undefined,
        type: undefined,
        createTime: '',
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        titles: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      dialogStatusdele: '',
      textMap: {
        update: '编辑标签',
        create: '新增标签'
      },
      dialogPvVisible: false,
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      multipleSelection: [],
      tableDatas: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      results.forEach(row => {
        if (!row.id) {
          row.title = row.标签名称
          row.status = row.所属类目
          row.timestamp = row.创建时间
          row.id = row.ID
        }
        this.list.push(row)
      })
      this.tableData = results
    },
    resetModal() {
      this.listQuery = {
        page: 1,
        limit: 15,
        importance: undefined,
        title: undefined,
        type: undefined,
        createTime: ''
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
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
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
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
      this.destroyOrder()
      this.dialogPvVisible = false
    },
    handleDeletehint(row, index) {
      row.index = index
      this.temp = Object.assign({}, row)
      this.temp.row = row.id
      this.temp.index = index
      this.dialogStatusdele = 'delete'
      this.dialogPvVisible = true
    },
    handleDelete(row, index) {
      const tempData = Object.assign({}, this.temp)
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.dialogPvVisible = false
      this.list.splice(tempData.index, 1)
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['id', 'title', 'status', 'timestamp']
        const filterVal = ['id', 'title', 'status', 'timestamp']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    handleDownloads() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        // const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const tHeader = ['id', 'title', 'status', 'timestamp']
        const filterVal = ['id', 'title', 'status', 'timestamp']
        let data = this.formatJson(filterVal)
        data = []
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
    }
  }
}
</script>
