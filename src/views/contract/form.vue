<template>
  <div class="contract-form">
    <el-dialog :close-on-click-modal="false" :before-close="beforeClose" destroy-on-close :title="title" :visible.sync="formVisible" width="500px">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="合同编号" prop="contractNo">
          <el-input v-model="form.contractNo" maxlength="100" />
        </el-form-item>
        <el-form-item label="代理编号" prop="agentCode">
          <el-input v-model="form.agentCode" maxlength="50" />
        </el-form-item>
        <el-form-item label="合同类型" prop="contractType">
          <el-select v-model="form.contractType">
            <el-option v-for="item in contractType" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="合同版本" prop="contractVersion">
          <el-select v-model="form.contractVersion">
            <el-option v-for="item in contractVersion" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-tooltip placement="top">
            <div slot="content">• 版本V0，2020年12月代理融合前版本<br>• 版本V1，融合后版本，支持代付模式</div>
            <i style="font-size: 20px" class="el-icon-warning-outline" />
          </el-tooltip>
        </el-form-item>
        <el-form-item label="合同有效期" prop="date">
          <el-date-picker
            v-model="form.date"
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
        <el-button type="primary" :loading="(loading || loading2)" @click="onSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import clearFormData from '@/utils/clearFormData'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'ContractForm',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    contractType: {
      type: Array,
      default() {
        return []
      }
    },
    contractVersion: {
      type: Array,
      default() {
        return []
      }
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
        date: '',
        contractNo: '',
        agentCode: '',
        contractType: '1',
        contractVersion: 'V0',
        startTime: '',
        endTime: ''
      },
      rules: {
        contractNo: [
          { required: true, message: '请填写合同编号！', trigger: 'blur' }
        ],
        agentCode: [
          { required: true, message: '请填写代理编号！', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择！', trigger: 'change' }
        ],
        contractType: [
          { required: true, message: '请选择！', trigger: 'change' }
        ],
        contractVersion: [
          { required: true, message: '请选择！', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['userManager/insertAgentContract'],
      loading2: state => state.loading.effects['userManager/updateAgentContract']
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
  mounted() {
    this.$nextTick(() => {
      console.log(this.row)
      if (this.row.id) {
        this.title = '修改代理合同'
        this.setData(this.row)
      } else {
        this.title = '添加代理合同'
      }
    })
  },
  methods: {
    ...mapActions('userManager', ['updateDlInfomation', 'insertAgentContract', 'updateAgentContract']),
    onSubmit() {
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (valid) {
          this.form.startTime = this.form.date && this.form.date[0] ? `${this.form.date[0]} 00:00:00` : ''
          this.form.endTime = this.form.date && this.form.date[1] ? `${this.form.date[1]} 23:59:59` : ''
          // submit
          if (this.row.id) {
            this.form.id = this.row.id
            this.updateAgentContract(this.form).then(res => {
              if (!res.code) {
                if (res.data.isSuccess === '1') {
                  this.$message.success('修改成功!')
                  this.closeModal()
                  this.$parent.onSearch()
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
            this.insertAgentContract(this.form).then(res => {
              if (!res.code) {
                if (res.data.isSuccess === '1') {
                  this.$message.success('添加成功!')
                  this.closeModal()
                  this.$parent.onSearch()
                } else {
                  this.$message.error(res.msg)
                }
              } else {
                this.$message.error(res.msg)
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
      this.$emit('update:visible', false)
      this.$emit('update:row', {})
      clearFormData(this.form)
    },
    beforeClose(done) {
      this.closeModal()
      done()
    },
    setData(row) {
      const { contractNo, agentCode, contractType, contractVersion } = row
      this.form.contractNo = contractNo
      this.form.agentCode = agentCode
      this.form.contractType = contractType
      this.form.contractVersion = contractVersion
      this.form.date = [row.contractStartTime, row.contractEndTime]
    }
  }
}
</script>
<style lang="scss" scoped>
.contract-form form{
  padding-right: 20px;
}
</style>
