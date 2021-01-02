<template>
  <div id="app" style="height:100%;position:relative">
    <agent-header />
    <div class="main-body">
      <div v-show="step === 1" class="step1">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" @submit.native.prevent>
          <h3>立即申请加盟新网代理</h3>
          <el-form-item ref="name" label="联系人" prop="name">
            <el-input v-model="ruleForm.name" maxlength="15" @blur="handleBlur" />
          </el-form-item>
          <el-tooltip v-model="capsTooltip" content="大写开启" placement="right" manual>
            <el-form-item ref="password" label="登录密码" prop="password">
              <el-input :key="passwordType" v-model="ruleForm.password" :type="passwordType" auto-complete="off" @keyup.native="checkCapslock" @blur="handleBlur('pw')" />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-tooltip>
          <el-form-item ref="repassword" label="确认密码" prop="repassword">
            <el-input v-model="ruleForm.repassword" :type="passwordType" @blur="handleBlur" />
          </el-form-item>
          <el-form-item ref="phone" label="手机号码" prop="phone">
            <el-input v-model="ruleForm.phone" maxlength="11" auto-complete="off" @blur="handleBlur" @keyup.native="restPhone" />
          </el-form-item>
          <el-form-item ref="email" label="电子邮箱" prop="email">
            <el-input v-model="ruleForm.email" @blur="handleBlur" />
          </el-form-item>
          <el-form-item ref="area" label="所属省份/城市" prop="area">
            <el-cascader v-model="ruleForm.area" :options="ruleForm.options" expand-trigger="hover" @change="handleBlur" />
          </el-form-item>
          <el-form-item ref="desc" label="详细地址" prop="desc">
            <el-input v-model="ruleForm.desc" type="textarea" maxlength="100" @blur="handleBlur" />
          </el-form-item>
          <el-form-item v-if="showVerifyBar" label="">
            <Vcode :show="isShow" @success="handleSuccess" @close="close" />
            <span class="btnShowVcode" @click="handleShowVcode">点击开始验证</span>
          </el-form-item>
        </el-form>
        <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules" label-width="120px" @submit.native.prevent>
          <el-form-item v-show="showVcode" ref="vcode" label="手机验证码" prop="vcode">
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
              <a href="http://www.xinnet.com/views/agreement/agent_register_agreement.html" target="_blank">《代理合同》</a>
              <a href="http://www.xinnet.com/service/cjwt/hy/zhuce/1856.html" target="_blank">《客户信息收集声明》</a>
            </div>
          </el-form-item>
          <el-form-item class="item-btn">
            <el-button type="primary" :disabled="btnDisabled" :loading="btnLoading" @click="onSubmit">提交申请</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div v-show="step === 2" class="result step2">
        <div class="icon"><i class="el-icon-circle-check" /></div>
        <h3>恭喜您！您的代理账号已申请成功！</h3>
        <p>您的代理账号（登录账号）为：<span class="agentCode">{{ agentCode }}</span><br>目前该账号还未正式开通，暂不能登录，我们的区域渠道经理会与您联系进行开通，请保持电话畅通，或通过下方信息联系区域渠道经理。<br><a href="http://www.xinnet.com/agent/agent.html" rel="noopener noreferrer">区域渠道经理信息</a></p>
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
// import { mapActions } from 'vuex'
import { getCoreProvice } from '@/api/agent/area'
import { sendCaptchaWithMobile } from '@/api/agent/smsCaptcha'
import { validPhone, registDl, genelCaptcha } from '@/api/agent/users'
// import citysList from '@/utils/crm_citys.js'
import isPassword from '@/utils/isPassword'
import isEmail from '@/utils/isEmail'
import isPhone from '@/utils/isPhone'
import isContacts from '@/utils/isContacts'
import agentFooter from '@/views/components/footer'
import agentHeader from '@/views/components/header'
import Vcode from '@/components/vue-puzzle-vcode-master/src/index.js'
const Base64 = require('js-Base64').Base64
export default {
  name: 'AgentRegister',
  desc: '代理商注册',
  components: {
    agentFooter,
    agentHeader,
    Vcode
  },
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认密码格式错误，确认密码与登录密码不一致'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('确认密码格式错误，确认密码与登录密码不一致'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        password: '',
        repassword: '',
        phone: '',
        email: '',
        desc: '',
        area: [],
        options: []
      },
      ruleForm2: {
        vcode: '',
        checked: ['checked']
      },
      rules: {
        name: [
          { required: true, message: '联系人格式错误', trigger: 'blur' },
          { validator: isContacts, min: 2, max: 15, message: '联系人格式错误', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码格式错误，密码为8-16个字符，区分大小写', trigger: 'blur' },
          { validator: isPassword, trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '确认密码格式错误，确认密码与登录密码不一致', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请填写正确的手机号码', trigger: 'blur' },
          { validator: isPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请填写正确的电子邮箱', trigger: 'blur' },
          { validator: isEmail, trigger: 'blur' }
        ],
        area: [
          { type: 'array', required: true, message: '请选择省份/城市', trigger: 'change' }
        ],
        vcode: [
          { required: true, message: '请输入手机短信验证码', trigger: 'change' },
          { min: 6, max: 6, message: '验证码不正确', trigger: 'change' }
        ],
        checked: [
          { type: 'array', required: true, message: '请阅读新网用户协议及代理协议并确认勾选', trigger: 'change' }
        ]
      },
      step: 1,
      success: false,
      downTime: 60,
      showVerifyBar: true,
      showVcode: false,
      btnDisabled: true,
      valid: false,
      valid2: false,
      btnLoading: false,
      vcodeLoading: true,
      isShow: false,
      passwordType: 'password',
      capsTooltip: false,
      formItems: ['name', 'password', 'repassword', 'phone', 'email', 'area'],
      formItems2: ['vcode', 'checked'],
      s_vid: '',
      captcha: '',
      redisKey: '',
      captchCode: '',
      agentCode: '',
      leftNum: 0
    }
  },
  mounted() {
    // this.$refs.vcode.validate()
    this.$refs.checked.validateState = 'success'
    // this.ruleForm.options = citysList.CITYS_LIST
    // console.log(this.getCoreProvice)
    getCoreProvice({}).then((response) => {
      this.ruleForm.options = response.data.map((v) => {
        if (v.children && v.children.length) {
          const newChildren = []
          v.children.map((v2) => {
            newChildren.push({
              label: v2.name,
              value: v2.code
            })
          })
          v.children = newChildren
        }
        return v
      })
    })
  },
  methods: {
    // ...mapActions('users', ['registDl']),
    // ...mapActions('area', ['getCoreProvice']),
    // ...mapActions('smsCaptcha', ['sendCaptchaWithMobile']),
    restPhone() {
      this.ruleForm.phone = this.ruleForm.phone.replace(/[^\d.]/g, '')
    },
    close() {
      this.isShow = false
    },
    handleShowVcode() {
      this.isShow = true
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
            mobileNum: this.ruleForm.phone,
            bustype: 'AGENT_REGISTER',
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
      }).catch((error) => {
        console.log(error)
      })
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
    // handleChange(value) {
    //     console.log(value);
    // },
    handleSuccess(num) {
      this.leftNum = num
      this.isShow = false
      setTimeout(() => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            validPhone({ teleNumber: this.ruleForm.phone }).then((response) => {
              if (!response.code) {
                this.showVcode = true
                this.showVerifyBar = false
                this.getVerificationCode()
              } else {
                // this.btnLoadingNext = true
                // this.btnDisabledNext = true
                if (response.code === '595030') { // 手机号已注册
                  this.$refs.phone.validateState = 'error'
                  this.$refs.phone.validateMessage = response.msg
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
      if (v && v === 'pw') {
        if (this.ruleForm.repassword.length) {
          this.$refs.ruleForm.validateField('repassword')
        }
      }
      if (this.showVcode) {
        setTimeout(() => {
          console.log(this.checkForm() + '-----' + this.checkForm2())
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
        console.log(this.checkForm() + '-----' + this.checkForm2())
        if (this.checkForm() && this.checkForm2()) {
          this.btnDisabled = false
        } else {
          this.btnDisabled = true
        }
      }, 10)
    },
    handleChange(v) {
      console.log(v)
      if (v) {
        if (this.checkForm2() && this.checkForm()) {
          this.btnDisabled = false
        } else {
          this.btnDisabled = true
        }
      } else {
        this.btnDisabled = true
      }
    },
    checkForm() {
      let flag = true
      for (let index = 0; index < this.formItems.length; index++) {
        // console.log(this.$refs[this.formItems[index]].validateState)
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
        // this.$refs.vcode.validate()
        // console.log(this.ruleForm2.vcode)
        // console.log(`${this.formItems2[index]}: ${this.$refs[this.formItems2[index]].validateState}`)
        if (this.$refs[this.formItems2[index]].validateState !== 'success') {
          flag = false
          break
        }
      }
      return flag
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
    onSubmit() {
      this.btnLoading = true
      if (this.checkForm2() && this.checkForm()) {
        const params = {
          userName: this.ruleForm.name,
          password: this.ruleForm.password,
          userNameEmail: this.ruleForm.email,
          provicesCode: this.ruleForm.area[0],
          cityCode: this.ruleForm.area[1],
          address: this.ruleForm.desc,
          telenumber: this.ruleForm.phone,
          s_vid: this.s_vid,
          captcha: this.ruleForm2.vcode,
          redisKey: this.redisKey,
          captchCode: this.captcha
        }
        console.log(params)
        registDl(params).then((response) => {
          this.btnLoading = false
          this.btnDisabled = true
          if (!response.code) {
            if (parseInt(response.data.isSuccess) === 1) {
              this.agentCode = response.data.agentCode
              this.step = 2
              setTimeout(() => {
                window.location.href = 'http://www.xinnet.com/agent/agent.html'
              }, 5000)
            } else {
              this.$message.error('注册失败')
            }
          } else {
            if (response.code === '595000') {
              this.$message.error(response.msg)
            } else if (response.code === '595030') {
              if (response.msg === '手机号已注册') {
                this.$refs.phone.validateState = 'error'
                this.$refs.phone.validateMessage = response.msg
              } else if (response.msg === '邮箱已存在') {
                this.$refs.email.validateState = 'error'
                this.$refs.email.validateMessage = response.msg
              }
            } else if (response.code === '595070') {
              this.$refs.vcode.validateState = 'error'
              this.$refs.vcode.validateMessage = response.msg
            } else {
              this.$message.error(response.msg)
            }
          }
        }).catch((error) => {
          console.log('=================')
          console.log(error)
          this.$message.error(error.msg)
          this.btnLoading = false
          this.btnDisabled = true
        })
      } else {
        this.btnLoading = false
        this.btnDisabled = true
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
#app{
  position: relative;
}
html,body{
  height: auto!important;
}
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
}
.main-body .step1 {
  width: 600px;
  margin: 0 auto;
  padding-top: 30px;
  background: #fff;
  border-radius: 5px;
  padding: 20px 50px;
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
.main-body .step1 h3{
  text-align: center;
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
  height: 38px;
  text-align: center;
  float: none!important;
}
.main-body .tips{
  font-size: 12px;
  color: #999;
  margin: 0 10px;
}
.main-body .el-form-item .el-input,
.main-body .el-form-item .el-textarea{
  width: 100%;
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
  width: 600px;
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
.main-body .step2 .agentCode{
  color: #f00;
  font-weight: 600;
}
</style>
