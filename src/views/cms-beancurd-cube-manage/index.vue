<template>
  <div class="order-form">
    <!-- search -->
    <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true">
      <el-form-item label="名称" prop="name">
        <el-input v-model="searchForm.name" placeholder="请输入名称" clearable />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select v-model="searchForm.state" placeholder="请选择状态">
          <el-option v-for="({ value, key }) in states" :key="value" :label="key" :value="value" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          v-model="searchForm.createTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" size="medium" @click="onSearch">搜索</el-button>
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
      row-key="id"
      :tree-props="{children: 'children'}"
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        ref="sortIndex"
        prop="sortIndex"
        label="序号"
        sortable
        :sort-method="sortByNumber"
      />
      <el-table-column
        prop="code"
        label="code"
      />
      <el-table-column
        prop="desc"
        label="描述"
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
      />
      <el-table-column
        prop="updateTime"
        label="操作时间"
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
          <el-button type="text" size="medium" @click="showModal(row)">编辑</el-button>
          <el-button v-if="!(row.children && row.children.length)" type="text" size="medium" @click="showTipsModal(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table -->

    <!-- form -->
    <el-dialog width="800px" :before-close="beforeClose" destroy-on-close :title="modalTitle" :visible.sync="show">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="所属分类">
          <el-cascader
            v-model="form.parentId"
            :options="types"
            placeholder="作为顶级分类"
            filterable
            change-on-select
          />
        </el-form-item>
        <el-form-item label="code">
          <el-input v-model="form.code" />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="form.desc" :rows="3" type="textarea" />
        </el-form-item>
        <el-form-item label="链接" prop="url">
          <el-input v-model="form.url" />
        </el-form-item>
        <el-form-item label="序号" prop="sortIndex">
          <el-input-number v-model="form.sortIndex" />
        </el-form-item>
        <el-form-item label="显示状态" prop="status">
          <el-switch
            v-model="form.status"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="form.content" :rows="3" type="textarea" />
        </el-form-item>
        <el-form-item label="扩展" prop="extra">
          <json-editor ref="jsonEditor" v-model="form.extra" width="600" />
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import forEach from 'lodash/forEach'
// import Pagination from '@/components/Pagination'
import JsonEditor from '@/components/JsonEditor'

export default {
  name: 'CmsBeancurdCubeManage',
  components: {
    JsonEditor
  },
  data() {
    return {
      // 搜索框
      searchForm: {
        name: '',
        state: '',
        createTime: ''
      },
      // 弹框
      show: false,
      modalTitle: '新增',
      // 弹框表单数据
      form: {
        name: '',
        parentId: '0',
        code: '',
        desc: '',
        url: '',
        target: '',
        sortIndex: '',
        status: '',
        extra: '',
        content: ''
      },
      // 修改时传递的旧code
      oldCode: '',
      // 弹框表单规则
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        sortIndex: [{ required: true, message: '请输入序号', trigger: 'blur' }]
      },
      // 删除弹框
      showTips: false,
      // 表格的数据
      list: [],
      // 默认打开方式
      formTarget: ''
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.global,
      types: state => state.cms.widgetType,
      states: state => state.cms.widgetStatus
    })
  },
  created() {
    this.widgetParentIdMapping()
    this.widgetStatusMapping()
    this.onSearch()
  },
  methods: {
    ...mapActions({
      getData: 'cms/beancurdCubeList',
      add: 'cms/addBeancurdCube',
      update: 'cms/updateBeancurdCube',
      destroyData: 'cms/destroyBeancurdCube',
      searchBeancurdCube: 'cms/searchBeancurdCube',
      updateStatus: 'cms/widgetStatusSwitch',
      widgetParentIdMapping: 'cms/widgetParentIdMapping',
      widgetStatusMapping: 'cms/widgetStatusMapping'
    }),
    showModal(row = {}) {
      this.widgetParentIdMapping().then(() => {
        if (row.id) {
          const query = { id: row.id }
          this.searchBeancurdCube(query).then(res => {
            const { widget: cube } = res.data
            forEach(this.form, (v, k, o) => {
              this.form[k] = cube[k] || ''
            })
            this.form.id = cube.id
            this.oldCode = cube.code
            let tag = ''
            if (cube.hotStatus === '1') {
              tag = '1'
            }
            if (cube.newStatus === '1') {
              tag = '2'
            }
            this.form.tag = tag
          })
          this.modalTitle = '编辑'
        } else {
          delete this.form.id
          this.modalTitle = '新增'
          this.form.extra = ''
        }
      })
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
    getList(query = {}) {
      const { name } = this.searchForm
      query.name = name
      return this.getData(query).then(list => {
        this.list = list
      })
    },
    onSearch() {
      this.getList()
    },
    getParams(id) {
      const formData = new FormData()
      const data = this.form
      let parentId = '0'
      if (data.parentId && data.parentId.length) {
        parentId = String(data.parentId[data.parentId.length - 1])
      } else if (data.parentId && data.parentId >= 0) {
        parentId = data.parentId
      }
      let extra = data.extra
      if (typeof data.extra === 'object') {
        extra = JSON.stringify(data.extra)
      }
      if (id) {
        formData.append('code', this.oldCode)
        formData.append('newCode', data.code)
      } else {
        formData.append('code', data.code)
      }
      formData.append('name', data.name)
      formData.append('parentId', parentId)
      formData.append('desc', data.desc)
      formData.append('url', data.url)
      formData.append('target', data.target)
      formData.append('sortIndex', data.sortIndex)
      formData.append('status', data.status)
      formData.append('extra', extra)
      formData.append('content', data.content)
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
      this.destroyData(id).then(res => {
        this.closeTipsModal()
        this.onSearch()
        delete this.form.id
      })
    },
    switchChange(row) {
      this.updateStatus(row.id).then(this.onSearch)
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
