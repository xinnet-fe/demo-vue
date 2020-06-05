<template>
  <div>
    <agent-header></agent-header>
    <div class="main-body">
      <div class="step1" v-show="step === 1">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0px">
          <h3>代理商重置密码</h3>
          <el-form-item label="" prop="agentCode" ref="agentCode">
            <el-input v-model="ruleForm.agentCode" placeholder="请输入代理商编号" @blur="handleBlur"></el-input>
          </el-form-item>
          <el-form-item label="" prop="phone" ref="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入您的手机号" @blur="handleBlur"></el-input>
          </el-form-item>
          <el-form-item label="" v-if="showVerifyBar">
            <Vcode :show="isShow" @success="handleSuccess" @close="close" />
            <span class="btnShowVcode"  @click="handleShowVcode">点击开始验证</span>
          </el-form-item>
        </el-form>
        <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules" label-width="0px">
          <el-form-item label="" prop="vcode" v-show="showVcode">
            <el-input v-model="ruleForm2.vcode" maxlength="4" class="inputVcode" @blur="handleBlur"></el-input>
            <el-button class="getVcode" @click="getVerificationCode" v-show="!success">获取验证码</el-button>
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
              <el-input v-model="ruleForm3.password" :key="passwordType" :type="passwordType" @keyup.native="checkCapslock" @blur="handleBlurPw" placeholder="请输入新密码"></el-input>
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-tooltip>

          <el-form-item label="" prop="repassword" ref="repassword">
            <el-input v-model="ruleForm3.repassword" placeholder="请再次输入新密码" @blur="handleBlurPw"></el-input>
          </el-form-item>
          <el-form-item class="item-btn">
            <el-button type="primary" @click="onSubmit" :disabled="btnDisabledSubmit" :loading="btnLoadingUpdate">重置密码</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="result step3" v-show="step === 3">
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
// import { mapActions } from 'vuex'
// import { sendCaptchaWithMobile } from '@/api/agent/smsCaptcha'
// import { selectAgentByParam, updateAgentPwd, inviteCustomerRegistered, inviteCustomerRegister, validPhoneOrMail, nextStep, registDl, genelCaptcha} from '@/api/agent/users'
import Vcode from "vue-puzzle-vcode"
import isNumber from '@/utils/isNumber'
import isPassword from '@/utils/isPassword'
import isPhone from '@/utils/isPhone'
import agentFooter from '@/views/components/footer'
import agentHeader from '@/views/components/header'
export default {
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
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: isPhone, trigger: 'blur' }
        ],
        vcode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入4位验证码', trigger: 'blur' }
        ]
      },
      step: 1,
      success: false,
      downTime: 60,
      showVerifyBar: true,
      showVcode: false,
      btnDisabledNext: true,
      btnDisabledSubmit: true,
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
      capsTooltip: false
    }
  },
  methods: {
    // ...mapActions('users', ['genelCaptcha', 'selectAgentByParam', 'nextStep', 'updateAgentPwd']),
    // ...mapActions('smsCaptcha', ['sendCaptchaWithMobile']),
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
    getVerificationCode () {
      let result = true
      this.success = true
      this.countDown()
      if (result) {
        // 获取滑块生成的验证码
        genelCaptcha({}).then((response) => {
          this.redisKey = response.data.redisKey
          this.captcha = response.data.code
          let params = {
            mobileNum: this.ruleForm.phone,
            bustype: 'INVITED_REGISTER',
            captcha: this.captcha,
            key: this.redisKey
          }
          // 发送短信验证码
          sendCaptchaWithMobile(params).then((response) => {
            this.step = 2
          })
        })
        // 验证手机号
        // this.$store.dispatch('CHECK_USER_PHONE', {'userMobile': this.$refs.userMobile.value}).then(response => {
        //   if (response) {
        //     if (response.data.code === '1000') {
        //       this.$store.dispatch('ACTIVATION_CODE', {userMobile: this.$refs.userMobile.value}).then(response => {
        //         this.loadingBtn = false
        //         if (response) {
        //           if (response.data.code === '1000') {
        //             this.$Message.success('发送成功')
        //             this.success = true
        //             this.countDown()
        //           } else {
        //             if (response.data.code === '300') {
        //               this.$Message.error('短信验证码已发送')
        //             } else if (response.data.code === '500') {
        //               this.$Message.error('手机号码错误')
        //             } else {
        //               this.$Message.error('发送失败')
        //             }
        //           }
        //         }
        //       }).catch(() => {})
        //     } else {
        //       this.loadingBtn = false
        //       if (response.data.code === '100') {
        //         this.$refs.userMobile.showValidateResult({text: '号码已存在'})
        //       } else {
        //         this.$Message.error('发送失败')
        //       }
        //     }
        //   }
        // }).catch(() => {})
      } else {
        // this.loadingBtn = false
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
    handleSuccess (obj) {
      this.isShow = false
      if (this.checkForm()) {
        this.showVcode = true
        this.showVerifyBar = false
        this.getVerificationCode()
      } else {
        
      }
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
    handleBlurPw () {
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
        selectAgentByParam({}).then((response) => {
          nextStep({}).then((response) => {
            this.step = 2
          })
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
            if (response.data.code === '0000') {
              this.step = 3
            } else {
              this.$message.error(response.data.msg)
            }
          })
        } else {
          this.btnLoadingUpdate = false
          this.btnDisabledSubmit = true
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