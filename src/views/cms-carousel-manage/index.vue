<template>
  <div class="cms-carousel-manage">
    <!-- search -->
    <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true">
      <el-form-item label="名称:" prop="name">
        <el-input v-model="searchForm.name" placeholder="请输入名称" clearable />
      </el-form-item>
      <el-form-item label="状态:" prop="website">
        <el-select v-model="searchForm.status">
          <el-option v-for="({ value, key }) in states" :key="value" :label="key" :value="value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- search -->

    <div class="mult-operation">
      <el-button type="primary" size="mini" @click="showModal()">新增轮播</el-button>
    </div>

    <!-- table -->
    <el-table
      ref="table"
      v-loading="loading"
      row-key="id"
      :tree-props="{children: 'children'}"
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        ref="sortIndex"
        prop="sortIndex"
        label="序号"
        sortable
        :sort-method="sortByNumber"
      />
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        prop="code"
        label="轮播code"
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
      />
      <el-table-column
        label="显示状态"
      >
        <template v-slot="{ row }">
          <el-switch
            v-model="row.status"
            active-value="1"
            inactive-value="0"
            @change="switchChange(row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template v-slot="{ row }">
          <el-button type="text" @click="showModal(row)">编辑</el-button>
          <el-button type="text" @click="showTipsModal(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <pagination
      :total="page.count"
      :page.sync="page.pageNum"
      :limit.sync="page.pageSize"
      @pagination="getList"
    /> -->
    <!-- table -->

    <!-- form -->
    <el-dialog width="500px" :before-close="beforeClose" destroy-on-close :title="modalTitle" :visible.sync="show">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本属性" name="basis">
          <template v-slot:default>
            <el-form ref="form" class="el-form" :model="form" label-width="100px" :rules="rules">
              <el-form-item label="名称:" prop="name">
                <el-input v-model="form.name" />
              </el-form-item>
              <el-form-item label="轮播code:" prop="code">
                <el-input v-model="form.code" />
              </el-form-item>
              <el-form-item label="轮播树级:" prop="parentId">
                <el-cascader
                  placeholder="默认为一级"
                  :value="form.parentId"
                  :options="types"
                  filterable
                  change-on-select
                />
              </el-form-item>
              <el-form-item label="描述:" prop="desc">
                <el-input v-model="form.desc" :rows="3" type="textarea" />
              </el-form-item>
              <el-form-item label="图片地址:" prop="imgUrl">
                <el-col :span="16">
                  <el-input v-model="form.imgUrl" placeholder="默认图片路径" disabled />
                </el-col>
                <el-col :span="8">
                  <el-select v-model="uploadImageAddress" placeholder="请选择" @change="localUpload">
                    <el-option label="本地上传" value="1" />
                    <el-option label="文件服务器" value="2" />
                  </el-select>
                </el-col>
                <el-upload
                  style="display: none;"
                  class="local-upload"
                  action="/"
                  :limit="1"
                  :auto-upload="false"
                  :on-change="selectedFile"
                  :file-list="fileList"
                >
                  <el-button ref="upload" size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="链接:" prop="url">
                <el-input v-model="form.url" />
              </el-form-item>
              <el-form-item label="打开方式:">
                <el-select v-model="form.target">
                  <el-option v-for="({ value, key }) in openMode" :key="value" :label="key" :value="value" />
                </el-select>
              </el-form-item>
              <el-form-item label="序号:" prop="sortIndex">
                <el-input-number v-model="form.sortIndex" />
              </el-form-item>
              <el-form-item label="状态:" prop="status">
                <el-switch
                  v-model="form.status"
                  active-value="1"
                  inactive-value="0"
                />
              </el-form-item>
              <el-form-item label="发布时间:" prop="startTime">
                <el-date-picker
                  v-model="form.startTime"
                  type="datetime"
                  placeholder="选择开始日期"
                />
              </el-form-item>
              <el-form-item label="结束日期:" prop="endTime">
                <el-date-picker
                  v-model="form.endTime"
                  type="datetime"
                  placeholder="选择结束日期"
                />
              </el-form-item>
            </el-form>
          </template>
        </el-tab-pane>
        <el-tab-pane label="高级属性" name="senior">
          <template v-slot:default>
            <el-form ref="seniorForm" class="el-form" :model="form" label-width="100px">
              <el-form-item label="点击事件:">
                <el-input v-model="form.click" />
              </el-form-item>
              <el-form-item label="css样式:">
                <el-input v-model="form.cssStyle" :rows="3" type="textarea" />
              </el-form-item>
              <el-form-item label="class:">
                <el-input v-model="form.cssClass" :rows="3" type="textarea" />
              </el-form-item>
              <el-form-item label="提示:">
                <el-input v-model="form.alt" :rows="3" type="textarea" />
              </el-form-item>
              <el-form-item label="扩展:">
                <el-input v-model="form.extra" :rows="3" type="textarea" />
              </el-form-item>
              <el-form-item label="内容:">
                <el-input v-model="form.content" :rows="3" type="textarea" />
              </el-form-item>
            </el-form>
          </template>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </el-dialog>
    <!-- form -->

    <!-- 删除提示 -->
    <el-dialog width="350px" title="提示" :visible.sync="showTips">
      <p>删除后前台展示页面也会删除，是否确认删除所选条目？</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeTipsModal">取消</el-button>
        <el-button type="primary" @click="destroy">确认</el-button>
      </div>
    </el-dialog>
    <!-- 删除提示 -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import forEach from 'lodash/forEach'
