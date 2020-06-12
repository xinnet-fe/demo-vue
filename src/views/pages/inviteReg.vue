<template>
  <div id="app" style="height:100%;position:relative">
    <agent-header></agent-header>
    <div class="main-body">
      <div class="step1" v-show="step === 1">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0px">
          <h3>接受代理邀请并注册</h3>
          <el-form-item label="" prop="email" ref="email">
            <el-input v-model="ruleForm.email" placeholder="请输入邮箱地址"  @blur="handleBlur"></el-input>
          </el-form-item>

          <el-tooltip v-model="capsTooltip" content="大写开启" placement="right" manual>
            <el-form-item ref="password" label="" prop="password">
              <el-input v-model="ruleForm.password" :key="passwordType" :type="passwordType" @keyup.native="checkCapslock" @blur="handleBlur" placeholder="请输入登录密码"></el-input>
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-tooltip>

          <el-form-item label="" prop="mobileNum" ref="mobileNum">
            <el-input v-model="ruleForm.mobileNum" placeholder="请输入您的手机号" maxlength="11" @blur="handleBlur" @keyup.native="restPhone"></el-input>
          </el-form-item>
          <el-form-item label="" v-if="showVerifyBar">
            <Vcode :show="isShow" @success="handleSuccess" @close="close" />
            <span class="btnShowVcode"  @click="handleShowVcode">点击开始验证</span>
          </el-form-item>
        </el-form>
        <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules" label-width="0px">
          <el-form-item label="" prop="vcode" v-show="showVcode" ref="vcode">
            <el-input v-model="ruleForm2.vcode" maxlength="6" class="inputVcode" @blur="handleBlur"></el-input>
            <el-button class="getVcode" @click="getVerificationCode" v-show="!success" :loading="vcodeLoading">获取验证码</el-button>
            <span class="tips" v-show="success">重新发送({{downTime}})</span>
          </el-form-item>
          <el-form-item label="" prop="checked" ref="checked">
            <el-checkbox-group v-model="ruleForm2.checked" @change="handleChange" style="display:inline-block">
              <el-checkbox name="checked" label="checked">我已阅读并同意</el-checkbox>
            </el-checkbox-group>
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
        <h3>操作成功！</h3>
        <p style="text-align:left;">您的账号成功与代理商绑定，如需购买商品请按如下步骤操作：<br /><br />
          1.选购商品<br />
          2.提交订单<br />
          3.与代理商取的联系，完成交易<br />
          4.管理商品<br />
        </p>
        <p><a href="https://login.xinnet.com/new/login" rel="noopener noreferrer">去登录</a></p>
      </div>
    </div>
    <div class="slideshow">
      <div class="slideshow-image" style="background-image: url('static/img/bg-01.jpg')"></div>
      <div class="slideshow-image" style="background-image: url('static/img/bg-02.jpg')"></div>
      <div class="slideshow-image" style="background-image: url('static/img/bg-03.jpg')"></div>
    </div>
    <agent-footer></agent-footer>
  </div>
</template>
<script>
import Vcode from "vue-puzzle-vcode"
import isNumber from '@/utils/isNumber'
import isPassword from '@/utils/isPassword'
import isPhone from '@/utils/isPhone'
import isEmail from '@/utils/isEmail'
import agentFooter from '@/views/components/footer'
import agentHeader from '@/views/components/header'
import { getCoreProvice } from '@/api/agent/area'
import { sendCaptchaWithMobile } from '@/api/agent/smsCaptcha'
import { selectAgentByParam, updateAgentPwd, inviteCustomerRegistered, inviteCustomerRegister, validPhoneOrMail, nextStep, registDl, genelCaptcha} from '@/api/agent/users'

