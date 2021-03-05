<template>
  <div class="box-container violate">
    <div>
      <div class="box-form order-form">
        <el-form ref="searchForm" :model="searchForm" class="search-form" :inline="true" :rules="searchForm.rules">
          <el-form-item label="搜索">
            <el-select v-model="searchForm.type" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="关键词">
            <el-input v-model="searchForm.word" placeholder="请输入关键词" />
          </el-form-item>
          <el-form-item label="添加时间" prop="time">
            <el-date-picker
              v-model="time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>

          <el-form-item label="状态">
            <el-select v-model="searchForm.status" placeholder="请选择">
              <el-option
                v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="来源">
            <el-select v-model="searchForm.holdSource" placeholder="请选择">
              <el-option
                v-for="item in sourceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="onSubmit('searchForm')">查询</el-button>
            <el-button size="medium" @click="onReset('searchForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-form ref="operateForm" class="operate-form" :model="searchForm" :inline="true">
          <el-form-item>
            <el-button size="mini" @click="openDialogBatch">批量操作</el-button>
            <el-button size="mini" @click="openDialogAddDomain">录入域名</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="listdata" :loading="loading" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />

          <el-table-column label="域名">
            <template slot-scope="scope">
              {{ scope.row.domainName }}
            </template>
          </el-table-column>

          <el-table-column label="状态">
            <!-- 0-未设置、1-显示、2-隐藏 -->
            <template slot-scope="scope">
              {{ scope.row.status === 0 ? '未设置' : (scope.row.status === 1 ? '显示' : '隐藏') }}
            </template>
          </el-table-column>

          <el-table-column label="同模板域名数（显示/实际）" width="180">
            <template slot-scope="scope">
              {{ scope.row.sameTemplateDomainsShow }} / {{ scope.row.sameTemplateDomainsAll }}
            </template>
          </el-table-column>

          <el-table-column label="所属账号(重复次数）" width="150">
            <template slot-scope="scope">
              {{ scope.row.agentCode }}({{ scope.row.agentCodeCount }})
            </template>
          </el-table-column>

          <el-table-column label="模板ID(重复次数）" width="150">
            <template slot-scope="scope">
              {{ scope.row.templateCode }}({{ scope.row.agentCodeCount }})
            </template>
          </el-table-column>

          <el-table-column label="添加时间">
            <template slot-scope="scope">
              {{ scope.row.createTime }}
            </template>
          </el-table-column>

          <el-table-column label="违规信息来源" width="120">
            <template slot-scope="scope">
              {{ scope.row.holdSource }}
            </template>
          </el-table-column>

          <el-table-column label="操作人">
            <template slot-scope="scope">
              {{ scope.row.operator }}
            </template>
          </el-table-column>

          <el-table-column label="违规原因">
            <template slot-scope="scope">
              {{ scope.row.holdReason }}
            </template>
          </el-table-column>

          <el-table-column label="操作" width="430" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="openDialogDetail(scope.row)">违规详情</el-button>
              <el-button type="text" @click="openDialogRegInfo(scope.row)">注册信息</el-button>
              <el-button type="text" @click="openDialogTemplate(scope.row)">实名模板</el-button>
              <el-button type="text" @click="openDialogTemplateDomain(scope.row)">同模板域名</el-button>
              <el-button type="text" @click="openDialogAccount(scope.row)">账号信息</el-button>
              <el-button type="text" @click="openDialogShow(scope.row)">显示</el-button>
              <el-button type="text" @click="hide(scope.row)">隐藏</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total="page.total"
          :page.sync="page.page"
          :limit.sync="page.limit"
          @pagination="GetList"
        />
        <!-- <div v-loading="loading" class="box-list">
          <div v-if="searchState === 0 && listdata.length === 0" class="listResult">
            请输入查询条件，进行查询。
          </div>
          <div v-else-if="loading" class="listResult">
            查询中..
          </div>
          <div v-else-if="searchState > 0 && listdata.length === 0" class="listResult">
            没有查询到结果
          </div>
          <div v-else-if="searchState > 0 && listdata.length > 0">
            <div>

            </div>
            <div class="box-page">
              <el-pagination
                background
                :current-page="page.currentPage"
                :page-size="page.pageSize"
                layout="total, prev, pager, next, jumper"
                :total="page.total"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <!-- 批量操作 -->
    <el-dialog
      title="批量操作"
      :visible.sync="dialogBatch.visible"
      width="500px"
      :destroy-on-close="true"
    >
      <el-form ref="batchForm" :model="batchForm" label-width="120px">
        <el-form-item label="方式" prop="mode">
          <el-radio-group v-model="batchForm.mode">
            <el-radio v-for="(item, index) in batchForm.modeOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
          <div class="tips">*已显示或已隐藏的域名不进行任何操作</div>
        </el-form-item>
        <el-form-item label="批量操作范围" prop="operationScope">
          <el-radio-group v-model="batchForm.operationScope">
            <el-radio v-for="(item, index) in batchForm.operationScopeOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="同模板域名数量" prop="templateNum">
          <el-radio-group v-model="batchForm.templateNum">
            <el-radio v-for="(item, index) in batchForm.templateNumOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" size="medium" @click="closeDialogBatch">提交</el-button>
      </div>
    </el-dialog>
    <!---->
    <!-- 录入域名 -->
    <el-dialog
      title=""
      :visible.sync="dialogAddDomain.visible"
      width="30%"
      :destroy-on-close="true"
    >
      <div class="dialogTitle">
        录入违规域名
      </div>
      <div class="dialogContent boxAddDomain">
        <el-form ref="addDomainForm" :model="addDomainForm" :rules="addDomainForm.rules" label-width="180px">
          <el-form-item label="违规域名" prop="domain">
            <el-input v-model="addDomainForm.domain" placeholder="请输入违规域名(一行一个域名)" type="textarea" maxlength="300" />
          </el-form-item>

          <el-form-item label="违规信息来源" prop="source">
            <el-input v-model="addDomainForm.source" placeholder="15字以内" maxlength="15" />
          </el-form-item>

          <el-form-item label="违规原因" prop="cause">
            <el-input v-model="addDomainForm.cause" placeholder="15字以内" maxlength="15" />
          </el-form-item>

          <el-form-item label="处理办法" prop="solution">
            <el-input v-model="addDomainForm.solution" placeholder="" type="textarea" maxlength="300" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" size="medium" @click="closeDialogAddDomain">提交</el-button>
      </div>
    </el-dialog>
    <!---->
    <!-- 违规详情 Detail RegInfo Template TemplateDomain Account Show -->
    <el-dialog
      title="违规详情"
      :visible.sync="dialogDetail.visible"
      width="300"
      :destroy-on-close="true"
    >
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="违规域名：">
          {{ row.domainName ? row.domainName : '-' }}
        </el-form-item>
        <el-form-item label="违规信息来源：">
          {{ row.holdSource ? row.holdSource : '-' }}
        </el-form-item>
        <el-form-item label="违规原因：">
          {{ row.holdReason ? row.holdReason : '-' }}
        </el-form-item>
        <el-form-item label="处理办法：">
          {{ row.holdWay ? row.holdWay : '-' }}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="closeDialogDetail">关闭</el-button>
      </div>
    </el-dialog>
    <!---->
    <!-- 注册信息 -->
    <el-dialog
      title=""
      :visible.sync="dialogRegInfo.visible"
      width="30%"
      :destroy-on-close="true"
    >
      <div class="dialogTitle">
        注册信息
      </div>
      <div class="dialogContent">
        注册信息
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" size="medium" @click="closeDialogRegInfo">提交</el-button>
      </div>
    </el-dialog>
    <!---->
    <!-- 实名模板 -->
    <el-dialog
      title=""
      :visible.sync="dialogTemplate.visible"
      width="30%"
      :destroy-on-close="true"
    >
      <div class="dialogTitle">
        实名模板
      </div>
      <div class="dialogContent">
        实名模板
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" size="medium" @click="closeDialogTemplate">提交</el-button>
      </div>
    </el-dialog>
    <!---->
    <!-- 同模板域名 -->
    <el-dialog
      title=""
      :visible.sync="dialogTemplateDomain.visible"
      width="30%"
      :destroy-on-close="true"
    >
      <div class="dialogTitle">
        同模板域名
      </div>
      <div class="dialogContent">
        同模板域名
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" size="medium" @click="closeDialogTemplateDomain">提交</el-button>
      </div>
    </el-dialog>
    <!---->
    <!-- 账号信息 -->
    <el-dialog
      title=""
      :visible.sync="dialogAccount.visible"
      width="30%"
      :destroy-on-close="true"
    >
      <div class="dialogTitle">
        账号信息
      </div>
      <div class="dialogContent">
        账号信息
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" size="medium" @click="closeDialogAccount">提交</el-button>
      </div>
    </el-dialog>
    <!---->
    <!-- 显示 -->
    <el-dialog
      title=""
      :visible.sync="dialogShow.visible"
      width="30%"
      :destroy-on-close="true"
    >
      <div class="dialogTitle">
        显示
      </div>
      <div class="dialogContent">
        显示
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" size="medium" @click="closeDialogShow">提交</el-button>
      </div>
    </el-dialog>
    <!---->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import clearFormData from '@/utils/clearFormData.js'

