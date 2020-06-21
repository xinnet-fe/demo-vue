<template>
  <div class="apply-form">
    <el-dialog :before-close="beforeClose" destroy-on-close title="添加级别" :visible.sync="formVisible" width="500px">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="级别名称" prop="levelName" required>
          <el-input v-model="form.levelName" placeholder="请输入级别名称，限20个字符" />
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            v-model="form.remarks"
            type="textarea"
            :rows="3"
            placeholder="请填写备注，限500个字符"
          />
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
import { within20Len, within500Len } from '@/utils/textLength'

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
      form: {
        levelName: '',
        remarks: ''
      },
      rules: {
        levelName: [
          { required: true, message: '必须填写！', trigger: 'blur' },
          { validator: within20Len, trigger: 'blur' }
        ],
        remarks: [
          { validator: within500Len, trigger: 'blur' }
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
  },
  mounted() {
    if (this.row.levelId) {
      this.form.levelName = this.row.levelName
      this.form.remarks = this.row.remarks
    }
  }
}
</script>
