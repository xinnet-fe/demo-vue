import addRuleFunc from './addRuleFunc'

export function isPhone(val) {
  return /^1[3456789]\d{9}$/.test(val)
}

isPhone.message = '手机号码格式有误'

export default addRuleFunc(isPhone)
