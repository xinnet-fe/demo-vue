import addRuleFunc from './addRuleFunc'

export function isMoney(val) {
  const reg = /^(([1-9]\d*)|0)(\.\d{1,2})?$/
  if (val && !reg.test(val)) {
    return false
  }
  return true
}
// 可以为0的金额
isMoney.message = '货币格式错误！'

export default addRuleFunc(isMoney)
