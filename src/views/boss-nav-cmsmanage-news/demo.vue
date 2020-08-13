<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form inline>
        <el-form-item label="ID:">
          <el-input v-model="listQuery.actId" placeholder="请输入ID" class="filter-item" @keyup.enter.native="handleFilter" />
        </el-form-item>
        <el-form-item label="标题:">
          <el-input v-model="listQuery.title" placeholder="请输入文章标题" class="filter-item" @keyup.enter.native="handleFilter" />
        </el-form-item>
        <el-form-item label="所属栏目:">
          <el-select v-model="listQuery.classId" placeholder="请选择文章所属栏目" clearable class="filter-item">
            <el-option v-for="item in categorylist" :key="item.name" :label="item.name" :value="item.categoryId" />
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态:">
          <el-select v-model="listQuery.auditState" placeholder="请选择审核状态" clearable class="filter-item">
            <el-option v-for="item in auditState" :key="item.num" :label="item.name" :value="item.num" />
          </el-select>
        </el-form-item>
        <el-form-item label="发布状态:">
          <el-select v-model="listQuery.publishState" placeholder="请选择发布状态" clearable class="filter-item">
            <el-option v-for="item in publishState" :key="item.num" :label="item.name" :value="item.num" />
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间:">
          <el-date-picker v-model="listQuery.publishDate" type="datetime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" class="filter-item" placeholder="请选择发布时间" />
        </el-form-item>
        <el-form-item label="置顶状态:">
          <el-select v-model="listQuery.isTop" placeholder="请选择置顶状态" clearable class="filter-item">
            <el-option v-for="item in isTop" :key="item.num" :label="item.name" :value="item.num" />
          </el-select>
        </el-form-item>
        <el-button v-waves @click="handleFilter">
          搜索
        </el-button>
        <el-button @click="resetModal">
          重置
        </el-button>
      </el-form>
      <div class="mult-operation">
        <el-button type="primary" size="mini" @click="handleCreate">
          新增
        </el-button>
      </div>
      <!-- <span style="width:8%;display:inline-block;">关键词：</span>
        <el-input v-model="listQuery.keyword" placeholder="请输入文章关键词标签" class="filter-item" @keyup.enter.native="handleFilter" /> -->
      <!-- <el-button type="danger" class="filter-item" style="margin-right: 20px;" @click="handleDeletehints">批量删除</el-button> -->
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column fixed type="selection" width="40" /> -->
      <el-table-column label="ID" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.actId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章标题" width="185">
        <template slot-scope="{row}">
          <!-- <span class="link-type">{{ row.title }}</span> -->
          <span v-if="row.title.length < 20">{{ row.title }}</span>
          <span v-else>{{ row.title.substr(0, 20) }}...</span>
        </template>
      </el-table-column>
      <el-table-column label="所属栏目" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span>{{ row.categoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="设置置顶" width="70">
        <template slot-scope="{row}">
          <el-switch
            v-model="row.top"
            :active-value="1"
            :inactive-value="0"
            @change="handleUpdateswitch(row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="关键词标签" align="center" width="175">
        <template slot-scope="{row}">
          <!-- <span v-if="row.summary.length < 20">{{ row.summary }}</span>
          <span v-else>{{ row.summary.substr(0, 20) }}...</span> -->
          <span>{{ row.tag }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" width="152">
        <template slot-scope="{row}">
          <span>{{ row.createTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" align="center" width="152">
        <template slot-scope="{row}">
          <span>{{ row.publishTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center" width="80">
        <template slot-scope="{row}">
          <span v-if="row.auditStates === '已通过'" style="color:#65c13c;">{{ row.auditStates }}</span>
          <span v-else>{{ row.auditStates }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布状态" align="center" width="80">
        <template slot-scope="{row}">
          <span v-if="row.publishStates === '已发布'" style="color:#65c13c;">{{ row.publishStates }}</span>
          <span v-else>{{ row.publishStates }}</span>
          <!-- <span v-if="row.publishStatus">{{ row.publishStatus }}</span>
          <span v-else>未发布</span> -->
        </template>
      </el-table-column>
      <el-table-column label="审核结果" align="center" width="60">
        <template slot-scope="{row}">
          <span style="color:#0069ff;cursor:pointer;" @click="handleLookover(row)">查看</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width">
        <!-- <template slot-scope="{row,$index}"> -->
        <template slot-scope="{row}">
          <span v-if="row.publishStates !== '已发布'" style="color:#0069ff;cursor:pointer;" @click="handleAudit(row)">审核</span>
          <span v-if="row.publishStates === '已发布'" disabled style="color:#aaa;cursor:pointer;">审核</span>
          <span v-if="row.publishStates === '未发布'" style="color:#0069ff;cursor:pointer;" @click="handleModify(row)">编辑</span>
          <span v-if="row.publishStates === '未发布'" style="color:#0069ff;cursor:pointer;" @click="handleDelete(row)">删除</span>
          <!-- <el-button type="primary" class="btnstyle" size="mini" @click="handleAudit(row)">
            审核
          </el-button> -->
          <!-- <el-bu    -->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!-- 审核标签 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogAudit">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="125px" style="width: 400px; margin-left:50px;">
        <el-form-item label="文章标题：" prop="title">
          <!-- <el-input type="textarea" placeholder="请输入内容" v-model="temp.title" maxlength="30" show-word-limit /> -->
          <el-input v-model="temp.title" type="textarea" rows="3" style="width:360px;" placeholder="请输入内容" minlength="5" maxlength="100" show-word-limit @input="handleRemark" />
        </el-form-item>
        <span v-if="tempflag" style="color:#f00;">文章标题不能少于5位</span>
        <el-form-item label="所属栏目：" prop="column">
          <el-input v-model="temp.categoryName" disabled />
          <!-- <el-select v-model="temp.categoryName" placeholder="请选择文章所属栏目" clearable style="width: 100%;" class="filter-item">
            <el-option v-for="item in columns" :key="item" :label="item" :value="item" />
          </el-select> -->
        </el-form-item>
        <el-form-item label="关键词：" prop="keyword">
          <el-input v-model="temp.tag" disabled />
          <span
            style="position: absolute;display: inline-block;width: 160px;right: -170px;"
          >(多个关键词用"、"号隔开)</span>
        </el-form-item>
        <el-form-item label="发布时间：">
          <!-- <el-input v-model="temp.publishTime" /> -->
          <el-date-picker v-model="temp.publishTime" disabled type="datetime" class="filter-item" placeholder="请选择发布时间" />
        </el-form-item>
        <el-form-item label="文章图片：">
          <img :src="temp.imgContent" style="width:280px;height:140px;">
        </el-form-item>
        <el-form-item label="作者：" prop="author">
          <el-input v-if="temp.writer" v-model="temp.writer" disabled />
          <span v-else>无</span>
          <!-- <el-select v-model="temp.author" placeholder="请选择作者" clearable style="width: 160px;" class="filter-item">
            <el-option v-for="item in authors" :key="item" :label="item" :value="item" />
          </el-select> -->
        </el-form-item>
        <el-form-item label="内容简介：" prop="summary">
          <el-input v-model="temp.summary" :autosize="{ minRows: 6, maxRows: 8}" rows="3" minlength="5" style="width:350px;" maxlength="300" show-word-limit type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="文章正文：">
          <!-- <el-input v-model="temp.content" :autosize="{ minRows: 16, maxRows: 16}" style="width:350px;" type="textarea" placeholder="Please input" /> -->
          <!-- <mavon-editor v-model="temp.content" style="width: 520px; height: 420px;" :toolbars="toolbars" /> -->
          <Tinymce v-model="temp.content" :width="650" :height="420" />
        </el-form-item>
        <div v-if="newsbanWords">
          <p style="color:#f00;">审核失败</p>
          <p style="color:#f00;">文章违禁词有：{{ newsbanWords }}</p>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">
          取消
        </el-button>
        <el-button type="primary" @click="handlePass()">
          人工通过
        </el-button>
        <el-button type="primary" @click="handleAudits()">
          审核
        </el-button>
      </div>
    </el-dialog>
    <!-- 新增标签 -->
    <el-dialog width="60%" :before-close="beforeClose" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="addOrEditForm" :rules="dataRules" :model="temp" label-position="left" label-width="125px" style="width: 400px; margin-left:50px;">
        <el-form-item label="文章标题：" prop="title">
          <el-input v-model="temp.title" type="textarea" placeholder="请输入内容" minlength="5" maxlength="60" show-word-limit @input="handleRemark" />
        </el-form-item>
        <span v-if="tempflag" style="color:#f00;">文章标题不能少于5位</span>
        <el-form-item label="所属栏目：" prop="column">
          <el-select v-model="temp.column" placeholder="请选择文章所属栏目" clearable style="width: 100%;" class="filter-item">
            <el-option v-for="item in categorylist" :key="item.name" :label="item.name" :value="item.categoryId" />
          </el-select>
        </el-form-item>
        <el-form-item label="关键词：" prop="keyword">
          <el-input v-model="temp.keyword" />
          <span
            style="position: absolute;display: inline-block;width: 160px;right: -170px;"
          >(多个关键词用"、"号隔开)</span>
        </el-form-item>
        <el-form-item label="发布时间：">
          <el-date-picker v-model="temp.releaseTime" type="datetime" class="filter-item" placeholder="请选择发布时间" />
        </el-form-item>
        <el-form-item label="置顶设置：" prop="value">
          <el-switch
            v-model="temp.value"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="浏览器初始值：" prop="originalValue">
          <el-select v-model="temp.originalValue" placeholder="请选择浏览器初始值" clearable style="width: 100%;" class="filter-item">
            <el-option v-for="item in originalvalue" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="文章图片：" prop="file">
          <el-upload
            ref="upload"
            class="upload"
            action="/admin/article"
            :on-change="selectedFile"
            :file-list="fileList"
            :auto-upload="false"
            :limit="1"
            list-type="picture"
            accept="image/*"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传图片</div> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="作者：" prop="author">
          <el-select v-model="temp.author" placeholder="请选择作者" clearable style="width: 160px;" class="filter-item">
            <el-option
              v-for="item in authors"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="handleauthor">
            添加作者
          </el-button>
        </el-form-item>
        <!-- <el-form-item label="内容简介：" prop="briefIntroduction">
          <el-input v-model="temp.briefIntroduction" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item> -->
        <el-form-item label="内容简介：" prop="summary">
          <el-input v-model="temp.summary" :autosize="{ minRows: 6, maxRows: 8}" rows="3" minlength="5" style="width:350px;" maxlength="300" show-word-limit type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="文章正文：" prop="content">
          <!-- <el-input v-model="temp.content" :autosize="{ minRows: 8, maxRows: 16}" style="width:350px;" type="textarea" placeholder="Please input" /> -->
          <!-- <mavon-editor v-model="temp.content" style="width: 520px; height: 420px;" :toolbars="toolbars" /> -->
          <Tinymce v-model="temp.content" :width="650" :height="420" />
        </el-form-item>
        <div v-if="newsbanWords">
          <p style="color:#f00;">违禁词：{{ newsbanWords }}</p>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button @click="handleAudits">
          违禁词检索
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          发布
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogauthor" title=" ">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="作者名称：" prop="authorName">
          <el-input v-model="temp.authorName" placeholder="请输入作者名称" />
          <!-- <el-input v-model="authorName" type="textarea" placeholder="请输入内容" minlength="5" maxlength="60" show-word-limit @input="handleRemark" /> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogauthor = false">取消</el-button>
        <el-button type="primary" @click="handleaddAuthor()">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="textMap[dialogStatusdele]" :visible.sync="dialogPvVisible">
      <p v-if="dialogStatusdele==='deletes'">您确定要删除选中的数据吗？</p>
      <p v-else>您确定要删除此数据吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPvVisible = false">取消</el-button>
        <!-- <el-button type="primary" @click="handleDeletes()">确定</el-button> -->
        <el-button type="primary" @click="toHandleDelete">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="Looktitle" :visible.sync="dialogLookVisible">
      <p>审核状态：{{ tempLookover.state }}</p>
      <p v-if="tempLookover.state == '未通过'">未通过原因：{{ tempLookover.context }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogLookVisible = false">取消</el-button>
        <!-- <el-button type="primary" @click="handleDeletes()">确定</el-button> -->
        <el-button type="primary" @click="dialogLookVisible = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { newsList, auditDetail, handleAudit, categoryList, articlePass } from '@/api/demos/knowledges'
import waves from '@/directive/demos/waves' // waves directive
import Tinymce from '@/components/demos/Tinymce'
import { parseTime } from '@/utils/demos'
import { mapState } from 'vuex'
import find from 'lodash/find'
// import reduce from 'lodash/reduce'
// import remove from 'lodash/remove'
// import forEach from 'lodash/forEach'
import Pagination from '@/components/demos/Pagination'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: {
    Pagination,
    Tinymce
  },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  data() {
    const fileValidator = (rule, value, callback) => {
      const file = this.fileList[0]
      const maxSize = 1024 * 100
      const error = '图片小于100kb'
      if (file && file.size > maxSize) {
        this.$notify.error(error)
        callback(new Error(error))
      } else {
        callback()
      }
    }

    return {
      tableKey: 0,
      list: null,
      value1: '',
      total: 0,
      date1: '',
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        // sort: '+id',
        actId: undefined,
        title: undefined,
        classId: undefined,
        auditState: undefined,
        publishState: undefined,
        // publishState: '1591924192000',
        publishDate: undefined,
        isTop: undefined
      },
      importanceOptions: [1, 2, 3],
      // authors: ['安妮', '安东', '安东尼', '安东尼奥'],
      originalvalue: ['100', '110', '200', '220', '300', '330'],
      columns: ['域名知识', '网站建设知识'],
      auditState: [{
        name: '未审核',
        num: 0
      },
      {
        name: '已通过',
        num: 1
      },
      {
        name: '未通过',
        num: 2
      }],
      publishState: [{
        name: '未发布',
        num: 0
      },
      {
        name: '已发布',
        num: 1
      }],
      isTop: [{
        name: '未置顶',
        num: 0
      },
      {
        name: '置顶',
        num: 1
      }],
      calendarTypeOptions,
      temp: {
        id: undefined,
        actId: undefined,
        title: undefined,
        categoryName: undefined,
        categoryId: undefined,
        auditState: undefined,
        publishState: undefined,
        publishDate: new Date(),
        isTop: undefined,
        originalValue: undefined,
        value: undefined
      },
      tempLookover: {
        state: '',
        content: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      dialogStatusdele: '',
      dialogauthor: false,
      dialogAudit: false,
      dialogLookVisible: false,
      Looktitle: '审核结果',
      textMap: {
        update: '编辑标签',
        create: '新增标签',
        audit: '审核内容'
      },
      dialogPvVisible: false,
      rules: {
        column: [{ required: true, message: '请选择文章所属栏目', trigger: 'change' }],
        releaseTime: [{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }],
        keyword: [{ required: true, message: '请输入关键词', trigger: 'blur' }],
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        originalValue: [{ required: true, message: '请选择初始值', trigger: 'change' }],
        author: [{ required: true, message: '请选择作者', trigger: 'change' }],
        summary: [{ required: true, message: '请输入内容简介', trigger: 'blur' }],
        authorName: [{ required: true, message: '请输入作者名称', trigger: 'blur' }]
      },
      // 添加和修改表单规则
      dataRules: {
        column: [{ required: true, message: '请选择文章所属栏目', trigger: 'change' }],
        releaseTime: [{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }],
        keyword: [{ required: true, message: '请输入关键词', trigger: 'blur' }],
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        originalValue: [{ required: true, message: '请选择初始值', trigger: 'change' }],
        author: [{ required: true, message: '请选择作者', trigger: 'change' }],
        summary: [{ required: true, message: '请输入内容简介', trigger: 'blur' }],
        content: [{ required: true, message: '请输入文章正文', trigger: 'blur' }],
        authorName: [{ required: true, message: '请输入作者名称', trigger: 'blur' }],
        file: [{ validator: fileValidator }]
      },
      multipleSelection: [],
      values: false,
      tempflag: false,
      authorName: '',
      categorylist: [],
      newsbanWords: '',
      // 图片列表
      fileList: [],
      // fileData: {}
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  computed: {
    ...mapState({
      authors: state => state.article.writers
    })
  },
  created() {
    if (this.msg === 'unreviewed') {
      this.listQuery.type = 'unreviewed'
    } else if (this.msg === 'unpublished') {
      this.listQuery.type = 'unpublished'
    }
    this.getList()
  },
  methods: {
    beforeClose(done) {
      this.fileList = []
      done()
    },
    getList() {
      this.listLoading = true
      newsList(this.listQuery).then(response => {
        this.total = response.page.total_count
        response.data.forEach((row, i) => {
          row.auditStates = this.auditState[row.auditState].name
          row.publishStates = this.publishState[row.publishState].name
          if (row.tags.length) {
            let tag = ''
            row.tags.forEach((rows, i) => {
              tag += i + 1 === row.tags.length ? rows.name : rows.name + '、'
            })
            row.tag = tag
          }
        })
        this.list = response.data

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
      categoryList().then(response => {
        this.categorylist = response.data
      })
    },
    resetModal() {
      this.listQuery = {
        page: 1,
        limit: 10,
        // sort: '+id',
        actId: undefined,
        title: undefined,
        classId: undefined,
        auditState: undefined,
        publishState: undefined,
        publishDate: undefined,
        isTop: undefined
      }
    },
    handleRemark(e) {
      if (e.length < 5) {
        this.tempflag = true
      } else {
        this.tempflag = false
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        actId: undefined,
        title: undefined,
        categoryName: undefined,
        categoryId: undefined,
        auditState: undefined,
        publishState: undefined,
        publishDate: new Date(),
        isTop: undefined,
        originalValue: undefined,
        value: undefined
      }
    },
    resetTemps() {
      this.tempLookover = {
        state: '',
        context: ''
      }
    },
    addAuthorname() {
      const name = this.temp.authorName
      this.$store.dispatch('article/addWriter', { name }).then(() => {
        this.getWriter()
      })
    },
    // 添加作者名称
    handleaddAuthor() {
      this.addAuthorname()
      this.dialogauthor = false
    },
    handleUpdateswitch(row) {
      console.log(row)
      const form = new FormData()
      const data = { actId: row.actId, isTop: row.top ? 1 : 0 }
      this.temp = Object.assign({}, row)
      form.append('article', JSON.stringify(data))

      this.$store.dispatch('article/modifyArticle', form)
    },
    handleauthor() {
      // this.resetTemp()
      this.dialogauthor = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    getWriter() {
      this.$store.dispatch('article/writers')
    },
    delEditorPart() {
      const editorUploadButton = document.querySelector('.editor-custom-btn-container')
      if (editorUploadButton) {
        editorUploadButton.innerHTML = ''
      }
      // const editorFooter = document.querySelectorAll('.mce-container-body.mce-flow-layout')
      // if (editorFooter.length) {
      //   editorFooter[editorFooter.length - 1].innerHTML = ''
      // }
    },
    handleCreate() {
      this.getWriter()
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['addOrEditForm'].clearValidate()
        this.delEditorPart()
      })
    },
    handleModify(o) {
      this.getWriter()
      this.dialogStatus = 'modify'
      this.dialogFormVisible = true
      const tempAuthor = find(this.authors, { value: parseInt(o.writer, 10) })
      const author = tempAuthor ? tempAuthor.label : ''
      this.$store.dispatch('article/detail', { actId: o.actId }).then(res => {
        const row = res.data
        const value = row.top ? 1 : 0
        const data = {
          actId: row.actId,
          title: row.title,
          author,
          summary: row.summary,
          column: row.categoryId,
          auditState: row.auditState,
          auditResult: row.auditResult,
          releaseTime: new Date(row.publishTime),
          publishState: row.publishState,
          value,
          originalValue: row.visitCount,
          content: row.content
        }
        if (row.tags.length) {
          let tag = ''
          row.tags.forEach((rows, i) => {
            tag += i + 1 === row.tags.length ? rows.name : rows.name + '、'
          })
          data.keyword = tag
        }
        if (row.imageUrl && row.imgContent) {
          this.fileList = [{ name: row.imageUrl.slice(5), url: row.imgContent }]
        }
        this.temp = Object.assign({}, data)
        this.$nextTick(() => {
          this.$refs['addOrEditForm'].clearValidate()
          this.delEditorPart()
        })
      })
    },
    selectedFile(file) {
      this.fileList = [file]
    },
    createData() {
      this.$refs['addOrEditForm'].validate((valid) => {
        if (valid) {
          const o = this.temp
          const isTop = o.value ? 1 : 0
          const data = {
            title: o.title,
            writer: o.author,
            summary: o.summary,
            categoryId: o.column,
            auditState: 0,
            auditResult: '',
            publishTime: o.releaseTime,
            publishState: 0,
            isTop,
            content: o.content,
            visitCount: o.originalValue,
            keywords: o.keyword
          }

          const form = new FormData()
          const file = this.$refs.upload.fileList[0]
          if (file && file.raw) {
            form.append('file', file.raw)
          }
          form.append('article', JSON.stringify(data))

          this.$store.dispatch('article/addArticle', form).then(res => {
            if (res.code === 'success' && res.success) {
              this.resetTemp()
              this.dialogFormVisible = false
              this.getList()
            } else {
              this.$notify.error({
                title: res.code,
                message: res.message
              })
            }
          })
        }
      })
    },
    handleLookover(row) {
      this.tempLookover.state = row.auditStates
      if (row.auditStates === '未通过') {
        this.tempLookover.context = '文章包含违禁词：' + row.auditResult
      }
      this.dialogLookVisible = true
    },
    handleCancel() {
      this.dialogAudit = false
      this.getList()
    },
    handlePass() {
      articlePass({ actId: this.temp.actId }).then(data => {
        this.$notify.success({
          title: '审核成功',
          message: '审核通过！'
        })
        this.dialogAudit = false
        this.getList()
      })
    },
    handleAudits() {
      handleAudit(
        { actId: this.temp.actId,
          summary: this.temp.summary,
          title: this.temp.title,
          content: this.temp.content }
      ).then(data => {
        if (data.message === '文章审核不通过，含有违禁词！') {
          if (data.data.banWords) {
            let str = ''
            data.data.banWords.forEach((row, i) => {
              if (data.data.banWords.length - 1 === i) {
                str += row
              } else {
                str += row + '、'
              }
            })
            this.newsbanWords = str
            this.temp.auditResult = str
          }
          this.$notify.error({
            title: '审核失败',
            message: '文章审核不通过，含有违禁词！'
          })
        } else if (data.message === '审核通过') {
          this.$notify.success({
            title: '审核成功',
            message: '审核通过！'
          })
          this.dialogAudit = false
          this.getList()
        }
      })
    },
    handleAudit(row) {
      auditDetail({ actId: row.actId }).then(data => {
        this.newsbanWords = ''
        this.temp = Object.assign({}, row) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogAudit = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      })
    },
    // handleUpdate(row) {
    //   this.temp = Object.assign({}, row) // copy obj
    //   this.temp.timestamp = new Date(this.temp.timestamp)
    //   this.dialogStatus = 'update'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    // },
    // convertBase64UrlToBlob(urlData, type) {
    //   const bytes = window.atob(urlData.split(',')[1])
    //   const ab = new ArrayBuffer(bytes.length)
    //   const ia = new Uint8Array(ab)
    //   for (let i = 0; i < bytes.length; i++) {
    //     ia[i] = bytes.charCodeAt(i)
    //   }
    //   return new Blob([ab], { type: type === 0 ? 'image/png' : 'image/mp4' })
    // },
    updateData() {
      this.$refs['addOrEditForm'].validate((valid) => {
        if (valid) {
          const o = this.temp
          const isTop = o.value ? 1 : 0
          const data = {
            actId: o.actId,
            title: o.title,
            writer: o.author,
            summary: o.summary,
            categoryId: o.column,
            auditState: o.auditState,
            auditResult: o.auditResult,
            publishTime: o.releaseTime,
            publishState: o.publishState,
            isTop,
            content: o.content,
            visitCount: o.originalValue,
            keywords: o.keyword
          }

          const form = new FormData()
          const file = this.$refs.upload.fileList[0]
          if (file && file.url && file.url.indexOf('blob:') > -1) {
            form.append('file', file.raw)
          }
          form.append('article', JSON.stringify(data))

          this.$store.dispatch('article/modifyArticle', form).then(res => {
            if (res.code === 'success' && res.success) {
              this.resetTemp()
              this.dialogFormVisible = false
              this.getList()
            } else {
              this.$notify.error({
                title: res.code,
                message: res.message
              })
            }
          })
        }
      })
    },
    handleDeletehints() {
      if (this.multipleSelection.length) {
        this.dialogStatusdele = 'deletes'
        this.dialogPvVisible = true
      } else {
        this.$message({
          type: 'error',
          message: '请选择要删除的选项！'
        })
        this.dialogPvVisible = false
      }
    },
    handleDelete(row) {
      this.temp.actId = row.actId
      this.dialogStatusdele = 'deletes'
      this.dialogPvVisible = true
    },
    handleDeletehint(row, index) {
      row.index = index
      this.temp = Object.assign({}, row)
      this.temp.row = row.id
      this.temp.index = index
      this.dialogStatusdele = 'delete'
      this.dialogPvVisible = true
    },
    toHandleDelete() {
      const id = this.temp.actId
      this.$store.dispatch('article/destroyArticle', id).then(() => {
        this.$notify({
          title: 'Success',
          message: '删除成功！',
          type: 'success',
          duration: 1000
        })

        this.dialogPvVisible = false
        this.getList()
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style>
  .btnstyle {
    width: auto!important;
    padding: 7px 5px!important;
    margin: 0px!important;
  }
  .mult-operation {
    margin: auto;
    text-align: right;
  }
</style>
