<template>
  <div class="cms-carousel-manage">
    <!-- search -->
    <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true">
      <el-form-item label="名称:" prop="name">
        <el-input v-model="searchForm.name" placeholder="请输入名称" clearable />
      </el-form-item>
      <el-form-item label="状态:" prop="website">
        <el-select v-model="searchForm.state">
          <el-option v-for="(label, value) in states" :key="value" :label="label" :value="value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- search -->

    <div class="mult-operation">
      <el-button type="primary" size="mini" @click="showModal">新增轮播</el-button>
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
        ref="number"
        prop="number"
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
            v-model="row.state"
            active-value="1"
            inactive-value="0"
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
    <pagination
      :total="page.total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="getList"
    />
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
              <el-form-item label="轮播树级:" prop="parentCode">
                <el-select v-model="form.parentCode" placeholder="请选择">
                  <el-option label="一级" value="1" />
                  <el-option label="二级" value="2" />
                </el-select>
              </el-form-item>
              <el-form-item label="描述:" prop="describe">
                <el-input v-model="form.describe" :rows="3" type="textarea" />
              </el-form-item>
              <el-form-item label="图片地址:" prop="imageAddress">
                <el-col :span="16">
                  <el-input v-model="form.imageAddress" />
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
                  :file-list="fileList"
                >
                  <el-button ref="upload" size="small" type="primary" @click="clickUpload">点击上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="链接:" prop="linkAddress">
                <el-input v-model="form.linkAddress" />
              </el-form-item>
              <el-form-item label="打开方式">
                <el-select v-model="form.openMode">
                  <el-option v-for="(label, value) in openModes" :key="value" :label="label" :value="value" />
                </el-select>
              </el-form-item>
              <el-form-item label="序号:" prop="number">
                <el-input-number v-model="form.number" />
              </el-form-item>
              <el-form-item label="状态:" prop="state">
                <el-switch
                  v-model="form.state"
                  active-value="1"
                  inactive-value="0"
                />
              </el-form-item>
              <el-form-item label="发布时间:" prop="publishTime">
                <el-date-picker
                  v-model="form.publishTime"
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
                <el-input v-model="form.clickEvent" />
              </el-form-item>
              <el-form-item label="css样式:">
                <el-input v-model="form.cssStyle" :rows="3" type="textarea" />
              </el-form-item>
              <el-form-item label="提示:">
                <el-input v-model="form.tips" :rows="3" type="textarea" />
              </el-form-item>
              <el-form-item label="扩展:">
                <el-input v-model="form.extend" :rows="3" type="textarea" />
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
import forEach from 'lodash/forEach'
import Pagination from '@/components/Pagination'
import { carouselList, addCarousel, updateCarousel, destroyCarousel } from '@/api/cms'

export default {
  name: 'CmsCarouselManage',
  components: {
    Pagination
  },
  data() {
    return {
      // tabs
      activeName: 'basis',
      loading: false,
      // 搜索框
      searchForm: {
        name: '',
        state: '0'
      },
      // 弹框
      show: false,
      modalTitle: '新增',
      // 弹框表单数据
      form: {
        id: '',
        code: '',
        parentCode: '',
        describe: '',
        linkAddress: '',
        imageAddress: '',
        number: '',
        publishTime: '',
        endTime: '',
        state: '',
        openMode: '0',
        // 高级属性
        clickEvent: '',
        cssStyle: '',
        tips: '',
        extend: '',
        content: ''
      },
      // 上传图片下拉框值
      uploadImageAddress: '',
      // 弹框表单规则
      rules: {
        name: [{ required: true, message: '请输入广告组名称', trigger: 'blur' }],
        // linkAddress: [{ required: true, message: '请输入外链地址', trigger: 'blur' }],
        number: [{ required: true, message: '请输入序号', trigger: 'blur' }]
      },
      // 广告状态列表
      states: {
        0: '全部',
        1: '开启',
        2: '关闭'
      },
      // 广告组
      advertGroups: {
        0: '广告组一',
        1: '广告组二'
      },
      // 删除弹框
      showTips: false,
      // 表格的数据
      list: [],
      page: {
        total: 0,
        page: 1,
        limit: 30
      },
      // 上传附件列表
      fileList: [],
      // 打开方式列表
      openModes: {
        0: '新窗口',
        1: '当前窗口',
        2: '父窗口',
        3: '顶级窗口'
      }
    }
  },
  methods: {
    showModal(row = {}) {
      if (row.id) {
        this.form = row
        forEach(this.form, (v, k, o) => (o[k] = row[k]))
        this.modalTitle = '编辑'
      } else {
        this.modalTitle = '新增'
      }
      this.show = true
    },
    closeModal() {
      this.show = false
      forEach(this.form, (v, k, o) => {
        if (k === 'openMode') {
          o[k] = '0'
        } else {
          o[k] = ''
        }
      })
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
      const { name, state } = this.searchForm
      name && (query.name = name)
      state && (query.state = state)
      return carouselList(query).then(res => {
        const { data, page } = res.data
        this.list = data
        this.page = page
      })
    },
    onSearch() {
      const { page, limit } = this.page
      const query = { page, limit }
      this.getList(query)
    },
    submit() {
      const { id, ...restData } = this.form
      const data = { ...restData }
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 修改
          if (id) {
            data.id = id
            updateCarousel(data).then(res => {
              this.closeModal()
              this.onSearch()
            })
          // 新增
          } else {
            addCarousel(data).then(res => {
              this.closeModal()
              this.onSearch()
            })
          }
        }
      })
    },
    destroy() {
      const { id } = this.form
      destroyCarousel(id).then(res => {
        this.closeTipsModal()
        this.onSearch()
      })
    },
    // 下拉框选择本地上传
    localUpload() {
      if (this.uploadImageAddress === '1') {
        this.$refs.upload.$el.click()
      }
    },
    // 点击选择图片
    clickUpload(e) {
      console.log(e)
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
        return order === 'descending' ? b.number - a.number : a.number - b.number
      })
    },
    sortByNumber(a, b) {
      const { order } = this.$refs.number.columnConfig
      let res
      if (order === 'descending') {
        res = a.number > b.number ? 1 : -1
      } else {
        res = b.number > a.number ? -1 : 1
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

