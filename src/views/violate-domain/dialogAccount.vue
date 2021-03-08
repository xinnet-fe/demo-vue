<template>
  <el-dialog
    title="账号信息"
    :close-on-click-modal="false"
    :visible.sync="dialogAccount"
    width="600px"
    :destroy-on-close="true"
    :append-to-body="true"
    :before-close="beforeClose"
  >
    <el-form ref="form" label-width="150px">
      <el-form-item label="会员编号：">
        {{ row.agentCode ? row.agentCode : '-' }}
      </el-form-item>
      <el-form-item label="单位（个人）名称：">
        {{ row.organizeNameCn ? row.organizeNameCn : '-' }}
      </el-form-item>
      <el-form-item label="区域：">
        {{ row.area ? row.area : '-' }}
      </el-form-item>
      <el-form-item label="通讯地址：">
        {{ row.publicStreetCn ? row.publicStreetCn : '-' }}
      </el-form-item>
      <el-form-item label="实名制状态：">
        {{ row.authenticateFlag ? row.authenticateFlag : '-' }}
      </el-form-item>
      <el-form-item label="手机号码：">
        {{ row.agentMobileNumber ? row.agentMobileNumber : '-' }}
      </el-form-item>
      <el-form-item label="电话号码：">
        -
      </el-form-item>
      <el-form-item label="传真号码：">
        {{ row.agentCode ? row.agentCode : '-' }}
      </el-form-item>
      <el-form-item label="联系人：">
        {{ row.userNameCn ? row.userNameCn : '-' }}
      </el-form-item>
      <el-form-item label="联系邮箱账号：">
        {{ row.userEmail ? row.userEmail : '-' }}
      </el-form-item>
      <el-form-item label="绑定邮箱账号：">
        {{ row.agentEmail ? row.agentEmail : '-' }}
      </el-form-item>
      <el-form-item label="注册日期：">
        {{ row.applyDate ? row.applyDate : '-' }}
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="handleClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogAccount',
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
    dialogAccount: {
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
