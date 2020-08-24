<template>
  <div id="app" style="height:100%;position:relative">
    <agent-header />
    <div class="main-body">
      <el-form v-show="step === 1" ref="ruleForm" class="step1" :model="ruleForm" :rules="rules" label-width="0px">
        <h3>接受代理邀请</h3>
        <el-form-item ref="userName" label="" prop="userName">
          <el-input v-model="ruleForm.userName" placeholder="请输入您的手机号或邮箱" @blur="handleBlur" />
        </el-form-item>
        <el-tooltip v-model="capsTooltip" content="大写开启" placement="right" manual>
          <el-form-item ref="password" label="" prop="password">
            <el-input :key="passwordType" v-model="ruleForm.password" :type="passwordType" placeholder="请输入密码" @keyup.native="checkCapslock" @blur="handleBlur" />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>
        <el-form-item>
          <el-button type="primary" :disabled="btnDisabled" :loading="btnLoading" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
      <div v-show="step === 2" class="result step2">
        <div class="icon"><i class="el-icon-circle-check" /></div>
        <h3>操作成功！</h3>
        <p style="text-align:left;">您的账号已成功与代理商绑定，如需购买商品请按如下步骤操作：<br><br>
          1、选购商品<br>
          2、提交订单<br>
          3、与代理商取得联系，完成交易<br>
          4、管理商品
        </p>
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
import isPhoneOrEmail from '@/utils/isPhoneOrEmail'
import isPassword from '@/utils/isPassword'
import agentFooter from '@/views/components/footer'
import agentHeader from '@/views/components/header'
import { inviteCustomerRegistered } from '@/api/agent/users'
export default {
  name: 'AgentInvite',
  desc: '接受代理邀请',
  components: {
    agentFooter,
    agentHeader
  },
  data() {
    return {
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入您的手机号或邮箱', trigger: 'blur' },
          { validator: isPhoneOrEmail, message: '账号格式错误', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码格式错误，密码为8-16个字符，区分大小写', trigger: 'blur' },
          { validator: isPassword, trigger: 'blur' }
        ]
      },
      step: 1,
      btnDisabled: true,
      btnLoading: false,
      formItems: ['userName', 'password'],
      passwordType: 'password',
      capsTooltip: false,
      agentCode: ''
    }
  },
  beforeMount() {
    this.agentCode = this.GLOBALS.QUERY_STRING('agentCode')
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
    handleBlur(v) {
      setTimeout(() => {
        if (this.checkForm()) {
          this.btnDisabled = false
        } else {
          this.btnDisabled = true
        }
      }, 10)
    },
    checkForm() {
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
          const params = {
            agentCode: this.agentCode,
            password: this.ruleForm.password,
            userName: this.ruleForm.userName
          }
          inviteCustomerRegistered(params).then((response) => {
            this.btnLoading = false
            this.btnDisabled = true
            if (!response.code) {
              if (response.data.isSuccess === '1') {
                this.step = 2
              } else {
                this.$message.error('接受代理邀请失败')
              }
            } else {
              if (response.code === '590102') { // 账号密码不匹配
                this.$refs.password.validateState = 'error'
                this.$refs.password.validateMessage = response.msg
              } else if (response.code === '590100') { // 代理商未注册或暂未开通
                this.$refs.userName.validateState = 'error'
                this.$refs.userName.validateMessage = '账户不存在'
              } else if (response.code === '590104') { // 当前用户已绑定其他代理商
                this.$refs.userName.validateState = 'error'
                this.$refs.userName.validateMessage = response.msg
              } else if (response.code === '590107') { // 受邀用户只能为会员用户
                this.$refs.userName.validateState = 'error'
                this.$refs.userName.validateMessage = response.msg
              } else {
                this.$message.error(response.msg)
              }
            }
          })
        } else {
          this.btnLoading = false
          this.btnDisabled = true
        }
      })
    }
  }
}
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
.main-body .el-input{
  width: 100%!important;
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
