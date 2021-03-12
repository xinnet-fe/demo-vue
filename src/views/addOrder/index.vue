<template>
  <div class="box-container violate">
    <div>
      <div class="box-form order-form">
        <el-form ref="searchForm" :model="form" class="search-form" :inline="true">
          <el-form-item label="域名">
            <el-input v-model="form.domain" placeholder="请输入查询域名" />
          </el-form-item>
          <el-form-item label="服务编号">
            <el-input v-model="form.serviceCode" placeholder="请输入服务编号" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="handleSearch()">查询</el-button>
            <el-button size="medium" @click="handleReset()">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="list" :loading="loading" style="width: 100%">
          <el-table-column label="域名">
            <template slot-scope="scope">
              {{ scope.row.domainName }}
            </template>
          </el-table-column>

          <el-table-column label="注册日期">
            <template slot-scope="scope">
              {{ scope.row.agentCode }} ({{ scope.row.agentCodeCount ? scope.row.agentCodeCount : 0 }})
            </template>
          </el-table-column>

          <el-table-column label="到期日期">
            <template slot-scope="scope">
              {{ scope.row.serviceCode }} ({{ scope.row.serviceCodeCount ? scope.row.serviceCodeCount : 0 }})
            </template>
          </el-table-column>

          <el-table-column label="服务编号">
            <template slot-scope="scope">
              {{ scope.row.createTime }}
            </template>
          </el-table-column>

          <el-table-column label="用户编号">
            <template slot-scope="scope">
              {{ scope.row.holdSource }}
            </template>
          </el-table-column>

          <el-table-column label="用户名称">
            <template slot-scope="scope">
              {{ scope.row.operator }}
            </template>
          </el-table-column>

          <el-table-column label="用户账户余额">
            <template slot-scope="scope">
              {{ scope.row.holdReason }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="handleNewOpen(scope.row)">新开</el-button>
              <el-button type="text" @click="handleRecharge(scope.row)">续费</el-button>
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
    </div>

    <!-- <DialogAccount v-if="dialogAccount" :visible.sync="dialogAccount" :row.sync="row" @refreshList="GetList" />
    <DialogRegInfo v-if="dialogRegInfo" :visible.sync="dialogRegInfo" :row.sync="row" @refreshList="GetList" />
    <DialogTemplateDomain v-if="dialogTemplateDomain" :visible.sync="dialogTemplateDomain" :row.sync="row" @refreshList="GetList" />
    <DialogTemplate v-if="dialogTemplate" :visible.sync="dialogTemplate" :row.sync="row" @refreshList="GetList" /> -->
    <dialog-new v-if="dialogNewShow" :visible.sync="dialogNewShow" :row.sync="row" @refreshList="handleSearch" />
    <dialog-recharge v-if="dialogRechargeShow" :visible.sync="dialogRechargeShow" :row.sync="row" @refreshList="handleSearch" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DialogNew from './dialogNew.vue'
import DialogRecharge from './dialogRecharge.vue'
import clearFormData from '@/utils/clearFormData.js'
import Pagination from '@/components/Pagination.vue'
export default {
  components: {
    Pagination,
    DialogNew,
    DialogRecharge
  },
  data() {
    return {
      list: [{}, {}],
      page: {
        total: 0,
        page: 1,
        limit: 20
      },
      // 搜索表单
      form: {
        domain: '',
        serverCode: '',
        pageNo: 1,
        pageSize: 20
      },
      dialogNewShow: false,
      dialogRechargeShow: false,
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
  mounted() {
    this.handleSearch()
  },
  methods: {
    ...mapActions('violateDomain', ['queryViolateDomainList', 'queryViolateDomainInfo', 'queryViolateDomainTemplate', 'queryViolateDomainAgent', 'querySameTemplateViolateDomainList']),
    handleSearch(page) {
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
      clearFormData(this.form)
    },
    handleNewOpen(row) {
      this.row = row
      this.dialogNewShow = true
    },
    handleRecharge(row) {
      this.row = row
      this.dialogRechargeShow = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
