<template>
  <div class="apply-form">
    <el-dialog :before-close="beforeClose" destroy-on-close title="代理商开通" :visible.sync="formVisible" width="500px">
      <el-form ref="form" :model="form" label-width="180px" :rules="rules">
        <el-form-item label="选择分公司/选择销售" prop="selectedOptions" required>
          <el-cascader
            :options="queryOrganSaleList"
            v-model="form.selectedOptions"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
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
import { mapActions, mapState } from 'vuex'
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
        selectedOptions: [],
        level: ''
      },
      rules: {
        selectedOptions: [
          { required: true, message: '必须填写！', trigger: 'change' }
        ],
        level: [
          { required: true, message: '必须填写！', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['userManager/openAgentUser'],
      queryOrganSaleList (state) {
        // console.log(JSON.stringify(state.userManager.queryOrganSaleList).replace(/(orgCode|ptid)/g, 'value'))
        // return JSON.parse(JSON.stringify(state.userManager.queryOrganSaleList).replace(/(orgCode|ptid)/g, 'value').replace(/(name)/g, 'label'))
        return state.userManager.queryOrganSaleList.map((v) => {
          const item = {
            label: v.name,
            value: v.orgCode
          }
          if (v.salemans && v.salemans.length) {
            item.children = []
            item.children = v.salemans.map((v2) => {
              return {
                label: v2.name,
                value: v2.ptid
              }
            })
          }
          return item
        })
      },
      allGrade (state) {
        return state.userManager.allGrade
      }
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
    ...mapActions('userManager', ['openAgentUser']),
    onSubmit() {
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log(this.form)
          const params = {
            agentCode: this.row.agentCode,
            organCode: this.form.selectedOptions[0],
            gradeCode: this.form.level,
            saleCode: this.form.selectedOptions[1]
          }
          // submit
          this.openAgentUser(params).then(res => {
            if (!res.code) {
              if (res.data.isSuccess === '1') {
                this.$message.success('处理成功!')
                this.closeModal()
                this.$parent.onSearch()
              } else {
                this.$message.error('处理失败!')
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
    },
    beforeClose(done) {
      this.closeModal()
      done()
    },
    handleChange () {

    }
  }
}
</script>
