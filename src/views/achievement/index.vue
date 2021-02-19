<template>
  <div>
    <el-tabs
      v-model="activeName"
      style="padding: 0 20px;"
      @tab-click="handleTabClick"
    >
      <el-tab-pane label="会员" name="hy">
        <order-hy ref="listhy" @download="handleDownload" />
      </el-tab-pane>
      <el-tab-pane label="代理" name="agent">
        <order-agent ref="listagent" @download="handleDownload" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import orderHy from './hy.vue'
import orderAgent from './agent.vue'
export default {
  name: 'Order',
  components: { orderHy, orderAgent },
  data() {
    return {
      activeName: 'hy',
      row: {},
      loadingBtn: false,
      downloadLoading: false
    }
  },
  computed: {
  },
  created() {
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
    handleTabClick(tab, event) {
      console.log(tab, event)
    },
    handleBack() {
      this.showDetail = false
    },
    handleDownload(query) {
      this.downloadLoading = true
      this.$store
        .dispatch('tradeOrder/orderList', query)
        .then((res) => {
          this.downloadLoading = false
          if (res.data.list.length) {
            if (res.data.total < 60000) {
              const str = this.getUrlparam(query)
              window.open(
                window.location.origin + '/boss/tradeOrder/exportExecl?' + str
              )
            } else {
              this.dialogLogout = true
              this.shows = 60000
            }
          } else {
            this.dialogLogout = true
            this.shows = 0
          }
        })
        .catch((error) => {
          this.downloadLoading = false
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
