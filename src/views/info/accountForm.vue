<template>
  <div class="account-form">
    <el-dialog :before-close="beforeClose" destroy-on-close title="修改账号" :visible.sync="formVisible" width="500px">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="手机号" prop="telenumber">
          <el-input v-model="form.telenumber" maxlength="11" />
        </el-form-item>
        <el-form-item label="邮箱" prop="userNameEmail">
          <el-input v-model="form.userNameEmail" maxlength="50" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确定修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import clearFormData from '@/utils/clearFormData'
import isPhone from '@/utils/isPhone'
import isEmail from '@/utils/isEmail'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AccountForm',
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
        agentCode: '',
        telenumber: '',
        userNameEmail: ''
      },
      rules: {
        telenumber: [
          { required: true, message: '必须填写！', trigger: 'blur' },
          { validator: isPhone, message: '格式错误！', trigger: 'blur' }
        ],
        userNameEmail: [
          { required: true, message: '必须填写！', trigger: 'blur' },
          { validator: isEmail, message: '格式错误！', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['userManager/updateDlInfomation']
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
    ...mapActions('userManager', ['updateDlInfomation']),
    onSubmit() {
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (valid) {
          this.form.agentCode = this.row.agentCode
          console.log(this.form)
          // submit
          this.updateDlInfomation(this.form).then(res => {
            if (!res.code) {
              if (res.data.isSuccess === '1') {
                this.$message.success('修改成功!')
                this.closeModal()
                this.$emit('onSearch')
              } else {
                this.$message.error(res.msg)
              }
            } else {
              this.$message.error(res.msg)
            }
          }).catch(error => {
            this.$message.error(error)
          })
        } else {
          return false
        }
      })
    },
    closeModal() {
      const { form } = this.$refs
      this.$emit('update:visible', false)
      this.$emit('update:row', {})
      form.resetFields()
      form.clearValidate('form')
      clearFormData(this.form)
    },
    beforeClose(done) {
      this.closeModal()
      done()
    },
    setData(row) {
      const { phone, email } = row
      this.form.phone = phone
      this.form.email = email
    }
  },
  mounted () {
    // this.form.telenumber = this.row.
  }
}
</script>
<style lang="scss" scoped>
.account-form form{
  padding-right: 20px;
}
</style>
