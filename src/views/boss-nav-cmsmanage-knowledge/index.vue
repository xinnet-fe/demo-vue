<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form style="margin-bottom: 20px;">
        广告标题：<el-input v-model="listQuery.title" placeholder="请输入广告标题" style="width: 200px;margin-right: 20px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <span style="width:8%;display:inline-block;">广告状态：</span>
        <el-select v-model="listQuery.publish" placeholder="请选择广告状态" clearable style="width: 22%;margin-right: 20px;" class="filter-item">
          <el-option v-for="item in publish" :key="item.num" :label="item.name" :value="item.num" />
        </el-select>
        <el-button v-waves style="margin-right: 20px;" @click="handleFilter">
          搜索
        </el-button>
        <el-button style="margin-left: 10px;margin-right: 20px;" @click="handleCreate">
          新增
        </el-button>
      </el-form>
    <!-- <div class="filter-container"> -->
    <!-- 广告位置：<el-select v-model="listQuery.position" style="width: 140px;margin-right:20px;" class="filter-item" @change="handleFilter">
      <el-option v-for="item in position" :key="item" :label="item" :value="item" />
    </el-select> -->
    <!-- <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
      <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
    </el-select> -->
    <!-- <el-button type="danger" class="filter-item" style="margin-right: 20px;" @click="handleDeletehints">批量删除</el-button> -->
    <!-- </div> -->
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55" /> -->
      <!-- <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')"> -->
      <el-table-column label="ID" prop="id" align="center" width="80">
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
          <span v-if="row.endTime">{{ row.endTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="发布时间">
        <template slot-scope="{row}">
          <!-- publishTime -->
          <span v-if="row.publishTime">{{ row.publishTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态">
        <template slot-scope="{row}">
          <!-- publishState -->
          <span v-if="row.publishState === '已发布'" style="color:#65c13c;">{{ row.publishState }}</span>
          <span v-else>{{ row.publishState }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="显示/隐藏">
        <template slot-scope="{row}">
          <el-switch v-if="row.dispaly !== undefined" v-model="row.dispalys" disabled @change="handleUpdateswitch(row)" />
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
        <el-form-item label="广告形式：">
          <el-radio v-model="temp.adType" label="1">文字</el-radio>
          <el-radio v-model="temp.adType" label="0">图片</el-radio>
        </el-form-item>
        <el-form-item v-if="temp.adType === '0'" label="广告位置" prop="adPosition">
          <el-select v-model="temp.adPosition" placeholder="请选择广告位置" clearable class="filter-item">
            <el-option v-for="item in replaceTypes" :key="item.name" :label="item.name" :value="item.num" />
          </el-select>
        </el-form-item>
        <el-form-item label="广告标题:" prop="adTitle">
          <el-input v-model="temp.adTitle" type="textarea" placeholder="请输入广告标题" maxlength="15" show-word-limit />
        </el-form-item>
        <el-form-item label="类型：" prop="resource">
          <el-radio v-model="adType" label="1">新增</el-radio>
          <!-- <el-radio v-model="temp.types" label="2">替换</el-radio> -->
        </el-form-item>
        <el-form-item v-if="temp.adType === '0'" style="position:relative">
          <el-upload
            ref="uploadImage"
            action="#"
            :on-change="imageChange"
            list-type="picture-card"
            class="uploadImages"
            name="files"
            :limit="1"
            :auto-upload="false"
            accept=".png,.jpg,.jpeg,.bmp,.gif,.webp"
            :on-exceed="handlePictureCardPreviews"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemovePicture"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <span v-if="picflag" style="color:#f00;font-size:12px">请选择图片</span>
        </el-form-item>
        <!-- <el-form-item v-if="adType === '2'" label="替换类型：" prop="title">
          <el-select v-model="temp.adPosition" placeholder="请选择替换类型" clearable class="filter-item">
            <el-option v-for="item in replaceTypes" :key="item.name" :label="item.name" :value="item.num" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="URL" prop="adUrl">
          <el-input v-model="temp.adUrl" placeholder="请输入URL" />
        </el-form-item>
        <el-form-item label="设置">
          <el-switch v-if="dialogStatus==='create'" v-model="values" />
          <el-switch v-else v-model="temp.dispaly" />
        </el-form-item>
        <el-form-item label="预设发布：" prop="resource">
          <el-radio v-model="temp.publish" label="0">否</el-radio>
          <el-radio v-model="temp.publish" label="1">是</el-radio>
        </el-form-item>
        <el-form-item v-if="temp.publish === '1'" label="发布时间：" prop="releaseTime">
          <el-date-picker v-model="temp.publishTime" :picker-options="pickerOptions" value-format="yyyy-MM-dd hh:mm:ss" format="yyyy-MM-dd hh:mm:ss" type="datetime" class="filter-item" placeholder="请选择发布时间" />
        </el-form-item>
        <el-form-item v-if="temp.publish === '1'" label="结束时间：" prop="releaseTime">
          <el-date-picker v-model="temp.endTime" :picker-options="pickerOptions" value-format="yyyy-MM-dd hh:mm:ss" format="yyyy-MM-dd hh:mm:ss" type="datetime" class="filter-item" placeholder="请选择结束时间" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <!-- <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()"> -->
        <el-button type="primary" @click="onSubmit">
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
import $ from 'jquery'

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
      // 设置发布时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      picflag: false,
      disabless: true,
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
          name: '未发布',
          num: 0
        },
        {
          name: '已发布',
          num: 1
        },
        {
          name: '已下架',
          num: 2
        }
      ],
      // position: ['正常', '下架', '全部'],
      replaceTypes: [{ name: 'banner', num: 0 }, { name: '右侧', num: 1 }, { name: '详情页', num: 2 }],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        adId: undefined,
        adPosition: undefined,
        adTitle: '',
        adType: '1',
        adUrl: '',
        dispaly: '0',
        endTime: undefined,
        file: undefined,
        // operateType: '',
        publish: '0',
        publishTime: undefined
      },
      adType: '1',
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑标签',
        create: '新增标签'
      },
      dialogPvVisible: false,
      dialogStatusdele: '',
      rules: {
        // adType: [{ required: true, message: '请输入广告标题', trigger: 'blur' }],
        adPosition: [{ required: true, message: '请选择广告位置', trigger: 'change' }],
        adTitle: [{ required: true, message: '请输入广告标题', trigger: 'blur' }],
        adUrl: [{ required: true, message: '请输入url', trigger: 'blur' }]
      },
      multipleSelection: [],
      values: false,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      imageUrl: '',
      uploadflag: false,
      selectedCategorySpe: this.selectedCategory,
      serviceForm: {
        title: '',
        desc: '',
        priority: '',
        occurDate: ''
      },
      images: {},
      files: {},
      fileurl: '1'
      // dialogImageUrl: '',
      // dialogVisible: false
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
        this.total = response.page.total_count
        const aa = []
        response.data.forEach(row => {
          if (row.dispaly === 1) {
            row.dispalys = true
          } else if (row.dispaly === 0) {
            row.dispalys = false
          }
          if (row.publishState === 0) {
            row.publishState = '未发布'
          } else if (row.publishState === 1) {
            row.publishState = '已发布'
          } else if (row.publishState === 2) {
            row.publishState = '已下架'
          }
          aa.push(row)
        })
        this.list = aa

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    beforeUploadPicture(file) {
      const isImage = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/bmp' || file.type === 'image/gif' || file.type === 'image/webp'
      const isLt2M = file.size < 1024 * 1024 * 2
      if (!isImage) {
        this.$message.error('上传只能是png,jpg,jpeg,bmp,gif,webp格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isImage && isLt2M
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlePictureCardPreviews(file) {
      this.$message.error('只能上传一张图片!')
    },
    handleRemovePicture(file, fileList) {
      this.imageList = ''
      this.images = {}
      this.fileurl = ''
    },
    imageChange(file, fileList, name) {
      const isImage = file.raw.type === 'image/png' || file.raw.type === 'image/jpg' || file.raw.type === 'image/jpeg' || file.raw.type === 'image/bmp' || file.raw.type === 'image/gif' || file.raw.type === 'image/webp'
      const isLt2M = file.size < 1024 * 1024 * 2
      // this.$refs.uploadImage.style.background = '#000'style.position = 'absolute' 找到ul标签后添加absolute样式
      // console.log($('.uploadImages').find('ul')[0].style.position = 'absolute', 'ress')
      if (isImage && isLt2M) {
        $('.uploadImages').find('ul')[0].style.position = 'absolute'
        this.imageList = fileList
        this.images['images'] = fileList
        this.fileurl = file.url
        if (file) {
          this.picflag = false
        }
      } else {
        if (!isImage) {
          this.$message.error('上传只能是png,jpg,jpeg,bmp,gif,webp格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        }
      }
    },
    onSubmit() {
      const wfForm = new FormData()
      this.temp.dispaly = this.values ? 1 : 0
      for (var i in this.temp) {
        if (this.temp[i] !== undefined) {
          wfForm.append(i, this.temp[i])
        }
      }
      if (!Object.entries(this.images).length) {
        this.picflag = true
      } else if (Object.entries(this.images).length === 1) {
        if (Object.entries(this.images)[0][1]) {
          this.picflag = false
        } else {
          this.picflag = true
        }
      }
      Object.entries(this.images).forEach(file => {
        file[1].forEach(item => {
          // 下面的“images”，对应后端需要接收的name，这样对图片和文件做一个区分，name为images为图片
          wfForm.append('file', item.raw)
          // wfForm.append(item.name, file[0])
        })
      })
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          knowledgeAdd(wfForm).then((data) => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify.success({
              title: '添加成功',
              message: '数据已添加！'
            })
            // this.$notify({
            //   title: 'Success',
            //   message: 'Created Successfully',
            //   type: 'success',
            //   duration: 2000
            // })
            this.getList()
          })
        }
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
        adId: undefined,
        adPosition: undefined,
        adTitle: '',
        adType: '1',
        adUrl: '',
        dispaly: '0',
        endTime: undefined,
        file: undefined,
        // operateType: '',
        publish: '0',
        publishTime: undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.picflag = ''
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.picflag = ''
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateArticle() {
      const tempData = Object.assign({}, this.temp)
      tempData.value = this.values
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
