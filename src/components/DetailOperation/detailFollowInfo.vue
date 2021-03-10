<template>
  <div class="">

    <el-radio-group v-model="check" size="small" @change="handleChange">
      <el-radio-button label="business">商务跟进记录</el-radio-button>
      <el-radio-button label="housekeeper">管家服务记录</el-radio-button>
    </el-radio-group>

    <el-table
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="跟进时间"
      />
      <el-table-column
        prop="name"
        label="跟进方式"
      />
      <el-table-column
        prop="address"
        label="销售阶段"
      />
      <el-table-column
        prop="address"
        label="联系人"
      />
      <el-table-column
        prop="address"
        label="下次跟进时间"
      />
      <el-table-column
        prop="address"
        label="跟进记录"
      />
      <el-table-column
        prop="address"
        label="客户需求"
      />
      <el-table-column
        prop="address"
        label="附件"
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
