<template>
  <div class="">
    <el-radio-group v-model="check" size="small" @change="handleChange">
      <el-radio-button label="new">新平台订单</el-radio-button>
      <el-radio-button label="old">老boss订单</el-radio-button>
    </el-radio-group>
    <el-table
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="客户来源"
      />
      <el-table-column
        prop="name"
        label="录入时间"
      />
      <el-table-column
        prop="address"
        label="录入人"
      />
      <el-table-column
        prop="address"
        label="销售订单code"
      />
      <el-table-column
        prop="address"
        label="商品名称"
      />
      <el-table-column
        prop="address"
        label="成交额（元）"
      />
      <el-table-column
        prop="address"
        label="未付款（元）"
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
      check: 'new',
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