/*
function msgError(message) {
  Message({
    message,
    type: 'error',
    dangerouslyUseHTMLString: true
  })
}*/
import Pagination from '@/components/Pagination.vue'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      loadingBtn: false,
      listdata: [],
      searchState: 0, // 0 没有点击过查询， 1 点击过1次查询
      page: {
        total: 0,
        page: 1,
        limit: 20
      },
      // 搜索表单
      searchForm: {
        type: 'domainName',
        word: '',
        status: '',
        holdSource: '',
        createTimeBegin: '',
        createTimeEnd: '',
        pageNo: 1,
        pageSize: 20
      },
      time: '',
      typeOptions: [
        {
          'label': '域名',
          'value': 'domainName'
        }, {
          'label': '账号',
          'value': 'agentCode'
        }, {
          'label': '模板ID',
          'value': 'templateCode'
        }, {
          'label': '操作人',
          'value': 'operator'
        }
      ],
      stateOptions: [{
        label: '全部',
        value: ''
      }, {
        label: '未设置',
        value: '0'
      }, {
        label: '显示',
        value: '1'
      }, {
        label: '隐藏',
        value: '2'
      }],
      sourceOptions: [{
        label: '全部',
        value: ''
      }, {
        label: '新网自查',
        value: 'xinnet'
      }, {
        label: '其他',
        value: 'qt'
      }],
      rules: {
        word: [
          { validator: (rule, value, callback) => {
            /*
            if (value === '') {
              callback()
            } else if (/^[a-zA-Z0-9]+$/.test(value)) {
              callback()
            } else {
              callback(new Error('只允许输入字母和数字'))
            }
            */
            console.log('type=', this.searchForm.type)
            callback(new Error('只允许输入字母和数字'))
          }, trigger: 'blur' }
        ]
      },
      // 批量操作
      dialogBatch: {
        visible: false
      },
      batchForm: {
        mode: '1',
        modeOptions: [{
          label: '批量显示',
          value: '1'
        }, {
          label: '批量隐藏',
          value: '2'
        }],
        operationScope: '1',
        operationScopeOptions: [{
          label: '全部筛选结果',
          value: '1'
        }, {
          label: '选中域名',
          value: '2'
        }],
        templateNum: '1',
        templateNumOptions: [{
          label: '显示全部',
          value: '1'
        }, {
          label: '超过100个则100以内数量随机',
          value: '2'
        }],
        domain: ''
      },
      // 录入域名
      dialogAddDomain: {
        visible: false
      },
      addDomainForm: {
        domain: '',
        source: '',
        cause: '',
        solution: '',
        rules: {
          domain: [
            { validator: (rule, value, callback) => {
              /*
              if (value === '') {
                callback()
              } else if (/^[a-zA-Z0-9]+$/.test(value)) {
                callback()
              } else {
                callback(new Error('只允许输入字母和数字'))
              }
              */
              console.log('type=', this.searchForm.type)
              callback(new Error('只允许输入字母和数字'))
            }, trigger: 'blur' }
          ]
        }
      },
      // 违规详情Detail RegInfo Template TemplateDomain Account Show
      dialogDetail: {
        visible: false
      },
      // 注册信息
      dialogRegInfo: {
        visible: false
      },
      // 实名模板
      dialogTemplate: {
        visible: false
      },
      // 同模板域名
      dialogTemplateDomain: {
        visible: false
      },
      // 账号信息
      dialogAccount: {
        visible: false
      },
      // 显示
      dialogShow: {
        visible: false
      },
      row: {}
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['violateDomain/queryAllViolateDomainList']
    })
  },
  watch: {
    time: function(val) {
      const v = val || ['', '']
      this.searchForm.createTimeBegin = v[0] ? `${v[0]}` : ''
      this.searchForm.createTimeEnd = v[1] ? `${v[1]}` : ''
    }
  },
  methods: {
    ...mapActions('violateDomain', ['queryAllViolateDomainList']),
    onSubmit(formName) {
      this.page.currentPage = 1
      this.GetList()
    },
    GetList(page) {
      // console.log(this.form.date)
      const query = {
        ...this.searchForm
      }
      query[this.searchForm.type] = this.searchForm.word
      if (page) {
        query.pageNo = page.page
        query.pageSize = page.limit
      } else {
        query.pageNo = 1
        query.pageSize = this.page.limit
        this.page.page = 1
      }
      console.log(query)
      this.queryAllViolateDomainList(query).then(res => {
        if (res.code === '0') {
          console.log(res)
          this.listdata = res.list
          this.page.total = res.totalRows
        }
      }).catch(error => {
        console.log(error)
      })
    },
    onReset() {
      // this.$refs[formName].resetFields()
      clearFormData(this.searchForm)
      this.time = ''
      this.searchForm.type = 'domainName'
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      this.GetList()
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.GetList()
    },
    handleSelectionChange(val) {
      console.log(val)
    },
    // 打开批量操作窗口
    openDialogBatch() {
      this.dialogBatch.visible = true
    },
    closeDialogBatch() {
      this.dialogBatch.visible = false
    },
    // 打开录入域名窗口
    openDialogAddDomain() {
      this.dialogAddDomain.visible = true
    },
    closeDialogAddDomain() {
      this.dialogAddDomain.visible = false
    },
    // 违规详情
    openDialogDetail(row) {
      this.dialogDetail.visible = true
      this.row = row
    },
    closeDialogDetail() {
      this.dialogDetail.visible = false
    },
    // 注册信息
    openDialogRegInfo() {
      this.dialogRegInfo.visible = true
    },
    closeDialogRegInfo() {
      this.dialogRegInfo.visible = false
    },
    // 实名模板
    openDialogTemplate() {
      this.dialogTemplate.visible = true
    },
    closeDialogTemplate() {
      this.dialogTemplate.visible = false
    },
    // 同模板域名
    openDialogTemplateDomain() {
      this.dialogTemplateDomain.visible = true
    },
    closeDialogTemplateDomain() {
      this.dialogTemplateDomain.visible = false
    },
    // 账号信息
    openDialogAccount() {
      this.dialogAccount.visible = true
    },
    closeDialogAccount() {
      this.dialogAccount.visible = false
    },
    // 显示
    openDialogShow() {
      this.dialogShow.visible = true
    },
    closeDialogShow() {
      this.dialogShow.visible = false
    },
    // 隐藏
    hide() {

    }
  },
  mounted() {
    this.GetList()
  }
}
</script>

