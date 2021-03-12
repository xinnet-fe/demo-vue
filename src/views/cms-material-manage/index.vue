<template>
  <div class="order-form">
    <template v-if="home">
      <!-- search -->
      <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true">
        <el-form-item label="标题" prop="title">
          <el-input v-model="searchForm.title" placeholder="请输入标题" clearable />
        </el-form-item>
        <el-form-item label="业务类型" prop="businessType">
          <el-select v-model="searchForm.businessType" placeholder="请输入业务类型">
            <el-option v-for="({ value, key }) in businessTypes" :key="value" :label="key" :value="value" />
          </el-select>
        </el-form-item>
        <el-form-item label="资料类型" prop="materialType">
          <el-select v-model="searchForm.materialType" placeholder="请输入资料类型">
            <el-option v-for="({ value, key }) in materialTypes" :key="value" :label="key" :value="value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" size="medium" @click="onSearch">搜索</el-button>
          <el-button @click="resetModal">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- search -->

      <div class="operate-form">
        <el-button size="mini" @click="goInto()">添加</el-button>
      </div>

      <!-- table -->
      <el-table
        ref="table"
        v-loading="loading"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="60"
        />
        <el-table-column
          prop="id"
          label="ID"
          width="80"
        />
        <el-table-column
          prop="title"
          label="标题"
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
          prop="businessType"
          label="业务类型"
        />
        <el-table-column
          prop="materialType"
          label="资料类型"
        />
        <el-table-column
          prop="issuer"
          label="发布者"
        />
        <el-table-column
          prop="department"
          label="部门"
        />
        <el-table-column
          prop="modifyTime"
          label="操作时间"
        />
        <el-table-column label="操作" fixed="right" width="210">
          <template v-slot="{ row }">
            <el-button type="text" size="medium" @click="goInto(row)">编辑</el-button>
            <el-button type="text" size="mini" @click="preview(row)">预览文件</el-button>
            <el-button type="text" size="mini" @click="preview(row)">下载</el-button>
            <el-button type="text" size="medium" @click="showTipsModal(row)">删除</el-button>
          </template>
        </el-table-column>
        <template v-if="list.length" v-slot:append>
          <div class="table-footer">
            <div class="table-operation">
              <el-button size="mini" @click="handleSelectionChangeAll">全选</el-button>
              <el-button size="mini">删除</el-button>
            </div>
            <pagination
              :total="page.count"
              :page.sync="page.pageNum"
              :limit.sync="page.pageSize"
              @pagination="getList"
            />
          </div>
        </template>
      </el-table>
    </template>
    <!-- table -->

    <!-- form -->
    <div v-if="!home">
      <page-header :go-back="goBack" :title="modalTitle" />
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="资料标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入，必填" />
        </el-form-item>
        <el-form-item label="资料类型">
          <el-radio-group v-model="form.materialType">
            <el-radio v-for="({ value, key }) in materialTypes" :key="value" :label="value">{{ key }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.materialType === 'scheme' || form.materialType === 'productIntroduce'" label="业务类型">
          <el-checkbox-group v-model="form.businessTypes">
            <el-checkbox v-for="({ value, key }) in businessTypes" :key="value" :label="key" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="form.materialType === 'productIntroduce'" label="产品标识">
          <el-select v-model="form.productIdent" placeholder="请选择产品标识" @change="changeProductIntroduce">
            <el-option v-for="({ value, key }) in productIndents" :key="value" :label="key" :value="value" />
          </el-select>
        </el-form-item>
        <template v-if="form.materialType === 'scheme'">
          <el-form-item label="行业标签">
            <el-checkbox-group v-model="form.industry" @change="checkLabels">
              <el-checkbox v-for="({ name, code }) in industries" :key="code" :label="code">
                {{ name }}
              </el-checkbox>
              <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="checkAllLabels">选择全部</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="所在地区" prop="provinceCity">
            <el-cascader
              :props="provinces"
              collapse-tags
              clearable
              @change="changeProvinces"
            />
          </el-form-item>
        </template>
        <!-- <el-form-item label="选用产品">
          <el-input v-model="form.products" type="textarea" />
          <div class="tips">多个产品名称用“空格”区分。</div>
        </el-form-item> -->
        <el-form-item label="图片地址" prop="imgUrl">
          <el-upload
            ref="uploadImg"
            class="local-upload"
            action="/api/upload/img"
            list-type="picture"
            :limit="1"
            :auto-upload="false"
            :on-change="selectedFile"
            :file-list="fileList"
          >
            <el-button ref="upload" size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div class="tips">文件扩展名仅支持 .PDF 格式；</div>
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

    <!-- 模板管理 -->
    <el-dialog width="800px" :before-close="beforeTemplateClose" destroy-on-close title="模板管理" :visible.sync="showTemplate">
      <el-form ref="templateForm">
        <el-form-item>
          <editor
            id="editor_id"
            width="760px"
            height="560px"
            plugins-path="/static/kindeditor/plugins/"
            upload-json="/order/upload/"
            :items="editorItems"
            :content="editorText"
            :load-style-mode="false"
            @on-content-change="handleContentChange"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="closeTemplateModal">取消</el-button>
        <el-button size="medium" type="primary" @click="submitTemplate">保存</el-button>
      </div>
    </el-dialog>
    <!-- 模板管理 -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import forEach from 'lodash/forEach'
import PageHeader from '@/components/PageHeader'
import Pagination from '@/components/Pagination'

export default {
  name: 'CmsMaterialManage',
  cname: '资料管理',
  components: {
    PageHeader,
    Pagination
  },
  data() {
    const self = this
    return {
      // 搜索框
      searchForm: {
        title: '',
        buniesslType: '',
        materialType: ''
      },
      // 一级页面
      home: true,
      // 模板弹框
      showTemplate: false,
      // 预发提示弹框
      showPreRelease: false,
      modalTitle: '添加',
      // 弹框表单数据
      form: {
        title: '',
        businessTypes: [],
        materialType: 'file',
        industry: [],
        provinceCity: '',
        products: '',
        imgUrl: '',
        productIndent: ''
      },
      // 修改时传递的旧code
      oldCode: '',
      // 弹框表单规则
      rules: {
        title: [{ required: true, message: '请输入资料标题', trigger: 'blur' }],
        provinceCity: [{ required: true, message: '请选择所在地区', trigger: 'blur' }]
      },
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
      // 模板内容
      editorText: '',
      editorItems: [
        'source', '|', 'undo', 'redo', '|', 'cut', 'copy', 'paste',
        'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
        'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript', 'superscript', '|', 'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'table', 'hr', 'pagebreak', 'anchor', 'link', 'unlink'
      ],
      preReleaseRow: {},
      action: '',
      singlePageTypes: [
        {
          key: 'PC',
          value: 'PC'
        },
        {
          key: 'M站',
          value: 'M站'
        }
      ],
      businessTypes: [
        {
          key: 'toB',
          value: 'toB'
        },
        {
          key: 'toC',
          value: 'toC'
        }
      ],
      materialTypes: [
        {
          key: '公共文件',
          value: 'file'
        },
        {
          key: '解决方案',
          value: 'scheme'
        },
        {
          key: '产品介绍',
          value: 'productIntroduce'
        }
      ],
      productIndents: [
        {
          key: '标识01',
          value: '1'
        }
      ],
      // 上传图片下拉框值
      uploadImageAddress: '',
      // 上传附件列表
      fileList: [],
      // 表单-选择全部标签状态
      checkAll: false,
      // 表单-选择全部标签不确定状态
      isIndeterminate: false,
      multipleSelection: [],
      // 区域级联属性
      provinces: {
        multiple: true,
        lazy: true,
        lazyLoad(node, resolve) {
          const { level, value: parentCode } = node
          const params = {}
          if (level > 0) {
            params.parentCode = parentCode
          }
          self.listAreaByParentCode(params).then(data => {
            const nodes = data.map(row => ({
              label: row.name,
              value: row.code,
              leaf: level >= 1
            }))
            resolve(nodes)
          })
        }
      },
      // 行业
      industries: []
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.global
      // singlePageTypes: state => state.cms.singlePageType
    })
  },
  created() {
    this.singlePageTypeMapping()
    this.onSearch()

    this.listIndustryCategory().then(data => (this.industries = data))
  },
  methods: {
    ...mapActions({
      uploadFile: 'cms/uploadFile',
      getData: 'cms/singlePageList',
      add: 'cms/addSinglePage',
      update: 'cms/updateSinglePage',
      destroyData: 'cms/destroySinglePage',
      searchSinglePage: 'cms/searchSinglePage',
      singlePageTypeMapping: 'cms/singlePageTypeMapping',
      mkHtml: 'cms/mkHtml',
      searchTemplate: 'cms/searchTemplate',
      editTemplate: 'cms/editTemplate',
      listAreaByParentCode: 'cms/listAreaByParentCode',
      listIndustryCategory: 'cms/listIndustryCategory'
    }),
    // 下拉框选择本地上传
    changeProductIntroduce() {
    },
    // 点击选择图片
    selectedFile(file) {
      const formData = new FormData()
      formData.append('file', file.raw)
      this.uploadFile(formData).then(thumbnail => (this.form.thumbnail = thumbnail))

      if (this.form.thumbnail) {
        this.form.thumbnail = ''
      }
    },
    checkLabels(val) {
      const labelLen = Object.keys(this.industries).length
      const checkedCount = val.length
      this.checkAll = checkedCount === labelLen
      this.isIndeterminate = checkedCount > 0 && checkedCount < labelLen
    },
    checkAllLabels(val) {
      if (val) {
        this.industries.forEach(item => {
          this.form.industry.push(item.code)
        })
      } else {
        this.form.industry = []
      }
      this.isIndeterminate = false
    },
    goInto(row = {}) {
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
          if (page.imgUrl) {
            const file = {
              name: page.imgUrl,
              url: page.imgUrl
            }
            this.fileList = [file]
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
      this.home = false
    },
    changeProvinces(provinceCity) {
      this.form.provinceCity = provinceCity
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSelectionChangeAll() {
      const { $refs, list, multipleSelection } = this
      const { clearSelection, toggleRowSelection } = $refs.table
      if (multipleSelection.length) {
        clearSelection()
      } else {
        list.forEach(row => {
          toggleRowSelection(row, true)
        })
      }
    },
    goBack() {
      this.home = true
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
    showTipsModal(row) {
      this.form.id = row.id
      this.showTips = true
    },
    closeTipsModal() {
      this.showTips = false
    },
    showTemplateModal(row) {
      this.row = row
      this.searchTemplate(row.id).then(res => {
        const { data } = res
        if (data && data.content) {
          this.editorText = data.content
        }
        this.showTemplate = true
      })
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
        this.$message.success(res.data.msg)
        this.closePreReleaseModal()
      })
    },
    preview(row) {
      window.open('http://xcms.xinnet.com' + row.linkUrl)
    },
    closeTemplateModal() {
      this.showTemplate = false
      this.resetTemplateData()
    },
    resetTemplateData() {
      this.row = {}
      this.editorText = ''
    },
    submitTemplate() {
      const formData = new FormData()
      formData.append('id', this.row.id)
      formData.append('content', this.editorText)
      this.editTemplate(formData).then(res => {
        this.$message.success(res.data.msg)
        this.showTemplate = false
        this.resetTemplateData()
      })
    },
    beforeTemplateClose(done) {
      this.resetTemplateData()
      done()
    },
    getList(query = {}) {
      const { name, type, url } = this.searchForm
      if (name) {
        query.name = name
      }
      if (type) {
        query.type = type
      }
      if (url) {
        query.url = url
      }
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
      formData.append('type', data.type)
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
    },
    closeIframe() {
      this.showIframeModal = false
    },
    handleContentChange(val) {
      this.editorText = val
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
.table-footer {
  position: relative;
}
.table-operation {
  position: absolute;
  left: 0;
  top: 30px;
}
.tips {
  font-size: 12px;
  color: #606266;
}
.local-upload {
  width: 350px;
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
