<template>
  <div id="app" style="height:100%;position:relative">
    <agent-header></agent-header>
    <div class="main-body">
      <div class="step1" v-show="step === 1">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0px">
          <h3>代理商重置密码</h3>
          <el-form-item label="" prop="agentCode" ref="agentCode">
            <el-input v-model="ruleForm.agentCode" placeholder="请输入代理商编号" @blur="handleBlur"></el-input>
          </el-form-item>
          <el-form-item label="" prop="phone" ref="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入您的手机号码，以进行密码重置" maxlength="11" @blur="handleBlur" @keyup.native="restPhone"></el-input>
          </el-form-item>
          <el-form-item label="" v-if="showVerifyBar">
            <Vcode :show="isShow" @success="handleSuccess" @close="close" />
            <span class="btnShowVcode"  @click="handleShowVcode">点击开始验证</span>
          </el-form-item>
        </el-form>
        <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules" label-width="0px">
          <el-form-item label="" prop="vcode" v-show="showVcode" ref="vcode">
            <el-input v-model="ruleForm2.vcode" maxlength="6" class="inputVcode" @blur="handleBlur" placeholder="短信验证码"></el-input>
            <el-button class="getVcode" @click="getVerificationCode" v-show="!success" :loading="vcodeLoading">获取验证码</el-button>
            <span class="tips" v-show="success">重新发送({{downTime}})</span>
          </el-form-item>
          <el-form-item class="item-btn">
            <el-button type="primary" @click="onNext" :disabled="btnDisabledNext" :loading="btnLoadingNext">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="step2" v-show="step === 2">
        <el-form ref="ruleForm3" :model="ruleForm3" :rules="rules" label-width="0px">
          <h3>设置新密码</h3>
          <el-tooltip v-model="capsTooltip" content="大写开启" placement="right" manual>
            <el-form-item ref="password" label="" prop="password">
              <el-input v-model="ruleForm3.password" :key="passwordType" :type="passwordType" @keyup.native="checkCapslock" @blur="handleBlurPw('pw')" placeholder="请输入新密码"></el-input>
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-tooltip>

          <el-form-item label="" prop="repassword" ref="repassword">
            <el-input v-model="ruleForm3.repassword" :type="passwordType" placeholder="请再次输入新密码" @blur="handleBlurPw"></el-input>
          </el-form-item>
          <el-form-item class="item-btn">
            <el-button type="primary" @click="onSubmit" :disabled="btnDisabledSubmit" :loading="btnLoadingUpdate">重置密码</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- <div class="result step3" v-show="step === 3">
        <div class="icon"><i class="el-icon-circle-check"></i></div>
        <h3>恭喜您！您的代理账号已经申请成功！</h3>
        <p>您的代理账号（登录账号）为：<span>dfdf</span><br />目前该账户未开通，<a href="http://" target="_blank" rel="noopener noreferrer">去登录</a></p>

      </div> -->
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
// import { mapActions } from 'vuex'
// import { sendCaptchaWithMobile } from '@/api/agent/smsCaptcha'
// import { selectAgentByParam, updateAgentPwd, inviteCustomerRegistered, inviteCustomerRegister, validPhoneOrMail, nextStep, registDl, genelCaptcha} from '@/api/agent/users'
import Vcode from "@/components/vue-puzzle-vcode-master/src/index.js"
import isNumber from '@/utils/isNumber'
import isPassword from '@/utils/isPassword'
import isPhone from '@/utils/isPhone'
import agentFooter from '@/views/components/footer'
import agentHeader from '@/views/components/header'
import { sendCaptchaWithMobile } from '@/api/agent/smsCaptcha'
import { selectAgentByParam, updateAgentPwd, inviteCustomerRegistered, inviteCustomerRegister, validPhone, nextStep, registDl, genelCaptcha} from '@/api/agent/users'
const Base64 = require('js-Base64').Base64
export default {
  name: 'agentRepassword',
  desc: '代理商密码重置',
  components: {
    Vcode,
    agentFooter,
    agentHeader
  },
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm3.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    };
    return {
      ruleForm: {
        agentCode: '',
        phone: ""
      },
      ruleForm2: {
        vcode: ""
      },
      ruleForm3: {
        password: "",
        repassword: ""
      },
      rules: {
        agentCode: [
          { required: true, message: '请输入代理商编号', trigger: 'blur' },
          { min: 3, max: 30, message: '代理商编号格式错误', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: isPassword, trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: isPhone, trigger: 'blur' }
        ],
        vcode: [
          { required: true, message: '请输入手机短信验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '验证码错误', trigger: 'blur' }
        ]
      },
      step: 1,
      success: false,
      downTime: 60,
      showVerifyBar: true,
      showVcode: false,
      btnDisabledNext: true,
      btnDisabledSubmit: true,
      vcodeLoading: true,
      valid: false,
      valid2: false,
      valid3: false,
      btnLoadingNext: false,
      btnLoadingUpdate: false,
      // imgUrl: '/static/img/',
      // imgName: ['bg-01.jpg', 'bg-02.jpg'],
      // barSize: {width: '338px', height: '40px'},
      // imgSize: {width: '338px', height: '150px'},
      isShow: false,
      formItems: ['agentCode', 'phone'],
      formItems2: ['vcode'],
      formItems3: ['password', 'repassword'],
      s_vid: '',
      captcha: '',
      redisKey: '',
      captchCode: '',
      passwordType: 'password',
      capsTooltip: false,
      leftNum: 0
    }
  },
  methods: {
    // ...mapActions('users', ['genelCaptcha', 'selectAgentByParam', 'nextStep', 'updateAgentPwd']),
    // ...mapActions('smsCaptcha', ['sendCaptchaWithMobile']),
    restPhone () {
      this.ruleForm.phone = this.ruleForm.phone.replace(/[^\d.]/g,'')
    },
    hashCode (str) {
      let hash = 0
      if (!str.length) {
        return hash
      }
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
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
            mobileNum: this.ruleForm.phone,
            bustype: 'RESET_PASSWORD',
            captcha: this.captcha,
            // key: this.redisKey,
            agentCode: this.ruleForm.agentCode
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
    handleBlur (v) {
      if (this.showVcode) {
        setTimeout(() => {
          if (this.checkForm() && this.checkForm2()) {
            this.btnDisabledNext = false
          } else {
            this.btnDisabledNext = true
          }
        }, 10)
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
    handleSuccess (num) {
      this.leftNum = num
      this.isShow = false
      setTimeout(() => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const params = {
              agentCode: this.ruleForm.agentCode,
              telenumber: this.ruleForm.phone,
              consumerType: 'DL'
            }
            selectAgentByParam(params).then((response) => {
              if (!response.code) {
                this.showVcode = true
                this.showVerifyBar = false
                this.getVerificationCode()
              } else {
                // this.btnLoadingNext = true
                // this.btnDisabledNext = true
                if (response.code === '595040') { // 账号不存在 账号异常，请联系客服 账户未开通
                  this.$refs.agentCode.validateState = 'error'
                  this.$refs.agentCode.validateMessage = response.msg
                } else if (response.code === '590102') { // 当前账户与手机号不匹配
                  this.$refs.phone.validateState = 'error'
                  this.$refs.phone.validateMessage = response.msg
                } else if (response.code === '590107') { // 当前用户非代理商用户
                  this.$refs.agentCode.validateState = 'error'
                  this.$refs.agentCode.validateMessage = response.msg
                } else {
                  this.$message.error(response.msg)
                }
              }
            })

          }
        })
      }, 10)
    },
    // handleChange () {
    //   if (this.checkForm2() && this.checkForm()) {
    //     this.btnDisabledNext = false
    //   } else {
    //     this.btnDisabledNext = true
    //   }
    // },
    checkForm () {
      let flag = true
      for (let index = 0; index < this.formItems.length; index++) {
        if (this.$refs[this.formItems[index]].validateState !== 'success') {
          flag = false
          break
        }
      }
      return flag

      // this.$refs.ruleForm.validate((valid) => {
      //   this.valid = valid
      // })
      // return this.valid
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
    checkForm3 () {
      let flag = true
      for (let index = 0; index < this.formItems3.length; index++) {
        if (this.$refs[this.formItems3[index]].validateState !== 'success') {
          flag = false
          break
        }
      }
      return flag
      // this.$refs.ruleForm3.validate((valid) => {
      //   this.valid3 = valid
      // })
      // return this.valid3
    },
    handleBlurPw (v) {
      if (v && v === 'pw') {
        if (this.ruleForm3.repassword.length) {
          this.$refs.ruleForm3.validateField('repassword')
        }
      }
      setTimeout(() => {
        console.log(this.checkForm3())
        if (this.checkForm3()) {
          this.btnDisabledSubmit = false
        } else {
          this.btnDisabledSubmit = true
        }
      }, 10)
    },
    onNext () {
      this.btnLoadingNext = true
      if (this.checkForm2() && this.checkForm()) {
        const params = {
          agentCode: this.ruleForm.agentCode,
          telenumber: this.ruleForm.phone,
          consumerType: 'DL'
        }
        selectAgentByParam(params).then((response) => {
          if (!response.code) {
            const params2 = {
              s_vid: this.s_vid,
              captcha: this.ruleForm2.vcode,
              // redisKey: this.redisKey,
              captchCode: this.captcha,
              agentCode: this.ruleForm.agentCode,
              telenumber: this.ruleForm.phone
            }
            nextStep(params2).then((response) => {
              this.btnLoadingNext = false
              this.btnDisabledNext = true
              if (!response.code) {
                if (response.data.isSuccess === '1') {
                  this.step = 2
                } else {
                  this.$message.error(response.msg)
                }
              } else {
                if (response.code === '590102') { // 手机号不匹配
                  this.$refs.phone.validateState = 'error'
                  this.$refs.phone.validateMessage = response.msg
                } else {
                  this.$message.error(response.msg)
                }
              }
            }).catch((error) => {
              this.btnLoadingNext = false
              this.btnDisabledNext = true
            })
          } else {
            this.btnLoadingNext = false
            this.btnDisabledNext = true
            if (response.code === '595040') {
              this.$refs.agentCode.validateState = 'error'
              this.$refs.agentCode.validateMessage = response.msg
            } else if (response.code === '590102') {
              this.$refs.phone.validateState = 'error'
              this.$refs.phone.validateMessage = response.msg
            } else if (response.code === '590107') {
              this.$refs.agentCode.validateState = 'error'
              this.$refs.agentCode.validateMessage = response.msg
            } else {
              this.$message.error(response.msg)
            }
          }
        }).catch((error) => {
          this.btnLoadingNext = false
          this.btnDisabledNext = true
        })
      } else {
        this.btnLoadingNext = false
        this.btnDisabledNext = true
      }
    },
    onSubmit() {
      this.btnLoadingUpdate = true
      this.$refs.ruleForm3.validate((valid) => {
        if (valid) {
          let params = {
            agentCode: this.ruleForm.agentCode,
            password: this.ruleForm3.password
          }
          updateAgentPwd(params).then((response) => {
            if (!response.code) {
              if (response.data.isSuccess === '1') {
                this.$alert('密码修改成功！', {
                  title: '提示',
                  confirmButtonText: '确定',
                  callback: action => {
                    window.location.href = 'https://login.xinnet.com/?service=https://console.xinnet.com/agent'
                  }
                })
              } else {
                this.$message.error(response.msg)
              }
            } else {
              this.$message.error(response.msg)
            }
            this.btnLoadingUpdate = false
            this.btnDisabledSubmit = true
          })
        } else {
          this.btnLoadingUpdate = false
          this.btnDisabledSubmit = true
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
  font-size: 26px;
  font-weight: normal;
  text-align: center;
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
}
.main-body .step3{
  width: 500px;
  margin: 0 auto;
  background: #fff;
  border-radius: 5px;
  padding: 20px 80px;
  text-align: center;
}
.main-body .step3 .icon i{
  font-size: 40px;
  color: green;
}
.main-body .step3 h3{
  font-size: 20px;
}
.main-body .step3 p{
  font-size: 14px;
  line-height: 20px;
}
.main-body .step3 a{
  color: #2495ca;
}

/* .verify-img-out{
  display: none;
}
.verifyBar:hover .verify-img-out{
  display: block;
}
.verifyBar:hover .verify-sub-block{
  display: block!important;
} */
</style>