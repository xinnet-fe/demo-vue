<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <span style="display:inline-block;">用户编号：</span>
        <el-input v-model="listQuery.actId" placeholder="请输入用户编号" style="width: 17%;margin-right: 10px;" class="filter-item" @keyup.enter.native="handleFilter" />
        <span style="display:inline-block;" class="demonstration">注册日期： </span>
        <el-date-picker v-model="listQuery.publishDate" type="datetime" value-format="yyyy-MM-dd" format="yyyy-MM-dd" class="filter-item" style="margin-right: 10px;" placeholder="请选择发布时间" />
        <span style="display:inline-block;">注册设备：</span>
        <el-select v-model="listQuery.classId" placeholder="请选择注册设备" clearable style="margin-right: 10px;" class="filter-item">
          <el-option v-for="item in categorylist" :key="item.name" :label="item.name" :value="item.categoryId" />
        </el-select>
        <span style="display:inline-block;">注册渠道：</span>
        <el-select v-model="listQuery.auditState" placeholder="请选择注册渠道" clearable style="margin-right: 10px;" class="filter-item">
          <el-option v-for="item in auditState" :key="item.num" :label="item.name" :value="item.num" />
        </el-select>
        <span style="display:inline-block;">用户类型：</span>
        <el-select v-model="listQuery.publishState" placeholder="请选择用户类型" clearable style="margin-right: 10px;" class="filter-item">
          <el-option v-for="item in publishState" :key="item.num" :label="item.name" :value="item.num" />
        </el-select>
        <span style="display:inline-block;">分公司： </span>
        <el-select v-model="listQuery.isTop" placeholder="请选择分公司" clearable style="margin-right: 10px;" class="filter-item">
          <el-option v-for="item in isTop" :key="item.num" :label="item.name" :value="item.num" />
        </el-select>
        <span style="display:inline-block;">账号状态： </span>
        <el-select v-model="listQuery.isTop" placeholder="请选择账号状态" clearable style="margin-right: 10px;" class="filter-item">
          <el-option v-for="item in isTop" :key="item.num" :label="item.name" :value="item.num" />
        </el-select>
        <el-button v-waves style="margin-right: 20px;" @click="handleFilter">
          搜索
        </el-button>
        <el-button style="margin-right: 20px;" @click="resetModal">
          重置
        </el-button>
      </el-form>
      <!-- <span style="width:8%;display:inline-block;">关键词：</span>
        <el-input v-model="listQuery.keyword" placeholder="请输入文章关键词标签" style="width: 22%;margin-right: 20px;" class="filter-item" @keyup.enter.native="handleFilter" /> -->
      <!-- <el-button class="filter-item" style="margin-left: 10px;margin-right: 20px;" type="primary" @click="handleCreate">
        新增
      </el-button> -->
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
      <el-table-column label="注册设备" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.actId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册渠道" width="185">
        <template slot-scope="{row}">
          <!-- <span class="link-type">{{ row.title }}</span> -->
          <span v-if="row.title.length < 20">{{ row.title }}</span>
          <span v-else>{{ row.title.substr(0, 20) }}...</span>
        </template>
      </el-table-column>
      <el-table-column label="用户编号" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <span>{{ row.categoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="用户类型" width="70">
        <template slot-scope="{row}">
          <span>{{ row.categoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册日期" align="center" width="152">
        <template slot-scope="{row}">
          <span>{{ row.createTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" width="175">
        <template slot-scope="{row}">
          <span>{{ row.tag }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分公司" align="center" width="175">
        <template slot-scope="{row}">
          <span>{{ row.tag }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位（个人）名称" align="center" width="175">
        <template slot-scope="{row}">
          <span>{{ row.tag }}</span>
        </template>
      </el-table-column>
      <el-table-column label="认证类型" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.auditStates }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实名状态" align="center" width="80">
        <template slot-scope="{row}">
          <span v-if="row.publishStates === '已发布'" style="color:#65c13c;">{{ row.publishStates }}</span>
          <span v-else>{{ row.publishStates }}</span>
          <!-- <span v-if="row.publishStatus">{{ row.publishStatus }}</span>
          <span v-else>未发布</span> -->
        </template>
      </el-table-column>
      <el-table-column label="账号绑定邮箱" align="center" width="60">
        <template slot-scope="{row}">
          <span style="color:#0069ff;cursor:pointer;" @click="handleLookover(row)">查看</span>
        </template>
      </el-table-column>
      <el-table-column label="账号状态" align="center" width="80">
        <template slot-scope="{row}">
          <span v-if="row.publishStates === '已发布'" style="color:#65c13c;">{{ row.publishStates }}</span>
          <span v-else>{{ row.publishStates }}</span>
          <!-- <span v-if="row.publishStatus">{{ row.publishStatus }}</span>
          <span v-else>未发布</span> -->
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="60" class-name="small-padding fixed-width">
        <!-- <template slot-scope="{row,$index}"> -->
        <template slot-scope="{row}">
          <span style="color:#0069ff;cursor:pointer;" @click="handleAudit(row)">编辑</span>
          <span v-if="row.publishStates !== '锁定'" style="color:#0069ff;cursor:pointer;" @click="handleAudit(row)">解锁</span>
          <span v-if="row.publishStates === '锁定'" style="color:#0069ff;cursor:pointer;" @click="handleAudit(row)">锁定</span>
          <span style="color:#0069ff;cursor:pointer;" @click="handleAudit(row)">解除动态口令</span>
          <span style="color:#0069ff;cursor:pointer;" @click="handleAudit(row)">注销</span>
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
          <el-input v-model="temp.title" type="textarea" rows="3" style="width:360px;" placeholder="请输入内容" minlength="5" maxlength="60" show-word-limit @input="handleRemark" />
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
          <!-- <span
            style="position: absolute;display: inline-block;width: 160px;right: -170px;"
          >(多个关键词用"、"号隔开)</span> -->
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
        <el-form-item label="内容简介：" prop="briefIntroduction">
          <el-input v-model="temp.summary" :autosize="{ minRows: 4, maxRows: 6}" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="文章正文：">
          <el-input v-model="temp.content" :autosize="{ minRows: 16, maxRows: 16}" style="width:350px;" type="textarea" placeholder="Please input" />
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
        <el-button type="primary" @click="handleAudits()">
          审核
        </el-button>
      </div>
    </el-dialog>
    <!-- 新增标签 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="125px" style="width: 400px; margin-left:50px;">
        <el-form-item label="文章标题：" prop="title">
          <el-input v-model="temp.title" type="textarea" placeholder="请输入内容" minlength="5" maxlength="60" show-word-limit @input="handleRemark" />
        </el-form-item>
        <span v-if="tempflag" style="color:#f00;">文章标题不能少于5位</span>
        <el-form-item label="所属栏目：" prop="column">
          <el-select v-model="temp.column" placeholder="请选择文章所属栏目" clearable style="width: 100%;" class="filter-item">
            <el-option v-for="item in columns" :key="item" :label="item" :value="item" />
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
          <el-switch v-model="temp.value" />
        </el-form-item>
        <el-form-item label="浏览器初始值：" prop="originalValue">
          <el-select v-model="temp.originalValue" placeholder="请选择浏览器初始值" clearable style="width: 100%;" class="filter-item">
            <el-option v-for="item in originalvalue" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="作者：" prop="author">
          <el-select v-model="temp.author" placeholder="请选择作者" clearable style="width: 160px;" class="filter-item">
            <el-option v-for="item in authors" :key="item" :label="item" :value="item" />
          </el-select>
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="handleauthor">
            添加作者
          </el-button>
        </el-form-item>
        <el-form-item label="内容简介：" prop="briefIntroduction">
          <el-input v-model="temp.briefIntroduction" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
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
        <el-button type="primary" @click="dialogStatusdele==='deletes'?handleDeletes():handleDelete()">确定</el-button>
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
import { auditDetail, handleAudit } from '@/api/demos/knowledges'
import { fetchList, createArticle, updateArticle } from '@/api/demos/article'
import waves from '@/directive/demos/waves' // waves directive
import { parseTime } from '@/utils/demos'
import reduce from 'lodash/reduce'
import remove from 'lodash/remove'
import forEach from 'lodash/forEach'
import Pagination from '@/components/demos/Pagination' // secondary package based on el-pagination

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
  components: { Pagination },
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
  data() {
    return {
      tableKey: 0,
      list: null,
      value1: '',
      total: 0,
      date1: '',
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 15,
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
      authors: ['安妮', '安东', '安东尼', '安东尼奥'],
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
        actId: undefined,
        title: undefined,
        categoryName: undefined,
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
        briefIntroduction: [{ required: true, message: '请输入内容简介', trigger: 'blur' }],
        authorName: [{ required: true, message: '请输入作者名称', trigger: 'blur' }]
      },
      multipleSelection: [],
      values: false,
      tempflag: false,
      authorName: '',
      categorylist: [],
      newsbanWords: ''
    }
  },
  methods: {
    async getList() {
      // this.listLoading = true
      // fetchList(this.listQuery).then(response => {
      // this.total = response.page.total_count
      // response.data.forEach((row, i) => {
      //   row.auditStates = this.auditState[row.auditState].name
      //   row.publishStates = this.publishState[row.publishState].name
      //   if (row.tags.length) {
      //     let tag = ''
      //     row.tags.forEach((rows, i) => {
      //       tag += i + 1 === row.tags.length ? rows.name : rows.name + '、'
      //     })
      //     row.tag = tag
      //   }
      // })// this.list = response.data
      // this.list = response.data.items
      // this.total = response.data.total

      // Just to simulate the time of the request
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 1.5 * 1000)
      // })
      // categoryList().then(response => {
      //   this.categorylist = response.data
      // })

      const { data } = await fetchList(this.listQuery)
      this.list = data.items
      // forEach(data.items, id => { id.value = true })
      // this.$set(this.list, newList)
      this.total = data.total
      this.listLoading = false
      this.oldList = this.list.map(v => v.id)
      this.newList = this.oldList.slice()
      this.$nextTick(() => {
        this.setSort()
      })
    },
    resetModal() {
      this.listQuery = {
        page: 1,
        limit: 15,
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
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    resetTemps() {
      this.tempLookover = {
        state: '',
        context: ''
      }
    },
    addAuthorname() {
      this.authors.push(this.temp.authorName)
    },
    // 添加作者名称
    handleaddAuthor() {
      this.addAuthorname()
      this.dialogauthor = false
    },
    handleUpdateswitch(row) {
      this.temp = Object.assign({}, row)
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.updateData()
    },
    handleauthor() {
      this.resetTemp()
      this.dialogauthor = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
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
    handleDeletes() {
      this.destroyOrder()
      this.dialogPvVisible = false
    },
    handleDeletehint(row, index) {
      row.index = index
      this.temp = Object.assign({}, row)
      this.temp.row = row.id
      this.temp.index = index
      this.dialogStatusdele = 'delete'
      this.dialogPvVisible = true
    },
    handleDelete(row, index) {
      const tempData = Object.assign({}, this.temp)
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.dialogPvVisible = false
      this.list.splice(tempData.index, 1)
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
    },
    destroyOrder() {
      const ids = reduce(this.multipleSelection, (r, item) => {
        r.push(item.id)
        return r
      }, [])
      this.$store.dispatch('order/destroyOrder', ids).then(res => {
        this.$notify({
          title: 'Success',
          message: '删除成功！',
          type: 'success',
          duration: 1000
        })
        const newList = this.list
        forEach(ids, id => remove(newList, { id }))
        this.$set(this.list, newList)
      })
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
</style>
