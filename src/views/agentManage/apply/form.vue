<template>
  <div class="apply-form">
    <el-dialog :before-close="beforeClose" destroy-on-close title="代理商开通" :visible.sync="formVisible" width="500px">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="选择分公司" prop="company" required>
          <el-select v-model="form.company" placeholder="请选择分公司">
            <el-option label="第一份公司" value="one" />
            <el-option label="第二分公司" value="two" />
          </el-select>
        </el-form-item>
        <el-form-item label="绑定销售" prop="sale" required>
          <el-select v-model="form.sale" placeholder="请绑定销售">
            <el-option label="复兴" value="fuxing" />
            <el-option label="王伟" value="wangwei" />
          </el-select>
        </el-form-item>
        <el-form-item label="设置级别" prop="level" required>
          <el-select v-model="form.level" placeholder="请设置级别">
            <el-option label="普通代理" value="putong" />
            <el-option label="白金代理" value="baijin" />
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
import { mapState } from 'vuex'

export default {
  name: 'AgentManageApplyForm',
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
        company: '',
        sale: '',
        level: ''
      },
      rules: {
        company: [
          { required: true, message: '必须填写！', trigger: 'blur' }
        ],
        sale: [
          { required: true, message: '必须填写！', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '必须填写！', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('agentManage', ['applyList', 'applyPage']),
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
        if (valid) {
          console.log(this.form)
          // 列表中选中行数据
          console.log(this.row)
          // submit
        } else {
          console.log('error submit!!')
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
  }
}
</script>
