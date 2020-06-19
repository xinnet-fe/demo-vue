<template>
  <div class="app-container">
    <div class="filter-container">
      名称： <el-input v-model="listQuery.title" placeholder="请输入栏目名称" style="width: 200px;margin-right: 20px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" style="margin-right: 20px;" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;margin-right: 20px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button>
      <el-button type="danger" class="filter-item" style="margin-right: 20px;" @click="handleDeletehints">批量删除</el-button>
    </div>
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table
      ref="dragTable"
      v-loading="listLoading"
      :data="list"
      row-key="id"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column align="center" width="55" label="序号">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="80" label="栏目名称">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="80" label="栏目编码">
        <template slot-scope="{row}">
          <span>{{ row.pageviews }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="是否显示">
        <template slot-scope="{row}">
          <el-switch v-if="row.value !== undefined" v-model="row.value" @change="handleUpdateswitch(row)" />
          <span v-else>1</span>
          <!-- <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag> -->
        </template>
      </el-table-column>

      <el-table-column label="TItle">
        <template slot-scope="{row}">
          <span v-if="row.title.length < 20">{{ row.title }}</span>
          <span v-else>{{ row.title.substr(0, 20) }}...</span>
          <!-- <span>{{ row.title }}</span> -->
        </template>
      </el-table-column>

      <el-table-column label="Keywords">
        <template slot-scope="{row}">
          <!-- <span v-if="row.title.length < 20">{{ row.title }}</span>
          <span v-else>{{ row.title.substr(0, 20) }}...</span> -->
          <span>{{ row.keywords }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Description">
        <template slot-scope="{row}">
          <!-- <span v-if="row.title.length < 20">{{ row.title }}</span>
          <span v-else>{{ row.title.substr(0, 20) }}...</span> -->
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="150px" label="操作">
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="110px" style="width: 400px; margin-left:50px;">
        <el-form-item label="栏目名称：" prop="author">
          <el-input v-model="temp.author" />
        </el-form-item>
        <el-form-item label="栏目编码：" prop="pageviews">
          <el-input v-model="temp.pageviews" />
        </el-form-item>
        <el-form-item label="栏目Title：" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Keywords：" prop="keywords">
          <el-input v-model="temp.keywords" />
        </el-form-item>
        <el-form-item label="Description：" prop="description">
          <el-input v-model="temp.description" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-if="dialogStatus==='create'" v-model="values" />
          <el-switch v-else v-model="temp.value" />
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
import { fetchList, updateArticle, createArticle } from '@/api/demos/article'
import waves from '@/directive/demos/waves' // waves directive
import Sortable from 'sortablejs'
import reduce from 'lodash/reduce'
import remove from 'lodash/remove'
import forEach from 'lodash/forEach'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'DragTable',
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
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      sortable: null,
      oldList: [],
      newList: [],
      multipleSelection: [],
      dialogStatusdele: '',
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑标签',
        create: '新增标签'
      },
      dialogPvVisible: false,
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        author: [{ required: true, message: '请输入栏目名称', trigger: 'blur' }],
        pageviews: [{ required: true, message: '请输入栏目编码', trigger: 'blur' }],
        title: [{ required: true, message: '请输入title', trigger: 'blur' }],
        keywords: [{ required: true, message: '请输入keywords', trigger: 'blur' }],
        description: [{ required: true, message: '请输入description', trigger: 'blur' }]
      },
      temp: {
        id: undefined,
        importance: 1,
        timestamp: new Date(),
        author: '',
        pageviews: '',
        title: '',
        keywords: '',
        description: ''
      },
      calendarTypeOptions,
      values: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const { data } = await fetchList(this.listQuery)
      this.list = data.items
      // forEach(data.items, id => { id.value = true })
      // this.$set(this.list, newList)
      this.total = data.total
      this.listLoading = false
      this.oldList = this.list.map(v => v.id)
      this.newList = this.oldList.slice()
      this.$nextTick(() => {
        this.setSort()
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleUpdateswitch(row) {
      this.temp = Object.assign({}, row)
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.updateData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
          this.temp.value = this.values
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
          tempData.value = this.values
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
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)

          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      })
    }
  }
}
</script>

<style>
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>

<style scoped>
.icon-star{
  margin-right:2px;
}
.drag-handler{
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
