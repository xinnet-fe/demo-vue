import addRuleFunc from './addRuleFunc'

export function isContacts(val) {
  const reg = /^[\u4e00-\u9fa5A-Za-z]{2,15}$/
  if (val && !reg.test(val)) {
    return false
  }
  return true
}

isContacts.message = '必须中文英文！'

export default addRuleFunc(isContacts)
