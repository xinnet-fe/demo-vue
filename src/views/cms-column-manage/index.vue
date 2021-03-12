<template>
  <div class="order-form">
    <template v-if="home">
      <!-- search -->
      <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true">
        <el-form-item label="栏目名称" prop="name">
          <el-input v-model="searchForm.name" placeholder="请输入名称" clearable />
        </el-form-item>
        <el-form-item label="操作时间" prop="createTime">
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
          <el-button @click="resetModal">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- search -->

      <div class="operate-form">
        <el-button size="mini" @click="showModal()">添加</el-button>
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
          label="栏目名称"
        />
        <el-table-column
          prop="fullCode"
          label="CODE标识"
        />
        <el-table-column
          prop="desc"
          label="栏目描述"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
        />
        <el-table-column
          prop="modifyTime"
          label="操作时间"
        />
        <el-table-column label="操作" fixed="right">
          <template v-slot="{ row }">
            <el-button type="text" size="medium" @click="showModal(row)">编辑</el-button>
            <el-button v-if="!(row.children && row.children.length)" type="text" size="medium" @click="showTipsModal(row)">删除</el-button>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown" class="column-table-dropdown">
                <el-dropdown-item>
                  <el-button type="text" size="mini" @click="previewCoverPage(row, 'pc')">预览PC封面</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" size="mini" @click="previewList(row, 'pc')">预览PC列表</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" size="mini" @click="previewCoverPage(row, 'm')">预览M站封面</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" size="mini" @click="previewList(row, 'm')">预览M站列表</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <!-- table -->
    </template>

    <!-- form -->
    <div v-if="!home" class="column-form">
      <page-header :go-back="goBack" :title="modalTitle" />
      <el-form ref="form" :model="form" label-width="130px" :rules="rules">
        <el-form-item label="栏目名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入栏目名称" />
        </el-form-item>
        <el-form-item label="父栏目" prop="parentId" class="required">
          <el-cascader
            v-model="form.parentId"
            :options="types"
            placeholder="作为顶级栏目"
            filterable
            change-on-select
          />
        </el-form-item>
        <el-form-item label="CODE标识" prop="fullCode">
          <el-input v-model="form.fullCode" placeholder="请输入人CODE标识" />
        </el-form-item>
        <el-form-item label="序号" prop="sortIndex">
          <el-input-number v-model="form.sortIndex" />
        </el-form-item>
        <el-form-item label="PC站封面模板地址">
          <el-input v-model="form.pcCoverPageTemplateFile" placeholder="请输入pc封面模板地址" />
        </el-form-item>
        <el-form-item label="PC站列表模板地址">
          <el-input v-model="form.pcListPageTemplateFile" placeholder="请输入pc列表模板地址" />
        </el-form-item>
        <el-form-item label="PC站内容模板地址">
          <el-input v-model="form.pcContentPageTemplateFile" placeholder="请输入pc内容模板地址" />
        </el-form-item>
        <el-form-item label="M站封面模板地址">
          <el-input v-model="form.mCoverPageTemplateFile" placeholder="请输入M站封面模板地址" />
        </el-form-item>
        <el-form-item label="M站封面模板地址">
          <el-input v-model="form.mListPageTemplateFile" placeholder="请输入M站列表模板地址" />
        </el-form-item>
        <el-form-item label="M站封面模板地址">
          <el-input v-model="form.mContentPageTemplateFile" placeholder="请输入M站内容模板地址" />
        </el-form-item>
        <el-form-item label="Title">
          <el-input v-model="form.title" :rows="3" type="textarea" placeholder="请输入Title" />
          <div class="tips">Title字数PC页面一般不超过30个字最佳，H5页面一般不超过20个最佳。</div>
        </el-form-item>
        <el-form-item label="Keywords">
          <el-input v-model="form.keywords" :rows="3" type="textarea" placeholder="请输入Keywords" />
          <div class="tips">Keywords一般不超过3个关键词，每个关键词之间使用英文逗号分隔，保证页面内容的K密度10%内，且可读性。</div>
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="form.desc" :rows="3" type="textarea" placeholder="请输入Description" max-length="150" />
          <div class="tips">Description字数应界于50~150个汉字之间，推荐50~80字。</div>
        </el-form-item>
        <!-- <el-form-item label="栏目类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio v-for="({ value, key }) in columnTypes" :key="value" :label="value">{{ key }}</el-radio>
          </el-radio-group>
          <div class="tips">提示：容器栏目不支持添加内容</div>
        </el-form-item> -->
        <el-form-item label="图片地址" prop="thumbnail">
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
        </el-form-item>
      </el-form>
      <div slot="footer" class="new-page-footer">
        <el-button size="medium" @click="goBack">取消</el-button>
        <el-button size="medium" type="primary" @click="submit">保存</el-button>
      </div>
    </div>
    <!-- form -->

    <!-- 删除提示 -->
    <el-dialog width="400px" title="提示" :visible.sync="showTips" :before-close="beforeTipsClose">
      <p>此操作将会删除栏目"{{ row.name }}"，确认删除吗？</p>
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
import formatTime from '@/utils/formatTime'
import PageHeader from '@/components/PageHeader'

