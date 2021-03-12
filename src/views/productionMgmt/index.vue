<template>
  <div class="product-mgmt-container">
    <div v-show="!showDetail" class="order-form">
      <el-form ref="searchForm" :model="form" class="search-form" :inline="true">
        <el-form-item label="订单号">
          <el-input v-model="form.code" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="所属账号">
          <el-input v-model="form.account" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="域名">
          <el-input v-model="form.domain" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="服务编号">
          <el-input v-model="form.serviceCode" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="业务">
          <el-select v-model="form.business" placeholder="请选择">
            <el-option
              v-for="item in businessList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="form.productName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="生产状态">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="来源端口">
          <el-select v-model="form.source" placeholder="请选择">
            <el-option
              v-for="item in sourceList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="handleSearch()">查询</el-button>
          <el-button size="medium" @click="handleReset()">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="list" :loading="loading" style="width: 100%">
        <el-table-column label="订单号">
          <template slot-scope="scope">
            {{ scope.row.domainName }}
          </template>
        </el-table-column>

        <el-table-column label="账号">
          <template slot-scope="scope">
            {{ scope.row.agentCode }} ({{ scope.row.agentCodeCount ? scope.row.agentCodeCount : 0 }})
          </template>
        </el-table-column>

        <el-table-column label="域名">
          <template slot-scope="scope">
            {{ scope.row.serviceCode }} ({{ scope.row.serviceCodeCount ? scope.row.serviceCodeCount : 0 }})
          </template>
        </el-table-column>

        <el-table-column label="产品名称">
          <template slot-scope="scope">
            {{ scope.row.createTime }}
          </template>
        </el-table-column>

        <el-table-column label="服务编号">
          <template slot-scope="scope">
            {{ scope.row.holdSource }}
          </template>
        </el-table-column>

        <el-table-column label="业务类型">
          <template slot-scope="scope">
            {{ scope.row.operator }}
          </template>
        </el-table-column>

        <el-table-column label="申请时间">
          <template slot-scope="scope">
            {{ scope.row.holdReason }}
          </template>
        </el-table-column>
        <el-table-column label="开始时间">
          <template slot-scope="scope">
            {{ scope.row.holdReason }}
          </template>
        </el-table-column>
        <el-table-column label="结束时间">
          <template slot-scope="scope">
            {{ scope.row.holdReason }}
          </template>
        </el-table-column>
        <el-table-column label="轮训次数">
          <template slot-scope="scope">
            {{ scope.row.holdReason }}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.holdReason }}
          </template>
        </el-table-column>
        <el-table-column label="端口来源">
          <template slot-scope="scope">
            {{ scope.row.holdReason }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="handleShowDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="page.total"
        :page.sync="page.page"
        :limit.sync="page.limit"
        @pagination="handleSearch"
      />
    </div>
    <Detail v-if="showDetail" :handle-to-back="handleBack">
      <template slot="tit-center">域名生产详情</template>
      <template slot="cont">
        <Box type="2">
          <template slot="tit-left">域名生产</template>
          <template slot="cont">
            <table class="table1">
              <tr>
                <td>订单号:</td>
                <td>D69507316547535</td>
              </tr>
              <tr>
                <td>域名:</td>
                <td>D69507316547535</td>
              </tr>
              <tr>
                <td>账号:</td>
                <td>D69507316547535</td>
              </tr>
              <tr>
                <td>服务编号: </td>
                <td>D69507316547535</td>
              </tr>
              <tr>
                <td>类型:</td>
                <td>D69507316547535</td>
              </tr>
              <tr>
                <td>年限:</td>
                <td>D69507316547535</td>
              </tr>
              <tr>
                <td>状态:</td>
                <td>
                  D69507316547535
                  <el-button type="primary" size="mini" style="margin-left: 10px" @click="handleRefresh()">重试</el-button>
                </td>
              </tr>
              <tr>
                <td>生产次数:</td>
                <td>D69507316547535</td>
              </tr>
              <tr>
                <td>端口开源:</td>
                <td>D69507316547535</td>
              </tr>
              <tr>
                <td>开始时间:</td>
                <td>D69507316547535</td>
              </tr>
              <tr>
                <td>结束时间:</td>
                <td>D69507316547535</td>
              </tr>
            </table>
          </template>
        </Box>
        <Box type="2">
          <template slot="tit-left">历史记录详情</template>
          <template slot="cont">
            <el-table
              :data="tableDataHistory"
              style="width: 100%"
            >
              <el-table-column
                prop="date"
                label="操作时间"
                width="180"
              />
              <el-table-column
                prop="name"
                label="操作类型"
                width="180"
              />
              <el-table-column
                prop="address"
                label="操作内容"
              />
              <el-table-column
                prop="address"
                label="结果"
              />
              <el-table-column
                prop="address"
                label="操作人"
              />
            </el-table>
          </template>
        </Box>
        <Box type="2">
          <template slot="tit-left">续费原信息</template>
          <template slot="cont">
            <el-table
              :data="tableDataRecharge1"
              style="width: 100%"
            >
              <el-table-column
                prop="date"
                label="域名"
                width="180"
              />
              <el-table-column
                prop="name"
                label="注册根库时间"
                width="180"
              />
              <el-table-column
                prop="address"
                label="注册新网库时间"
              />
              <el-table-column
                prop="address"
                label="根库到期时间"
              />
              <el-table-column
                prop="address"
                label="新网库到期时间"
              />
            </el-table>
          </template>
        </Box>
        <Box type="2">
          <template slot="tit-left">续费后信息</template>
          <template slot="cont">
            <el-table
              :data="tableDataRecharge2"
              style="width: 100%"
            >
              <el-table-column
                prop="date"
                label="域名"
                width="180"
              />
              <el-table-column
                prop="name"
                label="注册根库时间"
                width="180"
              />
              <el-table-column
                prop="address"
                label="注册新网库时间"
              />
              <el-table-column
                prop="address"
                label="根库到期时间"
              />
              <el-table-column
                prop="address"
                label="新网库到期时间"
              />
            </el-table>
          </template>
        </Box>
      </template>
    </Detail>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import DialogAccount from '@/views/violate-domain/dialogAccount.vue'
// import DialogRegInfo from '@/views/violate-domain/dialogRegInfo.vue'
// import DialogTemplateDomain from '@/views/violate-domain/dialogTemplateDomain.vue'
// import DialogTemplate from '@/views/violate-domain/dialogTemplate.vue'
import clearFormData from '@/utils/clearFormData.js'
import Pagination from '@/components/Pagination.vue'
import Detail from '@/components/Detail'
import Box from '@/components/Box'
export default {
  components: {
    Pagination,
    Detail,
    Box
    // DialogAccount,
    // DialogRegInfo,
    // DialogTemplateDomain,
    // DialogTemplate
  },
  data() {
    return {
      showDetail: false,
      list: [{}, {}],
      page: {
        total: 0,
        page: 1,
        limit: 20
      },
      form: {
        code: '',
        account: '',
        domain: '',
        serviceCode: '',
        business: '',
        productName: '',
        status: '',
        source: '',
        pageNo: 1,
        pageSize: 20
      },
      businessList: [
        {
          'label': '全部',
          'value': ''
        }, {
          'label': '注册',
          'value': '1'
        }, {
          'label': '续费',
          'value': '2'
        }, {
          'label': '偿还',
          'value': '3'
        }
      ],
      statusList: [{
        label: '全部',
        value: ''
      }, {
        label: '申请中',
        value: '1'
      }, {
        label: '申请成功',
        value: '2'
      }, {
        label: '已取消',
        value: '3'
      }],
      sourceList: [{
        label: '全部',
        value: ''
      }, {
        label: '页面',
        value: 'page'
      }, {
        label: 'API',
        value: 'api'
      }],
      row: {},
      tableDataHistory: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tableDataRecharge1: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tableDataRecharge2: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['violateDomain/queryViolateDomainList']
    })
  },
  watch: {
  },
  methods: {
    ...mapActions('violateDomain', ['queryViolateDomainList', 'queryViolateDomainInfo', 'queryViolateDomainTemplate', 'queryViolateDomainAgent', 'querySameTemplateViolateDomainList']),
    handleSearch(page) {
      // console.log(this.form.date)
      const query = {
        ...this.form
      }
      if (page) {
        query.pageNo = page.page
        query.pageSize = page.limit
      } else {
        query.pageNo = 1
        query.pageSize = this.page.limit
        this.page.page = 1
      }
      console.log(query)
      // this.queryViolateDomainList(query).then(res => {
      //   if (res.code === '0') {
      //     console.log(res)
      //     this.listdata = res.list
      //     this.page.total = res.totalRows
      //   }
      // }).catch(error => {
      //   console.log(error)
      // })
    },
    handleReset() {
      clearFormData(this.searchForm)
    },
    handleBack() {
      this.showDetail = false
    },
    handleRefresh() {

    },
    handleShowDetail(row) {
      this.showDetail = true
      this.row = row
    }
  },
  mounted() {
    this.handleSearch()
  }
}
</script>

<style lang="scss">
.product-mgmt-container{
  .detail-cont{
    padding: 0px!important;
  }
  .table1{
    width: 100%;
    border-collapse: collapse;
    td{
      padding: 10px;
      border: 1px solid #dfe6ec
    }
    td:nth-child(1){
      width: 20%;
      background: #ededed;
    }
    td:nth-child(2){
      width: 80%;
    }
  }
}

</style>
