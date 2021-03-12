<template>
  <div class="box-container violate">
    <div>
      <div class="box-form order-form">
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
              <el-button type="text" @click="openDialogRegInfo(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total="page.total"
          :page.sync="page.page"
          :limit.sync="page.limit"
          @pagination="handleSearch"
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

    <!-- <DialogAccount v-if="dialogAccount" :visible.sync="dialogAccount" :row.sync="row" @refreshList="GetList" />
    <DialogRegInfo v-if="dialogRegInfo" :visible.sync="dialogRegInfo" :row.sync="row" @refreshList="GetList" />
    <DialogTemplateDomain v-if="dialogTemplateDomain" :visible.sync="dialogTemplateDomain" :row.sync="row" @refreshList="GetList" />
    <DialogTemplate v-if="dialogTemplate" :visible.sync="dialogTemplate" :row.sync="row" @refreshList="GetList" /> -->
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
export default {
  components: {
    Pagination
    // DialogAccount,
    // DialogRegInfo,
    // DialogTemplateDomain,
    // DialogTemplate
  },
  data() {
    return {
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
      row: {}
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
    }
  },
  mounted() {
    this.handleSearch()
  }
}
</script>

<style lang="scss" scoped>

</style>
