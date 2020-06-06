<template>
  <div class="info-business-form">
    <el-dialog :before-close="beforeClose" destroy-on-close title="修改账号" :visible.sync="formVisible" width="500px">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
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
        phone: '',
        email: ''
      },
      rules: {
        phone: [
          { required: true, message: '必须填写！', trigger: 'change' },
          { validator: isPhone, trigger: 'change' }
        ],
        email: [
          { required: true, message: '必须填写！', trigger: 'change' },
          { validator: isEmail, trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    formVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  watch: {
    row(o) {
      this.setData(o)
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log(this.form)
          // 列表中选中行数据
          console.log(this.row)
          // submit
          this.$message.success('修改成功!')
          this.closeModal()
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
  }
}
</script>