const Base64 = require('js-Base64').Base64
// import { mapActions } from 'vuex'
// import { sendCaptchaWithMobile } from '@/api/agent/smsCaptcha'
// import { selectAgentByParam, updateAgentPwd, inviteCustomerRegistered, inviteCustomerRegister, validPhoneOrMail, nextStep, registDl, genelCaptcha} from '@/api/agent/users'
export default {
  name: 'agentInviteReg',
  desc: '代理商邀请并注册',
  components: {
    agentFooter,
    agentHeader,
    Vcode
  },
  data() {
    return {
      ruleForm: {
        email: '',
        password: "",
        mobileNum: ""
      },
      ruleForm2: {
        vcode: '',
        checked: ['checked']
      },
      rules: {
        email: [
          { required: true, message: '请填写正确的电子邮箱', trigger: 'blur' },
          { validator: isEmail, message: '请填写正确的电子邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码格式错误，密码为8-16个字符，区分大小写', trigger: 'blur' },
          { validator: isPassword, message: '密码格式错误，密码为8-16个字符，区分大小写', trigger: 'blur' }
        ],
        mobileNum: [
          { required: true, message: '请填写正确的手机号码', trigger: 'blur' },
          { validator: isPhone, message: '请填写正确的手机号码', trigger: 'blur' }
        ],
        vcode: [
          { required: true, message: '请输入手机短信验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '验证码错误', trigger: 'blur' }
        ],
        checked: [
          { type: 'array', required: true, message: '请阅读新网用户协议及代理协议并确认勾选', trigger: 'change' }
        ]
      },
      step: 1,
      success: false,
      downTime: 60,
      showVcode: false,
      showVerifyBar: true,
      btnDisabled: true,
      valid: false,
      valid2: false,
      btnLoading: false,
      vcodeLoading: true,
      isShow: false,
      formItems: ['email', 'password', 'mobileNum'],
      formItems2: ['vcode', 'checked'],
      passwordType: 'password',
      capsTooltip: false,
      s_vid: '',
      captcha: '',
      redisKey: '',
      captchCode: '',
      leftNum: 0,
      agentCode: ''
    }
  },
  methods: {
    // ...mapActions('users', ['validPhoneOrMail', 'inviteCustomerRegister']),
    restPhone () {
      this.ruleForm.mobileNum = this.ruleForm.mobileNum.replace(/[^\d.]/g,'')
    },
    hashCode (str) {
      let hash = 0;
      if (!str.length) {
        return hash
      }
      for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i)
        hash = ((hash<<5) - hash) + char
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash
    },
    encryptionCode (leftNum, captcha) {
      const move_left = parseInt(leftNum) //偏差值
      const code = Base64.encode(move_left + "UA" + Base64.encode(Base64.encode(Base64.encode(String(parseInt(move_left + this.hashCode(captcha)))))))
      return (code + '-' + this.redisKey)
    },
    getVerificationCode () {
      this.vcodeLoading = true
      // 获取滑块生成的验证码
      genelCaptcha({}).then((response) => {
        console.log(response)
        if (!response.code) {
          const idx = response.data.code.lastIndexOf('-')
          this.redisKey = response.data.code.substring(idx + 1, response.data.code.length)
          this.captcha = this.encryptionCode(this.leftNum, response.data.code.substring(0, idx))
          const params = {
            mobileNum: this.ruleForm.mobileNum,
            bustype: 'INVITED_REGISTER',
            captcha: this.captcha
            // key: this.redisKey
          }
          // 发送短信验证码
          sendCaptchaWithMobile(params).then((response) => {
            this.vcodeLoading = false
            if (!response.code) {
              if (response.data.isSuccess === 1) {
                this.s_vid = response.data.s_vid
                this.success = true
                this.countDown()
              } else {
                this.$refs.vcode.validateState = 'error'
                this.$refs.vcode.validateMessage = response.msg
              }
            } else {
              this.$refs.vcode.validateState = 'error'
              this.$refs.vcode.validateMessage = response.msg
            }
          }).catch((error) => {
            this.vcodeLoading = false
          })
        } else {
          this.$message.error(response.msg)
        }
      })
    },
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
    close () {
      this.isShow = false
    },
    handleShowVcode () {
      this.isShow = true
    },
    handleSuccess (num) {
      this.leftNum = num
      this.isShow = false
      setTimeout(() => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.showVcode = true
            this.showVerifyBar = false
            this.getVerificationCode()
          }
        })
      }, 10)
    },
    handleBlur (v) {
      if (this.showVcode) {
        setTimeout(() => {
          console.log(this.checkForm() +"------"+ this.checkForm2())
          if (this.checkForm() && this.checkForm2()) {
            this.btnDisabled = false
          } else {
            this.btnDisabled = true
          }
        }, 10)
      }
    },
    handleChange (v) {
      console.log(this.ruleForm2.checked)
      if (v) {
        setTimeout(() => {
          // console.log(this.checkForm2()+"-----"+this.checkForm())
          if (this.checkForm2() && this.checkForm()) {
            this.btnDisabled = false
          } else {
            this.btnDisabled = true
          }
        }, 10)
      } else {
        this.$refs.checked.validateState = 'error'
        this.btnDisabled = true
      }
    },
    countDown () {
      let clock = window.setInterval(() => {
        this.downTime--
        // 当倒计时小于0时清除定时器
        if (this.downTime < 0) {
          window.clearInterval(clock)
          this.success = false
          this.downTime = 60
        }
      }, 1000)
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
    checkForm2 () {
      let flag = true
      for (let index = 0; index < this.formItems2.length; index++) {
        if (this.$refs[this.formItems2[index]].validateState !== 'success') {
          flag = false
          break
        }
      }
      return flag
    },
    onSubmit() {
      this.btnLoading = true
      if (this.checkForm2() && this.checkForm()) {
        const params = {
          agentCode: this.agentCode,
          password: this.ruleForm.password,
          email: this.ruleForm.email,
          mobileNum: this.ruleForm.mobileNum,
          captcha: this.captcha,
          key: this.redisKey,
          s_vid: this.s_vid,
          smsCaptcha: this.ruleForm2.vcode
        }
        inviteCustomerRegister(params).then((response) => {
          this.btnLoading = false
          this.btnDisabled = true
          if (!response.code) {
            if (response.data.isSuccess === '1') {
              this.step = 2
            } else {
              this.$message.error(response.msg)
            }
          } else {
            if (response.code === '595070') {
              this.$refs.vcode.validateState = 'error'
              this.$refs.vcode.validateMessage = response.msg
            } else if (response.code === '595030') {
              if (response.msg === '手机号已注册') {
                this.$refs.mobileNum.validateState = 'error'
                this.$refs.mobileNum.validateMessage = response.msg
              } else if (response.msg === '邮箱已存在') {
                this.$refs.email.validateState = 'error'
                this.$refs.email.validateMessage = response.msg
              }
            } else {
              this.$message.error(response.msg)
            }
          }
          
        }).catch((error) => {
          this.btnLoading = false
          this.btnDisabled = true
        })
      } else {
        this.btnLoading = false
        this.btnDisabled = true
        this.ruleForm.checked = false
        this.$refs.ruleForm.validate((valid) => {
        })
        this.$refs.ruleForm2.validate((valid) => {
        })
      }
    }
  },
  beforeMount () {
    this.agentCode = this.GLOBALS.QUERY_STRING('agentCode')
  },
  mounted () {
    this.$refs.checked.validateState = 'success'
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
.main-body .show-pwd {
  position: absolute;
  right: 10px;
  top: 4px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  user-select: none;
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
.main-body .btnShowVcode{
  cursor: pointer;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 38px;
  line-height: 38px;
  outline: none;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  font-size: 14px;
  text-align: center;
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