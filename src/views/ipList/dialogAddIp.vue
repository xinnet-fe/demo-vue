<template>
  <el-dialog
    :title="title"
    class="dialogAddIp"
    :append-to-body="true"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    width="550px"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="代理编号：" prop="agentCode">
        <el-input v-model="form.agentCode" maxlength="50" placeholder="请输入代理编号" :disabled="(row.agentCode && row.agentCode.length > 0)" style="width:260px" />
      </el-form-item>
      <el-form-item label="IP地址：" prop="ip">
        <el-input v-model="form.ip" maxlength="15" placeholder="请输入节点ip地址，多节点用 - 分隔" style="width:260px" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="form.password" maxlength="50" style="width:260px" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="handleClose">取 消</el-button>
      <el-button type="primary" size="medium" :loading="loading" @click="handleSubmit()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>

import isValidIp from '@/utils/isValidIp.js'
import isPassword from '@/utils/isPassword.js'
export default {
  components: {

  },
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
      title: '添加接入IP',
      loading: false,
      mobile: '',
      form: {
        ip: '',
        password: '',
        agentCode: ''
      },
      success: false,
      downTime: 60,
      rules: {
        ip: [
          { required: true, message: '请输入IP', trigger: 'blur' },
          { validator: isValidIp, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: isPassword, trigger: 'blur' }
        ],
        agentCode: [
          { required: true, message: '请输入代理编号', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  mounted() {
    if (this.row.id) {
      this.form.ip = this.row.apiIp
      this.form.agentCode = this.row.agentCode
      this.form.password = this.row.password
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (valid) {
          this.loading = true
          // this.form.ip = this.form.ip.replace(/\./g, '-')
          if (this.row.id) {
            this.form.id = this.row.id
            this.$store.dispatch('apiApply/modifySettingById', this.form).then(res => {
              this.loading = false
              if (!res.code && res.data.isSuccess === 1) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.handleClose()
                this.$emit('refresh')
              } else {
                this.$message.error(res.msg)
              }
            }).catch(error => {
              this.loading = false
              console.log(error)
            })
          } else {
            this.$store.dispatch('apiApply/addApiAuthIp', this.form).then(res => {
              this.loading = false
              if (!res.code && res.data.isSuccess === 1) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.handleClose()
                this.$emit('refresh')
              } else {
                this.$message.error(res.msg)
              }
            }).catch(error => {
              this.loading = false
              console.log(error)
            })
          }
        }
      })
    },
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialogAddIp{
  .inputIp{
    width: 55px;
  }
}
</style>
