<template>
  <div class="">

    <el-radio-group v-model="check" size="small" @change="handleChange">
      <el-radio-button label="business">商务跟进记录</el-radio-button>
      <el-radio-button label="housekeeper">管家服务记录</el-radio-button>
    </el-radio-group>

    <el-table
      v-if="check==='business'"
      :data="list"
      :loading="loading"
      style="width: 100%"
    >
      <el-table-column
        prop="visitTime"
        label="跟进时间"
      />
      <el-table-column
        prop="visitType"
        label="跟进方式"
      />
      <el-table-column
        prop="salesStageStr"
        label="销售阶段"
      />
      <el-table-column
        prop="linkManName"
        label="联系人"
      />
      <el-table-column
        prop="nextVisitTime"
        label="下次跟进时间"
      />
      <el-table-column
        prop="content"
        label="跟进记录"
      />
      <el-table-column
        prop="custDemandsStr"
        label="客户需求"
      />
      <el-table-column
        prop=""
        label="附件"
      />
    </el-table>
    <el-table
      v-if="check==='housekeeper'"
      :data="list2"
      :loading="loading2"
      style="width: 100%"
    >
      <el-table-column
        prop="createTimeStr"
        label="互动时间"
      />
      <el-table-column
        prop="communicateTypeStr"
        label="沟通方式"
      />
      <el-table-column
        prop="linkmanName"
        label="联系人"
      />
      <el-table-column
        prop="contactNum"
        label="电话"
      />
      <el-table-column
        prop="createUserName"
        label="记录人"
      />
    </el-table>
    <pagination
      v-if="check==='business'"
      :total="page.total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="handleGetList"
    />
    <pagination
      v-if="check==='housekeeper'"
      :total="page2.total"
      :page.sync="page2.page"
      :limit.sync="page2.limit"
      @pagination="handleGetList"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Pagination from '@/components/Pagination'
export default {
  name: 'DetailOperation',
  components: {
    Pagination
  },
  props: {
    row: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      check: 'business',
      list: [{
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
      list2: [{
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
      page: {
        total: 0,
        page: 0,
        limit: 20
      },
      page2: {
        total: 0,
        page: 0,
        limit: 20
      }
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading.effects['security/getVisitLogs'],
      loading2: (state) => state.loading.effects['security/getServiceInfos']
    })
  },
  methods: {
    ...mapActions('security', ['getVisitLogs', 'getServiceInfos']),
    handleGetList(page) {
      const query = {
        custId: this.row.id,
        currentPage: '',
        pageSize: ''
      }
      if (this.check === 'business') {
        if (page) {
          query.currentPage = page.page
          query.pageSize = page.limit
        } else {
          query.currentPage = 1
          query.pageSize = this.page.limit
          this.page.page = 1
        }
        this.getVisitLogs(query).then((res) => {
          this.list = res.data.list
          this.page.total = res.data.totalCount
        }).catch((error) => {
          console.log(error)
        })
      } else {
        if (page) {
          query.currentPage = page.page
          query.pageSize = page.limit
        } else {
          query.currentPage = 1
          query.pageSize = this.page2.limit
          this.page2.page = 1
        }
        this.getServiceInfos(query).then((res) => {
          this.list2 = res.data.list
          this.page2.total = res.data.totalCount
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    handleChange(v) {
      console.log(v)
      this.handleGetList()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-radio-group{
  margin-bottom: 20px;
}
</style>
