<template>
  <div class="contract-form">
    <el-dialog :close-on-click-modal="false" :before-close="beforeClose" destroy-on-close :title="title" :visible.sync="formVisible" width="500px">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="合同编号" prop="telenumber">
          <el-input v-model="form.telenumber" maxlength="11" />
        </el-form-item>
        <el-form-item label="代理编号" prop="userNameEmail">
          <el-input v-model="form.userNameEmail" maxlength="50" />
        </el-form-item>
        <el-form-item label="合同类型">
          <el-select v-model="form.type">
            <el-option v-for="item in memberType" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="合同版本">
          <el-select v-model="form.ver">
            <el-option v-for="item in memberType" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-tooltip placement="top">
            <div slot="content">多行信息<br>第二行信息</div>
            <i style="font-size: 20px" class="el-icon-warning-outline" />
          </el-tooltip>
        </el-form-item>
        <el-form-item label="合同有效期" prop="userNameEmail">
          <el-date-picker
            v-model="daterange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
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
import clearFormData from '@/utils/clearFormData'
import isPhone from '@/utils/isPhone'
import isEmail from '@/utils/isEmail'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'ContractForm',
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
      daterange: '',
      title: '',
      form: {
        agentCode: '',
        telenumber: '',
        userNameEmail: '',
        type: '',
        ver: '',
        dateBegin: '',
        dateEnd: ''
      },
      memberType: [
        { label: '代理编号', value: 'agentCode' },
        { label: '手机号', value: 'telenumber' },
        { label: '邮箱', value: 'userNameEmail' },
        { label: '联系人', value: 'organizeNameCn' }
      ],
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
  watch: {
    daterange(val) {
      if (val && val.length === 2) {
        this.form.dateBegin = val[0]
        this.form.dateEnd = val[1]
      }
      console.log(this.form)
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.row)
      if (this.row.id) {
        this.title = '修改代理合同'
      } else {
        this.title = '添加代理合同'
      }
      this.setData(this.row)
    })
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
      const { telenumber, userNameEmail } = row
      this.form.telenumber = telenumber
      this.form.userNameEmail = userNameEmail
    }
  }
}
</script>
<style lang="scss" scoped>
.contract-form form{
  padding-right: 20px;
}
</style>
