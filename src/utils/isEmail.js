import addRuleFunc from './addRuleFunc'

export function isEmail(val) {
  const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
  return reg.test(val)
}

isEmail.message = '邮箱格式有误'

export default addRuleFunc(isEmail)
