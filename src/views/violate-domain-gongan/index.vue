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

          <el-form-item>
            <el-button type="primary" size="medium" @click="onSubmit('searchForm')">查询</el-button>
            <el-button size="medium" @click="onReset('searchForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="listdata" :loading="loading" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />

          <el-table-column label="域名">
            <template slot-scope="scope">
              {{ scope.row.domainName }}
            </template>
          </el-table-column>

          <el-table-column label="所属账号(重复次数）" width="150">
            <template slot-scope="scope">
              {{ scope.row.agentCode }} ({{ scope.row.agentCodeCount ? scope.row.agentCodeCount : 0 }})
            </template>
          </el-table-column>

          <el-table-column label="模板ID(重复次数）" width="150">
            <template slot-scope="scope">
              {{ scope.row.serviceCode }} ({{ scope.row.serviceCodeCount ? scope.row.serviceCodeCount : 0 }})
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

          <el-table-column label="添加人">
            <template slot-scope="scope">
              {{ scope.row.operator }}
            </template>
          </el-table-column>

          <el-table-column label="违规原因">
            <template slot-scope="scope">
              {{ scope.row.holdReason }}
            </template>
          </el-table-column>

          <el-table-column label="操作" width="300" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="openDialogRegInfo(scope.row)">注册信息</el-button>
              <el-button type="text" @click="openDialogTemplate(scope.row)">实名模板</el-button>
              <el-button type="text" @click="openDialogTemplateDomain(scope.row)">同模板域名</el-button>
              <el-button type="text" @click="openDialogAccount(scope.row)">账号信息</el-button>
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

    <DialogAccount v-if="dialogAccount" :visible.sync="dialogAccount" :row.sync="row" @refreshList="GetList" />
    <DialogRegInfo v-if="dialogRegInfo" :visible.sync="dialogRegInfo" :row.sync="row" @refreshList="GetList" />
    <DialogTemplateDomain v-if="dialogTemplateDomain" :visible.sync="dialogTemplateDomain" :row.sync="row" @refreshList="GetList" />
    <DialogTemplate v-if="dialogTemplate" :visible.sync="dialogTemplate" :row.sync="row" @refreshList="GetList" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DialogAccount from '@/views/violate-domain/dialogAccount.vue'
import DialogRegInfo from '@/views/violate-domain/dialogRegInfo.vue'
import DialogTemplateDomain from '@/views/violate-domain/dialogTemplateDomain.vue'
import DialogTemplate from '@/views/violate-domain/dialogTemplate.vue'
import clearFormData from '@/utils/clearFormData.js'
import Pagination from '@/components/Pagination.vue'
export default {
  components: {
    Pagination,
    DialogAccount,
    DialogRegInfo,
    DialogTemplateDomain,
    DialogTemplate
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
      // 违规详情Detail RegInfo Template TemplateDomain Account Show
      dialogDetail: false,
      // 注册信息
      dialogRegInfo: false,
      // 实名模板
      dialogTemplate: false,
      // 同模板域名
      dialogTemplateDomain: false,
      // 账号信息
      dialogAccount: false,
      // 显示
      dialogShow: {
        visible: false
      },
      row: {},
      ids: []
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['violateDomain/queryViolateDomainList']
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
    ...mapActions('violateDomain', ['queryViolateDomainList', 'queryViolateDomainInfo', 'queryViolateDomainTemplate', 'queryViolateDomainAgent', 'querySameTemplateViolateDomainList']),
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
      this.queryViolateDomainList(query).then(res => {
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
    // handleSizeChange(val) {
    //   this.page.pageSize = val
    //   this.GetList()
    // },
    // handleCurrentChange(val) {
    //   this.page.currentPage = val
    //   this.GetList()
    // },
    handleSelectionChange(val) {
      console.log(val)
      this.ids = val.map(v => {
        return v.id
      })
      // console.log(this.ids)
    },
    // 注册信息
    openDialogRegInfo(row) {
      this.dialogRegInfo = true
      this.queryViolateDomainInfo({ id: row.id }).then(res => {
        if (res.code === '0') {
          this.row = res.data
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 实名模板
    openDialogTemplate(row) {
      this.dialogTemplate = true
      this.queryViolateDomainTemplate({ id: row.id }).then(res => {
        if (res.code === '0') {
          this.row = res.data
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 同模板域名
    openDialogTemplateDomain(row) {
      this.dialogTemplateDomain = true
      this.querySameTemplateViolateDomainList({ id: row.id }).then(res => {
        if (res.code === '0') {
          this.row = res
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 账号信息
    openDialogAccount(row) {
      this.dialogAccount = true
      this.queryViolateDomainAgent({ id: row.id }).then(res => {
        if (res.code === 0) {
          this.row = res.data
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handleSetViolateDomain(row, status) {
      const query = {
        type: 'check',
        setStatus: status,
        ids: row.id
      }
      this.$store.dispatch('violateDomain/setViolateDomain', query).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.GetList()
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.GetList()
  }
}
</script>

<style lang="scss" scoped>

</style>
