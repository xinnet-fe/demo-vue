<template>
  <el-dialog
    title="违规详情"
    :close-on-click-modal="false"
    :visible.sync="dialogDetail"
    width="500px"
    :destroy-on-close="true"
    :append-to-body="true"
    :before-close="beforeClose"
  >
    <el-form ref="form" label-width="120px">
      <el-form-item label="违规域名：">
        {{ row.domainName ? row.domainName : '-' }}
      </el-form-item>
      <el-form-item label="违规信息来源：">
        {{ row.holdSource ? row.holdSource : '-' }}
      </el-form-item>
      <el-form-item label="违规原因：">
        {{ row.holdReason ? row.holdReason : '-' }}
      </el-form-item>
      <el-form-item label="处理办法：">
        {{ row.holdWay ? row.holdWay : '-' }}
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="handleClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogSubmitMaterial',
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
    dialogDetail: {
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
