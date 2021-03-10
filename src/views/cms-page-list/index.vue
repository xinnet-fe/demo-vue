<template>
  <div class="order-form">
    <template v-if="!home">
      <!-- search -->
      <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true">
        <el-form-item label="页面名称" prop="name">
          <el-input v-model="searchForm.name" placeholder="请输入页面名称" clearable />
        </el-form-item>
        <el-form-item label="页面URL" prop="url">
          <el-input v-model="searchForm.url" placeholder="请输入页面URL" clearable />
        </el-form-item>
        <el-form-item label="站点类型" prop="siteType">
          <el-select v-model="searchForm.siteType" placeholder="请选择站点类型">
            <el-option v-for="({ value, key }) in siteTypes" :key="value" :label="key" :value="value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" size="medium" @click="onSearch">搜索</el-button>
          <el-button @click="resetModal">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- search -->

      <div class="operate-form">
        <el-button size="mini" @click="showModal()">添加</el-button>
        <el-button size="mini" @click="syncPreRelease">同步预发</el-button>
        <el-button size="mini" @click="syncOnline">同步线上</el-button>
      </div>

      <!-- table -->
      <el-table
        ref="table"
        v-loading="loading"
        :data="list"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="80"
        />
        <el-table-column
          ref="sortIndex"
          prop="sortIndex"
          label="序号"
          sortable
          width="80"
          :sort-method="sortByNumber"
        />
        <el-table-column
          prop="name"
          label="页面名称"
        />
        <el-table-column
          prop="siteType"
          label="站点类型"
        />
        <el-table-column
          prop="linkUrl"
          label="页面URL"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
        />
        <el-table-column
          prop="modifyTime"
          label="操作时间"
        />
        <el-table-column
          prop="lastAdvanceTime"
          label="预发时间"
        />
        <el-table-column
          prop="lastPublishTime"
          label="发布时间"
        />
        <el-table-column
          label="预发状态"
        >
          <template v-slot="{ row }">
            {{ advanceStatus[row.advanceStatus] }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="160">
          <template v-slot="{ row }">
            <el-button type="text" size="medium" @click="showModal(row)">编辑</el-button>
            <el-button type="text" size="medium" @click="showTipsModal(row)">删除</el-button>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown" class="column-table-dropdown">
                <el-dropdown-item>
                  <el-button type="text" size="mini" @click="preview(row)">预览</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" size="mini" @click="showPreReleaseModal(row)">预发</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" size="mini" @click="showPublishModal(row)">发布</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="page.count"
        :page.sync="page.pageNum"
        :limit.sync="page.pageSize"
        @pagination="getList"
      />
    </template>
    <!-- table -->

    <!-- form -->
    <div v-if="home">
      <page-header :go-back="goBack" :title="modalTitle" />
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="页面名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="序号" prop="sortIndex">
          <el-input-number v-model="form.sortIndex" />
        </el-form-item>
        <el-form-item label="站点类型" prop="siteType">
          <el-select v-model="form.siteType" placeholder="请选择站点类型">
            <el-option v-for="({ value, key }) in siteTypes" :key="value" :label="key" :value="value" />
          </el-select>
        </el-form-item>
        <el-form-item label="页面标题（T）" prop="title">
          <el-input v-model="form.title" :rows="3" type="textarea" />
        </el-form-item>
        <el-form-item label="页面描述（D）" prop="desc">
          <el-input v-model="form.desc" :rows="3" type="textarea" />
        </el-form-item>
        <el-form-item label="页面关键词（K）" prop="keywords">
          <el-input v-model="form.keywords" :rows="3" type="textarea" />
        </el-form-item>
        <el-form-item label="页面URL" prop="linkUrl">
          <el-input v-model="form.linkUrl" />
        </el-form-item>
        <el-form-item label="路径别名" prop="linkUrlAlias">
          <el-input v-model="form.linkUrlAlias" />
        </el-form-item>
        <el-form-item label="模板文件地址" prop="templateFile">
          <el-input v-model="form.templateFile" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="new-page-footer">
        <el-button size="medium" @click="goBack">取消</el-button>
        <el-button size="medium" type="primary" @click="submit">保存</el-button>
      </div>
    </div>
    <!-- form -->

    <!-- 删除提示 -->
    <el-dialog width="400px" title="提示" :visible.sync="showTips">
      <p>删除后前台展示页面也会删除，是否确认删除所选条目？</p>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="closeTipsModal">取消</el-button>
        <el-button size="medium" type="primary" @click="destroy">确认</el-button>
      </div>
    </el-dialog>
    <!-- 删除提示 -->

    <!-- 预发提示 -->
    <el-dialog width="400px" title="提示" :visible.sync="showPreRelease" :before-close="beforeClosePreReleaseModal">
      <p>是否确认预发所选条目？</p>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="closePreReleaseModal">取消</el-button>
        <el-button size="medium" type="primary" @click="preRelease">确认</el-button>
      </div>
    </el-dialog>
    <!-- 预发提示 -->

    <!-- 发布提示 -->
    <el-dialog width="400px" title="提示" :visible.sync="showPublish" :before-close="beforeClosePublishModal">
      <p>是否确认发布所选条目？</p>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="closePublishModal">取消</el-button>
        <el-button size="medium" type="primary" @click="toPublish">确认</el-button>
      </div>
    </el-dialog>
    <!-- 发布提示 -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import forEach from 'lodash/forEach'
import PageHeader from '@/components/PageHeader'
import Pagination from '@/components/Pagination'

export default {
  name: 'CmsPageList',
  cname: '页面列表（原单页面管理）',
  components: {
    PageHeader,
    Pagination
  },
  data() {
    return {
      // 搜索框
      searchForm: {
        name: '',
        url: '',
        siteType: ''
      },
      // 全部类型
      types: [],
      // 一级页面
      home: false,
      // 发布弹框
      showPublish: false,
      // 预发提示弹框
      showPreRelease: false,
      modalTitle: '添加',
      // 弹框表单数据
      form: {
        name: '',
        title: '',
        desc: '',
        siteType: '',
        keywords: '',
        linkUrl: '',
        linkUrlAlias: '',
        thumbnail: '',
        sortIndex: '',
        templateFile: ''
      },
      // 修改时传递的旧code
      oldCode: '',
      // 弹框表单规则
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        siteType: [{ required: true, message: '请输入类型', trigger: 'blur' }],
        sortIndex: [{ required: true, message: '请输入序号', trigger: 'blur' }],
        linkUrl: [{ required: true, message: '请输入页面URL', trigger: 'blur' }],
        templateFile: [{ required: true, message: '请输入模板文件地址', trigger: 'blur' }]
      },
      advanceStatus: ['未预发', '已预发'],
      // 删除弹框
      showTips: false,
      // 表格的数据
      list: [],
      // 分页
      page: {
        count: 0,
        pageNum: 1,
        pageSize: 30
      },
      // 临时row数据
      row: {},
      editorItems: [
        'source', '|', 'undo', 'redo', '|', 'cut', 'copy', 'paste',
        'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
        'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript', 'superscript', '|', 'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'table', 'hr', 'pagebreak', 'anchor', 'link', 'unlink'
      ],
      preReleaseRow: {},
      action: ''
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.global,
      siteTypes: state => state.cms.singlePageSiteType
    })
  },
  created() {
    this.getSiteTypeMapping()
    this.onSearch()
  },
  methods: {
    ...mapActions({
      getData: 'cms/singlePageList',
      add: 'cms/addSinglePage',
      update: 'cms/updateSinglePage',
      destroyData: 'cms/destroySinglePage',
      searchSinglePage: 'cms/searchSinglePage',
      // singlePageTypeMapping: 'cms/singlePageTypeMapping',
      previewPage: 'cms/previewPage',
      mkHtml: 'cms/mkHtml',
      publish: 'cms/publish',
      // searchTemplate: 'cms/searchTemplate',
      editTemplate: 'cms/editTemplate',
      // 站点类型
      getSiteTypeMapping: 'cms/singlePageSiteTypeMapping',
      toSyncPreRelease: 'cms/syncPreRelease',
      toSyncOnline: 'cms/syncOnline'
    }),
    showModal(row = {}) {
      if (row.id) {
        const query = { id: row.id }
        this.searchSinglePage(query).then(res => {
          const { page } = res.data
          forEach(this.form, (v, k, o) => {
            this.form[k] = page[k] || ''
          })
          this.form.id = page.id
          this.oldCode = page.code
          let tag = ''
          if (page.hotStatus === '1') {
            tag = '1'
          }
          if (page.newStatus === '1') {
            tag = '2'
          }
          this.form.tag = tag
        })
        this.action = 'modify'
        this.modalTitle = '编辑'
      } else {
        this.action = 'add'
        delete this.form.id
        this.modalTitle = '添加'
      }
      this.home = true
    },
    goBack() {
      this.home = false
      forEach(this.form, (v, k, o) => {
        if (k === 'parentId') {
          o[k] = '0'
        } else {
          o[k] = ''
        }
      })
      this.oldCode = ''
      delete this.form.id
    },
    // 同步预发
    syncPreRelease() {
      this.toSyncPreRelease()
    },
    // 同步线上
    syncOnline() {
      this.toSyncOnline()
    },
    showTipsModal(row) {
      this.form.id = row.id
      this.showTips = true
    },
    closeTipsModal() {
      this.showTips = false
    },
    showPreReleaseModal(row) {
      this.showPreRelease = true
      this.preReleaseRow = row
    },
    closePreReleaseModal() {
      this.showPreRelease = false
      this.preReleaseRow = {}
    },
    beforeClosePreReleaseModal(done) {
      this.closePreReleaseModal()
      done()
    },
    preRelease() {
      const row = this.preReleaseRow
      this.mkHtml(row.id).then(res => {
        this.$message.success(res.msg)
        this.closePreReleaseModal()
      })
    },
    preview(row) {
      this.previewPage(row.id).then(res => {
        const { data } = res
        if (data && data.url) {
          let prefix = ''
          if (data.url.indexOf('https') === -1) {
            prefix = 'https://'
          }
          window.open(prefix + data.url)
        }
      })
    },
    showPublishModal(row) {
      this.showPublish = true
      this.row = row
    },
    closePublishModal() {
      this.showPublish = false
      this.row = {}
    },
    beforeClosePublishModal(done) {
      this.closePublishModal()
      done()
    },
    toPublish() {
      this.publish(this.row.id).then(res => {
        this.$message.success(res.msg)
        this.closePublishModal()
      }).catch(() => {
        this.closePublishModal()
      })
    },
    getList(query = {}) {
      const { name, url, siteType } = this.searchForm
      query.name = name
      query.url = url
      query.siteType = siteType
      return this.getData(query).then(res => {
        const { list, page } = res
        this.list = list
        this.page = page
      })
    },
    onSearch() {
      const { pageNum, pageSize } = this.page
      const query = { pageNum, pageSize }
      this.getList(query)
    },
    resetModal() {
      this.$refs.searchForm.resetFields()
    },
    getParams(id) {
      const formData = new FormData()
      const data = this.form

      formData.append('name', data.name)
      formData.append('siteType', data.siteType)
      formData.append('title', data.title)
      formData.append('desc', data.desc)
      formData.append('keywords', data.keywords)
      formData.append('linkUrl', data.linkUrl)
      formData.append('linkUrlAlias', data.linkUrlAlias)
      formData.append('templateFile', data.templateFile)
      formData.append('sortIndex', data.sortIndex)
      return formData
    },
    submit() {
      const { id } = this.form
      const formData = this.getParams(id)
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 修改
          if (id) {
            formData.append('id', id)
            this.update(formData).then(res => {
              this.goBack()
              this.onSearch()
              this.singlePageTypeMapping()
            })
          // 新增
          } else {
            this.add(formData).then(res => {
              this.goBack()
              this.onSearch()
              this.singlePageTypeMapping()
            })
          }
        }
      })
    },
    destroy() {
      const { id } = this.form
      this.destroyData(id).then(res => {
        this.closeTipsModal()
        this.onSearch()
        delete this.form.id
      })
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

<style scoped>
.elfinder {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9991;
  background: #ccc;
}
.elfinder-close {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9992;
  cursor: pointer;
}
.el-dropdown-link {
  cursor: pointer;
  color: #0180cd;
  font-size: 12px;
  margin-left: 10px;
  letter-spacing: normal;
}
.new-page-footer {
  margin-left: 100px;
}
.column-table-dropdown >>> .el-button--text {
  color: #606266;
}
.column-table-dropdown >>> .el-button--text:hover,
.column-table-dropdown >>> .el-button--text:focus {
  color: #3499d7;
  border-color: transparent;
  background-color: transparent;
}
</style>
