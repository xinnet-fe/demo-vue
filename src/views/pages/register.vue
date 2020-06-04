<template>
  <div>
    <agent-header></agent-header>
    <div class="main-body">
      <div class="step1" v-show="step === 1">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
          <h3>立即申请加盟新网代理</h3>
          <el-form-item label="联系人" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repassword">
            <el-input v-model="ruleForm.repassword"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="所属省份/城市" prop="area">
              <el-cascader :options="ruleForm.options" v-model="ruleForm.area" expand-trigger="hover"></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="" v-if="showVerifyBar">
            <Vcode :show="isShow" @success="handleSuccess" @close="close" />
            <span class="btnShowVcode"  @click="handleShowVcode">点击开始验证</span>
          </el-form-item>
        </el-form>
        <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules" label-width="120px">
          <el-form-item label="手机验证码" prop="vcode" v-show="showVcode">
            <el-input v-model="ruleForm2.vcode" maxlength="4" class="inputVcode" @blur="handleBlur"></el-input>
            <el-button class="getVcode" @click="getVerificationCode" v-show="!success">获取验证码</el-button>
            <span class="tips" v-show="success">重新发送({{downTime}})</span>
          </el-form-item>
          <el-form-item label="" prop="checked">
            <el-checkbox v-model="ruleForm2.checked" @change="handleChange">我已阅读并同意</el-checkbox>
            <a href="http://www.xinnet.com/views/agreement/register_agreement.html" target="_blank">《新网用户协义》</a>
            <a href="/Modules/downloads/register/AgentRegistrationAgreement.zip" target="_blank">《代理合同》</a>
          </el-form-item>
          <el-form-item class="item-btn">
            <el-button type="primary" @click="onSubmit" :disabled="btnDisabled" :loading="btnLoading">提交申请</el-button>
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
import citysList from '@/utils/crm_citys.js'
import isNumber from '@/utils/isNumber'
import isPassword from '@/utils/isPassword'
import isEmail from '@/utils/isEmail'
import isPhone from '@/utils/isPhone'
import agentFooter from '@/views/components/footer'
import agentHeader from '@/views/components/header'
import Vcode from "vue-puzzle-vcode"
export default {
  name: 'agentRegister',
  desc: '代理商注册',
  components: {
    agentFooter,
    agentHeader,
    Vcode
  },
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    };
    return {
      ruleForm: {
        name: "",
        password: "",
        repassword: "",
        phone: "",
        email: "",
        desc: "",
        area: [],
        options: []
      },
      ruleForm2: {
        vcode: "",
        checked: []
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
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
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: isEmail, trigger: 'blur' }
        ],
        area: [
          { type: 'array', required: true, message: '请选择区域', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        vcode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入4位验证码', trigger: 'blur' }
        ],
        checked: [
          { type: 'array', required: true, message: '请勾选', trigger: 'change' }
        ]
      },
      step: 1,
      success: false,
      downTime: 60,
      showVerifyBar: true,
      showVcode: false,
      btnDisabled: true,
      barSize: {width: '378px', height: '40px'},
      valid: false,
      valid2: false,
      btnLoading: false,
      isShow: false
    };
  },
  mounted () {
    this.ruleForm.options = citysList.CITYS_LIST
    // console.log(this.getCoreProvice)
    this.getCoreProvice({}).then((response) => {
      this.options = response.data
    })

  },
  methods: {
    ...mapActions('users', ['registDl']),
    ...mapActions('area', ['getCoreProvice']),
    ...mapActions('smsCaptcha', ['sendCaptchaWithMobile']),
    close () {
      this.isShow = false
    },
    handleShowVcode () {
      this.isShow = true
    },
    getVerificationCode () {
      let result = true
      this.success = true
      this.countDown()
      if (result) {
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
    // handleChange(value) {
    //     console.log(value);
    // },
    handleSuccess (obj) {
      if (this.checkForm()) {
        this.showVcode = true
        this.showVerifyBar = false
        this.getVerificationCode()
      } else {
        obj.refresh()
      }
    },
    handleBlur () {
      if (this.checkForm2() && this.checkForm()) {
        this.btnDisabled = false
      } else {
        this.btnDisabled = true
      }
    },
    handleChange (v) {
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
    checkForm () {
      this.$refs.ruleForm.validate((valid) => {
        this.valid = valid
      })
      return this.valid
    },
    checkForm2 () {
      this.$refs.ruleForm2.validate((valid) => {
        this.valid2 = valid
      })
      return this.valid2
    },
    onSubmit() {
      this.btnLoading = true
      if (this.checkForm2() && this.checkForm()) {
        let params = this.ruleForm;
        console.log(params)
        this.registDl(params).then((response) => {
          this.step = 2
        })
      } else {
        this.btnLoading = false
        this.btnDisabled = true
      }
    }
  }
}
</script>
<style>
#app{
  position: relative;
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
</style>