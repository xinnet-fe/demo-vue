<template>
  <div class="order-form">
    <!-- search -->
    <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true">
      <el-form-item label="用户账号">
        <el-input v-model="searchForm.agentCode" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" :loading="loading" @click="onSearch()">查询</el-button>
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
        prop="agentCode"
        label="用户编号"
      />
      <el-table-column
        prop="applyTime"
        label="申请时间"
      />
      <el-table-column
        label="状态"
      >
        <template v-slot="scope">
          {{ scope.row.checkState === '02' ? '正常' : '锁定' }}
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        label="操作"
      >
        <template v-slot="scope">
          <el-popconfirm v-if="scope.row.checkState === '02'" title="这是一段内容确定删除吗？" @confirm="handleLock(scope.row)">
            <el-button slot="reference" type="text" size="mini">锁定</el-button>
          </el-popconfirm>
          <el-popconfirm v-if="scope.row.checkState === '03'" title="这是一段内容确定删除吗？" @confirm="handleUnlock(scope.row)">
            <el-button slot="reference" style="margin-left: 10px" type="text" size="mini">解锁</el-button>
          </el-popconfirm>
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
  name: 'ApiApplyList',
  components: {
    Pagination
  },
  props: {},
  data() {
    return {
      searchForm: {
        agentCode: '',
        pageNum: 1,
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
      loading: state => state.loading.effects['apiApply/getApiApplyList']
    })
  },
  mounted() {
    this.onSearch()
  },
  methods: {
    onSearch(page) {
      const query = this.searchForm
      if (page) {
        query.pageNum = page.page
        query.pageSize = page.limit
      } else {
        query.pageNum = 1
        query.pageSize = 20
        this.page.page = 1
        this.page.limit = 20
      }
      console.log(query)
      this.$store.dispatch('apiApply/getApiApplyList', query).then(res => {
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
