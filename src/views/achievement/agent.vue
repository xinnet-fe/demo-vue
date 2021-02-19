<template>
  <div class="order-form">
    <el-form ref="searchForm" class="search-form" :inline="true">
      <el-form-item label="会员ID">
        <el-input
          v-model="form.id"
          placeholder="请输入会员ID"
        />
      </el-form-item>
      <el-form-item label="支付时间">
        <el-date-picker
          v-model="date"
          type="daterange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="defaultTime"
          :picker-options="pickerOptions"
          :clearable="false"
          :editable="false"
        />
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input
          v-model="form.name"
          placeholder="请输入商品名称"
        />
      </el-form-item>
      <el-form-item label="服务状态">
        <el-select
          v-model="form.state"
          placeholder="请选择订单类型"
          clearable
        >
          <el-option
            v-for="item in businessType"
            :key="item.num"
            :label="item.name"
            :value="item.num"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="分公司" />
      <el-form-item label="销售负责人">
        <el-cascader
          v-model="selectedOptions"
          :clearable="true"
          :change-on-select="true"
          :options="organSaleList"
        />
      </el-form-item>
      <el-form-item label="产品分类">
        <el-cascader
          v-model="cate"
          :props="props"
          :options="options"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="medium"
          :loading="loading"
          @click="getList"
        >查询</el-button>
        <el-button size="medium" @click="resetModal">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- operate -->
    <el-form ref="operateForm" class="operate-form" :inline="true">
      <el-form-item>
        <el-button
          size="mini"
          :loading="downloadLoading"
          @click="handleDownload"
        >导出</el-button>
      </el-form-item>
    </el-form>
    <!-- operate -->

    <el-table
      ref="dragTable"
      v-loading="loading"
      :data="list"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="会员id">
        <template slot-scope="{ row }">
          <span>{{ row.buyOrderCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称">
        <template slot-scope="{ row }">
          <span>{{ row.supProductClassa }}</span>
        </template>
      </el-table-column>

      <el-table-column label="服务编号">
        <template slot-scope="{ row }">
          <span>{{ row.goodsName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="订单号">
        <template slot-scope="{ row }">
          <span v-html="row.goodsContent" />
        </template>
      </el-table-column>

      <el-table-column label="商品类型">
        <template slot-scope="{ row }">
          <span>{{
            row.createTime | parseTime("{y}-{m}-{d} {h}:{i}:{s}")
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="产品分类">
        <template slot-scope="{ row }">
          <span>{{ row.agentCode }}</span>
        </template>
      </el-table-column>

      <el-table-column label="商品价格">
        <template slot-scope="{ row }">
          <span>￥{{ row.totalOriginalPrices }}</span>
        </template>
      </el-table-column>

      <el-table-column label="订单方式">
        <template slot-scope="{ row }">
          <span>￥{{ row.totalTradingPrices }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付成功时间">
        <template slot-scope="{ row }">
          <span>{{ row.businessType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否退费">
        <template slot-scope="{ row }">
          <span>{{ row.orderStatusa }}</span>
        </template>
      </el-table-column>
      <el-table-column label="交易类型">
        <template slot-scope="{ row }">
          <span>{{ row.orderStatusa }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年限">
        <template slot-scope="{ row }">
          <span>{{ row.orderStatusa }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年限单位">
        <template slot-scope="{ row }">
          <span>{{ row.orderStatusa }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售负责人1">
        <template slot-scope="{ row }">
          <span>{{ row.orderStatusa }}</span>
        </template>
      </el-table-column>
      <el-table-column label="负责人1所属分公司">
        <template slot-scope="{ row }">
          <span>{{ row.orderStatusa }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售负责人2">
        <template slot-scope="{ row }">
          <span>{{ row.orderStatusa }}</span>
        </template>
      </el-table-column>
      <el-table-column label="负责人2所属分公司">
        <template slot-scope="{ row }">
          <span>{{ row.orderStatusa }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品状态">
        <template slot-scope="{ row }">
          <span>{{ row.orderStatusa }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成单类型">
        <template slot-scope="{ row }">
          <span>{{ row.orderStatusa }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="100"
        fixed="right"
      >
        <template slot-scope="{ row }">
          <el-button
            style="color: #0069ff"
            type="text"
            size="small"
            @click="getDetail(row.buyOrderCode)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="page.total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Pagination from '@/components/demos/Pagination' // secondary package based on el-pagination
import clearFormDate from '@/utils/clearFormData'
export default {
  name: 'AchievementAgent',
  components: { Pagination },
  filters: {
  },
  props: {
    downloadLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        id: '',
        name: '',
        organCode: '',
        userCode: '',
        startDate: '',
        endDate: ''
      },
      list: [],
      page: {
        total: 0,
        page: 0,
        limit: 20
      },
      date: '',
      defaultTime: ['00:00:00', '23:59:59'],
      cate: '',
      props: {
        multiple: true
        // checkStrictly: true
      },
      options: [],
      selectedOptions: [],
      organSaleList: [],
      businessType: [],
      choiceDate: '',
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.choiceDate = minDate.getTime()
          if (maxDate) {
            this.choiceDate = ''
          }
        },
        disabledDate: (time) => {
          if (this.choiceDate !== '') {
            const one = 90 * 24 * 3600 * 1000
            const minTime = this.choiceDate - one
            const maxTime = this.choiceDate + one
            return time.getTime() < minTime || time.getTime() > maxTime
          }
        }
      }
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading.effects['tradeOrder/orderList']
    }),
    ...mapGetters([
      'user'
    ])
    // orderVisible(state) {
    //   let flag = false
    //   this.user.permissions.map((v) => {
    //     if (v.indexOf('changeprice') !== Number(-1)) {
    //       flag = true
    //     }
    //   })
    //   this.user.roles.map((i) => {
    //     if (i === '超级管理员') {
    //       flag = true
    //     }
    //   })
    //   return flag
    // }
  },
  watch: {
    date: function(val) {
      const v = val || ['', '']
      this.form.startDate = v[0] ? `${v[0]}` : ''
      this.form.endDate = v[1] ? `${v[1]}` : ''
    },
    selectedOptions: function(val) {
      const v = val || ['', '']
      this.form.organCode = v[0] ? `${v[0]}` : ''
      this.form.userCode = v[1] ? `${v[1]}` : ''
    },
    value: function(val) {
      console.log(val)
      const v = [[], []]
      if (val.length) {
        val.forEach((v2) => {
          // 查重
          if (v[0].indexOf(v2[0]) < 0) {
            v[0].push(v2[0])
          }
          //
          if (v2[1]) {
            v[1].push(v2[1])
          }
        })
      }
      this.form.supProductClass = v[0].length ? v[0].join(',') : ''
      this.form.productClass = v[1].length ? v[1].join(',') : ''
    }
  },
  created() {
    this.resetDate()
  },
  mounted() {
    this.$nextTick(() => {
    })
  },
  methods: {
    resetDate() {
      const dt1 = new Date()
      dt1.setDate(dt1.getDate() - 90) // 默认为最近90天
      const dt2 = new Date()
      this.date = [
        this.$moment(dt1).format('YYYY-MM-DD HH:mm:ss'),
        this.$moment(dt2).format('YYYY-MM-DD HH:mm:ss')
      ]
    },
    getList() {
      console.log(this.form)
      // return false
      this.$store
        .dispatch('tradeOrder/orderList', this.listQuery)
        .then((res) => {
          res.data.list.map((row) => {
            if (row.supProductClass) {
              // const supProductClass = row.supProductClass.substring(row.supProductClass.lastIndexOf('_') + 1)
              if (row.supProductClass === 'D') {
                row.supProductClassa = '域名'
              } else if (row.supProductClass === 'V') {
                row.supProductClassa = '虚机'
              } else if (row.supProductClass === 'M') {
                row.supProductClassa = '邮局'
              } else if (row.supProductClass === 'W') {
                row.supProductClassa = '建站'
              } else if (row.supProductClass === 'A') {
                row.supProductClassa = '应用'
              } else if (row.supProductClass === 'S') {
                row.supProductClassa = '服务产品'
              } else if (row.supProductClass === 'Z') {
                row.supProductClassa = '租用托管'
              } else if (row.supProductClass === 'E') {
                row.supProductClassa = '轻应用服务器'
              } else if (row.supProductClass === 'N') {
                row.supProductClassa = '云产品'
              } else if (row.supProductClass === 'C') {
                row.supProductClassa = '云产品(老)'
              }
            }
            if (row.businessType) {
              row.businessTypes =
                row.businessType === 'N'
                  ? '新开'
                  : row.businessType === 'R'
                    ? '续费'
                    : row.businessType === 'U'
                      ? '升级'
                      : ''
            }
            if (row.goodsPaytype) {
              row.goodsPaytypes =
                row.goodsPaytype === '01' ? '包年包月' : '单次'
            }
            if (row.orderStatus) {
              if (row.orderStatus === '1') {
                row.orderStatusa = '待支付'
              } else if (row.orderStatus === '2') {
                row.orderStatusa = '支付中'
              } else if (row.orderStatus === '3') {
                row.orderStatusa = '已取消'
              } else if (row.orderStatus === '4') {
                row.orderStatusa = '支付成功'
              } else if (row.orderStatus === '5') {
                row.orderStatusa = '支付失败'
              } else if (row.orderStatus === '6') {
                row.orderStatusa = '已支付'
              }
            }
            if (row.totalOriginalPrice) {
              row.totalOriginalPrices = this.shuzi(
                row.totalOriginalPrice.toFixed(2)
              )
            }
            if (row.totalTradingPrice || row.totalTradingPrice === 0) {
              row.totalTradingPrices = this.shuzi(
                row.totalTradingPrice.toFixed(2)
              )
            }
            row.link = `/order-detail/index?id=${row.buyOrderCode}&showLayout=false`
          })
          this.list = res.data.list
          this.total = res.data.total
        })
        .catch((error) => {
          console.log(error)
        })
    },
    resetModal() {
      clearFormDate(this.listQuery)
      this.resetDate()
    },
    handleDownload() {
      this.$emit('download', this.listQuery)
    }
  }
}
</script>
