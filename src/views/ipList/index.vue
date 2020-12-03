<template>
  <div class="order-form">
    <!-- search -->
    <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true">
      <el-form-item label="用户编号">
        <el-input v-model="searchForm.agentCode" />
      </el-form-item>
      <el-form-item label="IP地址">
        <el-input v-model="searchForm.ip" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" :loading="loading" @click="onSearch()">查询</el-button>
        <el-button size="medium" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- search -->

    <!-- operate -->
    <el-form ref="operateForm" class="operate-form" :model="searchForm" :inline="true">
      <el-form-item>
        <el-button size="mini">添加</el-button>
      </el-form-item>
    </el-form>
    <!-- operate -->

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
        width="120"
      />
      <el-table-column
        prop="apiIp"
        label="IP地址"
      />
      <el-table-column
        prop="addDate"
        label="添加时间"
      />
      <el-table-column
        width="100px"
        label="操作"
      >
        <template v-slot="scope">
          <el-button type="text" size="mini">修改</el-button>
          <el-popconfirm title="确定删除吗？" @onConfirm="handleDel(scope.row)">
            <el-button slot="reference" type="text" size="mini">删除</el-button>
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
  name: 'NsThreshold',
  components: {
    Pagination
  },
  props: {},
  data() {
    return {
      searchForm: {
        agentCode: '',
        ip: '',
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
      loading: state => state.loading.effects['apiApply/selectApiSettingIps']
    })
  },
  mounted() {
    // this.onSearch()
  },
  methods: {
    onSearch(page) {
      const query = {
        ...this.searchForm
      }
      if (page) {
        query.pageNum = page.page
        query.pageSize = page.limit
      } else {
        query.pageNum = 1
        query.pageSize = 20
        this.page.page = 1
        this.page.limit = 20
      }
      this.$store.dispatch('apiApply/selectApiSettingIps', query).then(res => {
        if (!res.code && res.message === 'success') {
          this.list = res.data.list
          this.page.total = res.data.totalRows
        } else {
          this.$message.error(res.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    onReset() {
      clearFormData(this.searchForm)
    },
    handleDel(row) {
      this.$store.dispatch('apiApply/deleteSettingById', { id: row.id }).then(res => {
        if (!res.code && res.success) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.onSearch()
        } else {
          this.$message.error(res.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
