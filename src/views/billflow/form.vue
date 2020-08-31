<template>
  <el-dialog :close-on-click-modal="false" :before-close="beforeClose" destroy-on-close title="活动公告" :visible.sync="formVisible" width="800px" custom-class="dialog-bill-flow">
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
import { mapState } from 'vuex'
export default {
  name: 'AgentBillForm',
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
        agentCode: '商品名称',
        company: '订单号',
        market: '商品编号',
        level: '是否退费',
        phone: '产品类型',
        email: '方式',
        province: '服务编号',
        city: '交易类型',
        address: '商品类型',
        address1: '代理编号',
        address2: '规格',
        address3: '操作时间',
        address4: '金额',
        address5: '销售人员',
        address6: '成本价',
        address7: '所属分公司',
        address8: '域名',
        address9: '财务归属'
      },
      basicInfo: {
        agentCode: 'safsd',
        company: 'safd',
        phone: '15110066180',
        email: '',
        province: '北京',
        city: '北京',
        level: '2级',
        market: '商品编号',
        address: '商品类型',
        address1: '代理编号',
        address2: '规格',
        address3: '操作时间',
        address4: '金额',
        address5: '销售人员',
        address6: '成本价',
        address7: '所属分公司',
        address8: '域名',
        address9: '财务归属'
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['userManager/openAgentUser']
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
    closeModal() {
      this.$emit('update:visible', false)
    },
    beforeClose(done) {
      this.closeModal()
    }
  }
}
</script>
<style lang="scss">

</style>

