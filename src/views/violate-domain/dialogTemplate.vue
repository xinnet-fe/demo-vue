<template>
  <el-dialog
    title="实名模板"
    :close-on-click-modal="false"
    :visible.sync="dialogTemplate"
    width="800px"
    :destroy-on-close="true"
    :append-to-body="true"
    :before-close="beforeClose"
  >
    <el-form ref="form" label-width="200px">
      <el-form-item label="模板名称：">
        {{ row.templateName ? row.templateName : '-' }}
      </el-form-item>
      <el-form-item label="用户类型：">
        {{ row.userType ? row.userType : '-' }}
      </el-form-item>
      <el-form-item label="证件类型：">
        {{ row.idType ? row.idType : '-' }}
      </el-form-item>
      <el-form-item label="注册所有人：">
        {{ row.organizeNameCn ? row.organizeNameCn : '-' }}
      </el-form-item>
      <el-form-item label="联系人名称：">
        {{ row.userNameCn ? row.userNameCn : '-' }}
      </el-form-item>
      <el-form-item label="联系人名称（英文）：">
        {{ row.userNameUk ? row.userNameUk : '-' }}
      </el-form-item>
      <el-form-item label="注册所有人（英文）：">
        {{ row.organizeNameUk ? row.organizeNameUk : '-' }}
      </el-form-item>
      <el-form-item label="国家：">
        {{ row.publicCountryCn ? row.publicCountryCn : '-' }}
      </el-form-item>
      <el-form-item label="省份：">
        {{ row.publicProvinceCn ? row.publicProvinceCn : '-' }}
      </el-form-item>
      <el-form-item label="城市：">
        {{ row.publicCityCn ? row.publicCityCn : '-' }}
      </el-form-item>
      <el-form-item label="通信地址：">
        {{ row.publicStreetCn ? row.publicStreetCn : '-' }}
      </el-form-item>
      <el-form-item label="通信地址（英文）：">
        {{ row.publicStreetUk ? row.publicStreetUk : '-' }}
      </el-form-item>
      <el-form-item label="邮编：">
        {{ row.publicZipCode ? row.publicZipCode : '-' }}
      </el-form-item>
      <el-form-item label="电话：">
        {{ row.userPhone ? row.userPhone : '-' }}
      </el-form-item>
      <el-form-item label="传真：">
        {{ row.userFax ? row.userFax : '-' }}
      </el-form-item>
      <el-form-item label="电子邮箱：">
        {{ row.userEmail ? row.userEmail : '-' }}
      </el-form-item>
      <el-form-item label="审核状态：">
        {{ row.verifyStatus ? row.verifyStatus : '-' }}
      </el-form-item>
      <el-form-item label="操作人：">
        {{ row.operator ? row.operator : '-' }}
      </el-form-item>
      <el-form-item label="资料审核日期：">
        {{ row.verifyDate ? row.verifyDate : '-' }}
      </el-form-item>
      <el-form-item label="注册所有人证件号码：">
        {{ row.idCode ? row.idCode : '-' }}
      </el-form-item>
      <el-form-item label="企业营业执照或组织机构代码证：">
        <img v-if="row.idPath" width="100%" :src="row.idPath" alt="">
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="handleClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogTemplate',
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
        password: '',
        repassword: '',
        captcha: ''
      },
      loading: false
    }
  },
  computed: {
    dialogTemplate: {
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
