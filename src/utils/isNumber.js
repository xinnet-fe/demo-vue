import addRuleFunc from './addRuleFunc'

export function isNumber(val) {
  return /^\d+$/.test(val)
}

isNumber.message = '必须是数字'

export default addRuleFunc(isNumber)
