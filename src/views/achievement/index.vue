<template>
  <div>
    <el-tabs
      v-model="activeName"
      style="padding: 0 20px;"
      @tab-click="handleTabClick"
    >
      <el-tab-pane v-if="checkPermission(['1'])" label="会员" name="hy">
        <order-hy ref="listhy" :product-type-list="productTypeList" :sale-name-list="saleNameList" :company-list="companyList" :service-status-list="serviceStatusList" :business-type-list="businessTypeList" />
      </el-tab-pane>
      <el-tab-pane v-if="checkPermission(['2'])" label="代理" name="agent">
        <order-agent ref="listagent" :product-type-list="productTypeList" :sale-name-list="saleNameList" :company-list="companyList" :service-status-list="serviceStatusList" :business-type-list="businessTypeList" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import orderHy from './hy.vue'
import orderAgent from './agent.vue'
import checkPermission from '@/utils/demos/permission' // 权限判断函数
export default {
  name: 'Order',
  components: { orderHy, orderAgent },
  data() {
    return {
      activeName: 'hy',
      row: {},
      loadingBtn: false,
      productTypeList: [
        {
          label: '全部',
          value: ''
        }
      ],
      saleNameList: [
      ],
      companyList: [
        {
          label: '全部',
          value: ''
        }
      ],
      serviceStatusList: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '未开通',
          value: '01'
        },
        {
          label: '已开通',
          value: '02'
        },
        {
          label: '开通失败',
          value: '03'
        }
      ],
      businessTypeList: [
        {
          label: '新开',
          value: '新开'
        },
        {
          label: '续费',
          value: '续费'
        },
        {
          label: '升级',
          value: '升级'
        },
        {
          label: '升级新开',
          value: '升级新开'
        },
        {
          label: '升级退费',
          value: '升级退费'
        }
      ]
    }
  },
  computed: {
  },
  created() {
    this.queryProductTypeList()
    this.querySaleNameList()
    this.queryCompanyList()
  },
  mounted() {
    // this.$store.getters.user.permissions.map((v) => {
    //   if (v.indexOf('changeprice') !== Number(-1)) {
    //     this.orderVisible = true
    //   }
    // })
    // this.$store.getters.user.roles.map((i) => {
    //   if (i === '超级管理员') {
    //     this.orderVisible = true
    //   }
    // })
  },
  methods: {
    checkPermission,
    handleTabClick(tab, event) {
      console.log(tab, event)
    },
    queryProductTypeList() {
      this.$store.dispatch('performance/queryProductTypeList', {}).then((res) => {
        res.data.map((v) => {
          this.productTypeList.push(
            {
              label: v,
              value: v
            }
          )
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    querySaleNameList() {
      this.$store.dispatch('performance/querySaleNameList', {}).then((res) => {
        res.data.map((v) => {
          this.saleNameList.push(
            {
              label: v.salesmagFirst,
              value: v.salesmagFirst
            }
          )
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    queryCompanyList() {
      this.$store.dispatch('performance/queryCompanyList', {}).then((res) => {
        res.data.map((v) => {
          this.companyList.push(
            {
              label: v.salesmagCompanyFirst,
              value: v.salesmagCompanyFirst
            }
          )
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
<style scoped>
.order-form{
  padding-left: 0px;
  padding-right: 0px;
}
</style>