// import Pagination from '@/components/Pagination'
import formatTime from '@/utils/formatTime'
import isDate from '@/utils/isDate'

export default {
  name: 'CmsCarouselManage',
  // components: {
  //   Pagination
  // },
  data() {
    return {
      // tabs
      activeName: 'basis',
      // 搜索框
      searchForm: {
        name: '',
        status: ''
      },
      // 弹框
      show: false,
      modalTitle: '新增',
      // 弹框表单数据
      form: {
        id: '',
        name: '',
        code: '',
        parentId: '0',
        desc: '',
        url: '',
        sortIndex: '',
        startTime: '',
        endTime: '',
        status: '',
        target: '',
        imgUrl: '',
        // 高级属性
        click: '',
        cssStyle: '',
        cssClass: '',
        alt: '',
        extra: '',
        content: ''
      },
      // 修改时传递的旧code
      oldCode: '',
      // 默认打开方式
      formTarget: '',
      // 上传图片下拉框值
      uploadImageAddress: '',
      // 弹框表单规则
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        sortIndex: [{ required: true, message: '请输入序号', trigger: 'blur' }]
      },
      // 删除弹框
      showTips: false,
      // 表格的数据
      list: [],
      // page: {
      //   count: 0,
      //   pageNum: 1,
      //   pageSize: 30
      // },
      // 上传附件列表
      fileList: []
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.global,
      openMode: state => state.cms.openMode,
      types: state => state.cms.slideshowType,
      states: state => state.cms.slideshowStatus
    })
  },
  created() {
    this.getTargetMapping().then(res => {
      const { list } = res.data
      if (list && list.length) {
        const { value } = list[0]
        this.formTarget = value
      }
    })
    this.getSlideshowStatus()
  },
  methods: {
    ...mapActions({
      getData: 'cms/slideshowList',
      add: 'cms/addSlideshow',
      update: 'cms/updateSlideshow',
      destroyData: 'cms/destroySlideshow',
      // 详情
      searchSlideshow: 'cms/searchSlideshow',
      // 修改状态
      updateStatus: 'cms/updateSlideshowStatus',
      // 打开方式
      getTargetMapping: 'cms/targetMapping',
      // 轮播类型
      getSlideshowType: 'cms/parentIdMapping',
      // 轮播状态
      getSlideshowStatus: 'cms/statusMapping'
    }),
    showModal(row = {}) {
      this.getSlideshowType().then(() => {
        if (row.id) {
          const query = { id: row.id }
          this.searchSlideshow(query).then(res => {
            const { slideshow: r } = res.data
            this.fileList = r.file ? [r.file] : []
            forEach(this.form, (v, k) => {
              this.form[k] = r[k]
            })
            this.oldCode = r.code
          })
          this.modalTitle = '编辑'
        } else {
          this.modalTitle = '新增'
        }
      })
      this.form.target = this.formTarget
      this.show = true
    },
    closeModal() {
      this.show = false
      forEach(this.form, (v, k, o) => {
        if (k === 'parentId') {
          o[k] = '0'
        } else {
          o[k] = ''
        }
      })
      this.oldCode = ''
      this.uploadImageAddress = ''
      this.fileList = []
    },
    showTipsModal(row) {
      this.form = row
      this.showTips = true
    },
    closeTipsModal() {
      this.showTips = false
    },
    beforeClose(done) {
      this.closeModal()
      done()
    },
    getList(query = {}) {
      const { name, status } = this.searchForm
      query.name = name
      query.status = status
      return this.getData(query).then(list => {
        this.list = list
        // this.page = page
      })
    },
    onSearch() {
      // const { pageSize, pageNum } = this.page
      // const query = {
      //   pageNum: parseInt(pageNum),
      //   pageSize: parseInt(pageSize)
      // }
      this.getList()
    },
    getParams(data, id) {
      const formData = new FormData()
      const file = this.fileList.length ? this.fileList[0].raw : ''
      let startTime = ''
      let endTime = ''
      if (data.startTime) {
        startTime = isDate(data.startTime) ? data.startTime : formatTime(data.startTime.getTime())
      }
      if (data.endTime) {
        endTime = isDate(data.endTime) ? data.endTime : formatTime(data.endTime.getTime())
      }
      if (id) {
        formData.append('code', this.oldCode)
        formData.append('newCode', data.code)
      } else {
        formData.append('code', data.code)
      }
      formData.append('name', data.name)
      formData.append('parentId', data.parentId)
      formData.append('desc', data.desc)
      formData.append('url', data.url)
      formData.append('imgUrl', data.imgUrl)
      formData.append('target', data.target)
      formData.append('sortIndex', data.sortIndex)
      formData.append('status', data.status)
      formData.append('startTime', startTime)
      formData.append('endTime', endTime)
      formData.append('click', data.click)
      formData.append('cssStyle', data.cssStyle)
      formData.append('cssClass', data.cssClass)
      formData.append('alt', data.alt)
      formData.append('extra', data.extra)
      formData.append('content', data.content)
      formData.append('file', file)
      return formData
    },
    submit() {
      const { id } = this.form
      const formData = this.getParams(this.form, id)
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 修改
          if (id) {
            formData.append('id', id)
            this.update(formData).then(res => {
              this.closeModal()
              this.onSearch()
            })
          // 新增
          } else {
            this.add(formData).then(res => {
              this.closeModal()
              this.onSearch()
            })
          }
        } else {
          if (this.activeName === 'senior') {
            let message = ''
            if (!this.form.name) {
              message = '请输入名称'
              this.$message.error(message)
              return
            }
            if (!this.form.sortIndex) {
              message = '请输入序号'
              this.$message.error(message)
              return
            }
          }
        }
      })
    },
    destroy() {
      const { id } = this.form
      this.destroyData({ id }).then(res => {
        this.closeTipsModal()
        this.onSearch()
      })
    },
    switchChange(row) {
      this.updateStatus({ id: row.id }).then(this.onSearch)
    },
    // 下拉框选择本地上传
    localUpload() {
      if (this.uploadImageAddress === '1') {
        this.$refs.upload.$el.click()
      }
    },
    // 点击选择图片
    selectedFile(file) {
      // 修改时imgUrl有值使用新上传文件替换
      if (this.form.imgUrl) {
        this.form.imgUrl = ''
      }
      this.fileList = [file]
    },
    sortChildren(data, order) {
      if (!(data && data.length > 1)) {
        return data
      }
      return data.sort((a, b) => {
        const data1 = a.children
        const data2 = b.children
        if (data1 && data1.length > 1) {
          a.children = this.sortChildren(data1, order)
        }
        if (data2 && data2.length > 1) {
          b.children = this.sortChildren(data2, order)
        }
        return order === 'descending' ? b.sortIndex - a.sortIndex : a.sortIndex - b.sortIndex
      })
    },
    sortByNumber(a, b) {
      const { order } = this.$refs.sortIndex.columnConfig
      let res
      if (order === 'descending') {
        res = a.sortIndex > b.sortIndex ? 1 : -1
      } else {
        res = b.sortIndex > a.sortIndex ? -1 : 1
      }
      a.children = this.sortChildren(a.children, order)
      b.children = this.sortChildren(b.children, order)
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.cms-carousel-manage {
  padding: 20px;
  .search-form {
    margin-top: 10px;
  }
  .mult-operation {
    margin-bottom: 10px;
    text-align: right;
  }
  .el-form {
    margin-top: 20px;
  }
}
</style>

