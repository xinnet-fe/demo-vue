<template>
  <div class="order-form">
    <!-- search -->
    <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true">
      <el-form-item label="页面名称" prop="name">
        <el-input v-model="searchForm.name" placeholder="请输入页面名称" clearable />
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="searchForm.type" placeholder="请选择类型">
          <el-option v-for="item in types" :key="item.value" :label="item.key" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="页面URL" prop="url">
        <el-input v-model="searchForm.url" placeholder="请输入页面URL" clearable />
      </el-form-item>
    </el-form>
    <!-- search -->

    <div class="operate-form">
      <el-button size="mini" @click="showModal()">新增</el-button>
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
      />
      <el-table-column
        ref="sortIndex"
        prop="sortIndex"
        label="序号"
        sortable
        :sort-method="sortByNumber"
      />
      <el-table-column
        prop="name"
        label="页面名称"
      />
      <el-table-column
        prop="type"
        label="类型"
      />
      <el-table-column
        prop="url"
        label="页面URL"
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
      />
      <el-table-column
        prop="updateTime"
        label="操作时间"
      />
      <el-table-column label="操作" fixed="right" width="260">
        <template v-slot="{ row }">
          <el-button type="text" size="medium" @click="showModal(row)">编辑</el-button>
          <el-button type="text" size="medium" @click="showTemplateModal(row)">模板管理</el-button>
          <el-button type="text" size="medium">预发</el-button>
          <el-button type="text" size="medium">预览</el-button>
          <el-button type="text" size="medium" @click="showTipsModal(row)">删除</el-button>
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
    <el-dialog width="800px" :before-close="beforeClose" destroy-on-close :title="modalTitle" :visible.sync="show">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="页面名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="类型">
          <el-cascader
            v-model="form.parentId"
            :options="navType"
            placeholder="作为顶级分类"
            filterable
            change-on-select
          />
        </el-form-item>
        <el-form-item label="序号" prop="sortIndex">
          <el-input-number v-model="form.sortIndex" />
        </el-form-item>
        <el-form-item label="页面标题（T）" prop="title">
          <el-input v-model="form.title" :rows="3" type="textarea" />
        </el-form-item>
        <el-form-item label="页面描述（D）" prop="desc">
          <el-input v-model="form.desc" :rows="3" type="textarea" />
        </el-form-item>
        <el-form-item label="页面关键词（T）" prop="keywords">
          <el-input v-model="form.keywords" :rows="3" type="textarea" />
        </el-form-item>
        <el-form-item label="页面URL" prop="url">
          <el-input v-model="form.url" />
        </el-form-item>
        <el-form-item label="路径别名" prop="alias">
          <el-input v-model="form.alias" />
        </el-form-item>
        <el-form-item label="模板文件地址" prop="address">
          <el-input v-model="form.address" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="closeModal">取消</el-button>
        <el-button size="medium" type="primary" @click="submit">保存</el-button>
      </div>
    </el-dialog>
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

    <!-- 模板管理 -->
    <el-dialog width="800px" :before-close="beforeTemplateClose" destroy-on-close title="模板管理" :visible.sync="showTemplate">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="页面名称" prop="name">
          <el-input v-model="form.name" />
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
import Pagination from '@/components/Pagination'

export default {
  name: 'CmsNavManage',
  components: {
    Pagination
  },
  data() {
    return {
      // 搜索框
      searchForm: {
        name: '',
        type: '',
        url: ''
      },
      // 全部类型
      types: [],
      // 弹框
      show: false,
      // 模板弹框
      showTemplate: false,
      modalTitle: '新增',
      // 弹框表单数据
      form: {
        name: '',
        parentId: '0',
        code: '',
        sortIndex: '',
        title: '',
        desc: '',
        keywords: '',
        url: '',
        alias: '',
        address: ''
      },
      // 修改时传递的旧code
      oldCode: '',
      // 弹框表单规则
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        sortIndex: [{ required: true, message: '请输入序号', trigger: 'blur' }],
        url: [{ required: true, message: '请输入页面URL', trigger: 'blur' }],
        address: [{ required: true, message: '请输入模板文件地址', trigger: 'blur' }]
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
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.global,
      openMode: state => state.cms.navOpenMode,
      navType: state => state.cms.navType
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
    this.onSearch()

    this.height = global.innerHeight + 'px'
  },
  methods: {
    ...mapActions({
      getData: 'cms/navList',
      add: 'cms/addNav',
      update: 'cms/updateNav',
      destroyData: 'cms/destroyNav',
      searchNav: 'cms/searchNav',
      getTargetMapping: 'cms/navTargetMapping',
      getParentIdMapping: 'cms/navParentIdMapping',
      updateStatus: 'cms/navStatusSwitch'
    }),
    showModal(row = {}) {
      this.getParentIdMapping().then(() => {
        if (row.id) {
          const query = { id: row.id }
          this.searchNav(query).then(res => {
            const { navigation: nav } = res.data
            forEach(this.form, (v, k, o) => {
              this.form[k] = nav[k] || ''
            })
            this.form.id = nav.id
            this.oldCode = nav.code
            let tag = ''
            if (nav.hotStatus === '1') {
              tag = '1'
            }
            if (nav.newStatus === '1') {
              tag = '2'
            }
            this.form.tag = tag
          })
          this.modalTitle = '编辑'
        } else {
          delete this.form.id
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
      delete this.form.id
    },
    showTipsModal(row) {
      this.form.id = row.id
      this.showTips = true
    },
    closeTipsModal() {
      this.showTips = false
    },
    beforeClose(done) {
      this.closeModal()
      done()
    },
    showTemplateModal(row) {
      this.showTemplate = true
    },
    closeTemplateModal() {
      this.showTemplate = false
    },
    beforeTemplateClose(done) {
      done()
    },
    getList(query = {}) {
      const { name } = this.searchForm
      query.name = name
      return this.getData(query).then(list => {
        this.list = list
        this.page = list ? list.page : {}
      })
    },
    onSearch() {
      const { pageNum, pageSize } = this.page
      const query = { pageNum, pageSize }
      this.getList(query)
    },
    getParams(id) {
      const formData = new FormData()
      const data = this.form
      const parentId = data.parentId && data.parentId.length ? String(data.parentId[data.parentId.length - 1]) : '0'

      if (id) {
        formData.append('code', this.oldCode)
        formData.append('newCode', data.code)
      } else {
        formData.append('code', data.code)
      }
      formData.append('name', data.name)
      formData.append('parentId', parentId)
      formData.append('sortIndex', data.sortIndex)
      formData.append('title', data.title)
      formData.append('desc', data.desc)
      formData.append('keywords', data.keywords)
      formData.append('url', data.url)
      formData.append('alias', data.imgUrl)
      formData.append('address', data.address)
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
        }
      })
    },
    destroy() {
      const { id } = this.form
      this.destroyData({ id }).then(res => {
        this.closeTipsModal()
        this.onSearch()
        delete this.form.id
      })
    },
    switchChange(row) {
      this.updateStatus({ id: row.id }).then(this.onSearch)
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
