<template>
  <div>
    <span @click="showDetail=true">open</span>
    <div v-show="!showDetail" class="order-form">
      <!-- search -->
      <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true">
        <el-form-item label="服务编号">
          <el-input v-model="searchForm.serviceCode" />
        </el-form-item>
        <el-form-item label="主域名">
          <el-input v-model="searchForm.commonName" />
        </el-form-item>
        <el-form-item label="证书ID">
          <el-input v-model="searchForm.certificateId" />
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="searchForm.orderCode" />
        </el-form-item>
        <el-form-item label="所属账号">
          <el-input v-model="searchForm.agentCode" />
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="searchForm.productType" />
        </el-form-item>
        <el-form-item label="证书状态">
          <el-select v-model="searchForm.status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间">
          <el-date-picker
            v-model="date1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="签发时间">
          <el-date-picker
            v-model="date2"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" :loading="loading" @click="onSearch()">查询</el-button>
          <el-button size="medium" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- search -->

      <!-- table -->
      <el-table
        v-loading="loading"
        :data="list"
        style="width: 100%"
      >
        <el-table-column
          prop="serviceCode"
          label="服务编号"
        />
        <el-table-column
          prop="commonName"
          label="主域名"
        />
        <el-table-column
          label="产品名称"
        >
          <template v-slot="scope">
            <span v-if="scope.row.productType === 'DV_SSL_1'">单域名</span>
            <span v-if="scope.row.productType === 'DV_SSL_5'">5域名</span>
            <span v-if="scope.row.productType === 'DV_SSL_10'">10域名</span>
            <span v-if="scope.row.productType === 'DV_SSL_15'">15域名</span>
            <span v-if="scope.row.productType === 'DV_SSL_20'">20域名</span>
            <span v-if="scope.row.productType === 'DV_SSL_N'">通配符</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="certificateId"
          label="证书ID"
        />
        <el-table-column
          prop="agentCode"
          label="所属账号"
        />
        <el-table-column
          prop="applyDate"
          label="申请时间"
        />
        <el-table-column
          prop="orderCode"
          label="订单号"
        />
        <el-table-column
          prop="email"
          label="联系邮箱"
        />
        <el-table-column
          label="证书状态"
        >
          <template v-slot="scope">
            <span v-if="scope.row.status === 0">未申请</span>
            <span v-if="scope.row.status === 1">待签发</span>
            <span v-if="scope.row.status === 2">已签发</span>
            <span v-if="scope.row.status === 3">已吊销</span>
            <span v-if="scope.row.status === 4">已取消</span>
            <span v-if="scope.row.status === 5">验证失败</span>
            <span v-if="scope.row.status === 6">撤销中</span>
            <span v-if="scope.row.status === 7">重新签发中</span>
            <span v-if="scope.row.status === 8">重新签发中</span>
            <span v-if="scope.row.status === 9">已过期</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="takeDate"
          label="签发时间"
        />
        <el-table-column
          prop="expireDate"
          label="到期时间"
        />
        <el-table-column
          fixed="right"
          width="100px"
          label="操作"
        >
          <template v-slot="scope">
            {{ scope }}
            <el-button type="text" size="mini">详情</el-button>
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
    <Detail v-if="showDetail" :handle-to-back="handleBack">
      <div slot="tit-center">证书详情</div>
      <div slot="cont">
        <el-descriptions :column="1" :labels="basicLabel" :data="basicInfo" />
      </div>
    </Detail>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { mapState } from 'vuex'
import clearFormData from '@/utils/clearFormData'
import Detail from '@/components/Detail'
import elDescriptions from '@/components/Descriptions'
export default {
  name: 'GoDaddyList',
  components: {
    Pagination,
    Detail,
    elDescriptions
  },
  props: {},
  data() {
    return {
      searchForm: {
        serviceCode: '',
        commonName: '',
        certificateId: '',
        orderCode: '',
        agentCode: '',
        productType: '',
        status: '',
        applyDateBegin: '',
        applyDateEnd: '',
        takeDateBegin: '',
        takeDateEnd: '',
        pageNo: 1,
        pageSize: 20
      },
      date1: '',
      date2: '',
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '0',
        label: '未申请'
      }, {
        value: '1',
        label: '已申请'
      }, {
        value: '2',
        label: '通过'
      }, {
        value: '3',
        label: '拒绝'
      }],
      list: [],
      page: {
        total: 0,
        page: 1,
        limit: 20
      },
      showDetail: false,
      basicLabel: {
        agentCode: '证书ID',
        company: '主域名',
        market: '辅域名',
        level: '域名',
        phone: '产品名称',
        email: '证书状态',
        province: '证书签发时间',
        city: '证书到期时间'
      },
      basicInfo: {
        agentCode: 'safsd',
        company: 'safd',
        market: 'asdfdsf',
        level: 'asdfsadfsd',
        phone: '15110066180',
        email: '',
        province: '北京',
        city: '北京'
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['certificate/queryCertificateList']
    })
  },
  watch: {
    date1: function(val) {
      const v = val || ['', '']
      this.searchForm.applyDateBegin = v[0] ? `${v[0]} 00:00:00` : ''
      this.searchForm.applyDateEnd = v[1] ? `${v[1]} 23:59:59` : ''
    },
    date2: function(val) {
      const v = val || ['', '']
      this.searchForm.takeDateBegin = v[0] ? `${v[0]} 00:00:00` : ''
      this.searchForm.takeDateEnd = v[1] ? `${v[1]} 23:59:59` : ''
    }
  },
  mounted() {
    this.onSearch()
  },
  methods: {
    onSearch(page) {
      const query = {
        ...this.searchForm
      }
      if (page) {
        query.pageNo = page.page
        query.pageSize = page.limit
      } else {
        query.pageNo = 1
        query.pageSize = 20
        this.page.page = 1
        this.page.limit = 20
      }
      this.$store.dispatch('certificate/queryCertificateList', query).then(res => {
        if (!res.code) {
          this.list = res.list
          this.page.total = res.totalRows
        } else {
          this.$message.error(res.msg || res.message)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    onReset() {
      clearFormData(this.searchForm)
      this.date1 = ''
      this.date2 = ''
    },
    handleBack() {
      this.showDetail = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
