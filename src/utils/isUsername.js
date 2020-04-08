import addRuleFunc from './addRuleFunc'

export function isUsername(val) {
  const reg = /^[0-9a-zA-Z.@]{8,26}$/
  if (val && !reg.test(val)) {
    return false
  }
  return true
}

isUsername.message = '用户名必须数字或字母8～26位！'

export default addRuleFunc(isUsername)
