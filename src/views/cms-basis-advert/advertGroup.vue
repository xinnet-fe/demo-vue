<template>
  <div class="advert-group">
    <!-- search -->
    <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true">
      <el-form-item label="广告组名称:" prop="name">
        <el-input v-model="searchForm.name" placeholder="请输入广告名称" clearable />
      </el-form-item>
      <el-form-item label="广告站点:" prop="website">
        <el-select v-model="searchForm.website" placeholder="请输入广告站点" clearable>
          <el-option v-for="(label, value) in websites" :key="value" :label="label" :value="value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- search -->

    <div class="mult-operation">
      <el-button type="primary" size="mini" @click="showModal">新增广告组</el-button>
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
        label="广告组code"
      >
        <template v-slot="{ row }">
          <span class="advert-code" @click="link(row.code)">{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="广告组名称"
      />
      <el-table-column
        label="广告站点"
      >
        <template v-slot="{ row }">
          {{ websites[row.website] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
      />
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
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="广告组名称:" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="广告组code:" prop="code">
          <el-input v-model="form.code" />
        </el-form-item>
        <el-form-item label="广告站点:" prop="website">
          <el-select v-model="form.website" placeholder="请选择广告站点">
            <el-option v-for="(label, value) in websites" :key="value" :label="label" :value="value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </el-dialog>
    <!-- form -->

    <!-- 删除提示 -->
    <el-dialog width="350px" title="提示" :visible.sync="showTips">
      <p>删除后前台展示页面也会删除，是否确认删除所选广告？</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeTipsModal">取消</el-button>
        <el-button type="primary" @click="destroy">确认</el-button>
      </div>
    </el-dialog>
    <!-- 删除提示 -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { advertGroupList, addAdvertGroup, updateAdvertGroup, destroyAdvertGroup } from '@/api/cms'
import findParentNodeByName from '@/utils/findParentNodeByName'

export default {
  name: 'AdvertGroup',
  components: {
    Pagination
  },
  data() {
    return {
      loading: false,
      // 搜索框
      searchForm: {
        name: '',
        website: ''
      },
      // 弹框
      show: false,
      modalTitle: '新增',
      // 弹框表单数据
      form: {
        id: '',
        name: '',
        code: '',
        website: ''
      },
      // 弹框表单规则
      rules: {
        name: [{ required: true, message: '请输入广告组名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入广告组code', trigger: 'blur' }],
        website: [{ required: true, message: '请选择广告站点', trigger: 'blur' }]
      },
      // 网站列表
      websites: {
        1: '官网',
        2: 'M站',
        3: '控制台'
      },
      // 删除弹框
      showTips: false,
      // 表格的数据
      list: [],
      page: {
        total: 0,
        page: 1,
        limit: 30
      }
    }
  },
  methods: {
    showModal(row = {}) {
      if (row.id) {
        this.form = row
        this.modalTitle = '编辑'
      } else {
        this.modalTitle = '新增'
      }
      this.show = true
    },
    closeModal() {
      this.show = false
      this.form.name = ''
      this.form.code = ''
      this.form.website = ''
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
      const { name, website } = this.searchForm
      name && (query.name = name)
      website && (query.website = website)
      return advertGroupList(query).then(res => {
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
      const { id, name, code, website } = this.form
      const data = { name, code, website }
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 修改
          if (id) {
            data.id = id
            updateAdvertGroup(data).then(res => {
              this.closeModal()
              this.onSearch()
            })
          // 新增
          } else {
            addAdvertGroup(data).then(res => {
              this.closeModal()
              this.onSearch()
            })
          }
        }
      })
    },
    destroy() {
      const { id } = this.form
      destroyAdvertGroup(id).then(res => {
        this.closeTipsModal()
        this.onSearch()
      })
    },
    link() {
      this.$emit('update:active-name', 'list')
      const listNode = findParentNodeByName(this, 'CmsBasisAdvert').$refs.list
      listNode.$data.searchForm.advertGroup = '1'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.advert-group {
  .search-form {
    margin-top: 10px;
  }
  .mult-operation {
    margin-bottom: 10px;
    text-align: right;
  }
  .advert-code {
    &:hover {
      color: $hintTextColor;
      cursor: pointer;
    }
  }
}
</style>

