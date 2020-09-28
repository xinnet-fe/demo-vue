<template>
  <div class="dialogBindClient">
    <p class="p1">您代理专属连接：</p>
    <el-form ref="form1" label-width="0px">
      <el-form-item label="">
        <pre>{{ links }}</pre>
        <el-button v-clipboard:copy="links" v-clipboard:success="clipboardSuccess" type="primary" size="medium" class="btnCopy">复制连接</el-button>
      </el-form-item>
    </el-form>
    <p class="p1">您可以分享专属连接或者在下方输入客户邮箱地址通过新网发送专属连接</p>
    <el-form ref="form2" :model="form2" label-width="50px" :rules="formRules2">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form2.email" placeholder="请输入客户电子邮箱地址" />
        <el-button type="primary" size="medium" :loading="loading" @click="sendEmail">发送</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import clip from '@/utils/demos/clipboard' // use clipboard directly
import clipboard from '@/directive/demos/clipboard/index.js' // use clipboard by v-directive
import isEmail from '@/utils/isEmail'
import { mapState } from 'vuex'
export default {
  name: 'BindClient',
  directives: {
    clipboard
  },
  props: {},
  data() {
    return {
      links: '',
      form2: {
        email: ''
      },
      formRules2: {
        email: [
          { required: true, message: '请输入客户电子邮箱地址', trigger: 'blur' },
          { validator: isEmail, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['userinfo/sendEmail'],
      user: state => state.usercommon.user
    })
  },
  created() {

  },
  mounted() {
    this.links = `https://console.xinnet.com/agent/inviteReg.html?agentCode=${this.user.agentCode}`
  },
  methods: {
    sendEmail() {
      this.$refs.form2.validate((valid) => {
        if (valid) {
          const query = {
            userEmail: this.form2.email,
            invitedUrl: this.links
          }
          this.$store.dispatch('userinfo/sendEmail', query).then((response) => {
            if (response.data.isSuccess === '1') {
              this.$message({
                message: '发送成功',
                type: 'success',
                duration: 1500
              })
              setTimeout(() => {
                this.$emit('search')
                this.$emit('close')
              }, 1500)
            }
          }).catch((error) => {
            console.error(error)
          })
        }
      })
    },
    clipboardSuccess() {
      this.$message({
        message: '复制成功',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.dialogBindClient .el-button{
  float: none;
}
.dialogBindClient pre{
  background: #eaeaea;
  border: 1px solid #aaa;
  border-radius: 5px;
  padding: 0 5px;
  margin: 0 0 10px 0;
}
</style>
