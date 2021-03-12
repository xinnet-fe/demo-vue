<template>
  <div class="">
    <el-radio-group v-model="check" size="small" @change="handleChange">
      <el-radio-button label="web">网站</el-radio-button>
      <el-radio-button label="shop">商城</el-radio-button>
      <el-radio-button label="seo">SEO</el-radio-button>
    </el-radio-group>
    <el-table
      v-if="check==='web'"
      :data="list"
      :loading="loading"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="产品名称"
      />
      <el-table-column
        prop="name"
        label="网站打开的速度（s）"
      />
      <el-table-column
        prop="address"
        label="百度的收录页面数"
      />
      <el-table-column
        prop="address"
        label="中文关键词是否有百度排名"
      />
      <el-table-column
        prop="address"
        label="英文关键词是否有谷歌排名"
      />
    </el-table>
    <div v-if="check==='web'" class="source">数据来源：门户1.0   门户2.0</div>
    <el-table
      v-if="check==='shop'"
      :data="list2"
      :loading="loading2"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="产品名称"
      />
      <el-table-column
        prop="name"
        label="商城访问UV"
      />
      <el-table-column
        prop="address"
        label="购买金额（元）"
      />
    </el-table>
    <div v-if="check==='shop'" class="source">数据来源：门户1.0   门户2.0</div>
    <el-table
      v-if="check==='seo'"
      :data="list3"
      :loading="loading3"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
      />
      <el-table-column
        prop="name"
        label="网站名称"
      />
      <el-table-column
        prop="address"
        label="网站打开的速度（s）"
      />
      <el-table-column
        prop="address"
        label="设置关键词名称"
      />
      <el-table-column
        prop="address"
        label="在百度搜索引擎排名"
      />
      <el-table-column
        prop="address"
        label="在谷歌搜索引擎排名"
      />
    </el-table>
    <pagination
      v-if="check==='web'"
      :total="page.total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="handleGetList"
    />
    <pagination
      v-if="check==='shop'"
      :total="page2.total"
      :page.sync="page2.page"
      :limit.sync="page2.limit"
      @pagination="handleGetList"
    />
    <pagination
      v-if="check==='seo'"
      :total="page3.total"
      :page.sync="page3.page"
      :limit.sync="page3.limit"
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
      check: 'web',
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
      list3: [{
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
      },
      page3: {
        total: 0,
        page: 0,
        limit: 20
      }
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading.effects['security/getVisitLogs'],
      loading2: (state) => state.loading.effects['security/getServiceInfos'],
      loading3: (state) => state.loading.effects['security/getServiceInfos']
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
      if (this.check === 'web') {
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
      } else if (this.check === 'shop') {
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
      } else {
        if (page) {
          query.currentPage = page.page
          query.pageSize = page.limit
        } else {
          query.currentPage = 1
          query.pageSize = this.page3.limit
          this.page2.page = 1
        }
        this.getServiceInfos(query).then((res) => {
          this.list3 = res.data.list
          this.page3.total = res.data.totalCount
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
.source{
  font-size: 12px;
  padding: 20px 10px;
}
</style>
