<template>
  <div class="box-container violate">
    <!---->
    <div>
      <!---->
      <div class="box-form order-form">
        <el-form ref="searchForm" :model="searchForm" class="search-form" :inline="true" :rules="searchForm.rules" style="line-height:400%;">
          <el-form-item label="分类" prop="type">
            <el-select v-model="searchForm.type" placeholder="请选择">
              <el-option
                v-for="item in searchForm.typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="搜索" prop="word">
            <el-input v-model="searchForm.word" placeholder="请输入关键字" />
          </el-form-item>

          <el-form-item label="添加时间" label-width="100px" prop="time">
            <el-date-picker
              v-model="searchForm.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>

          <el-form-item label="状态" prop="state">
            <el-select v-model="searchForm.state" placeholder="请选择">
              <el-option
                v-for="item in searchForm.stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="来源" prop="source">
            <el-select v-model="searchForm.source" placeholder="请选择">
              <el-option
                v-for="item in searchForm.sourceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button size="medium" @click="onReset('searchForm')">重置</el-button>
            <el-button type="primary" size="medium" @click="onSubmit('searchForm')">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!---->
      <div class="order-form">
        <el-button size="medium" @click="openDialogBatch">批量操作</el-button>
        <el-button size="medium" type="primary" @click="openDialogAddDomain">录入域名</el-button>
      </div>
      <!---->
      <div v-loading="loading" class="box-list">
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
          <!--<div v-for="item in listdata" :key="item.serviceCode" class="list-item"></div>-->
          <div>
            <el-table :data="listdata" style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" />

              <el-table-column label="域名" width="220">
                <template slot-scope="scope">
                  {{ scope.row.code }}
                </template>
              </el-table-column>

              <el-table-column label="状态" width="220">
                <template slot-scope="scope">
                  {{ scope.row.code }}
                </template>
              </el-table-column>

              <el-table-column label="同模板域名数（显示/实际）" width="220">
                <template slot-scope="scope">
                  {{ scope.row.code }}
                </template>
              </el-table-column>

              <el-table-column label="所属账号(重复次数）" width="220">
                <template slot-scope="scope">
                  {{ scope.row.code }}
                </template>
              </el-table-column>

              <el-table-column label="模板ID(重复次数）" width="220">
                <template slot-scope="scope">
                  {{ scope.row.code }}
                </template>
              </el-table-column>

              <el-table-column label="添加时间" width="220">
                <template slot-scope="scope">
                  {{ scope.row.code }}
                </template>
              </el-table-column>

              <el-table-column label="违规信息来源" width="220">
                <template slot-scope="scope">
                  {{ scope.row.code }}
                </template>
              </el-table-column>

              <el-table-column label="操作人" width="220">
                <template slot-scope="scope">
                  {{ scope.row.code }}
                </template>
              </el-table-column>

              <el-table-column label="违规原因" width="220">
                <template slot-scope="scope">
                  {{ scope.row.code }}
                </template>
              </el-table-column>

              <el-table-column label="操作" width="430">
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
            <!-- , sizes :page-sizes="[10, 20, 30, 40, 50]"  @size-change="handleSizeChange"-->
          </div>
        </div>
      </div>
    </div>
    <!-- 批量操作 -->
    <el-dialog
      title=""
      :visible.sync="dialogBatch.visible"
      width="30%"
      :destroy-on-close="true"
    >
      <div class="dialogTitle">
        批量操作
      </div>
      <div class="dialogContent boxBatch">
        <el-form ref="batchForm" :model="batchForm" label-width="180px">

          <el-form-item label="方式" prop="mode">
            <el-radio-group v-model="batchForm.mode">
              <el-radio v-for="(item, index) in batchForm.modeOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <div style="margin-bottom:10px; padding-left:180px;">*已显示或已隐藏的域名不进行任何操作</div>

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
      </div>
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
      title=""
      :visible.sync="dialogDetail.visible"
      width="30%"
      :destroy-on-close="true"
    >
      <div class="dialogTitle">
        违规详情
      </div>
      <div class="dialogContent">
        违规详情
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" size="medium" @click="closeDialogDetail">提交</el-button>
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
// import { mapState } from 'vuex'
// import { Message } from 'element-ui'

/*
function msgError(message) {
  Message({
    message,
    type: 'error',
    dangerouslyUseHTMLString: true
  })
}*/

export default {
  data() {
    return {
      loading: false,
      listdata: [{
        code: '1'
      }],
      searchState: 0, // 0 没有点击过查询， 1 点击过1次查询
      page: {
        currentPage: 1,
        total: 0, // 总条目数
        pageSize: 10
      },
      // 搜索表单
      searchForm: {
        type: '1',
        typeOptions: [
          {
            'label': '域名',
            'value': '1'
          }, {
            'label': '账号',
            'value': '2'
          }, {
            'label': '模板ID',
            'value': '3'
          }, {
            'label': '操作人',
            'value': '4'
          }, {
            'label': '违规信息来源',
            'value': '5'
          }, {
            'label': '违规原因',
            'value': '6'
          }
        ],
        word: '',
        time: null,
        state: '1',
        stateOptions: [{
          label: '全部',
          value: '1'
        }, {
          label: '未设置',
          value: '2'
        }, {
          label: '显示',
          value: '3'
        }, {
          label: '隐藏',
          value: '4'
        }],
        source: '1',
        sourceOptions: [{
          label: '全部',
          value: '1'
        }, {
          label: '新网自查',
          value: '2'
        }, {
          label: '其他',
          value: '3'
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
        }
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
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.page.currentPage = 1
      this.GetList()
    },
    GetList() {
      this.searchState++
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          console.log('searchForm:', this.searchForm)
        } else {
          console.log('表单错误')
          return false
        }
      })
    },
    onReset(formName) {
      this.$refs[formName].resetFields()
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
    openDialogDetail() {
      this.dialogDetail.visible = true
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
  }
}
</script>

<style lang="scss" scoped>
.box-container{
  border-bottom: 20px solid #f3f7fa;

  .box-list{
    margin: 0px 20px 20px 20px;
    font-size: 12px;
  }

  .dialogTitle{
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
  .dialogContent{
    line-height: 40px;
    margin: 10px 0px;
  }
}
</style>
<style lang="scss">
.box-container{
  .el-dialog__body{
    padding: 0px !important;
  }
}
.box-form{
  .el-range-separator{
    font-size: 12px !important;
  }
  .el-form .el-textarea__inner {
    min-height: 54px !important;
  }
}
.violate{
  .el-dialog{
    min-width: 600px;
  }
  .boxBatch{
    .el-form-item {
      margin-bottom: 0px !important;
    }
  }
  .boxAddDomain{
    margin: 25px 0px !important;
    .el-form-item {
      margin-bottom: 25px !important;

      .el-input,.el-textarea{
        width: 320px !important;
      }
    }
  }
}
.box-page{
  .el-pagination__total,.el-pagination__jump{
    font-size: 12px !important;
  }
}
</style>

