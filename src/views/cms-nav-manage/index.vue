<template>
  <div class="cms-nav-manage">
    <!-- search -->
    <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true">
      <el-form-item label="名称:" prop="name">
        <el-input v-model="searchForm.name" placeholder="请输入分类名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- search -->

    <div class="mult-operation">
      <el-button type="primary" size="mini" @click="showModal()">新增导航</el-button>
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
          <el-button v-if="!(row.children && row.children.length)" type="text" @click="showTipsModal(row)">删除</el-button>
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
              <el-form-item label="所属分类:">
                <el-cascader
                  placeholder="作为顶级分类"
                  :value="form.parentId"
                  :options="navType"
                  filterable
                  change-on-select
                />
              </el-form-item>
              <el-form-item label="code:">
                <el-input v-model="form.code" />
              </el-form-item>
              <el-form-item label="描述:" prop="desc">
                <el-input v-model="form.desc" :rows="3" type="textarea" />
              </el-form-item>
              <el-form-item label="链接:" prop="url">
                <el-input v-model="form.url" />
              </el-form-item>
              <el-form-item label="打开方式">
                <el-select v-model="form.target">
                  <el-option v-for="item in openMode" :key="item.value" :label="item.key" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item label="序号:" prop="sortIndex">
                <el-input-number v-model="form.sortIndex" />
              </el-form-item>
              <el-form-item label="显示状态:" prop="status">
                <el-switch
                  v-model="form.status"
                  active-value="1"
                  inactive-value="0"
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

export default {
  name: 'CmsNavManage',
  // components: {
  //   Pagination
  // },
  data() {
    return {
      // tabs
      activeName: 'basis',
      // 搜索框
      searchForm: {
        name: ''
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
              this.form[k] = nav[k]
            })
            this.form.id = nav.id
            this.oldCode = nav.code
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
      const { name } = this.searchForm
      query.name = name
      return this.getData(query).then(list => {
        this.list = list
        // this.page = page
      })
    },
    onSearch() {
      // const { pageNum, pageSize } = this.page
      // const query = { pageNum, pageSize }
      this.getList()
    },
    getParams(id) {
      const data = {}
      forEach(this.form, (v, k) => {
        data[k] = v
      })
      if (id) {
        data.code = this.oldCode
        data.newCode = this.form.code
      } else {
        data.code = this.form.code
      }
      return data
    },
    submit() {
      const { id } = this.form
      const data = this.getParams(id)
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 修改
          if (id) {
            data.id = id
            this.update(data).then(res => {
              this.closeModal()
              this.onSearch()
            })
          // 新增
          } else {
            this.add(data).then(res => {
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

.cms-nav-manage {
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
