<template>
  <div class="demo-container">
    <el-descriptions :column="2" :labels="basicLabel" :data="basicInfo" />
  </div>
</template>

<script>
export default {
  components: {
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
  methods: {
    onSubmit() {},
    handleChange() {}
  }
}
</script>
<style scoped>
.box-container{
  border-bottom: 20px solid #f3f7fa;
}
</style>
