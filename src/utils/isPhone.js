import addRuleFunc from './addRuleFunc'

export function isPhone(val) {
  return /^1\d{10}$/.test(val)
}

isPhone.message = '手机号码格式有误'

export default addRuleFunc(isPhone)
