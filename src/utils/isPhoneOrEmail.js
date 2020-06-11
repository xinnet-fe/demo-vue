import addRuleFunc from './addRuleFunc'

export function isPhoneOrEmail(val) {
  return (/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(val)) || (/^1\d{10}$/.test(val))
}

isPhoneOrEmail.message = '手机号码格式有误'

export default addRuleFunc(isPhoneOrEmail)
