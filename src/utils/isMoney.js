import addRuleFunc from './addRuleFunc'

export function isMoney(val) {
  return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(val)
}

isMoney.message = '格式有误'

export default addRuleFunc(isMoney)
