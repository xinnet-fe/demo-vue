import addRuleFunc from './addRuleFunc'

export function isDomain(val) {
  /* 不能以.或-或.开头，不能以-结尾 */
  if ((/^(\.|-|\.)/i).test(val) || /-$/.test(val)) {
    return false
  }
  /* 检测非alpha字符，针对中文 */
  if ((/[^\d\w\-.]/).test(val)) {
    if (val.length > 20) {
      return false
    }
    if (/--/.test(val)) {
      return false
    }
    /* 参考
     * http://blog.csdn.net/rheostat/article/details/9835693
     * 小于0x007f的字符为一字节长度
     * 0x0080-0x07ff的字符2字节长度
     * 0x0800-0xffff的字符3字节长度
     * 正则参考以下网址
     * http://www.cnblogs.com/ChengDong/articles/3771880.html
     * */
    if (!/([\w\u4E00-\u9FA5\uF900-\uFA2D]+.)+\.\w+/.test(val)) {
      return false
    }
  /* 纯英文域名 */
  } else {
    if (val.length > 67) {
      return false
    }
    if (!/\.\w+$/.test(val)) {
      return false
    }
  }
  return true
}

isDomain.message = '域名格式有误'

export default addRuleFunc(isDomain)
