<template>
  <div id="app" style="height:100%;position:relative">
    <agent-header />
    <div class="main-body">
      <div v-show="step === 1" class="step1">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0px" @submit.native.prevent>
          <h3>接受代理邀请并注册
            <el-tooltip class="item" effect="light" content="接受邀请后您将成为代理商的专属客户，之后您在新网平台的所有订单将由代理商代为支付且不再享受新网会员的任何活动优惠。购买的商品或服务将由您自主管理。" placement="right">
              <i class="el-icon-warning" style="color: #f47258; font-size: 20px;" />
            </el-tooltip>
          </h3>
          <el-form-item ref="email" label="" prop="email">
            <el-input v-model="ruleForm.email" placeholder="请输入邮箱地址" @blur="handleBlur" />
          </el-form-item>

          <el-tooltip v-model="capsTooltip" content="大写开启" placement="right" manual>
            <el-form-item ref="password" label="" prop="password">
              <el-input :key="passwordType" v-model="ruleForm.password" :type="passwordType" placeholder="请输入登录密码" @keyup.native="checkCapslock" @blur="handleBlur" />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-tooltip>

          <el-form-item ref="mobileNum" label="" prop="mobileNum">
            <el-input v-model="ruleForm.mobileNum" placeholder="请输入您的手机号" maxlength="11" @blur="handleBlur" @keyup.native="restPhone" />
          </el-form-item>
          <el-form-item v-if="showVerifyBar" label="">
            <Vcode :show="isShow" @success="handleSuccess" @close="close" />
            <span class="btnShowVcode" @click="handleShowVcode">点击开始验证</span>
          </el-form-item>
        </el-form>
        <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules" label-width="0px" @submit.native.prevent>
          <el-form-item v-show="showVcode" ref="vcode" label="" prop="vcode">
            <el-input v-model="ruleForm2.vcode" maxlength="6" class="inputVcode" style="width: 100px" @blur="handleBlur" @input="handleChangeVCode" />
            <el-button v-show="!success" type="medium" class="getVcode" :loading="vcodeLoading" @click="getVerificationCode">获取验证码</el-button>
            <span v-show="success" class="tips">重新发送({{ downTime }})</span>
          </el-form-item>
          <el-form-item ref="checked" label="" prop="checked">
            <div style="line-height: 20px;">
              <el-checkbox-group v-model="ruleForm2.checked" style="display:inline-block;line-height: 20px;" @change="handleChange">
                <el-checkbox name="checked" label="checked" style="padding: 0;">我已阅读并同意</el-checkbox>
              </el-checkbox-group>
              <a href="http://www.xinnet.com/views/agreement/register_agreement.html" target="_blank">《新网用户协议》</a>
              <a href="http://www.xinnet.com/service/cjwt/hy/zhuce/1856.html" target="_blank">《客户信息收集声明》</a>
            </div>

          </el-form-item>
          <el-form-item class="item-btn">
            <el-button type="primary" :disabled="btnDisabled" :loading="btnLoading" @click="onSubmit">注册</el-button>
            <!-- <p><a :href="'invite.html?agentCode=' + agentCode">我已注册过新网账号</a></p> -->
          </el-form-item>
        </el-form>
      </div>

      <div v-show="step === 2" class="result step2">
        <div class="icon"><i class="el-icon-circle-check" /></div>
        <h3>操作成功！</h3>
        <p style="text-align:left;">您的账号成功与代理商绑定，如需购买商品请按如下步骤操作：<br><br>
          1.选购商品<br>
          2.提交订单<br>
          3.与代理商取的联系，完成交易<br>
          4.管理商品<br>
        </p>
        <p><a href="https://login.xinnet.com/?service=https://console.xinnet.com/agent/index.html" rel="noopener noreferrer">去登录</a></p>
      </div>
    </div>
    <div class="slideshow">
      <div class="slideshow-image" style="background-image: url('static/img/bg-01.jpg')" />
      <div class="slideshow-image" style="background-image: url('static/img/bg-02.jpg')" />
      <div class="slideshow-image" style="background-image: url('static/img/bg-03.jpg')" />
    </div>
    <agent-footer />
  </div>
