<template>
  <el-dialog :close-on-click-modal="false" :before-close="beforeClose" destroy-on-close title="账单详情" :visible.sync="formVisible" width="800px" custom-class="dialog-bill-flow">
    <el-descriptions
      :column="2"
      :labels="basicLabel"
      :data="basicInfo"
    />
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="closeModal">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'BillFlowForm',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      basicLabel: {
        productClass: '商品名称',
        billCode: '订单号',
        goodsCode: '商品编号',
        isReturns: '是否退费',
        billLineType: '方式',
        serviceCode: '服务编号',
        billLineType: '交易类型',
        goodsType: '商品类型',
        agentCode: '代理编号',
        spec: '规格',
        operateTime: '操作时间',
        originalPrice: '金额',
        price: '成本价',
        domainName: '域名'
      },
      basicInfo: {
        productClass: '',
        billCode: '',
        goodsCode: '',
        isReturns: '',
        billLineType: '',
        serviceCode: '',
        billLineType: '',
        goodsType: '',
        agentCode: '',
        spec: '',
        operateTime: '',
        originalPrice: '',
        price: '',
        domainName: ''
      }
    }
  },
  computed: {
    ...mapState({
      // loading: state => state.loading.effects['userManager/openAgentUser']
    }),
    formVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    ...mapActions('accountDetail', ['billQuery']),
    closeModal() {
      this.$emit('update:visible', false)
    },
    beforeClose(done) {
      this.closeModal()
    },
    billQueryDetail() {
      const query = {
        agentCode: this.row.agentCode,
        billCode: this.row.orderCode
      }
      this.billQuery(query).then(res => {
        if (!res.code) {
          this.basicInfo.productClass = res.productClass,
          this.basicInfo.billCode = res.billCode,
          this.basicInfo.goodsCode = res.goodsCode,
          this.basicInfo.isReturns = res.isReturns,
          this.basicInfo.billLineType = res.billLineType,
          this.basicInfo.serviceCode = res.serviceCode,
          this.basicInfo.billLineType = res.billLineType,
          this.basicInfo.goodsType = res.goodsType,
          this.basicInfo.agentCode = res.agentCode,
          this.basicInfo.spec = res.timeAmount + (res.timeUnit === 'M' ? '月' : '年'),
          this.basicInfo.operateTime = res.operateTime,
          this.basicInfo.originalPrice = res.originalPrice,
          this.basicInfo.price = res.price,
          this.basicInfo.domainName = res.domainName
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.billQueryDetail()
  }
}
</script>
<style lang="scss">

</style>