<style lang="scss" scoped>
// .box-container{
//   border-bottom: 20px solid #f3f7fa;

//   .box-list{
//     margin: 0px 20px 20px 20px;
//     font-size: 12px;
//   }

//   .dialogTitle{
//     text-align: center;
//     font-size: 18px;
//     font-weight: bold;
//   }
//   .dialogContent{
//     line-height: 40px;
//     margin: 10px 0px;
//   }
// }
</style>
<style lang="scss">
// .box-container{
//   .el-dialog__body{
//     padding: 0px !important;
//   }
// }
// .box-form{
//   .el-range-separator{
//     font-size: 12px !important;
//   }
//   .el-form .el-textarea__inner {
//     min-height: 54px !important;
//   }
//   .input-with-aaa {
//     input{
//       width: 200px !important;
//     }
//     .input-with-bbb {
//       width: 100px !important;
//       .el-input{
//         width: 100% !important;
//         input{
//           width: 100% !important;
//         }
//       }
//     }
//   }

// }
// .violate{
//   .el-dialog{
//     min-width: 600px;
//   }
//   .boxBatch{
//     .el-form-item {
//       margin-bottom: 0px !important;
//     }
//   }
//   .boxAddDomain{
//     margin: 25px 0px !important;
//     .el-form-item {
//       margin-bottom: 25px !important;

//       .el-input,.el-textarea{
//         width: 320px !important;
//       }
//     }
//   }
// }
// .box-page{
//   .el-pagination__total,.el-pagination__jump{
//     font-size: 12px !important;
//   }
// }
</style>

