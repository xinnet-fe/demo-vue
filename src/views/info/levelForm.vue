<template>
  <div class="info-business-form">
    <el-dialog :before-close="beforeClose" destroy-on-close title="修改级别" :visible.sync="formVisible" width="500px" @open="open">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="设置级别" prop="level" required>
          <el-select v-model="form.level" placeholder="请设置级别">
            <el-option v-for="item in allGrade" :key="item.id" :label="item.gradeName" :value="item.id" />
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
import { mapActions, mapState } from 'vuex'
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
      }
    }
  },
  mounted () {

  },
  computed: {
    ...mapState('userManager', ['allGrade']),
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
            type: 'level',
            agentCodes: this.selected.map((v) => {
              return v.agentCode
            }).join(','),
            gradeCode: this.form.level
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
    // setData(selected) {
    //   this.form.level = selected[0].level
    // },
    open() {
      // const selected = this.$parent.multipleSelection
      // if (selected.length === 1) {
      //   this.setData(selected)
      // }
    }
  }
}
</script>
