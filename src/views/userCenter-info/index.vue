<template>
  <div>
    <div class="demo-container" style="padding-top:20px">
      <el-form :inline="true" :model="listQuery">
        <el-form-item label="用户编号">
          <el-input v-model="listQuery.agentCode" />
        </el-form-item>
        <el-form-item label="注册日期">
          <!-- <el-date-picker
            v-model="listQuery.registerDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          /> -->
          <el-date-picker
            v-model="registerDate"
            type="dates"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <!-- <el-form-item label="注册设备">
          <el-select v-model="listQuery.registerDevice" placeholder="请选择活动区域">
            <el-option v-for="item in registerDevices" :key="item.name" :label="item.name" :value="item.num" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="注册渠道">
          <el-select v-model="listQuery.registerChannel" placeholder="全部">
            <el-option v-for="item in channelState" :key="item.code" :label="item.name" :value="item.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select v-model="listQuery.userType" placeholder="全部">
            <el-option v-for="item in userTypes" :key="item.consumer_type" :label="item.consumer_type" :value="item.consumer_type" />
          </el-select>
        </el-form-item>
        <el-form-item label="分公司">
          <el-select v-model="listQuery.company" placeholder="全部">
            <el-option v-for="item in companyState" :key="item.name" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="账号状态">
          <el-select v-model="listQuery.accountState" placeholder="全部">
            <el-option v-for="item in accountStates" :key="item.state" :label="item.name" :value="item.state" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="handleFilter">查询</el-button>
          <el-button size="medium" @click="resetModal">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="padding:10px 20px">
      <el-table
        ref="dragTable"
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        fit
        highlight-current-row
        style="width: 100%"
      >
        <!-- <el-table-column align="center" width="70" label="注册设备">
          <template slot-scope="{row}">
            <span>{{ row.registerDevice }}</span>
          </template>
        </el-table-column> -->

        <el-table-column width="80" label="注册渠道">
          <template slot-scope="{row}">
            <span>{{ row.registerChannel }}</span>
          </template>
        </el-table-column>

        <el-table-column width="100" label="用户编号">
          <template slot-scope="{row}">
            <span style="color:#0069ff;cursor:pointer;" @click="userLink(row.agentCode)">{{ row.agentCode }}</span>
          </template>
        </el-table-column>

        <el-table-column label="用户类型">
          <template slot-scope="{row}">
            <span>{{ row.userType }}</span>
          </template>
        </el-table-column>

        <el-table-column width="140" label="注册日期">
          <template slot-scope="{row}">
            <span>{{ row.registerDate }}</span>
            <!-- <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
          </template>
        </el-table-column>

        <el-table-column width="120" label="手机号">
          <template slot-scope="{row}">
            <span>{{ row.phoneNumber }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120" label="分公司">
          <template slot-scope="{row}">
            <span>{{ row.companyName }}</span>
          </template>
        </el-table-column>

        <el-table-column width="120" label="单位（个人）名称">
          <template slot-scope="{row}">
            <span>{{ row.organName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="认证类型">
          <template slot-scope="{row}">
            <span>{{ row.authTypes }}</span>
          </template>
        </el-table-column>

        <el-table-column label="实名状态">
          <template slot-scope="{row}">
            <span>{{ row.realNameStates }}</span>
          </template>
        </el-table-column>

        <el-table-column width="155" label="账号绑定邮箱">
          <template slot-scope="{row}">
            <span>{{ row.bindEmail }}</span>
            <!-- <span style="color:#0069ff;cursor:pointer;" @click="userLink(row.id)">hy123</span> -->
          </template>
        </el-table-column>

        <el-table-column label="账号状态" width="80">
          <template slot-scope="{row}">
            <span>{{ row.accountStates }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180">
          <template slot-scope="{row}">
            <span v-if="row.accountState !== '04'" style="color:#0069ff;cursor:pointer;" @click="handleAudit(row)">编辑</span>
            <span v-if="row.accountStates === '锁定' && row.accountState !== '04'" style="color:#0069ff;cursor:pointer;" @click="handleUnlock('unlock', row)">解锁</span>
            <span v-if="row.accountStates !== '锁定' && row.accountState !== '04'" style="color:#0069ff;cursor:pointer;" @click="handleUnlock('lock', row)">锁定</span>
            <!-- <span v-if="row.verification === '' && row.isverification === ''" style="color:#606266;cursor:pointer;" /> -->
            <span v-if="row.verification !== '' && row.isverification === 'Y'" style="color:#0069ff;cursor:pointer;" @click="handleRelieve(row)">解除动态口令</span>
            <span v-if="row.accountState !== '04'" style="color:#0069ff;cursor:pointer;" @click="handleLogout(row)">注销</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
    <el-dialog :title="Looktitle" :visible.sync="dialogAudit">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="110px" style="width: 400px; margin-left:50px;">
        <el-form-item label="用户编号：">
          <el-input v-model="temp.agentCode" disabled />
        </el-form-item>
        <el-form-item label="手机号：" prop="phoneNumber" style="position:relative;">
          <el-input v-model="temp.phoneNumber" @change="handlePhone" />
          <span id="rightPhone" class="clored" style="display:none;">请输入正确的手机号</span>
          <span id="samePhone" class="clored" style="display:none;">新手机号不能和旧手机号一致</span>
          <span id="noPhone" class="clored" style="display:none;">该手机号已绑定其他账号</span>
        </el-form-item>
        <el-form-item label="账号绑定邮箱：" prop="bindEmail" style="position:relative;">
          <el-input v-model="temp.bindEmail" @change="handleEmail" />
          <span id="rightEmail" class="clored" style="display:none;">请输入正确的账号绑定邮箱</span>
          <span id="sameEmail" class="clored" style="display:none;">新邮箱不能和旧邮箱一致</span>
          <span id="noEmail" class="clored" style="display:none;">该邮箱已绑定其他账号</span>
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
      <p v-if="dialogUnlocktit==='unlock'">确定要解锁该账号，解锁后该账号将继续可登录</p>
      <p v-else>确定要锁定该账号，锁定后该账号将不可登录</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUnlock = false">取消</el-button>
        <el-button type="primary" @click="handleLocks(dialogUnlocktit)">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="dialogRelievetit" :visible.sync="dialogRelieve">
      <p>确定要对该账号移除动态口令，移除后该账号的登录将不再需要输入动态口令</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRelieve = false">取消</el-button>
        <el-button type="primary" @click="handleRelieves()">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="dialogLogouttit" :visible.sync="dialogLogout">
      <p>确定要注销该账号，注销后该账号将不可登录</p>
      <p style="color:#f00">请人工校验是否存在有效期的产品，若有，不能注销！</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogLogout = false">取消</el-button>
        <el-button type="primary" @click="handleLogouts()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import $ from 'jquery'
// import { fetchList } from '@/api/demos/article'
import { getUsermanage, getCompany, getChannel, getUserLock, getUserUnlock, getUserCancelDynamicCode, getUserCancelAccount, getUserModify, getUserIfExistPhoneNum, getUserIfExistEmail, getUserGetUserTypeList, getUserGetAccountStateList } from '@/api/userinfoManage'
import Pagination from '@/components/demos/Pagination' // secondary package based on el-pagination
export default {
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        // sort: '+id',
        agentCode: undefined,
        title: undefined,
        // registerDevice: undefined,
        registerChannel: undefined,
        userType: undefined,
        // publishState: '2020-10-12 1591924192000',
        registerBeginDate: '2020-10-12 00:00:00',
        registerEndDate: '2020-10-12 23:59:59',
        accountState: undefined,
        company: undefined
      },
      registerDate: '',
      companyState: [],
      channelState: [],
      userTypes: [],
      accountStates: [],
      // registerDevices: [{ name: '全部', num: undefined }, { name: 'pc端', num: 'P' }, { name: '移动端', num: 'C' }],
      // userTypes: [{ name: '全部', num: undefined }, { name: 'HY', num: 'HY' }, { name: 'DL', num: 'DL' }, { name: 'DLC', num: 'DLC' }, { name: 'ZSY', num: 'ZSY' }],
      // accountStates: [{ name: '全部', num: undefined }, { name: '未开通', num: '01' }, { name: '已开通', num: '02' }, { name: '锁定', num: '03' }, { name: '注销', num: '04' }],
      publishState: [{ name: '未发布', num: 0 }, { name: '已发布', num: 1 }],
      isTop: [{ name: '未置顶', num: 0 }, { name: '置顶', num: 1 }],
      dialogUnlock: false,
      dialogAudit: false,
      dialogRelieve: false,
      dialogLogout: false,
      Looktitle: '编辑',
      dialogUnlocktit: 'lock',
      dialogRelievetit: '移除动态口令',
      dialogLogouttit: '注销',
      rules: {
        // column: [{ required: true, message: '请选择文章所属栏目', trigger: 'change' }],
        bindEmail: [{ required: true, message: '请输入账号绑定邮箱', trigger: 'blur' }],
        phoneNumber: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      },
      temp: {
        actId: undefined,
        title: undefined,
        categoryName: undefined,
        auditState: undefined,
        publishState: undefined,
        registerDate: new Date(),
        isTop: undefined,
        originalValue: undefined,
        value: undefined
      },
      textMap: {
        update: '编辑标签',
        create: '新增标签',
        lock: '锁定',
        unlock: '解锁'
      }
    }
  },
  created() {
    const myDate = new Date()
    const str = myDate.toLocaleDateString()
    const a = str.replace(/\//g, '-')
    this.listQuery.registerBeginDate = a + ' 00:00:00'
    this.listQuery.registerEndDate = a + ' 23:59:59'
    this.registerDate = a
    // const data = {limit:'10',page:'1'}
    this.getCompany()
    this.getChannel()
    this.getUserGetUserTypeList()
    this.getUserGetAccountStateList()
    this.getList()
  },
  methods: {
    // async getList() {
    //   this.listLoading = true
    //   const { data } = await fetchList(this.listQuery)
    //   this.list = data.items
    //   this.total = data.total
    //   this.listLoading = false
    //   this.oldList = this.list.map(v => v.id)
    //   this.newList = this.oldList.slice()
    //   this.$nextTick(() => {
    //     this.setSort()
    //   })
    // },
    getList() {
      this.listLoading = true
      const listQuerys = this.listQuery
      for (const a in listQuerys) {
        if (!listQuerys[a] || listQuerys[a] === '全部') {
          listQuerys[a] = undefined
        }
      }
      getUsermanage(listQuerys).then(res => {
        res.data.map((v) => {
          v.authTypes = v.authType === 'T' || v.authType === 'P' ? '个人' : '企业'
          v.accountStates = v.accountState === '01' ? '未开通' : v.accountState === '02' ? '已开通' : v.accountState === '03' ? '锁定' : v.accountState === '04' ? '注销' : ''
          v.realNameStates = v.realNameState === '0' || v.realNameState === '4' ? '审核中' : v.realNameState === '1' ? '已实名' : v.realNameState === '2' ? '审核失败' : v.realNameState === '3' ? '已取消' : '未实名'
        })
        this.list = res.data
        this.total = res.page.total_count
        this.listLoading = false
        this.oldList = this.list.map(v => v.id)
      })
    },
    getCompany() {
      getCompany().then(res => {
        res.push({ id: '', name: '全部', partyTypeId: 'subCompany' })
        this.companyState = res
      })
    },
    getChannel() {
      getChannel().then(res => {
        res.push({ code: '', name: '全部' })
        this.channelState = res
      })
    },
    getUserGetUserTypeList() {
      getUserGetUserTypeList().then(res => {
        res.data.push({ consumer_type: '全部' })
        this.userTypes = res.data
      })
    },
    getUserGetAccountStateList() {
      getUserGetAccountStateList().then(res => {
        res.data.push({ state: '全部', name: '全部' })
        res.data.map(v => {
          if (v.state === '01') {
            v.name = '未开通'
          } else if (v.state === '02') {
            v.name = '已开通'
          } else if (v.state === '03') {
            v.name = '锁定'
          } else if (v.state === '04') {
            v.name = '注销'
          }
        })
        this.accountStates = res.data
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      if (this.registerDate) {
        if ((typeof this.registerDate) === 'string') {
          this.listQuery.registerBeginDate = this.registerDate + ' 00:00:00'
          this.listQuery.registerEndDate = this.registerDate + ' 23:59:59'
        } else if ((typeof this.registerDate) === 'object') {
          if (this.registerDate.length === 1) {
            this.listQuery.registerBeginDate = this.registerDate[0] + ' 00:00:00'
            this.listQuery.registerEndDate = this.registerDate[0] + ' 23:59:59'
          } else {
            if (new Date(this.registerDate[0]).getTime() > new Date(this.registerDate[1]).getTime()) {
              this.listQuery.registerBeginDate = this.registerDate[1] + ' 00:00:00'
              this.listQuery.registerEndDate = this.registerDate[0] + ' 23:59:59'
            } else {
              this.listQuery.registerBeginDate = this.registerDate[0] + ' 00:00:00'
              this.listQuery.registerEndDate = this.registerDate[1] + ' 23:59:59'
            }
          }
        }
      } else {
        this.listQuery.registerBeginDate = undefined
        this.listQuery.registerEndDate = undefined
      }
      this.getList()
    },
    resetModal() {
      const myDate = new Date()
      const str = myDate.toLocaleDateString()
      const a = str.replace(/\//g, '-')
      const b = a + ' 00:00:00'
      const c = a + ' 23:59:59'
      this.registerDate = a
      this.listQuery = {
        page: 1,
        limit: 10,
        // sort: '+id',
        agentCode: undefined,
        title: undefined,
        // registerDevice: undefined,
        registerChannel: undefined,
        userType: undefined,
        registerBeginDate: b,
        registerEndDate: c,
        accountState: undefined,
        company: undefined
      }
    },
    userLink(id) {
      this.$router.push(`/userCenter-infoDetail/id?id=${id}&showLayout=false`)
    },
    handleAudit(row) {
      this.newsbanWords = ''
      this.temp = Object.assign({}, row) // copy obj
      this.temp.phoneNumbers = this.temp.phoneNumber
      this.temp.bindEmails = this.temp.bindEmail
      $('#rightPhone, #rightEmail, #samePhone, #sameEmail, #noPhone, #noEmail').hide()
      this.dialogAudit = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUnlock(a, row) {
      this.temp = Object.assign({}, row)
      this.dialogUnlocktit = a
      this.dialogUnlock = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    handleRelieve(row) {
      this.temp = Object.assign({}, row)
      this.dialogRelieve = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    },
    handleLogout(row) {
      this.temp = Object.assign({}, row)
      this.dialogLogout = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    },
    handleUpdate() {
      if (this.temp.bindEmail === this.temp.bindEmails && this.temp.phoneNumber === this.temp.phoneNumbers) {
        this.dialogAudit = false
        // this.$message({
        //   type: 'success',
        //   message: '用户信息修改成功'
        // })
      } else {
        // if ($('#samePhone').is(':hidden') && $('#rightPhone').is(':hidden') && $('#noPhone').is(':hidden') && $('#rightEmail').is(':hidden') && $('#sameEmail').is(':hidden') && $('#noEmail').is(':hidden') && this.temp.bindEmail !== '' && this.temp.phoneNumber !== '') {
        console.log($('#rightPhone').is(':hidden') && $('#noPhone').is(':hidden') && $('#rightEmail').is(':hidden') && $('#noEmail').is(':hidden') && this.temp.bindEmail !== '' && this.temp.phoneNumber !== '')
        console.log($('#noPhone').is(':hidden'), 'no')
        if ($('#rightPhone').is(':hidden') && $('#noPhone').is(':hidden') && $('#rightEmail').is(':hidden') && $('#noEmail').is(':hidden') && this.temp.bindEmail !== '' && this.temp.phoneNumber !== '') {
          const form = new FormData()
          form.append('agentCode', this.temp.agentCode)
          form.append('phoneNum', this.temp.phoneNumber)
          form.append('email', this.temp.bindEmail)
          getUserIfExistPhoneNum({ phoneNum: this.temp.phoneNumber }).then(res => {
            if (res.success === true) {
              getUserModify(form).then(res => {
                this.dialogAudit = false
                this.$message({
                  type: 'success',
                  message: '用户信息修改成功'
                })
                this.getList()
              })
            } else {
              if (this.temp.bindEmail !== this.temp.bindEmails) {
                getUserModify(form).then(res => {
                  this.dialogAudit = false
                  this.$message({
                    type: 'success',
                    message: '用户信息修改成功'
                  })
                  this.getList()
                })
              }
            }
          })
        }
      }
    },
    handlePhone() {
      this.temp.phoneNumber = this.temp.phoneNumber.replace(/\s+/g, '')
      var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (!myreg.test(this.temp.phoneNumber)) {
        this.handleReset(this.temp.phoneNumbers, this.temp.phoneNumber, $('#samePhone'), $('#rightPhone'), $('#noPhone'))
        if (this.temp.phoneNumber) {
          $('#rightPhone').show()
        } else {
          $('#rightPhone').hide()
        }
        $('#noPhone').hide()
      } else {
        this.handleReset(this.temp.phoneNumbers, this.temp.phoneNumber, $('#samePhone'), $('#rightPhone'), $('#noPhone'))
        $('#rightPhone').hide()
        getUserIfExistPhoneNum({ phoneNum: this.temp.phoneNumber }).then(res => {
          if (res.success) {
            $('#noPhone').hide()
          } else {
            if (this.temp.phoneNumber === this.temp.phoneNumbers) {
              $('#samePhone').show()
              $('#noPhone').hide()
            } else {
              $('#samePhone').hide()
              $('#noPhone').show()
            }
            // $('#noPhone').show()
            $('#rightPhone').hide()
          }
        })
      }
    },
    handleEmail() {
      this.temp.bindEmail = this.temp.bindEmail.replace(/\s+/g, '')
      var myreg = /^([A-Za-z0-9_+-.])+@([A-Za-z0-9\-.])+\.([A-Za-z]{2,22})$/
      if (!myreg.test(this.temp.bindEmail)) {
        this.handleReset(this.temp.bindEmails, this.temp.bindEmail, $('#sameEmail'), $('#rightEmail'), $('#noEmail'))
        if (this.temp.bindEmail) {
          $('#rightEmail').show()
        } else {
          $('#rightEmail').hide()
        }
        $('#sameEmail, #noEmail').hide()
      } else {
        this.handleReset(this.temp.bindEmails, this.temp.bindEmail, $('#sameEmail'), $('#rightEmail'), $('#noEmail'))
        $('#rightEmail').hide()
        getUserIfExistEmail({ userMail: this.temp.bindEmail }).then(res => {
          if (res.success) {
            $('#noEmail').hide()
          } else {
            if (this.temp.bindEmails === this.temp.bindEmail) {
              $('#sameEmail').show()
              $('#noEmail').hide()
            } else {
              $('#sameEmail').hide()
              $('#noEmail').show()
            }
            $('#rightEmail').hide()
          }
        })
      }
    },
    handleReset(a, b, c, n, d) {
      if (a === b) {
        c.show()
        n.hide()
        d.hide()
      } else {
        c.hide()
      }
    },
    handleLocks(a) {
      if (a === 'unlock') {
        const form = new FormData()
        form.append('agentCode', this.temp.agentCode)
        getUserUnlock(form).then(res => {
          this.dialogUnlock = false
          this.$message({
            type: 'success',
            message: '解锁成功'
          })
          this.getList()
          this.getUserGetAccountStateList()
        })
      } else if (a === 'lock') {
        const form = new FormData()
        form.append('agentCode', this.temp.agentCode)
        getUserLock(form).then(res => {
          this.dialogUnlock = false
          this.$message({
            type: 'success',
            message: '锁定成功'
          })
          this.getList()
          this.getUserGetAccountStateList()
        })
      }
    },
    handleRelieves() {
      const form = new FormData()
      form.append('agentCode', this.temp.agentCode)
      getUserCancelDynamicCode(form).then(res => {
        this.dialogRelieve = false
        this.$message({
          type: 'success',
          message: '移除动态口令成功'
        })
        this.getList()
      })
    },
    handleLogouts() {
      const form = new FormData()
      form.append('agentCode', this.temp.agentCode)
      getUserCancelAccount(form).then(res => {
        if (res.success0) {
          this.dialogLogout = false
          this.$message({
            type: 'success',
            message: '注销成功'
          })
          this.getList()
        } else {
          this.dialogLogout = false
          this.$message({
            type: 'warning',
            message: res.msg
          })
          this.getList()
        }
      })
    }
  }
}
</script>
<style>

.clored{
  color: rgb(255, 0, 0);
  font-size: 12px;
  margin: 0px 5px;
  position: absolute;
  width: 204px;
  left: 4px;
  top: 30px;
}
</style>
