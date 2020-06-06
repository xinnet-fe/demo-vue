<template>
  <div class="info-business-form">
    <el-dialog :before-close="beforeClose" destroy-on-close title="修改级别" :visible.sync="formVisible" width="500px" @open="open">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="设置级别" prop="level" required>
          <el-select v-model="form.level" placeholder="请设置级别">
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
  name: 'LevelForm',
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
        level: ''
      },
      rules: {
        level: [
          { required: true, message: '必须填写！', trigger: 'blur' }
        ]
      },
      options: this.$parent.levelOptions
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
      this.form.level = selected[0].level
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
