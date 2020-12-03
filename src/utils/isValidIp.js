import addRuleFunc from '../utils/addRuleFunc'

export function isValidIp(arg) {
  var regEx = /,/g
  var ipList = arg.toString().replace(regEx, ',').split(',')
  var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])-(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])-(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])-(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  for (var i in ipList) {
    if (!reg.test(ipList[i])) {
      return false
    }
  }
  return true
}

isValidIp.message = '请输入节点ip地址，多节点用 - 分隔！'

export default addRuleFunc(isValidIp)
