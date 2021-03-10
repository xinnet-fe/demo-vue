<template>
  <div class="">
    <el-table
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="产品分类"
      />
      <el-table-column
        prop="name"
        label="产品名称"
      />
      <el-table-column
        prop="address"
        label="产品标识"
      />
      <el-table-column
        prop="address"
        label="开通日期"
      />
      <el-table-column
        prop="address"
        label="到期日期"
      />
      <el-table-column
        prop="address"
        label="状态"
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

  },
  data() {
    return {
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

    }
  }
}
</script>

<style scoped>

</style>
