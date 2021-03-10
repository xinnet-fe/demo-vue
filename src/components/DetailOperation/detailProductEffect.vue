<template>
  <div class="">
    <el-radio-group v-model="check" size="small" @change="handleChange">
      <el-radio-button label="web">网站</el-radio-button>
      <el-radio-button label="shop">商城</el-radio-button>
      <el-radio-button label="seo">SEO</el-radio-button>
    </el-radio-group>
    <el-table
      :data="list"
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
      :total="page.total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="handleGetList"
    />
  </div>
</template>

<script>
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
      page: {
        total: 0,
        page: 0,
        limit: 20
      }
    }
  },
  computed: {},
  methods: {
    handleGetList() {

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
