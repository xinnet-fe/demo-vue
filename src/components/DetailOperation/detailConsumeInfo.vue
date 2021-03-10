<template>
  <div class="">
    <el-radio-group v-model="check" size="small" @change="handleChange">
      <el-radio-button label="new">新平台订单</el-radio-button>
      <el-radio-button label="old">老boss订单</el-radio-button>
    </el-radio-group>
    <el-table
      v-if="check==='new'"
      :data="list"
      :loading="loading"
      style="width: 100%"
    >
      <el-table-column
        prop="sourceName"
        label="客户来源"
      />
      <el-table-column
        prop="createTime"
        label="录入时间"
      />
      <el-table-column
        prop="createrName"
        label="录入人"
      />
      <el-table-column
        prop="orderCode"
        label="销售订单code"
      />
      <el-table-column
        prop="goodsGroupName"
        label="商品名称"
      />
      <el-table-column
        prop="transCost"
        label="成交额（元）"
      />
      <el-table-column
        prop="unpaidTotalAmount"
        label="未付款（元）"
      />
      <el-table-column
        prop="orderStatus"
        label="状态"
      />
    </el-table>
    <el-table
      v-if="check==='old'"
      :data="list2"
      :loading="loading2"
      style="width: 100%"
    >
      <el-table-column
        prop="businessType"
        label="业务类型"
      />
      <el-table-column
        prop="createTime"
        label="录入时间"
      />
      <el-table-column
        prop="contractNum"
        label="合同号"
      />
      <el-table-column
        prop="accountGroupCode"
        label="结算单组ID"
      />
      <el-table-column
        prop="productName"
        label="商品名称"
      />
      <el-table-column
        prop="buyTotalMoney"
        label="签单额（元）"
      />
      <el-table-column
        prop="productTrade"
        label="产品标识"
      />
      <el-table-column
        prop="contractTextCode"
        label="文本序号"
      />
    </el-table>
    <pagination
      v-if="check==='new'"
      :total="page.total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="handleGetList"
    />
    <pagination
      v-if="check==='old'"
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
      loading: (state) => state.loading.effects['security/findOrderInfoByCustId'],
      loading2: (state) => state.loading.effects['security/findBossOrder']
    })
  },
  methods: {
    ...mapActions('security', ['findOrderInfoByCustId', 'findBossOrder']),
    handleGetList(page) {
      const query = {
        custId: this.row.id,
        currentPage: '',
        pageSize: ''
      }
      if (this.check === 'new') {
        if (page) {
          query.currentPage = page.page
          query.pageSize = page.limit
        } else {
          query.currentPage = 1
          query.pageSize = this.page.limit
          this.page.page = 1
        }
        this.findOrderInfoByCustId(query).then((res) => {
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
        this.findBossOrder(query).then((res) => {
          this.list2 = res.data.info
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
