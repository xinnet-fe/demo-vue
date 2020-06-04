<template>
  <div>
    <agent-header></agent-header>
    <div class="main-body">
      <div class="step1" v-show="step === 1">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0px">
          <h3>接受代理邀请并注册</h3>
          <el-form-item label="" prop="email" ref="email">
            <el-input v-model="ruleForm.email" placeholder="请输入邮箱地址"  @blur="handleBlur"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password" ref="password">
            <el-input v-model="ruleForm.password" placeholder="请输入登录密码"  @blur="handleBlur"></el-input>
          </el-form-item>
          <el-form-item label="" prop="mobileNum" ref="mobileNum">
            <el-input v-model="ruleForm.mobileNum" placeholder="请输入您的手机号"  @blur="handleBlur"></el-input>
          </el-form-item>
          <el-form-item label="" prop="checked" ref="checked">
            <el-checkbox v-model="ruleForm.checked" @change="handleChange">我已阅读并同意</el-checkbox>
            <a href="http://www.xinnet.com/views/agreement/register_agreement.html" target="_blank">《新网用户协义》</a>
            <a href="/Modules/downloads/register/AgentRegistrationAgreement.zip" target="_blank">《代理合同》</a>
          </el-form-item>
          <el-form-item class="item-btn">
            <el-button type="primary" @click="onSubmit" :disabled="btnDisabled" :loading="btnLoading">注册</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="result step2" v-show="step === 2">
        <div class="icon"><i class="el-icon-circle-check"></i></div>
        <h3>恭喜您！您的代理账号已经申请成功！</h3>
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
import { mapActions } from 'vuex'
import isNumber from '@/utils/isNumber'
import isPassword from '@/utils/isPassword'
import isPhone from '@/utils/isPhone'
import isEmail from '@/utils/isEmail'
import agentFooter from '@/views/components/footer'
import agentHeader from '@/views/components/header'
export default {
    components: {
      agentFooter,
      agentHeader
    },
  data() {
    return {
      ruleForm: {
        email: '',
        password: "",
        mobileNum: "",
        checked: []
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: isEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: isPassword, trigger: 'blur' }
        ],
        mobileNum: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: isPhone, trigger: 'blur' }
        ],
        checked: [
          { type: 'array', required: true, message: '请勾选', trigger: 'change' }
        ]
      },
      step: 1,
      success: false,
      downTime: 60,
      showVcode: false,
      btnDisabled: true,
      barSize: {width: '338px', height: '40px'},
      valid: false,
      valid2: false,
      btnLoading: false,
      formItems: ['email', 'password', 'mobileNum', 'checked']
    };
  },
  methods: {
    ...mapActions('users', ['validPhoneOrMail', 'inviteCustomerRegister']),
    handleBlur (v) {
      setTimeout(() => {
        if (this.checkForm()) {
          this.btnDisabled = false
        } else {
          this.btnDisabled = true
        }
      }, 10)
    },
    handleChange (v) {
      // console.log(v)
      // console.log(this.checkForm())
      setTimeout(()=>{
        if (this.checkForm()) {
          this.btnDisabled = false
        } else {
          this.btnDisabled = true
          // this.ruleForm.checked = []
          // setTimeout(()=>{
          // // this.$refs.readme.validateMessage = 'error'
          // // this.$refs.readme.validateState = 'error'
          //   this.$refs.checked.clearValidate()
          // }, 10)
        }
      }, 10)

    },
    checkForm () {
      let flag = true
      for (let index = 0; index < this.formItems.length; index++) {
        console.log(this.$refs[this.formItems[index]].validateState)
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
          this.validPhoneOrMail({}).then((response) => {
            this.inviteCustomerRegister({}).then((response) => {
              this.step = 2
            })
          })
        } else {
          this.btnLoading = false
          this.btnDisabled = true
          this.ruleForm.checked = []
          setTimeout(()=>{
          // this.$refs.readme.validateMessage = 'error'
          // this.$refs.readme.validateState = 'error'
            this.$refs.checked.clearValidate()
          }, 10)
        }
      })

    }
  },
  mounted () {

  }
};
</script>
<style>
body{
  background: #000;
}
.header {
  height: 58px;
  background: #000;
}
.main-body{
  margin-top: 100px;
}
.main-body h3{
  text-align: center;
  font-size: 26px;
  font-weight: normal;
}
.main-body .step1{
  width: 500px;
  margin: 0 auto;
  background: #fff;
  border-radius: 5px;
  padding: 20px 80px;
}
.main-body .item-btn .el-button{
  width: 100%;
  /* margin-top: 30px; */
}
.main-body .inputVcode{
  width: 100px;
}
.main-body .getVcode{
  width: auto;
  text-align: center;
}
.main-body .tips{
  font-size: 12px;
  color: #999;
  margin: 0 10px;
}
.main-body .step1 a{
  color: #2495ca;
}
.main-body .step2{
  width: 500px;
  margin: 0 auto;
  background: #fff;
  border-radius: 5px;
  padding: 20px 80px;
  text-align: center;
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