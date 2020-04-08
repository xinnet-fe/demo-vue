import addRuleFunc from './addRuleFunc'

// ?=（预测）数字或字符包含在.*（任意位置），只接收数字字母8~16位
export function isPassword(val) {
  const reg = /^(?=.*[0-9])(?=.*[a-z|A-Z])[0-9a-zA-Z]{8,16}$/
  if (val && !reg.test(val)) {
    return false
  }
  return true
}

isPassword.message = '密码必须数字字母混合8～16位！'

export default addRuleFunc(isPassword)
