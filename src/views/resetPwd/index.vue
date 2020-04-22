<template>
  <el-dialog title="修改密码" :before-close="beforeClose" :visible="visible">
    <el-form :model="form">
      <el-form-item label="旧密码" :label-width="formLabelWidth">
        <el-input v-model="form.oldpassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="新密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认新密码" :label-width="formLabelWidth">
        <el-input v-model="form.confirmPassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="短信验证码" :label-width="formLabelWidth">
        <el-input v-model="form.verifcode" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleClose">保 存</el-button>
    </div>
  </el-dialog>

</template>

<script>
export default {
  name: 'ResetPwd',
  desc: '重置密码',
  props: {
    visible: Boolean
  },
  data() {
    return {
      form: {
        name: '',
        region: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleClose(e) {
      this.$emit('update:visible', false)
    },
    // 手动关闭
    beforeClose(done) {
      this.handleClose()
      done()
    }
  }
}
</script>

<style scoped>
.reset-pwd {
  padding: 20px;
}
</style>
