<template>
  <div class="order-form cms-content-manage">
    <template v-if="home">
      <el-row>
        <el-col :span="isCollapse ? 1 : 4">
          <div class="column-menu-title">
            <!-- <el-button type="text" @click="isCollapse = !isCollapse">栏目列表</el-button> -->
            栏目列表
          </div>
          <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
              class="el-menu-vertical"
              mode="vertical"
              :collapse="isCollapse"
              :unique-opened="false"
              :collapse-transition="false"
              @open="openMenu"
              @close="openMenu"
            >
              <sidebar
                v-for="column in columnType"
                :key="column.id"
                :row="column"
                icon="search"
                :show-icon="column.parentId === 0"
                :open="openMenu"
              />
            </el-menu>
          </el-scrollbar>
        </el-col>
        <el-col v-if="columnId" :span="isCollapse ? 23 : 20">
          <div class="column-menu-wrap">
            <!-- search -->
            <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true">
              <el-form-item label="标题" prop="title">
                <el-input v-model="searchForm.title" placeholder="请输入标题" clearable />
              </el-form-item>
              <el-form-item label="违禁词" prop="infoSensitiveType">
                <el-select v-model="searchForm.infoSensitiveType" placeholder="请输入业务类型">
                  <el-option v-for="({ value, key }) in infoSensitiveType" :key="value" :label="key" :value="value" />
                </el-select>
              </el-form-item>
              <el-form-item label="操作时间" prop="operateTime">
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
              <el-button size="mini" @click="goInto()">添加</el-button>
              <!-- <el-upload
                class="local-upload"
                action="/"
                :limit="1"
                :auto-upload="false"
                :on-change="operSelectedFile"
                :file-list="operFileList"
              >
                <el-button size="mini">
                  <i class="el-icon-upload2" /> 违禁词
                </el-button>
              </el-upload> -->
            </div>

            <!-- table -->
            <el-tabs v-model="activeName" @tab-click="handleClickTabs">
              <el-tab-pane :label="publishedLabel" name="published">
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
                    label="分类"
                  >
                    <template v-slot="{ row }">
                      {{ getCategoryNameByValue(row.chanId) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    ref="sortIndex"
                    prop="sortIndex"
                    label="序号"
                    sortable
                    width="80"
                    :sort-method="sortByNumber"
                  />
                  <el-table-column
                    label="违禁词"
                  >
                    <template v-slot="{ row }">
                      {{ getSensitiveName(row.sensitive) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="createUser"
                    label="发布者"
                  />
                  <el-table-column
                    prop="createUserDepartment"
                    label="部门"
                  />
                  <el-table-column
                    label="审核状态"
                  >
                    <template v-slot="{ row }">
                      {{ getAuditNameByValue(row.authed) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="modifyTime"
                    label="操作时间"
                  />
                  <el-table-column label="操作" fixed="right" width="210">
                    <template v-slot="{ row }">
                      <el-button type="text" size="medium" @click="showAuditTips">编辑</el-button>
                      <el-button type="text" size="mini" @click="toResetAudit(row)">重置审核</el-button>
                      <el-button type="text" size="mini" @click="previewPc(row)">预览PC</el-button>
                      <el-button type="text" size="mini" @click="previewM(row)">预览M</el-button>
                      <el-button type="text" size="medium" @click="showTipsModal(row)">删除</el-button>
                    </template>
                  </el-table-column>
                  <template v-if="list.length" v-slot:append>
                    <div class="table-footer">
                      <div class="table-operation">
                        <el-button size="mini" @click="handleSelectionChangeAll">全选</el-button>
                        <el-button size="mini" @click="destroyAll">删除</el-button>
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
              </el-tab-pane>
              <el-tab-pane :label="auditLabel" name="audit">
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
                    label="分类"
                  >
                    <template v-slot="{ row }">
                      {{ getCategoryNameByValue(row.chanId) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    ref="sortIndex"
                    prop="sortIndex"
                    label="序号"
                    sortable
                    width="80"
                    :sort-method="sortByNumber"
                  />
                  <el-table-column
                    label="违禁词"
                  >
                    <template v-slot="{ row }">
                      {{ getSensitiveName(row.sensitive) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="createUser"
                    label="发布者"
                  />
                  <el-table-column
                    prop="createUserDepartment"
                    label="部门"
                  />
                  <el-table-column
                    label="审核状态"
                  >
                    <template v-slot="{ row }">
                      {{ getAuditNameByValue(row.authed) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="modifyTime"
                    label="操作时间"
                  />
                  <el-table-column label="操作" fixed="right" width="210">
                    <template v-slot="{ row }">
                      <el-button type="text" size="medium" @click="goInto(row)">编辑</el-button>
                      <el-button type="text" size="mini" @click="toAudit(row)">审核</el-button>
                      <el-button type="text" size="mini" @click="previewPc(row)">预览PC</el-button>
                      <el-button type="text" size="mini" @click="previewM(row)">预览M</el-button>
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
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </template>
    <!-- table -->

    <!-- form -->
    <div v-if="!home">
      <page-header :go-back="goBack" :title="modalTitle" />
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入，必填" />
          <el-checkbox-group v-model="form.titleTags" class="input-checkbox-group">
            <el-checkbox v-for="({ value, key }) in titleTags" :key="value" :label="value">
              {{ key }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="关键词">
          <el-checkbox-group
            v-model="form.tags"
            class="input-checkbox-group"
            :max="5"
            @change="changeKeywords"
          >
            <el-checkbox v-for="({ value, key }) in tags" :key="value" :label="value">
              {{ key }}
            </el-checkbox>
            <!-- 选中其他显示自定义输入框 -->
            <el-form-item v-if="form.tags.indexOf('other') !== -1" prop="otherTag" class="other-tag">
              <el-input v-model="form.otherTag" placeholder="请输入来源名称" />
            </el-form-item>
          </el-checkbox-group>
          <div class="tips">多个关键词用","号隔开</div>
        </el-form-item>
        <el-form-item label="序号" prop="sortIndex">
          <el-input-number v-model="form.sortIndex" placeholder="请输入，默认100" />
        </el-form-item>
        <el-form-item label="内容类型">
          <el-radio-group v-model="form.contentType">
            <el-radio v-for="({ value, key }) in contentTypes" :key="value" :label="value">{{ key }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 显示内容取决于内容类型 -->
        <template v-if="form.contentType === 'image'">
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
        </template>
        <template v-else-if="form.contentType === 'video'">
          <el-form-item label="预览视频" prop="videoAddr">
            <el-input v-model="form.videoAddr" placeholder="请填写视频链接地址" />
          </el-form-item>
        </template>
        <el-form-item label="置顶">
          <el-checkbox-group v-model="form.toped">
            <el-checkbox v-for="({ value, key }) in toped" :key="value" :label="value">
              {{ key }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="内容简介">
          <el-input v-model="form.abstr" type="textarea" placeholder="填写简介，限定300字以内。" max-length="300" />
        </el-form-item>
        <el-form-item label="Keywords">
          <el-input v-model="form.keywords" type="textarea" placeholder="请输入" />
          <div class="tips">Keywords一般不超过3个关键词，每个关键词之间使用英文逗号分隔，保证页面内容的K密度10%内，且可读性。</div>
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="form.desc" type="textarea" max-length="150" placeholder="请输入" />
          <div class="tips">Description字数应界于50~150个汉字之间，推荐50~80字。</div>
        </el-form-item>
        <el-form-item label="文章来源">
          <el-radio-group
            v-model="form.author"
            @change="changeAuthors"
          >
            <el-radio v-for="({ value, key }) in authors" :key="value" :label="value">
              {{ key }}
            </el-radio>
            <!-- 选中其他显示自定义输入框 -->
            <el-form-item v-if="form.author === 'other'" prop="otherAuthor" class="other-author">
              <el-input v-model="form.otherAuthor" placeholder="请输入来源名称" />
            </el-form-item>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="预设点击量">
          <el-input-number v-model="form.clickcount" placeholder="请输入，默认0" />
        </el-form-item>
        <el-form-item label="正文内容" prop="content">
          <editor
            id="editor_id"
            width="760px"
            height="560px"
            plugins-path="/static/kindeditor/plugins/"
            upload-json="/order/upload/"
            :items="editorItems"
            :content="form.content"
            :load-style-mode="false"
            @on-content-change="handleContentChange"
          />
        </el-form-item>
        <el-form-item label="版权信息" prop="copyright">
          <el-input v-model="form.copyright" placeholder="请输入版权声明内容,限定300字以内。" max-length="300" />
          <div class="tips">非原创内容示例：文章来源于网络，如有侵权，请联系客服删除处理。</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="new-page-footer">
        <el-button size="medium" @click="goBack">取消</el-button>
        <el-button size="medium" type="primary" @click="submit">保存</el-button>
      </div>
    </div>
    <!-- form -->

    <!-- 重置审核提示 -->
    <el-dialog width="400px" title="提示" :visible.sync="showResetAudit" :before-close="beforeCloseResetAuditModal">
      <p>此操作执行重置审核，重置审核成功后，文章将不在前端页面展示，需要重新审核后才能上线，是否重置审核？</p>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="showResetAudit = false">取消</el-button>
        <el-button size="medium" type="primary" @click="resetAudit()">确认</el-button>
      </div>
    </el-dialog>
    <!-- 重置审核提示 -->

    <!-- 审核提示 -->
    <el-dialog width="400px" title="提示" :visible.sync="showAudit" :before-close="beforeCloseAuditModal">
      <p>文章中含有违禁词，是否跳过违禁词默认审核通过？</p>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="audit(-1)">取消</el-button>
        <el-button size="medium" type="primary" @click="audit(1)">确认</el-button>
      </div>
    </el-dialog>
    <!-- 审核提示 -->

    <!-- 删除提示 -->
    <el-dialog width="400px" title="提示" :visible.sync="showTips">
      <p>删除后前台展示页面也会删除，是否确认删除所选内容？</p>
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import forEach from 'lodash/forEach'
import find from 'lodash/find'
import reduce from 'lodash/reduce'
import flattenArray from '@/utils/flattenArray'
import formatTime from '@/utils/formatTime'
import PageHeader from '@/components/PageHeader'
import Pagination from '@/components/Pagination'
import Sidebar from '@/components/Sidebar'

export default {
  name: 'CmsContentManage',
  cname: '内容管理',
  components: {
    PageHeader,
    Pagination,
    Sidebar
  },
  data() {
    return {
      isCollapse: false,
      // tab选中名称
      activeName: 'published',
      publishedLabel: '已发布',
      auditLabel: '待审核',
      // 搜索框
      searchForm: {
        title: '',
        infoSensitiveType: '',
        operateTime: ''
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
        titleTags: [],
        hotStatus: false,
        newStatus: false,
        tags: [],
        sortIndex: 0,
        contentType: 'image',
        // 图片和视频二选一
        thumbnail: '',
        videoAddr: '',
        toped: [],
        abstr: '',
        keywords: '',
        desc: '',
        author: '',
        clickcount: 100,
        content: '',
        copyright: '',
        otherTag: '',
        otherAuthor: '',
        // 无用字段传空值
        subTitle: '',
        // 无用字段传空值
        origin: ''
      },
      operImgUrl: '',
      // 修改时传递的旧code
      oldCode: '',
      // 弹框表单规则
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        copyright: [{ required: true, message: '请输入版权信息', trigger: 'blur' }],
        otherTag: [{ required: true, message: '请输入来源名称', trigger: 'blur' }],
        otherAuthor: [{ required: true, message: '请输入来源名称', trigger: 'blur' }]
      },
      // 删除弹框
      showTips: false,
      // 审核弹框
      showAudit: false,
      showResetAudit: false,
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
      action: '',
      authors: [
        {
          key: '门户云',
          value: 'mhy'
        },
        {
          key: '推广大师',
          value: 'tgds'
        },
        {
          key: '电商商城',
          value: 'dssc'
        },
        {
          key: '中企动力市场中心',
          value: 'zqdlsczx'
        },
        {
          key: '其他',
          value: 'other'
        }
      ],
      titleTags: [
        {
          key: 'HOT',
          value: 'hot'
        },
        {
          key: 'NEW',
          value: 'new'
        }
      ],
      contentTypes: [
        {
          key: '图片',
          value: 'image'
        },
        {
          key: '视频',
          value: 'video'
        }
      ],
      toped: [
        {
          key: '分类下置顶',
          value: 'part'
        },
        {
          key: '全局置顶',
          value: 'global'
        }
      ],
      tags: [
        {
          key: '全网门户',
          value: 'qwmh'
        },
        {
          key: '速成建站',
          value: 'scjz'
        },
        {
          key: '全网SEO',
          value: 'qwseo'
        },
        {
          key: '移动商城',
          value: 'ydsc'
        },
        {
          key: '全网商城',
          value: 'qwsc'
        },
        {
          key: 'Google海外推广',
          value: 'ghwtg'
        },
        {
          key: '大客户高端定制',
          value: 'dkhgddz'
        },
        {
          key: '成功案例',
          value: 'cgal'
        },
        {
          key: '产品动态',
          value: 'cpdt'
        },
        {
          key: '行业资讯',
          value: 'hyzx'
        },
        {
          key: '经验干货',
          value: 'jygh'
        },
        {
          key: '企业荣誉',
          value: 'qyry'
        },
        {
          key: '新网公告',
          value: 'xwgg'
        },
        {
          key: '媒体报道',
          value: 'mtbd'
        },
        {
          key: '其他',
          value: 'other'
        }
      ],
      // 上传附件列表
      fileList: [],
      // 筛选项中上传附件列表
      operFileList: [],
      // 表单-选择全部标签状态
      checkAll: false,
      // 表单-选择全部标签不确定状态
      isIndeterminate: false,
      multipleSelection: [],
      columnId: null,
      promise: null
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.global,
      infoAuthedType: state => state.cms.infoAuthedType,
      infoSensitiveType: state => state.cms.infoSensitiveType,
      columnType: state => state.cms.columnType
    })
  },
  created() {
    this.columnParentIdMapping()
    this.promise = this.when(
      this.infoAuthedMapping(),
      this.infoSensitiveMapping()
    )
  },
  destroyed() {
    this.promise = null
  },
  methods: {
    ...mapActions({
      getData: 'cms/infoList',
      searchInfo: 'cms/searchInfo',
      add: 'cms/addInfo',
      update: 'cms/updateInfo',
      destroyData: 'cms/destroyInfo',
      destroyDatas: 'cms/destroyInfos',
      authedInfo: 'cms/authedInfo',
      uploadFile: 'cms/uploadFile',
      resetAuthedInfo: 'cms/resetAuthedInfo',
      resetAuthedInfos: 'cms/resetAuthedInfos',
      infoAuthedMapping: 'cms/infoAuthedMapping',
      infoSensitiveMapping: 'cms/infoSensitiveMapping',
      previewPcContentPage: 'cms/previewPcContentPage',
      previewMContentPage: 'cms/previewMContentPage',
      columnParentIdMapping: 'cms/columnParentIdMapping'
    }),
    showAuditTips() {
      this.$message.warning('文章已发布，不支持编辑，请先”重置审核“后，再修改。')
    },
    toResetAudit(row) {
      this.row = row
      this.showResetAudit = true
    },
    resetAudit() {
      const formData = new FormData()
      formData.append('id', this.row.id)
      this.resetAuthedInfo(formData).then(res => {
        this.showResetAudit = false
        this.$message.success(res.msg)
        this.onSearch()
      })
    },
    beforeCloseResetAuditModal(done) {
      this.showResetAudit = false
      done()
    },
    // 敏感词审核
    toAudit(row) {
      this.row = row
      if (row.sensitive) {
        this.showAudit = true
      } else {
        this.audit(1)
      }
    },
    beforeCloseAuditModal(done) {
      this.showAudit = false
      done()
    },
    // 不敏感词审核
    audit(authedType) {
      const formData = new FormData()
      formData.append('id', this.row.id)
      formData.append('authedType', authedType)
      this.authedInfo(formData).then(res => {
        this.showAudit = false
        this.$message.success(res.msg)
        this.onSearch()
      })
    },
    getSensitiveName(sensitive) {
      return sensitive ? '敏感' : '不敏感'
    },
    getCategoryNameByValue(id) {
      const columnType = []
      flattenArray(this.columnType, columnType)
      const res = find(columnType, row => {
        return row.id === parseInt(id, 10)
      })
      if (res) {
        return res.name
      }
      return ''
    },
    getAuditNameByValue(value) {
      const res = find(this.infoAuthedType, row => {
        return row.value === parseInt(value, 10)
      })
      if (res) {
        return res.key
      }
      return ''
    },
    openMenu(param) {
      let id
      // 子菜单
      if (typeof param === 'object') {
        id = param.index
      // 展开折叠菜单
      } else {
        id = param
      }
      this.columnId = id
      if (this.promise) {
        this.promise.then(() => {
          this.onSearch()
        })
      }
    },
    // 关键词复选框变更
    changeKeywords(keywords) {
      if (keywords.indexOf('other') === -1) {
        this.$refs.form.clearValidate()
        this.form.otherTag = ''
      }
    },
    changeAuthors(author) {
      if (author === 'other') {
        this.$refs.form.clearValidate()
        this.form.otherAuthor = ''
      }
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
    // 筛选项中点击选择图片
    operSelectedFile(file) {
      if (this.operImgUrl) {
        this.operImgUrl = ''
      }
      this.operFileList = [file]
    },
    checkLabels(val) {
      const labelLen = this.labels.length
      const checkedCount = val.length
      this.checkAll = checkedCount === labelLen
      this.isIndeterminate = checkedCount > 0 && checkedCount < labelLen
    },
    checkAllLabels(val) {
      if (val) {
        const labels = this.labels
        labels.forEach(label => {
          this.form.labels.push(label)
        })
      } else {
        this.form.labels = []
      }
      this.isIndeterminate = false
    },
    goInto(row = {}) {
      if (row.id) {
        this.row = row
        const query = { id: row.id }
        this.searchInfo(query).then(res => {
          const { info } = res.data
          const { form } = this
          let tags = []
          if (info.tags) {
            tags = info.tags.split(',')
            forEach(tags, (tag, index) => {
              const res = find(this.tags, o => {
                return tag === o.value
              })
              if (!res) {
                form.otherTag = tag
                tags[index] = 'other'
              }
            })
          }

          const toped = []
          if (info.toped) {
            toped.push('part')
          }
          if (info.globeToped) {
            toped.push('global')
          }

          if (info.thumbnail) {
            const file = {
              name: info.thumbnail,
              url: info.thumbnail
            }
            this.fileList = [file]
            form.contentType = 'image'
          }
          if (info.videoAddr) {
            form.videoAddr = info.videoAddr
            form.contentType = 'video'
          }

          let author = info.author
          const isAuthor = find(this.authors, o => o.value === author)
          if (!isAuthor) {
            form.otherAuthor = author
            author = 'other'
          }

          if (info.newStatus) {
            form.titleTags.push('new')
          }
          if (info.hotStatus) {
            form.titleTags.push('hot')
          }

          form.title = info.title
          form.keywords = info.keywords
          form.tags = tags
          form.desc = info.description
          form.toped = toped
          form.author = author
          form.abstr = info.abstr
          form.content = info.content
          form.newStatus = info.newStatus
          form.hotStatus = info.hotStatus
          form.clickcount = info.clickcount
          form.copyright = info.copyright
          form.sortIndex = info.sortIndex
        })
        this.action = 'modify'
        this.modalTitle = '编辑'
      } else {
        this.action = 'add'
        this.row = {}
        this.modalTitle = '添加'
      }
      this.home = false
    },
    handleClickTabs() {
      this.onSearch()
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
        o[k] = ''
      })
      this.form.titleTags = []
      this.form.tags = []
      this.form.toped = []
      this.form.hotStatus = false
      this.form.newStatus = false
      this.form.contentType = 'image'
      this.form.sortIndex = 0
      this.form.clickcount = 100
      this.row = {}
    },
    showTipsModal(row) {
      this.row = row
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
        this.$message.success(res.data.msg)
        this.closePreReleaseModal()
      })
    },
    previewPc(row) {
      this.previewPcContentPage({ id: row.id }).then(res => {
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
    previewM(row) {
      this.previewMContentPage({ id: row.id }).then(res => {
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
    getList(query = {}) {
      const { title, infoSensitiveType, operateTime } = this.searchForm
      query.chanId = this.columnId
      query.authod = this.activeName === 'audit' ? '0' : '1'
      query.title = title
      query.sensitive = infoSensitiveType
      if (operateTime) {
        query.startTime = formatTime(new Date(operateTime[0]).getTime())
        query.endTime = formatTime(new Date(operateTime[1]).getTime())
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
      const hotStatus = data.titleTags.indexOf('hot') !== -1 ? '1' : '0'
      const newStatus = data.titleTags.indexOf('new') !== -1 ? '1' : '0'
      const toped = data.toped.indexOf('part') !== -1 ? '1' : '0'
      const globeToped = data.toped.indexOf('global') !== -1 ? '1' : '0'
      const author = data.author === 'other' ? data.otherAuthor : data.author
      let tags
      if (data.tags.indexOf('other') !== -1) {
        tags = reduce(data.tags, (res, tag, index) => {
          if (tag === 'other') {
            res.push(this.form.otherTag)
          } else {
            res.push(tag)
          }
          return res
        }, []).join(',')
      } else {
        tags = data.tags.join(',')
      }

      formData.append('chanId', this.columnId)
      formData.append('title', data.title)
      formData.append('keywords', data.keywords)
      formData.append('tags', tags)
      formData.append('desc', data.desc)
      formData.append('subTitle', '')
      formData.append('toped', toped)
      formData.append('globeToped', globeToped)
      formData.append('thumbnail', data.thumbnail)
      formData.append('videoAddr', data.videoAddr)
      formData.append('author', author)
      formData.append('origin', '')
      formData.append('abstr', data.abstr)
      formData.append('content', data.content)
      formData.append('newStatus', newStatus)
      formData.append('hotStatus', hotStatus)
      formData.append('clickcount', data.clickcount)
      formData.append('copyright', data.copyright)
      formData.append('sortIndex', data.sortIndex)
      return formData
    },
    submit() {
      const { id } = this.row
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
          // 新增
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
      const { id } = this.row
      const formData = new FormData()
      formData.append('id', id)
      this.destroyData(formData).then(res => {
        this.closeTipsModal()
        this.onSearch()
        this.row = {}
      })
    },
    destroyAll() {
      const ids = reduce(this.multipleSelection, (res, row) => {
        res.push(row.id)
        return res
      }, [])
      this.destroyDatas({ ids }).then(res => {
        this.closeTipsModal()
        this.onSearch()
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
      this.form.content = val
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
.operate-form .local-upload {
  display: inline-block;
  margin-left: 10px;
}
.input-checkbox-group {
  display: inline-block;
  margin-left: 10px;
}
.other-tag {
  display: inline-block;
  margin-left: 10px;
}
.other-author {
  display: inline-block;
}
.column-menu-wrap {
  margin-left: 20px;
}
.column-menu-title {
  font-size: 13px;
  font-weight: bold;
  padding: 0 5px 10px;
}
.local-upload {
  width: 350px;
}
.cms-content-manage >>> .el-radio {
  padding: 10px 0;
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
