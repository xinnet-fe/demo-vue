<template>
  <div class="app-container">
    <div class="filter-container">
      广告标题：<el-input v-model="listQuery.title" placeholder="请输入广告标题" style="width: 200px;margin-right: 20px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <span style="width:8%;display:inline-block;">广告状态：</span>
      <el-select v-model="listQuery.publish" placeholder="请选择广告状态" clearable style="width: 22%;margin-right: 20px;" class="filter-item">
        <el-option v-for="item in publish" :key="item.num" :label="item.name" :value="item.num" />
      </el-select>
      <!-- 广告位置：<el-select v-model="listQuery.position" style="width: 140px;margin-right:20px;" class="filter-item" @change="handleFilter">
        <el-option v-for="item in position" :key="item" :label="item" :value="item" />
      </el-select> -->
      <!-- <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select> -->
      <el-button v-waves class="filter-item" type="primary" style="margin-right: 20px;" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;margin-right: 20px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button>
      <!-- <el-button type="danger" class="filter-item" style="margin-right: 20px;" @click="handleDeletehints">批量删除</el-button> -->
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="广告标题">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="结束时间">
        <template slot-scope="{row}">
          <!-- endTime -->
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="发布时间">
        <template slot-scope="{row}">
          <!-- publishTime -->
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态">
        <template>
          <!-- publishState -->
          <span>已发布</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="显示/隐藏">
        <template slot-scope="{row}">
          <el-switch v-if="row.dispaly !== undefined" v-model="row.dispaly" @change="handleUpdateswitch(row)" />
          <span v-else>1</span>
          <!-- <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag> -->
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" width="150px" label="操作">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDeletehint(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="110px" style="width: 400px; margin-left:50px;">
        <el-form-item label="广告形式：" prop="resource">
          <el-radio v-model="temp.resource" label="1">文字</el-radio>
          <el-radio v-model="temp.resource" label="2">图片</el-radio>
        </el-form-item>
        <el-form-item v-if="temp.resource === '2'" label="广告位置" prop="title">
          <el-select v-model="temp.replaceType" placeholder="请选择广告位置" clearable class="filter-item">
            <el-option v-for="item in replaceTypes" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="广告标题:" prop="title">
          <el-input v-model="temp.title" type="textarea" placeholder="请输入广告标题" maxlength="15" show-word-limit />
        </el-form-item>
        <el-form-item label="类型：" prop="resource">
          <el-radio v-model="temp.types" label="1">新增</el-radio>
          <!-- <el-radio v-model="temp.types" label="2">替换</el-radio> -->
        </el-form-item>
        <el-form-item v-if="temp.resource === '2'">
          {{ imageUrl }}
          <el-upload
            v-if="uploadflag"
            class="avatar-uploader bbb"
            action="#"
            list-type="picture-card"
            :on-change="beforeAvatarUpload"
            :auto-upload="false"
            style="border:solid 1px #ccc"
          >
            <div slot="file" slot-scope="{file}" style="border:solid 1px #000">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                style="border: solid 1px #f00"
              >
              <span style="border:solid 1px blue" class="el-upload-list__item-actions">
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete" />
                </span>
              </span>
            </div>
            <i slot="default" class="el-icon-plus" />
          </el-upload>
          <!-- <el-upload
            v-else
            class="avatar-uploader aaa"
            action="#"
            list-type="picture-card"
            :on-change="beforeAvatarUpload"
            :auto-upload="false"
          >
            el-icon-plus avatar-uploader-icon  avatar  :show-file-list="false"
            <i slot="default" class="el-icon-plus" />
          </el-upload> -->
        </el-form-item>
        <el-form-item v-if="temp.types === '2'" label="替换类型：" prop="title">
          <el-select v-model="temp.replaceType" placeholder="请选择替换类型" clearable class="filter-item">
            <el-option v-for="item in replaceTypes" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="URL" prop="url">
          <el-input v-model="temp.url" placeholder="请输入URL" />
        </el-form-item>
        <el-form-item label="设置">
          <el-switch v-if="dialogStatus==='create'" v-model="values" />
          <el-switch v-else v-model="temp.value" />
        </el-form-item>
        <el-form-item label="预设发布：" prop="resource">
          <el-radio v-model="temp.defaultRelease" label="1">否</el-radio>
          <el-radio v-model="temp.defaultRelease" label="2">是</el-radio>
        </el-form-item>
        <el-form-item v-if="temp.defaultRelease === '2'" label="发布时间：" prop="releaseTime">
          <el-date-picker v-model="temp.releaseTime" type="datetime" class="filter-item" placeholder="请选择发布时间" />
        </el-form-item>
        <el-form-item v-if="temp.defaultRelease === '2'" label="结束时间：" prop="releaseTime">
          <el-date-picker v-model="temp.endTime" type="datetime" class="filter-item" placeholder="请选择结束时间" />
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

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
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
import { knowledgeList, knowledgeAdd } from '@/api/demos/knowledges'
import { updateArticle } from '@/api/demos/article'
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
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        publish: undefined
      },
      publish: [
        {
          name: '正常',
          num: 0
        },
        {
          name: '下架',
          num: 1
        },
        {
          name: '全部',
          num: 2
        }
      ],
      // position: ['正常', '下架', '全部'],
      replaceTypes: ['banner', '左侧'],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        id: undefined,
        importance: 2,
        timestamp: new Date(),
        author: '',
        title: '',
        resource: '1',
        types: '1',
        defaultRelease: '1'
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
        title: [{ required: true, message: '请输入广告标题', trigger: 'blur' }],
        url: [{ required: true, message: '请输入url', trigger: 'blur' }]
      },
      multipleSelection: [],
      values: false,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      imageUrl: '',
      uploadflag: false
    }
  },
  created() {
    this.getList()
  },
  beforeUpdate() {
    if (!this.dialogFormVisible) {
      this.uploadflag = false
      this.imageUrl = ''
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      knowledgeList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.page.total_count

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleUpdateswitch(row) {
      this.temp = Object.assign({}, row)
      this.temp.timestamp = new Date(this.temp.timestamp)
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
      // this.updateData()
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
      this.dialogPvVisible = false
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(tempData.index, 1)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleFilter() {
      // this.listQuery.page = 1
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
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: '',
        resource: '1',
        types: '1',
        defaultRelease: '1'
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
          this.temp.value = this.values
          knowledgeAdd(this.temp).then((data) => {
            console.log(data, 'create')
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
    handleRemove(file) {
      this.uploadflag = false
      this.imageUrl = ''
      file = ''
    },
    beforeAvatarUpload(file) {
      console.log(this.imageUrl, file, '21111')
      var isJPG = ''
      if (file.type) {
        isJPG = file.type === 'image/jpeg'
      } else {
        isJPG = file.raw.type === 'image/jpeg'
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      if (isJPG && isLt2M) {
        this.uploadflag = true
        this.imageUrl = file
      } else {
        this.uploadflag = false
        this.imageUrl = ''
      }
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
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
