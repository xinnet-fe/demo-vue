<template>
  <el-dialog
    title="注册信息"
    :close-on-click-modal="false"
    :visible.sync="dialogRegInfo"
    width="500px"
    :destroy-on-close="true"
    :append-to-body="true"
    :before-close="beforeClose"
  >
    <el-form ref="form" label-width="120px">
      <el-form-item label="域名：">
        {{ row.domainName ? row.domainName : '-' }}
      </el-form-item>
      <el-form-item label="域名类型：">
        {{ row.domainSuffix ? row.domainSuffix : '-' }}
      </el-form-item>
      <el-form-item label="原码：">
        {{ row.domainPunycode ? row.domainPunycode : '-' }}
      </el-form-item>
      <el-form-item label="注册日期：">
        {{ row.registDate ? row.registDate : '-' }}
      </el-form-item>
      <el-form-item label="修改日期：">
        {{ row.updateDate ? row.updateDate : '-' }}
      </el-form-item>
      <el-form-item label="失效日期：">
        {{ row.expireDate ? row.expireDate : '-' }}
      </el-form-item>
      <el-form-item label="操作时间：">
        {{ row.operateDate ? row.operateDate : '-' }}
      </el-form-item>
      <el-form-item label="注册客户号：">
        {{ row.agentCode ? row.agentCode : '-' }}
      </el-form-item>
      <el-form-item label="DNS：">
        {{ row.dnsName ? row.dnsName : '-' }}
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="handleClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogRegInfo',
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
      form: {
        password: '',
        repassword: '',
        captcha: ''
      },
      loading: false
    }
  },
  computed: {
    dialogRegInfo: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  mounted() {
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    beforeClose(done) {
      this.handleClose()
      done()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
