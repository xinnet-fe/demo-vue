<template>
  <div>
    <div v-show="!showDetail" class="order-form">
      <!-- search -->
      <el-form ref="searchForm" class="search-form" :model="searchForm" :inline="true">
        <el-form-item label="流水号">
          <el-input v-model="searchForm.certUnique" />
        </el-form-item>
        <el-form-item label="所属账号">
          <el-input v-model="searchForm.agentCode" />
        </el-form-item>
        <el-form-item label="域名">
          <el-input v-model="searchForm.commonName" />
        </el-form-item>
        <el-form-item label="证书ID">
          <el-input v-model="searchForm.certId" />
        </el-form-item>
        <el-form-item label="服务编号">
          <el-input v-model="searchForm.serviceCode" />
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="searchForm.orderCode" />
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
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="date2"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="到期时间">
          <el-date-picker
            v-model="date3"
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
        ref="multipleTable"
        v-loading="loading"
        :data="list"
        style="width: 100%"
      >
        <el-table-column
          prop="certUnique"
          label="流水号"
        />
        <el-table-column
          prop="agentCode"
          label="账号"
        />
        <el-table-column
          prop="certId"
          label="证书ID"
        />

        <el-table-column
          prop="createDate"
          label="申请时间"
        />
        <el-table-column
          prop="beginDate"
          label="开始时间"
        />
        <el-table-column
          prop="endDate"
          label="结束时间"
        />
        <el-table-column
          prop="price"
          label="价格"
        />
        <el-table-column
          prop="orderCode"
          label="订单号"
        />
        <el-table-column
          prop="serviceCode"
          label="服务编号"
        />
        <el-table-column
          prop="productType"
          label="证书类型"
        />
        <el-table-column
          prop="domainLen"
          label="域名数量"
        />
        <el-table-column
          label="证书状态"
        >
          <template v-slot="scope">
            {{ sslDomainStatus[scope.row.status] }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="60px"
          label="操作"
        >
          <template v-slot="scope">
            <el-button type="text" size="mini" @click="handleDetail(scope.row)">详情</el-button>
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
        <el-descriptions :column="1" :labels="basicLabel" :data="basicInfo" style="margin-bottom: 20px;" />
        <Box type="2">
          <div slot="tit-left">历史记录详情</div>
          <div slot="tit-right" />
          <div slot="cont">
            <el-table
              :data="tableData"
              style="width: 100%"
            >
              <el-table-column
                prop="operateDate"
                label="操作时间"
                width="180"
              />
              <el-table-column
                prop="operateType"
                label="操作类型"
                width="180"
              />
              <el-table-column
                prop="operateContent"
                label="操作内容"
              />
              <el-table-column
                prop="operateCode"
                label="操作账号"
              />
            </el-table>
          </div>
        </Box>
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
import Box from '@/components/Box'
export default {
  name: 'RuichengList',
  components: {
    Pagination,
    elDescriptions,
    Detail,
    Box
  },
  props: {},
  data() {
    return {
      searchForm: {
        certUnique: '',
        serviceCode: '',
        commonName: '',
        certId: '',
        orderCode: '',
        agentCode: '',
        productType: '',
        status: '',
        applyDateBegin: '',
        applyDateEnd: '',
        takeDateBegin: '',
        takeDateEnd: '',
        expiredDateBegin: '',
        expiredDateEnd: '',
        pageNo: 1,
        pageSize: 20
      },
      date1: '',
      date2: '',
      date3: '',
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
      sslDomainStatus: {
        'PENDING': '申请中',
        'COMPLETE': '申请成功',
        'CANCELLED': '已取消',
        'REISSUED': '重签'
      },
      status: {
        'nogoing': '待验证',
        'verified': '验证通过'
      },
      showDetail: false,
      basicLabel: {
        certUnique: '流水号',
        agentCode: '账号',
        certId: '证书Id',
        domainName: '域名',
        years: '年限',
        beginDate: '开始时间',
        endDate: '结束时间',
        createDate: '申请时间',
        orderCode: '订单号',
        productType: '证书类型',
        domainLen: '域名数量',
        dcvDnsHost: '解析主机头',
        dcvDnsValue: '解析值',
        status: '解析是否验证',
        sslDomainStatus: '证书状态'
      },
      basicInfo: {
        certUnique: '',
        agentCode: '',
        certId: '',
        domainName: '',
        years: '',
        beginDate: '',
        endDate: '',
        createDate: '',
        orderCode: '',
        productType: '',
        domainLen: '',
        dcvDnsHost: '',
        dcvDnsValue: '',
        status: ''
      },
      tableData: []
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['certificate/querySslList']
    })
  },
  watch: {
    date2: function(val) {
      const v = val || ['', '']
      this.searchForm.applyDateBegin = v[0] ? `${v[0]} 00:00:00` : ''
      this.searchForm.applyDateEnd = v[1] ? `${v[1]} 23:59:59` : ''
    },
    date1: function(val) {
      const v = val || ['', '']
      this.searchForm.takeDateBegin = v[0] ? `${v[0]} 00:00:00` : ''
      this.searchForm.takeDateEnd = v[1] ? `${v[1]} 23:59:59` : ''
    },
    date3: function(val) {
      const v = val || ['', '']
      this.searchForm.expiredDateBegin = v[0] ? `${v[0]} 00:00:00` : ''
      this.searchForm.expiredDateEnd = v[1] ? `${v[1]} 23:59:59` : ''
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
      this.$store.dispatch('certificate/querySslList', query).then(res => {
        if (!res.code) {
          this.list = res.data.list
          this.page.total = res.data.totalRows
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
      this.date3 = ''
    },
    handleBack() {
      this.showDetail = false
    },
    handleDetail(row) {
      this.showDetail = true
      this.$store.dispatch('certificate/findSSlNewByCertId', { certId: row.certId }).then(res => {
        if (!res.code) {
          this.basicInfo.certUnique = res.data.certificateNew.certUnique
          this.basicInfo.agentCode = res.data.certificateNew.agentCode
          this.basicInfo.certId = res.data.certificateNew.certId
          this.basicInfo.domainName = res.data.certificateNew.domainName
          this.basicInfo.years = res.data.certificateNew.years
          this.basicInfo.beginDate = res.data.certificateNew.beginDate
          this.basicInfo.endDate = res.data.certificateNew.endDate
          this.basicInfo.createDate = res.data.certificateNew.createDate
          this.basicInfo.orderCode = res.data.certificateNew.orderCode
          this.basicInfo.productType = res.data.certificateNew.productType
          this.basicInfo.domainLen = res.data.certificateNew.domainLen
          this.basicInfo.dcvDnsHost = res.data.certificateNew.dcvDnsHost
          this.basicInfo.dcvDnsValue = res.data.certificateNew.dcvDnsValue
          this.basicInfo.status = this.status[res.data.certificateNew.status]
          this.basicInfo.sslDomainStatus = this.sslDomainStatus[res.data.certificateNew.sslDomainStatus]
          this.tableData = res.data.SSLRecordsList
        } else {
          this.$message.error(res.msg || res.message)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-container{
  margin: 0 -20px;
}
</style>
