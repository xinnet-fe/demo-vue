<template>
  <div class="advert-list">
    <!-- search -->
    <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true">
      <el-form-item label="广告组名称:" prop="name">
        <el-input v-model="searchForm.name" placeholder="请输入广告名称" clearable />
      </el-form-item>
      <el-form-item label="广告状态:" prop="state">
        <el-select v-model="searchForm.state" clearable>
          <el-option v-for="(label, value) in states" :key="value" :label="label" :value="value" />
        </el-select>
      </el-form-item>
      <el-form-item label="所属广告组:" prop="advertGroup">
        <el-select v-model="searchForm.advertGroup" clearable>
          <el-option v-for="(label, value) in advertGroups" :key="value" :label="label" :value="value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- search -->

    <div class="mult-operation">
      <el-button type="primary" size="mini" @click="showModal">新增广告</el-button>
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
        prop="number"
        label="序号"
        sortable
      />
      <el-table-column
        prop="name"
        label="广告名称"
      />
      <el-table-column
        prop="advertGroup"
        label="所属广告组"
      />
      <el-table-column
        prop="describe"
        label="广告描述"
      />
      <el-table-column
        prop="links"
        label="广告链接"
      />
      <el-table-column
        prop="startTime"
        label="开始时间"
      />
      <el-table-column
        prop="endTime"
        label="结束时间"
      />
      <el-table-column
        label="广告状态"
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
    <el-dialog width="600px" :before-close="beforeClose" destroy-on-close :title="modalTitle" :visible.sync="show">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="广告组名称:" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="所属广告组:" prop="advertGroup">
          <el-select v-model="form.advertGroup">
            <el-option v-for="(label, value) in advertGroups" :key="value" :label="label" :value="value" />
          </el-select>
        </el-form-item>
        <el-form-item label="广告描述:" prop="describe">
          <el-input v-model="form.describe" :rows="3" type="textarea" />
        </el-form-item>
        <el-form-item label="外链地址:" prop="linkAddress">
          <el-input v-model="form.linkAddress" />
        </el-form-item>
        <el-form-item label="广告图片地址:" prop="imageAddress">
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
            :on-change="selectedFile"
            :file-list="fileList"
          >
            <el-button ref="upload" size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="序号:" prop="number">
          <el-input-number v-model="form.number" />
        </el-form-item>
        <el-form-item label="开始时间:" prop="startTime">
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
        <el-form-item label="广告状态:" prop="state">
          <el-switch
            v-model="form.state"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="个性设置:" prop="config">
          <el-input v-model="form.config" :rows="3" type="textarea" />
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
import forEach from 'lodash/forEach'
import { mapState, mapActions } from 'vuex'
import Pagination from '@/components/Pagination'

export default {
  name: 'AdvertList',
  components: {
    Pagination
  },
  data() {
    return {
      // 搜索框
      searchForm: {
        name: '',
        state: '',
        advertGroup: ''
      },
      // 弹框
      show: false,
      modalTitle: '新增',
      // 弹框表单数据
      form: {
        id: '',
        advertGroup: '',
        describe: '',
        linkAddress: '',
        imageAddress: '',
        number: '',
        startTime: '',
        endTime: '',
        state: '',
        config: ''
      },
      // 上传图片下拉框值
      uploadImageAddress: '',
      // 弹框表单规则
      rules: {
        name: [{ required: true, message: '请输入广告组名称', trigger: 'blur' }],
        advertGroup: [{ required: true, message: '请选择广告组', trigger: 'change' }],
        linkAddress: [{ required: true, message: '请输入外链地址', trigger: 'blur' }],
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
        1: '广告组一',
        2: '广告组二'
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
      fileList: []
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.global
    })
  },
  methods: {
    ...mapActions({
      getList: 'cms/advertList',
      add: 'cms/addAdvertList',
      update: 'cms/updateAdvertList',
      destroy: 'cms/destroyAdvertList'
    }),
    showModal(row = {}) {
      if (row.id) {
        this.form = row
      }
      this.show = true
    },
    closeModal() {
      this.show = false
      forEach(this.form, (val, key, o) => {
        o[key] = ''
      })
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
      const { name, state, advertGroup } = this.searchForm
      name && (query.name = name)
      state && (query.state = state)
      advertGroup && (query.advertGroup = advertGroup)
      return this.getList(query).then(res => {
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
        }
      })
    },
    destroy() {
      const { id } = this.form
      this.destroy(id).then(res => {
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
    selectedFile(file) {
      this.fileList = [file]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.advert-list {
  .search-form {
    margin-top: 10px;
  }
  .mult-operation {
    margin-bottom: 10px;
    text-align: right;
  }
}
</style>

