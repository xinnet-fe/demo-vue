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
    </div>
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table
      ref="dragTable"
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%"
    >
      <!-- @selection-change="handleSelectionChange" -->
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column align="center" width="70" label="注册设备">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="80" label="注册渠道">
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="80" label="用户编号">
        <template slot-scope="{row}">
          <span>{{ row.pageviews }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="用户类型">
        <template slot-scope="{row}">
          <el-switch v-if="row.value !== undefined" v-model="row.value" />
          <span v-else>1</span>
          <!-- <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag> -->
        </template>
      </el-table-column>

      <el-table-column align="center" label="注册日期">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="手机号">
        <template slot-scope="{row}">
          <span v-if="row.title.length < 20">{{ row.title }}</span>
          <span v-else>{{ row.title.substr(0, 20) }}...</span>
          <!-- <span>{{ row.title }}</span> -->
        </template>
      </el-table-column>

      <!-- <el-table-column label="分公司">
        <template slot-scope="{row}">
          <span>{{ row.keywords }}</span>
        </template>
      </el-table-column>

      <el-table-column label="单位（个人）名称">
        <template slot-scope="{row}">
          <span>{{ row.keywords }}</span>
        </template>
      </el-table-column>

      <el-table-column label="认证类型">
        <template slot-scope="{row}">
          <span>{{ row.keywords }}</span>
        </template>
      </el-table-column>

      <el-table-column label="实名状态">
        <template slot-scope="{row}">
          <span>{{ row.keywords }}</span>
        </template>
      </el-table-column> -->

      <el-table-column label="账号绑定邮箱" align="center" width="100">
        <template>
          <router-link :to="'/boss-nav-usermanagedetail/12'" class="link-type">
            <!-- <router-link :to="'/boss-nav-usermanagedetail/'+row.id" class="link-type"> -->
            <span style="color:#0069ff;cursor:pointer;">hy123</span>
          </router-link>
          <!-- <span style="color:#0069ff;cursor:pointer;">hy1234</span> -->
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

      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="{row}">
          <span style="color:#0069ff;cursor:pointer;" @click="handleAudit(row)">编辑</span>
          <span v-if="row.publishStates !== '锁定'" style="color:#0069ff;cursor:pointer;" @click="handleUnlock('lock')">解锁</span>
          <span v-if="row.publishStates === '锁定'" style="color:#0069ff;cursor:pointer;" @click="handleUnlock('unlock')">锁定</span>
          <span style="color:#0069ff;cursor:pointer;" @click="handleRelieve(row)">解除动态口令</span>
          <span style="color:#0069ff;cursor:pointer;" @click="handleLogout(row)">注销</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="Looktitle" :visible.sync="dialogAudit">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="110px" style="width: 400px; margin-left:50px;">
        <el-form-item label="用户编号：">
          <el-input v-model="temp.author" disabled />
        </el-form-item>
        <el-form-item label="手机号：" prop="phone" style="position:relative;">
          <el-input v-model="temp.phone" @change="handlePhone" />
          <span id="rightPhone" class="clored" style="display:none;">请输入正确的手机号</span>
          <span id="samePhone" class="clored" style="display:none;">新手机号不能和旧手机号一致</span>
        </el-form-item>
        <el-form-item label="账号绑定邮箱：" prop="email" style="position:relative;">
          <el-input v-model="temp.email" @change="handleEmail" />
          <span id="rightEmail" class="clored" style="display:none;">请输入正确的账号绑定邮箱</span>
          <span id="sameEmail" class="clored" style="display:none;">新邮箱不能和旧邮箱一致</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAudit = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleUpdate()">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :title="textMap[dialogUnlocktit]" :visible.sync="dialogUnlock">
      <p v-if="dialogUnlocktit==='lock'">确定要解锁该账号，解锁后该账号将继续可登录</p>
      <p v-else>确定要锁定该账号，锁定后该账号将不可登录</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUnlock = false">取消</el-button>
        <!-- <el-button type="primary" @click="handleDeletes()">确定</el-button> -->
        <el-button type="primary" @click="dialogUnlocktit==='lock'?handleLocks():handleUnlocks()">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="dialogRelievetit" :visible.sync="dialogRelieve">
      <p>确定要对该账号移除动态口令，移除后该账号的登录将不再需要输入动态口令</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRelieve = false">取消</el-button>
        <!-- <el-button type="primary" @click="handleDeletes()">确定</el-button> -->
        <el-button type="primary" @click="handleRelieves()">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="dialogLogouttit" :visible.sync="dialogLogout">
      <p>确定要注销该账号，注销后该账号将不可登录</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRelieve = false">取消</el-button>
        <!-- <el-button type="primary" @click="handleDeletes()">确定</el-button> -->
        <el-button type="primary" @click="handleLogouts()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { handleAudit } from '@/api/demos/knowledges'
import { fetchList } from '@/api/demos/article'
import waves from '@/directive/demos/waves' // waves directive
// import { parseTime } from '@/utils/demos'
// import reduce from 'lodash/reduce'
// import remove from 'lodash/remove'
// import forEach from 'lodash/forEach'
import $ from 'jquery'
import Pagination from '@/components/demos/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'DragTable',
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
      total: 0,
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
      auditState: [{ name: '未审核', num: 0 }, { name: '已通过', num: 1 }, { name: '未通过', num: 2 }],
      publishState: [{ name: '未发布', num: 0 }, { name: '已发布', num: 1 }],
      isTop: [{ name: '未置顶', num: 0 }, { name: '置顶', num: 1 }],
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
      dialogUnlock: false,
      dialogAudit: false,
      dialogRelieve: false,
      dialogLogout: false,
      Looktitle: '编辑',
      dialogUnlocktit: 'unlock',
      dialogRelievetit: '移除动态口令',
      dialogLogouttit: '注销',
      textMap: {
        update: '编辑标签',
        create: '新增标签',
        lock: '解锁',
        unlock: '锁定'
      },
      rules: {
        // column: [{ required: true, message: '请选择文章所属栏目', trigger: 'change' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      },
      categorylist: [],
      newsbanWords: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
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
    handlePhone() {
      var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (!myreg.test(this.temp.phone)) {
        this.handleReset(this.temp.phones, this.temp.phone, $('#samePhone'))
        $('#rightPhone').show()
      } else {
        this.handleReset(this.temp.phones, this.temp.phone, $('#samePhone'))
        $('#rightPhone').hide()
      }
    },
    handleEmail() {
      var myreg = /^([A-Za-z0-9_+-.])+@([A-Za-z0-9\-.])+\.([A-Za-z]{2,22})$/
      if (!myreg.test(this.temp.email)) {
        this.handleReset(this.temp.emails, this.temp.email, $('#sameEmail'))
        $('#rightEmail').show()
      } else {
        this.handleReset(this.temp.emails, this.temp.email, $('#sameEmail'))
        $('#rightEmail').hide()
      }
    },
    handleReset(a, b, c) {
      if (a === b) {
        c.show()
      } else {
        c.hide()
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
    handleAudit(row) {
      this.newsbanWords = ''
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogAudit = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUnlock(row) {
      this.dialogUnlocktit = row
      this.dialogUnlock = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleRelieve(row) {
      this.dialogRelieve = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleLogout(row) {
      this.dialogLogout = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.temp, 'aadei')
          // list(this.temp).then
          this.dialogAudit = false
          this.$notify({
            title: 'Success',
            message: '编辑成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    handleLocks() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.temp, 'aadei')
          // list(this.temp).then
          this.dialogUnlock = false
          this.$notify({
            title: 'Success',
            message: '锁定成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    handleUnlocks() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.temp, 'aadei')
          // list(this.temp).then
          this.dialogUnlock = false
          this.$notify({
            title: 'Success',
            message: '解锁成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    handleRelieves() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.temp, 'aadei')
          // list(this.temp).then
          this.dialogRelieve = false
          this.$notify({
            title: 'Success',
            message: '移除动态口令成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    handleLogouts() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.temp, 'aadei')
          // list(this.temp).then
          this.dialogLogouts = false
          this.$notify({
            title: 'Success',
            message: '注销成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    }
    // handleUpdate(row) {
    //   this.temp = Object.assign({}, row) // copy obj
    //   this.temp.timestamp = new Date(this.temp.timestamp)
    //   this.dialogStatus = 'update'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    // },
  }
}
</script>

<style>
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>

<style scoped>
.icon-star{
  margin-right:2px;
}
.drag-handler{
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.clored{
  color: rgb(255, 0, 0);
  font-size: 12px;
  margin: 0px 5px;
  position: absolute;
  width: 165px;
  left: 4px;
  top: 30px;
}
</style>
