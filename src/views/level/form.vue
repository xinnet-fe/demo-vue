<template>
  <div class="apply-form">
    <el-dialog :before-close="beforeClose" destroy-on-close :title="title" :visible.sync="formVisible" width="500px">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="级别名称" prop="gradleName" ref="gradleName">
          <el-input v-model="form.gradleName" maxlength="20" placeholder="请输入级别名称，限20个字符" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            :rows="3"
            maxlength="500"
            placeholder="请填写备注，限500个字符"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AgentManageLevelForm',
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
      title: '',
      form: {
        gradleName: '',
        remark: ''
      },
      rules: {
        gradleName: [
          { required: true, message: '请填写级别名称!', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['userManager/saveGradleInfo']
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
    ...mapActions('userManager', ['saveGradleInfo', 'updateGradle']),
    onSubmit() {
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log(this.form)
          // 列表中选中行数据
          console.log("==============")
          console.log(this.row.id)
          // submit
          if (this.row.id) {
            this.form.id = this.row.id
            this.form.reMark = this.form.remark
            this.updateGradle(this.form).then(res => {
              if (!res.code) {
                if (res.data.isSuccess === '1') {
                  this.$message.success('处理成功!')
                  this.closeModal()
                  this.$parent.onSearch()
                } else {
                  this.$message.error('处理失败!')
                }
              } else {
                if (res.code === '665030') {
                  this.$refs.gradleName.validateState = 'error'
                  this.$refs.gradleName.validateMessage = res.msg
                }
              }
            }).catch(error => {
              this.$message.error(error)
            })
          } else {
            this.saveGradleInfo(this.form).then(res => {
              if (!res.code) {
                if (res.data.isSuccess === '1') {
                  this.$message.success('处理成功!')
                  this.closeModal()
                  this.$parent.onSearch()
                } else {
                  this.$message.error('处理失败!')
                }
              } else {
                if (res.code === '665030') {
                  this.$refs.gradleName.validateState = 'error'
                  this.$refs.gradleName.validateMessage = res.msg
                }
              }
            }).catch(error => {
              this.$message.error(error)
            })
          }
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
    },
    beforeClose(done) {
      this.closeModal()
      done()
    }
  },
  mounted() {

    if (this.row.id) {
      this.form.gradleName = this.row.gradeName
      this.form.remark = this.row.remark
    }
    this.title = this.row.title
  }
}
</script>
