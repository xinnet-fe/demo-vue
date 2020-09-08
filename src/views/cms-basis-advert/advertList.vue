<template>
  <div class="advert-list">
    <!-- search -->
    <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true">
      <el-form-item label="广告组名称" prop="advName">
        <el-input v-model="searchForm.advName" placeholder="请输入广告名称" clearable />
      </el-form-item>
      <el-form-item label="广告状态" prop="advStatus">
        <el-select v-model="searchForm.advStatus">
          <el-option v-for="item in advStatus" :key="item.value" :label="item.key" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="所属广告组" prop="groupCode">
        <el-select v-model="searchForm.groupCode" clearable>
          <el-option v-for="code in groupList" :key="code" :label="code" :value="code" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" size="medium" @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- search -->

    <div class="operate-form">
      <el-button size="mini" @click="showModal()">新增广告</el-button>
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
        prop="sortNum"
        label="序号"
        sortable
      />
      <el-table-column
        prop="name"
        label="广告名称"
      />
      <el-table-column
        label="所属广告组"
      >
        <template v-slot="{ row }">
          {{ row.groupCode }}
        </template>
      </el-table-column>
      <el-table-column
        prop="descr"
        label="广告描述"
      />
      <el-table-column
        prop="linkUrl"
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
            v-model="row.isActived"
            active-value="1"
            inactive-value="0"
            @change="switchChange($event, row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template v-slot="{ row }">
          <el-button type="text" size="medium" @click="showModal(row)">编辑</el-button>
          <el-button type="text" size="medium" @click="showTipsModal(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="page.count"
      :page.sync="page.pageNum"
      :limit.sync="page.pageSize"
      @pagination="getList"
    />
    <!-- table -->

    <!-- form -->
    <el-dialog width="800px" :before-close="beforeClose" destroy-on-close :title="modalTitle" :visible.sync="show">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="广告组名称" prop="advName">
          <el-input v-model="form.advName" />
        </el-form-item>
        <el-form-item label="所属广告组" prop="groupCode">
          <el-select v-model="form.groupCode">
            <el-option v-for="code in groupList" :key="code" :label="code" :value="code" />
          </el-select>
        </el-form-item>
        <el-form-item label="广告描述" prop="advDesc">
          <el-input v-model="form.advDesc" :rows="3" type="textarea" />
        </el-form-item>
        <el-form-item label="外链地址" prop="url">
          <el-input v-model="form.url" />
        </el-form-item>
        <el-form-item label="广告图片地址" prop="imgUrl">
          <el-col :span="24">
            <el-input v-model="form.imgUrl" placeholder="默认图片路径" disabled />
          </el-col>
          <el-col :span="24">
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
          <div id="resourceManager" />
        </el-form-item>
        <el-form-item label="序号" prop="sortNum">
          <el-input-number v-model="form.sortNum" />
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            placeholder="选择开始日期"
          />
        </el-form-item>
        <el-form-item label="结束日期" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            placeholder="选择结束日期"
          />
        </el-form-item>
        <el-form-item label="广告状态" prop="advStatus">
          <el-switch
            v-model="form.advStatus"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="tag">
          <el-radio-group v-model="form.tag">
            <el-radio label="1">hot</el-radio>
            <el-radio label="2">new</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="个性设置" prop="extra">
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
      <p>删除后前台展示页面也会删除，是否确认删除所选广告？</p>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="closeTipsModal">取消</el-button>
        <el-button size="medium" type="primary" @click="destroy">确认</el-button>
      </div>
    </el-dialog>
    <!-- 删除提示 -->

    <iframe
      v-show="showIframeModal"
      ref="elfinder"
      class="elfinder"
      frameborder="0"
      src="/elfinder.html"
      :style="{ width: '100%', height }"
    />
    <div
      v-show="showIframeModal"
      ref="close"
      class="elfinder-close"
      @click="closeIframe"
    >
      X
    </div>
  </div>
</template>

<script>
import forEach from 'lodash/forEach'
import { mapState, mapActions } from 'vuex'
import formatTime from '@/utils/formatTime'
import Pagination from '@/components/Pagination'
import JsonEditor from '@/components/JsonEditor'
import isDate from '@/utils/isDate'

