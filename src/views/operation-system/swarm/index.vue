<template>
  <div class="order-form">
    <el-tabs
      v-model="activeName"
      @tab-click="handleTabClick"
    >
      <el-tab-pane label="系统推荐" name="system">
        <system ref="list-system" @getList="getList" />
      </el-tab-pane>
      <el-tab-pane label="自定义模板" name="custom">
        <custom ref="list-custom" @getList="getList" />
      </el-tab-pane>
    </el-tabs>
    <!-- operate -->
    <el-form ref="operateForm" class="operate-form" :inline="true">
      <el-form-item>
        <span class="pageSize">共{{ page.total }}条，已选中{{ ids.length }}条</span>
        <el-button size="mini" :loading="loading" @click="handleIssue">下发任务</el-button>
      </el-form-item>
    </el-form>
    <!-- operate -->
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="list"
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column label="客户名称" prop="agentCode" width="100" />
      <el-table-column label="建档时间" prop="goodsName" />
      <el-table-column label="客户类型" prop="serviceCode" />
      <el-table-column label="所属行业" prop="orderCode" />
      <el-table-column label="所在区域" prop="orderCode" />
      <el-table-column label="所在分司" prop="orderCode" />
      <el-table-column label="商务" prop="orderCode" />
    </el-table>
    <pagination
      :total="page.total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="getList"
    />
    <dialogIssue v-if="dialogIssueShow" :visible.sync="dialogIssueShow" :ids.sync="ids" @getList="getList" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import system from './system.vue'
import custom from './custom.vue'
import dialogIssue from './dialogIssue.vue'
import Pagination from '@/components/Pagination'
export default {
  name: 'AchievementList',
  components: { Pagination, system, custom, dialogIssue },
  data() {
    return {
      activeName: 'system',
      row: {},
      list: [{ id: 1 }, { id: 2 }],
      page: {
        total: 0,
        page: 0,
        limit: 30
      },
      ids: [],
      dialogIssueShow: false
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['userManager/findDlApply']
    })
  },
  watch: {
    // '$store.state.userinfo.user.permissions': function(v) {
    //   this.activeName = this.checkPermission(['Sales-Performmance-hy']) ? 'hy' : 'agent'
    // }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    ...mapActions('performance', ['queryHyDlSalePerformanceData']),
    handleTabClick() {

    },
    handleSelectionChange(selected) {
      console.log(selected)
      this.ids = selected.map((v) => {
        return v.id
      })
    },
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
      // this.queryHyDlSalePerformanceData(query).then((res) => {
      //   this.list = res.data.list
      //   this.page.total = res.data.count
      // }).catch((error) => {
      //   this.$message.error('加载失败，请稍后再试或减少查询数据量')
      //   console.log(error)
      // })
    },
    // 下发任务
    handleIssue() {
      if (this.$refs[`list-${this.activeName}`].isSaved) {
        if (!this.ids.length) {
          this.$message({
            message: '请选择',
            type: 'warning'
          })
        } else {
          this.dialogIssueShow = true
        }
      } else {
        this.$alert('请先保存为模板后，才可点击下发任务。', '提示', {
          confirmButtonText: '确定',
          callback: () => {

          }
        })
      }
    }
  }
}
</script>
<style scoped>
.pageSize{
  float: left;
  font-size: 12px;
  line-height: 28px;
  margin-right: 10px;
}
</style>