export default {
  name: 'CmsColumnManage',
  cname: '栏目管理',
  components: {
    PageHeader
  },
  data() {
    return {
      // 搜索框
      searchForm: {
        name: '',
        state: '',
        createTime: ''
      },
      home: true,
      modalTitle: '添加',
      // 弹框表单数据
      form: {
        name: '',
        parentId: '0',
        fullCode: '',
        sortIndex: 100,
        pcCoverPageTemplateFile: '',
        pcListPageTemplateFile: '',
        pcContentPageTemplateFile: '',
        mCoverPageTemplateFile: '',
        mListPageTemplateFile: '',
        mContentPageTemplateFile: '',
        title: '',
        keywords: '',
        desc: '',
        // type: '1',
        thumbnail: ''
      },
      // 修改时传递的旧code
      oldCode: '',
      // 弹框表单规则
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入CODE标识', trigger: 'blur' }],
        sortIndex: [{ required: true, message: '请输入序号', trigger: 'blur' }]
        // type: [{ required: true, message: '请输栏目类型', trigger: 'blur' }]
      },
      // 删除弹框
      showTips: false,
      // 表格的数据
      list: [],
      // 默认打开方式
      formTarget: '',
      // 附件列表
      fileList: [],
      // 删除所需当前行
      row: {},
      columnTypes: [
        {
          key: '容器栏目',
          value: '1'
        },
        {
          key: '叶子栏目',
          value: '2'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.global,
      types: state => state.cms.columnType
    })
  },
  created() {
    this.onSearch()
  },
  methods: {
    ...mapActions({
      getData: 'cms/channelList',
      searchChannel: 'cms/searchChannel',
      add: 'cms/addChannel',
      update: 'cms/updateChannel',
      destroyData: 'cms/destroyChannel',
      previewPcCoverPage: 'cms/previewPcCoverPage',
      previewPcListPage: 'cms/previewPcListPage',
      previewMCoverPage: 'cms/previewMCoverPage',
      previewMListPage: 'cms/previewMListPage',
      uploadFile: 'cms/uploadFile',
      columnParentIdMapping: 'cms/columnParentIdMapping'
    }),
    showModal(row = {}) {
      this.columnParentIdMapping().then(() => {
        if (row.id) {
          const query = { id: row.id }
          this.searchChannel(query).then(res => {
            const { channel } = res.data
            this.fileList = []
            if (channel.thumbnail) {
              const file = {
                name: channel.thumbnail,
                url: channel.thumbnail
              }
              this.fileList = [file]
            }
            forEach(this.form, (v, k, o) => {
              this.form[k] = channel[k] || ''
            })
            this.form.id = channel.id
            // this.oldCode = channel.code
          })
          this.modalTitle = '编辑'
        } else {
          delete this.form.id
          this.modalTitle = '添加'
        }
      })
      this.home = false
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
      this.fileList = []
      delete this.form.id
    },
    resetModal() {
      this.$refs.searchForm.resetFields()
    },
    // 预览封面列表
    previewCoverPage(row, type) {
      const methods = type === 'pc' ? 'previewPcCoverPage' : 'previewMCoverPage'
      this[methods]({ id: row.id }).then(res => {
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
    previewList(row, type) {
      const methods = type === 'pc' ? 'previewPcListPage' : 'previewMListPage'
      this[methods]({ id: row.id }).then(res => {
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
    // 点击选择图片
    selectedFile(file) {
      const formData = new FormData()
      formData.append('file', file.raw)
      this.uploadFile(formData).then(thumbnail => (this.form.thumbnail = thumbnail))

      if (this.form.thumbnail) {
        this.form.thumbnail = ''
      }
    },
    showTipsModal(row) {
      this.row = row
      this.form.id = row.id
      this.showTips = true
    },
    closeTipsModal() {
      this.row = {}
      this.showTips = false
    },
    beforeTipsClose(done) {
      this.closeTipsModal()
      done()
    },
    getList(query = {}) {
      const { name, createTime } = this.searchForm
      query.name = name
      if (createTime) {
        query.startTime = formatTime(new Date(createTime[0]).getTime())
        query.endTime = formatTime(new Date(createTime[1]).getTime())
      }
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
      if (!parentId || !parentId.length) {
        parentId = '0'
      }

      formData.append('name', data.name)
      formData.append('fullCode', data.fullCode)
      formData.append('parentId', parentId)
      formData.append('desc', data.desc)
      formData.append('titile', data.title)
      formData.append('keywords', data.keywords)
      formData.append('desc', data.desc)
      formData.append('sortIndex', data.sortIndex)
      formData.append('thumbnail', data.thumbnail)
      formData.append('pcCoverPageTemplateFile', data.pcCoverPageTemplateFile)
      formData.append('pcListPageTemplateFile', data.pcListPageTemplateFile)
      formData.append('pcContentPageTemplateFile', data.pcContentPageTemplateFile)
      formData.append('mCoverPageTemplateFile', data.mCoverPageTemplateFile)
      formData.append('mListPageTemplateFile', data.mListPageTemplateFile)
      formData.append('mContentPageTemplateFile', data.mContentPageTemplateFile)
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
            })
          // 添加
          } else {
            this.add(formData).then(res => {
              this.goBack()
              this.onSearch()
            })
          }
        }
      })
    },
    destroy() {
      const { id } = this.form
      const formData = new FormData()
      formData.append('id', id)
      this.destroyData(formData).then(res => {
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
.new-page-footer {
  margin-left: 130px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #0180cd;
  font-size: 12px;
  margin-left: 10px;
  letter-spacing: normal;
}
.tips {
  font-size: 12px;
  color: #606266;
}
.local-upload {
  width: 350px;
}
.column-form .required >>> .el-form-item__label:before {
  content: '*';
  color: #f35b5c;
  margin-right: 4px;
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
