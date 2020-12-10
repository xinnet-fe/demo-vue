<template>
  <div class="order-form">
    <!-- search -->
    <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true">
      <el-form-item label="用户账号">
        <el-input v-model="searchForm.agentCode" />
      </el-form-item>
      <el-form-item label="域名">
        <el-input v-model="searchForm.domainName" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" :loading="loading" @click="onSearch">查询</el-button>
        <el-button size="medium" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- search -->

    <!-- table -->
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="domainName"
        label="域名"
      />
      <el-table-column
        prop="agentCode"
        label="用户账号"
        width="120"
      />
      <el-table-column
        label="NS"
      >
        <template v-slot="scope">
          {{ scope.row.nsThresholdTotal }} | <span style="color: #f00">{{ scope.row.nsThresholdUsed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="A"
      >
        <template v-slot="scope">
          {{ scope.row.aThresholdTotal }} | <span style="color: #f00">{{ scope.row.aThresholdUsed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="CNAME"
      >
        <template v-slot="scope">
          {{ scope.row.cnameThresholdTotal }} | <span style="color: #f00">{{ scope.row.cnameThresholdUsed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="MX"
      >
        <template v-slot="scope">
          {{ scope.row.mxThresholdTotal }} | <span style="color: #f00">{{ scope.row.mxThresholdUsed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="TXT"
      >
        <template v-slot="scope">
          {{ scope.row.txtThresholdTotal }} | <span style="color: #f00">{{ scope.row.txtThresholdUsed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="AAAA"
      >
        <template v-slot="scope">
          {{ scope.row.aaaaThresholdTotal }} | <span style="color: #f00">{{ scope.row.aaaaThresholdUsed }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="SRV"
      >
        <template v-slot="scope">
          {{ scope.row.srvThresholdTotal }} | <span style="color: #f00">{{ scope.row.srvThresholdUsed }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="page.total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="onSearch"
    />
    <!-- table -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { mapState } from 'vuex'
import clearFormData from '@/utils/clearFormData'

export default {
  name: 'NsThreshold',
  components: {
    Pagination
  },
  props: {},
  data() {
    return {
      searchForm: {
        agentCode: '',
        domainName: '',
        pageNo: 1,
        pageSize: 20
      },
      list: [],
      page: {
        total: 0,
        page: 1,
        limit: 20
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['nsThreshold/queryNsThresholdList']
    })
  },
  mounted() {
    this.onSearch()
  },
  methods: {
    onSearch(page) {
      const query = {
        ...this.searchForm
      }
      if (page) {
        query.pageNo = page.page
        query.pageSize = page.limit
      } else {
        query.pageNo = 1
        query.pageSize = 20
        this.page.page = 1
        this.page.limit = 20
      }
      this.$store.dispatch('nsThreshold/queryNsThresholdList', query).then(res => {
        if (!res.code) {
          this.list = res.data.list
          this.page.total = res.data.totalRows
        }
      }).catch(error => {
        console.log(error)
      })
    },
    onReset() {
      clearFormData(this.searchForm)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
