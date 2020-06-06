<template>
  <div class="info-business-form">
    <el-dialog :before-close="beforeClose" destroy-on-close title="修改财务归属" :visible.sync="formVisible" width="500px" @open="open">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="选择归属" prop="finance" required>
          <el-select v-model="form.finance" placeholder="请绑定销售">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确定开通</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import clearFormData from '@/utils/clearFormData'

export default {
  name: 'FinanceForm',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      form: {
        finance: ''
      },
      rules: {
        finance: [
          { required: true, message: '必须填写！', trigger: 'blur' }
        ]
      },
      options: this.$parent.financeOptions
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
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log(this.form)
          // 列表中选中行数据
          console.log(this.selected)
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
      form.resetFields()
      form.clearValidate('form')
      clearFormData(this.form)
    },
    beforeClose(done) {
      this.closeModal()
      done()
    },
    setData(selected) {
      this.form.finance = selected[0].finance
    },
    open() {
      const selected = this.$parent.multipleSelection
      if (selected.length === 1) {
        this.setData(selected)
      }
    }
  }
}
</script>
