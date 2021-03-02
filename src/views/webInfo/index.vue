<template>
  <div class="box-container">
    <div class="box-form">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" style="line-height:400%;">

        <el-form-item label="用户编号" prop="agentCode">
          <el-input v-model="form.agentCode" placeholder="请输入用户编号" />
        </el-form-item>

        <el-form-item label="域名" prop="domainName">
          <el-input v-model="form.domainName" placeholder="请输入域名" />
        </el-form-item>

        <el-form-item label="服务编号" prop="serviceCode">
          <el-input v-model="form.serviceCode" placeholder="请输入服务编号" />
        </el-form-item>

        <el-form-item label="站点名称" prop="siteName">
          <el-input v-model="form.siteName" placeholder="请输入站点名称" />
        </el-form-item>

        <el-form-item>
          <el-button size="medium" @click="onReset('form')">重置</el-button>
          <el-button type="primary" size="medium" @click="onSubmit('form')">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="box-list">
      <el-table v-loading="loading" :data="listdata" style="width:100%">

        <el-table-column label="用户ID" width="150">
          <template slot-scope="scope">
            {{ scope.row.agentCode }}
          </template>
        </el-table-column>

        <el-table-column label="站点名称">
          <template slot-scope="scope">
            {{ scope.row.siteName }}
          </template>
        </el-table-column>

        <el-table-column label="服务编号" width="200">
          <template slot-scope="scope">
            {{ scope.row.serviceCode }}
          </template>
        </el-table-column>

        <el-table-column label="开通时间" width="200">
          <template slot-scope="scope">
            {{ scope.row.beginTime }}
          </template>
        </el-table-column>

        <el-table-column label="到期时间" width="200">
          <template slot-scope="scope">
            {{ scope.row.endTime }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="openDialogDetail(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <pagination
      :total="page.total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="GetList"
    />

    <el-dialog title="" custom-class="customWidthWebInfoDialog" :visible.sync="dialogDetail.visible">
      <div v-if="dialogDetail.loading" class="detailLoading">
        <i class="el-icon-loading" />
      </div>
      <div v-if="!dialogDetail.loading" class="detailContent">
        <table>
          <tr>
            <td>域名：</td>
            <td> {{ dialogDetail.res.domainName }}</td>
          </tr>
          <tr>
            <td>服务编号：</td>
            <td> {{ dialogDetail.res.serviceCode }}</td>
          </tr>
          <tr>
            <td>所属会员号：</td>
            <td> {{ dialogDetail.res.agentCode }}</td>
          </tr>
          <tr>
            <td>商品名称：</td>
            <td> {{ dialogDetail.res.goodsName }}</td>
          </tr>
          <tr>
            <td>站点名称：</td>
            <td> {{ dialogDetail.res.siteName }}</td>
          </tr>
          <tr>
            <td>网站空间大小：</td>
            <td> {{ dialogDetail.res.webQuota }}</td>
          </tr>
          <tr>
            <td>网站开通日期：</td>
            <td> {{ dialogDetail.res.beginTime }}</td>
          </tr>
          <tr>
            <td>网站到期日期：</td>
            <td> {{ dialogDetail.res.endTime }}</td>
          </tr>
          <template v-for="(item, index) in dialogDetail.res.databases">
            <tr :key="'a'+index">
              <td>数据库大小{{ index+1 }}：</td>
              <td> {{ item.dbQuota }}</td>
            </tr>
            <tr :key="'b'+index">
              <td>数据库类型{{ index+1 }}：</td>
              <td> {{ item.dbType }}</td>
            </tr>
            <tr :key="'c'+index">
              <td>数据库地址{{ index+1 }}：</td>
              <td> {{ item.dbAddress }}</td>
            </tr>
            <tr :key="'d'+index">
              <td>数据库名称{{ index+1 }}：</td>
              <td> {{ item.dbName }}</td>
            </tr>
          </template>
          <tr>
            <td>可绑域名数量：</td>
            <td> {{ dialogDetail.res.maxBindDomain }}</td>
          </tr>
          <tr>
            <td>FTP专用地址：</td>
            <td> {{ dialogDetail.res.FtpAddress }}</td>
          </tr>
          <tr>
            <td>解析专用地址：</td>
            <td> {{ dialogDetail.res.domainAlias }}</td>
          </tr>
          <tr>
            <td>网站当前状态：</td>
            <td> {{ dialogDetail.res.hmpStatus }}</td>
          </tr>
          <tr>
            <td>网站寄存当前状态：</td>
            <td> {{ dialogDetail.res.hostStatus }}</td>
          </tr>
          <tr>
            <td>所属机房：</td>
            <td> {{ dialogDetail.res.room }}</td>
          </tr>
        </table>

      </div>

      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" size="medium" @click="closeDialogDetail">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
// import formatTime from '@/utils/formatTime.js'
import { mapState } from 'vuex'
import { Message } from 'element-ui'

function msgError(message) {
  Message({
    message,
    type: 'error',
    dangerouslyUseHTMLString: true
  })
}

export default {
  components: {
    Pagination
  },
  data() {
    var validateAlphanumeric = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (/^[a-zA-Z0-9]+$/.test(value)) {
        callback()
      } else {
        callback(new Error('只允许输入字母和数字'))
      }
    }
    return {
      form: {
        agentCode: '', // agent35132
        domainName: '',
        serviceCode: '', // V40531431833643
        siteName: ''
      },
      rules: {
        agentCode: [
          { validator: validateAlphanumeric, trigger: 'blur' }
        ],
        serviceCode: [
          { validator: validateAlphanumeric, trigger: 'blur' }
        ]
      },
      loading: false,
      listdata: [],
      page: {
        total: 0,
        page: 1,
        limit: 20
      },
      dialogDetail: {
        visible: false,
        loading: false,
        res: {}
      }
    }
  },
  computed: {
    ...mapState({
      getinfoListVhost: state => state.getInfo.getinfoListVhost,
      getinfoDetailVhost: state => state.getInfo.getinfoDetailVhost
    })
  },
  methods: {
    onSubmit(formName) {
      if (this.form.agentCode || this.form.domainName || this.form.serviceCode || this.form.siteName) {
        this.page.page = 1
        this.GetList()
      } else {
        msgError('注意：用户编号、域名、服务编号、站点名称至少要有一个属性不为空')
      }
    },
    GetList() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const payload = {
            ...this.form,
            page: this.page.page,
            pagesize: this.page.limit
          }
          this.loading = true
          // 查询
          this.listdata = []
          this.$store.dispatch('getInfo/getinfoListVhost', payload).then(res => {
            this.loading = false
            if (res.success) {
              if (res.data) {
                this.listdata = res.data.infos
                this.page.total = +res.data.total
              } else {
                this.listdata = []
                this.page.total = 0
              }
            } else {
              msgError(res.message)
            }
          }).catch(err => {
            this.loading = false
            msgError(err)
          })
        } else {
          console.log('表单错误')
          return false
        }
      })
    },
    onReset(formName) {
      this.$refs[formName].resetFields()
    },
    openDialogDetail(item) {
      this.dialogDetail.visible = true
      this.getDetail(item)
    },
    getDetail(item) {
      const payload = {
        serviceCode: item.serviceCode
      }
      this.dialogDetail.loading = true
      // 查询
      this.dialogDetail.res = {}
      this.$store.dispatch('getInfo/getinfoDetailVhost', payload).then(res => {
        this.dialogDetail.loading = false
        if (res.success) {
          this.dialogDetail.res = res.data
        } else {
          msgError(res.message)
        }
      }).catch(err => {
        this.dialogDetail.loading = false
        msgError(err)
      })
    },
    closeDialogDetail() {
      this.dialogDetail.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.box-container{
  border-bottom: 20px solid #f3f7fa;
  padding: 20px 0px;
}
.detailLoading{
  text-align: center;
}
.detailContent{
  table {
    width: 100%;
    tr:nth-child(odd) {
      background: #f3f7fa;
    }
    tr:nth-child(even) {
    }
    td{
      padding: 5px;
    }
    td:nth-child(1){
      text-align: right;
      font-weight: bold;
    }
  }
}
</style>
<style lang="scss">
.customWidthWebInfoDialog{
  width: 50%;
  min-width: 500px;
}
</style>
