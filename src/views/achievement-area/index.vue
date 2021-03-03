<template>
  <div class="order-form">
    <el-form ref="searchForm" class="search-form" :inline="true">
      <el-form-item label="区域名称">
        <el-input
          v-model="form.regionName"
          placeholder="请输入区域名称"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="medium"
          :loading="loading"
          @click="getList"
        >查询</el-button>
        <el-button size="medium" @click="resetModal">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- operate -->
    <el-form ref="operateForm" class="operate-form" :inline="true">
      <el-form-item>
        <el-button
          size="mini"
          @click="handleAdd"
        >添加区域</el-button>
      </el-form-item>
    </el-form>
    <!-- operate -->

    <el-table
      ref="dragTable"
      v-loading="loading"
      :data="list"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="上级区域" prop="parentRegionName" />
      <el-table-column label="区域名称" prop="regionName" />
      <el-table-column label="负责人" prop="director" />
      <el-table-column label="修改时间" prop="updateTime" />
      <el-table-column label="修改人" prop="operator" />
      <el-table-column
        label="操作"
        align="center"
        width="200"
        fixed="right"
      >
        <template slot-scope="{ row }">
          <el-button type="text" size="small" @click="handleUpdate(row)">修改</el-button>
          <el-button type="text" size="small" @click="handleSet(row)">设置负责人</el-button>
          <el-button type="text" size="small" @click="handleHistory(row)">负责人历史</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="page.total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="getList"
    />
    <dialog-history v-if="dialogHistoryVisible" :visible.sync="dialogHistoryVisible" :row.sync="row" />
    <dialog-set-leader v-if="dialogSetLeaderVisible" :visible.sync="dialogSetLeaderVisible" :row.sync="row" @getList="getList" />
    <dialog-area v-if="dialogAreaVisible" :visible.sync="dialogAreaVisible" :row.sync="row" @getList="getList" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Pagination from '@/components/demos/Pagination' // secondary package based on el-pagination
import clearFormDate from '@/utils/clearFormData'
import DialogHistory from './dialogHistory'
import DialogSetLeader from './dialogSetLeader'
import DialogArea from './dialogArea'
// import checkPermission from '@/utils/demos/permission' // 权限判断函数
export default {
  name: 'AchievementHy',
  components: { Pagination, DialogHistory, DialogSetLeader, DialogArea },
  filters: {
  },
  props: {

  },
  data() {
    return {
      form: {
        regionName: ''
      },
      loadingBtn: false,
      list: [
        {
          id: 1
        }
      ],
      page: {
        total: 0,
        page: 0,
        limit: 30
      },
      row: {},
      dialogHistoryVisible: false,
      dialogSetLeaderVisible: false,
      dialogAreaVisible: false
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading.effects['region/selectRegionData']
    }),
    ...mapGetters([])
  },
  watch: {

  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    ...mapActions('region', ['selectRegionData']),
    // checkPermission,
    getList(page) {
      console.log(this.form)
      const query = {
        ...this.form
      }
      if (page) {
        query.pageNum = page.page
        query.pageSize = page.limit
      } else {
        query.pageNum = 1
        query.pageSize = this.page.limit
        this.page.page = 1
      }
      this.selectRegionData(query).then((res) => {
        this.list = res.data.list
        this.page.total = res.data.count
      }).catch((error) => {
        this.$message.error('加载失败，请稍后再试或减少查询数据量')
        console.log(error)
      })
    },
    resetModal() {
      clearFormDate(this.form)
      this.resetDate()
      this.productType = []
    },
    handleAdd() {
      this.dialogAreaVisible = true
    },
    handleUpdate(row) {
      console.log(row)
      this.row = row
      this.dialogAreaVisible = true
    },
    handleSet(row) {
      console.log(row)
      this.row = row
      this.dialogSetLeaderVisible = true
    },
    handleHistory(row) {
      console.log(row)
      this.row = row
      this.dialogHistoryVisible = true
    }
  }
}
</script>
<style scoped>
  .operateUser{
    font-size: 12px;
  }
</style>
