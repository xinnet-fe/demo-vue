import addRuleFunc from './addRuleFunc'

export function within20Length(val) {
  const len = val.length <= 20
  console.log(val)
  console.log(val.length)
  return len
}

export function within500Length(val) {
  return val.length <= 500
}

within20Length.message = '级别名称不能超过20个字符'
within500Length.message = '备注不能超过500个字符'

const within20Len = addRuleFunc(within20Length)
const within500Len = addRuleFunc(within500Length)

export {
  within20Len,
  within500Len
}
