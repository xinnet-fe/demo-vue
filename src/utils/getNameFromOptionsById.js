import find from 'lodash/find'

/* 根据options数组和id取出对应的名字显示用
 * @params Array options格式为 [{id: 123, name: 'NAME'}]
 * @param Integer || String id为Integer或String
 * @return String
 * */
export default function getNameFromOptionsById(options, id) {
  if (options && options.length > 0) {
    const option = find(options, o => {
      return parseInt(o.id, 10) === parseInt(id, 10)
    })
    if (option) {
      return option.name
    }
    return ''
  }
  return ''
}
