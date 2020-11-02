import forEach from 'lodash/forEach'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import isBoolean from 'lodash/isBoolean'
import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'

export default data => {
  forEach(data, (value, key) => {
    let newValue
    console.log(value)
    if (isString(value)) {
      newValue = ''
    } else if (isNumber(value)) {
      newValue = 0
    } else if (isBoolean(value)) {
      newValue = false
    } else if (isArray(value)) {
      newValue = []
    } else if (isPlainObject(value)) {
      newValue = {}
    } else {
      newValue = null
    }

    data[key] = newValue
  })
}