export default {
  name: 'AdvertList',
  components: {
    Pagination,
    JsonEditor
  },
  data() {
    return {
      // 搜索框
      searchForm: {
        advName: '',
        advStatus: '',
        groupCode: ''
      },
      // 弹框
      show: false,
      modalTitle: '新增',
      // 弹框表单数据
      form: {
        id: '',
        sortNum: '',
        advName: '',
        groupCode: '',
        advDesc: '',
        imgUrl: '',
        url: '',
        startTime: '',
        endTime: '',
        advStatus: '',
        tag: '',
        extra: ''
      },
      // 上传图片下拉框值
      uploadImageAddress: '',
      // 弹框表单规则
      rules: {
        advName: [{ required: true, message: '请输入广告组名称', trigger: 'blur' }],
        groupCode: [{ required: true, message: '请选择广告组', trigger: 'change' }],
        url: [{ required: true, message: '请输入外链地址', trigger: 'blur' }],
        sortNum: [{ required: true, message: '请输入序号', trigger: 'blur' }]
      },
      // 删除弹框
      showTips: false,
      // 表格的数据
      list: [],
      page: {
        count: 0,
        pageNum: 1,
        pageSize: 30
      },
      // 上传附件列表
      fileList: [],
      // 文件管理器页面显示
      showIframeModal: false
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.global,
      advStatus: state => state.cms.advStatus,
      groupList: state => state.cms.groupList
    })
  },
  created() {
    this.getAdvStatus()
    this.getGroupCodeList()
    this.height = global.innerHeight + 'px'
  },
  methods: {
    ...mapActions({
      getData: 'cms/advList',
      add: 'cms/addAdvList',
      update: 'cms/updateAdvList',
      destroyData: 'cms/destroyAdvList',
      getAdvStatus: 'cms/advStatusMapping',
      getGroupCodeList: 'cms/groupCodeList',
      searchAdv: 'cms/searchAdv',
      advStatusSwitch: 'cms/advStatusSwitch'
    }),
    showModal(row = {}) {
      if (row.advCode) {
        const query = { advCode: row.advCode }
        this.searchAdv(query).then(res => {
          const { normalAdv: adv } = res.data
          if (adv) {
            let tag = ''
            if (adv.hotStatus === '1') {
              tag = '1'
            }
            if (adv.newStatus === '1') {
              tag = '2'
            }
            this.form = {
              advCode: adv.advCode || '',
              id: adv.id || '',
              sortNum: adv.sortNum || '',
              advName: adv.name || '',
              groupCode: adv.groupCode || '',
              advDesc: adv.descr || '',
              imgUrl: adv.imgUrl || '',
              url: adv.linkUrl || '',
              startTime: adv.startTime || '',
              endTime: adv.endTime || '',
              advStatus: adv.isActived || '',
              tag,
              extra: adv.extra || ''
            }
          }
        })
        this.modalTitle = '编辑'
      } else {
        this.modalTitle = '新增'
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
      const { advName, advStatus, groupCode } = this.searchForm
      query.advName = advName
      query.advStatus = advStatus
      query.groupCode = groupCode
      return this.getData(query).then(res => {
        const { list, page } = res
        this.list = list
        this.page = page
      })
    },
    onSearch() {
      const { pageNum, pageSize } = this.page
      const query = {
        pageNum: parseInt(pageNum),
        pageSize: parseInt(pageSize)
      }
      this.getList(query)
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

      const hotStatus = data.tag === '1' ? '1' : ''
      const newStatus = data.tag === '2' ? '1' : ''
      formData.append('advName', data.advName)
      formData.append('groupCode', data.groupCode)
      formData.append('advDesc', data.advDesc)
      formData.append('url', data.url)
      formData.append('imgUrl', data.imgUrl)
      formData.append('sortNum', data.sortNum)
      formData.append('startTime', startTime)
      formData.append('endTime', endTime)
      formData.append('advStatus', data.advStatus)
      formData.append('newStatus', newStatus)
      formData.append('hotStatus', hotStatus)
      formData.append('extra', data.extra)
      formData.append('file', file)
      return formData
    },
    submit() {
      const { advCode } = this.form
      const formData = this.getParams(this.form, advCode)
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 修改
          if (advCode) {
            formData.append('advCode', advCode)
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
      const { advCode } = this.form
      this.destroyData(advCode).then(res => {
        this.closeTipsModal()
        this.onSearch()
      })
    },
    switchChange(state, row) {
      const data = { advCode: row.advCode }
      this.advStatusSwitch(data).then(this.onSearch)
    },
    // 下拉框选择本地上传
    localUpload() {
      if (this.uploadImageAddress === '1') {
        this.$refs.upload.$el.click()
      } else {
        // this.$refs.elfinder.contentWindow.showIframeModal = true
        this.showIframeModal = true
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
    closeIframe() {
      this.showIframeModal = false
    }
  }
}
</script>

<style scoped>
.elfinder {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999991;
  background: #ccc;
}
.elfinder-close {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 999992;
  cursor: pointer;
}
</style>
