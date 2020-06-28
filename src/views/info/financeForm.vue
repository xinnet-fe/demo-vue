<template>
  <div class="info-business-form">
    <el-dialog :before-close="beforeClose" destroy-on-close title="修改财务归属" :visible.sync="formVisible" width="500px" @open="open">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="选择归属" prop="finance" required>
          <el-select v-model="form.finance" placeholder="请选择归属">
            <el-option v-for="item in queryFinanclAttrList" :key="item.financeCode" :label="item.financeName" :value="item.financeCode" />
          </el-select>
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
import { mapActions, mapState } from 'vuex'
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
    ...mapState('userManager', ['queryFinanclAttrList']),
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
    ...mapActions('userManager', ['batchUpdate']),
    onSubmit() {
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log(this.form)
          // 列表中选中行数据
          console.log(this.selected)
          // submit
          const params = {
            type: 'fince',
            agentCodes: this.selected.map((v) => {
              return v.agentCode
            }).join(','),
            attribution: this.form.finance
          }
          this.batchUpdate(params).then(res => {
            if (!res.code) {
              this.$message.success('修改成功!')
              this.closeModal()
              this.$parent.onSearch()
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
      form.resetFields()
      form.clearValidate('form')
      clearFormData(this.form)
    },
    beforeClose(done) {
      this.closeModal()
      done()
    },
    setData(selected) {
      this.form.finance = selected[0].financeCode
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
