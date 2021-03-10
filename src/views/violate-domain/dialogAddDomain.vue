<template>
  <el-dialog
    title="录入违规域名"
    :close-on-click-modal="false"
    :visible.sync="dialogAddDomain"
    width="600px"
    :destroy-on-close="true"
    :append-to-body="true"
    :before-close="beforeClose"
  >
    <el-form ref="addDomainForm" :model="addDomainForm" :rules="addDomainForm.rules" label-width="120px">
      <el-form-item label="违规域名" prop="domainNames">
        <el-input v-model="addDomainForm.domainNames" placeholder="请输入违规域名(一行一个域名)" type="textarea" maxlength="300" />
      </el-form-item>

      <el-form-item label="违规信息来源" prop="holdResource">
        <el-input v-model="addDomainForm.holdResource" placeholder="15字以内" maxlength="15" />
      </el-form-item>

      <el-form-item label="违规原因" prop="holdReason">
        <el-input v-model="addDomainForm.holdReason" placeholder="15字以内" maxlength="15" />
      </el-form-item>

      <el-form-item label="处理办法" prop="holdWay">
        <el-input v-model="addDomainForm.holdWay" placeholder="" type="textarea" maxlength="300" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="handleClose">关闭</el-button>
      <el-button type="primary" size="medium" :loading="loadingBtn" @click="handleSubmit">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { isDomain } from '@/utils/isDomain.js'
export default {
  name: 'DialogAddDomain',
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
      loadingBtn: false,
      domainNames: '',
      addDomainForm: {
        domainNames: '',
        holdResource: '',
        holdReason: '',
        holdWay: '',
        rules: {
          domainNames: [
            { required: true, message: '请输入', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                const domains = value.replace(/[\n\r]/g, ',').split(',')
                if (value !== '') {
                  console.log(isDomain('baidu.com'))
                  for (var i = 0; i < domains.length; i++) {
                    if (!isDomain(domains[i])) {
                      callback(new Error('域名格式错误'))
                      break
                    }
                  }
                }
                this.domainNames = domains.join(',')
                callback()
              },
              trigger: 'blur'
            }
          ],
          holdResource: [
            { required: true, message: '请输入', trigger: 'blur' }
          ],
          holdReason: [
            { required: true, message: '请输入', trigger: 'blur' }
          ]
        }
      },
      loading: false
    }
  },
  computed: {
    dialogAddDomain: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  mounted() {
  },
  methods: {
    handleSubmit() {
      this.$refs.addDomainForm.validate((valid) => {
        if (valid) {
          this.loadingBtn = true
          const query = {
            domainNames: this.domainNames,
            holdResource: this.addDomainForm.holdResource,
            holdReason: this.addDomainForm.holdReason,
            holdWay: this.addDomainForm.holdWay
          }
          this.$store.dispatch('violateDomain/createViolateDomain', query).then(res => {
            if (res.code === '0') {
              this.$alert(`<p>成功：${res.successCount}个</p><p>失败：${res.faildCount}个</p>`, '提示', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: '确定',
                callback: () => {
                  this.$emit('refreshList')
                  this.handleClose()
                }
              })
            }
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    handleClose() {
      this.$emit('update:visible', false)
    },
    beforeClose(done) {
      this.handleClose()
      done()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
