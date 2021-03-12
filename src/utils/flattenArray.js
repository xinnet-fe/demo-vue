import forEach from 'lodash/forEach'

/**
 * @param {Array} arr
 */
export default function flattenArray(arr, newArr) {
  forEach(arr, row => {
    if (!row.childList) {
      newArr.push(row)
    } else {
      const { childList, ...other } = row
      newArr.push(other)
      flattenArray(childList, newArr)
    }
  })
}

