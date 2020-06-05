<template>
  <div>
    <agent-header></agent-header>
    <div class="main-body">
      <el-form class="step1" v-show="step === 1" ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0px">
        <h3>接受代理邀请</h3>
        <el-form-item ref="agentCode" label="" prop="agentCode">
          <el-input v-model="ruleForm.agentCode" placeholder="请输入代理商编号" @blur="handleBlur"></el-input>
        </el-form-item>
        <el-tooltip v-model="capsTooltip" content="大写开启" placement="right" manual>
          <el-form-item ref="password" label="" prop="password">
            <el-input v-model="ruleForm.password" :key="passwordType" :type="passwordType" @keyup.native="checkCapslock" @blur="handleBlur" placeholder="请输入登录密码"></el-input>
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :disabled="btnDisabled" :loading="btnLoading">确定</el-button>
        </el-form-item>
      </el-form>
      <div class="result step2" v-show="step === 2">
        <div class="icon"><i class="el-icon-circle-check"></i></div>
        <h3>操作成功！</h3>
        <p>您的代理账号（登录账号）为：<span>dfdf</span><br />目前该账户未开通，<a href="http://" target="_blank" rel="noopener noreferrer">去登录</a></p>
      </div>
    </div>
    <div class="slideshow">
      <div class="slideshow-image" style="background-image: url('/static/img/bg-01.jpg')"></div>
      <div class="slideshow-image" style="background-image: url('/static/img/bg-02.jpg')"></div>
      <div class="slideshow-image" style="background-image: url('/static/img/bg-03.jpg')"></div>
    </div>
    <agent-footer></agent-footer>
  </div>
</template>
<script>
// import { mapActions } from 'vuex'
import isPassword from '@/utils/isPassword'
import agentFooter from '@/views/components/footer'
import agentHeader from '@/views/components/header'
// import { sendCaptchaWithMobile } from '@/api/agent/smsCaptcha'
// import { selectAgentByParam, updateAgentPwd, inviteCustomerRegistered, inviteCustomerRegister, validPhoneOrMail, nextStep, registDl, genelCaptcha} from '@/api/agent/users'
export default {
    components: {
      agentFooter,
      agentHeader
    },
  data() {
    return {
      ruleForm: {
        agentCode: '',
        password: ""
      },
      rules: {
        agentCode: [
          { required: true, message: '请输入代理商编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: isPassword, trigger: 'blur' }
        ]
      },
      step: 1,
      btnDisabled: true,
      btnLoading: false,
      formItems: ['agentCode', 'password'],
      passwordType: 'password',
      capsTooltip: false
    };
  },
  beforeMount () {
  },
  methods: {
    // ...mapActions('users', ['inviteCustomerRegistered']),
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
      // this.$nextTick(() => {
      //   this.$refs.password.focus()
      // })
    },
    handleBlur (v) {
      setTimeout(() => {
        if (this.checkForm()) {
          this.btnDisabled = false
        } else {
          this.btnDisabled = true
        }
      }, 10)
    },
    checkForm () {
      let flag = true
      for (let index = 0; index < this.formItems.length; index++) {
        if (this.$refs[this.formItems[index]].validateState !== 'success') {
          flag = false
          break
        }
      }
      return flag
    },
    onSubmit() {
      this.btnLoading = true
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = {
            agentCode: this.ruleForm.agentCode,
            password: this.ruleForm.password,
            userName: 'userName'
          }
          inviteCustomerRegistered(params).then((response) => {
            if (response.data.code === '0000') {
              this.step = 2
            } else {
              this.$message.error(response.data.msg)
            }
          })
        } else {
          this.btnLoading = false
          this.btnDisabled = true
        }
      })
    }
  }
};
</script>
<style>
body{
  background: #000;
}
.main-body{
  text-align: center;
  margin-top: 100px;
}
.main-body h3{
  font-size: 26px;
  font-weight: normal;
}
.main-body form {
  width: 500px;
  margin: 0 auto;
  padding-top: 30px;
}
.main-body .step1{
  background: #fff;
  border-radius: 5px;
  padding: 20px 80px;
}
.main-body .show-pwd {
  position: absolute;
  right: 10px;
  top: 4px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  user-select: none;
}
.main-body .el-button{
  width: 100%;
  margin-top: 30px;
}
.main-body .step2{
  width: 500px;
  margin: 0 auto;
  background: #fff;
  border-radius: 5px;
  padding: 20px 80px;
}
.main-body .step2 .icon i{
  font-size: 40px;
  color: green;
}
.main-body .step2 h3{
  font-size: 20px;
}
.main-body .step2 p{
  font-size: 14px;
  line-height: 20px;
}
.main-body .step2 a{
  color: #2495ca;
}
</style>