</template>
<script>
import Vcode from '@/components/vue-puzzle-vcode-master/src/index.js'
import isPassword from '@/utils/isPassword'
import isPhone from '@/utils/isPhone'
import isEmail from '@/utils/isEmail'
import agentFooter from '@/views/components/footer'
import agentHeader from '@/views/components/header'
import { sendCaptchaWithMobile } from '@/api/agent/smsCaptcha'
import { inviteCustomerRegister, validPhone, genelCaptcha } from '@/api/agent/users'

const Base64 = require('js-Base64').Base64
// import { mapActions } from 'vuex'
// import { sendCaptchaWithMobile } from '@/api/agent/smsCaptcha'
// import { selectAgentByParam, updateAgentPwd, inviteCustomerRegistered, inviteCustomerRegister, validPhoneOrMail, nextStep, registDl, genelCaptcha} from '@/api/agent/users'
export default {
  name: 'AgentInviteReg',
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
        password: '',
        mobileNum: ''
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
          { required: true, message: '请输入手机短信验证码', trigger: 'change' },
          { min: 6, max: 6, message: '验证码错误', trigger: 'change' }
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
  beforeMount() {
    this.agentCode = this.GLOBALS.QUERY_STRING('agentCode')
  },
  mounted() {
    console.log('===========================')
    this.$refs.checked.validateState = 'success'
  },
  methods: {
    // ...mapActions('users', ['validPhoneOrMail', 'inviteCustomerRegister']),
    restPhone() {
      this.ruleForm.mobileNum = this.ruleForm.mobileNum.replace(/[^\d.]/g, '')
    },
    hashCode(str) {
      let hash = 0
      if (!str.length) {
        return hash
      }
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // Convert to 32bit integer
      }
      return hash
    },
    encryptionCode(leftNum, captcha) {
      const move_left = parseInt(leftNum) // 偏差值
      const code = Base64.encode(move_left + 'UA' + Base64.encode(Base64.encode(Base64.encode(String(parseInt(move_left + this.hashCode(captcha)))))))
      return (code + '-' + this.redisKey)
    },
    getVerificationCode() {
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
            console.log(error)
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
    close() {
      this.isShow = false
    },
    handleShowVcode() {
      this.isShow = true
    },
    handleSuccess(num) {
      this.leftNum = num
      this.isShow = false
      setTimeout(() => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            validPhone({ teleNumber: this.ruleForm.mobileNum }).then((response) => {
              if (!response.code) {
                this.showVcode = true
                this.showVerifyBar = false
                this.getVerificationCode()
              } else {
                // this.btnLoadingNext = true
                // this.btnDisabledNext = true
                if (response.code === '595030') { // 手机号已注册
                  this.$refs.mobileNum.validateState = 'error'
                  this.$refs.mobileNum.validateMessage = response.msg
                } else {
                  this.$message.error(response.msg)
                }
              }
            })
          }
        })
      }, 10)
    },
    handleBlur(v) {
      if (this.showVcode) {
        setTimeout(() => {
          console.log(this.checkForm() + '------' + this.checkForm2())
          if (this.checkForm() && this.checkForm2()) {
            this.btnDisabled = false
          } else {
            this.btnDisabled = true
          }
        }, 10)
      }
    },
    handleChangeVCode() {
      setTimeout(() => {
        console.log(this.checkForm() + '------' + this.checkForm2())
        if (this.checkForm() && this.checkForm2()) {
          this.btnDisabled = false
        } else {
          this.btnDisabled = true
        }
      }, 10)
    },
    handleChange(v) {
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
    countDown() {
      const clock = window.setInterval(() => {
        this.downTime--
        // 当倒计时小于0时清除定时器
        if (this.downTime < 0) {
          window.clearInterval(clock)
          this.success = false
          this.downTime = 60
        }
      }, 1000)
    },
    checkForm() {
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
    checkForm2() {
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
          console.log(error)
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
  }
}
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
.main-body .el-form-item .el-input{
  width: 100%;
}
.main-body .item-btn .el-button{
  width: 100%;
  float: none;
  /* margin-top: 30px; */
}
.main-body .item-btn p{
  text-align: center;
  margin: 0px;
  margin-top: 20px;
  line-height: 20px;
}
.main-body .inputVcode{
  width: 100px;
}
.main-body .getVcode{
  width: auto;
  height: 38px;
  text-align: center;
  float: none!important;
}
.main-body .tips{
  font-size: 12px;
  color: #999;
  margin: 0 10px;
}
.main-body .step1 a{
  color: #2495ca;
  font-size: 12px;
  white-space: nowrap;
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
