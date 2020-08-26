<template>
  <div class="order-form">
    <!-- search -->
    <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true">

      <el-form-item label="类型">
        <el-select v-model="searchForm.type" placeholder="">
          <el-option label="会员编号" value="hyCode" />
          <el-option label="手机号码" value="mobileNum" />
          <el-option label="邮箱" value="userEmail" />
        </el-select>
      </el-form-item>
      <el-form-item label="关键词">
        <el-input v-model="searchForm.name" placeholder="请输入关键词" />
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker
          v-model="searchForm.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.bindStatus" placeholder="">
          <el-option label="全部" value="" />
          <el-option label="已绑定" value="1" />
          <el-option label="未绑定" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" :loading="loading" @click="onSearch">查询</el-button>
        <el-button size="medium" @click="dialogVisible = true">绑定客户</el-button>
      </el-form-item>
    </el-form>
    <!-- search -->

    <!-- table -->
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column
        prop="customerCode"
        label="用户ID"
      />
      <el-table-column
        prop="realName"
        label="实名信息"
        width="120"
      />
      <el-table-column
        prop="telenumber"
        label="手机号码"
      />
      <el-table-column
        prop="userEmail"
        label="邮箱"
        show-overflow-tooltip
      />
      <el-table-column
        prop="registerTime"
        label="注册时间"
        show-overflow-tooltip
      />
      <el-table-column label="状态" fixed="right" width="180">
        <template v-slot="scope">
          <el-button
            v-if="scope.row.bindStatus !== '1'"
            size="mini"
            type="text"
          >未绑定</el-button>
          <el-button
            v-else
            size="mini"
            type="text"
          >已绑定</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="page.total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="getList"
    />
    <!-- table -->
    <el-dialog
      title="客户绑定"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="beforeClose"
    >
      <dialog-bind-client v-if="dialogVisible" @close="beforeClose" @search="onSearch" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import dialogBindClient from '@/components/dialogBindClient'
// import assign from 'lodash/assign'
// import forEach from 'lodash/forEach'
import { mapState } from 'vuex'

export default {
  name: 'Orders',
  components: {
    Pagination,
    dialogBindClient
  },
  props: {},
  data() {
    return {
      searchForm: {
        type: 'hyCode',
        keywords: '',
        time: '',
        bindStatus: '1'
      },
      list: [],
      page: {
        page: 1,
        total: 20,
        limit: 10
      },
      dialogVisible: false
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['userinfo/queryAgentCustomerList']
      // page: state => state.order.page
    })
  },
  created() {
    this.getList()
  },
  methods: {
    getList(page) {
      const query = {
        pageNum: 1,
        [this.searchForm.type]: this.searchForm.keywords,
        registerStartTime: this.searchForm.time ? this.searchForm.time[0] : '',
        registerEndTime: this.searchForm.time ? this.searchForm.time[1] : '',
        bindStatus: this.searchForm.bindStatus
      }
      if (page) {
        query.pageNum = page.page
        query.pageSize = page.limit
      } else {
        query.pageNum = 1
        query.pageSize = 20
        this.page.limit = 20
        this.page.page = 1
      }
      console.error(query)
      this.$store.dispatch('userinfo/queryAgentCustomerList', query).then((response) => {
        this.list = response.data.list
        this.page.total = response.data.count
      }).catch((error) => {
        console.error(error)
      })
    },
    onSearch(formName) {
      this.getList()
    },
    beforeClose() {
      this.dialogVisible = false
    },
    showModal(row) {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
