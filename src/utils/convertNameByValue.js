/**
 * [{ region: beijing }] => [{ regionName: 北京 }]
 * @param {String} from
 * @param {String} to
 * @param {PlainObject} row
 * @param {PlainObject} options
 */
const convertValueToName = (from, to, options, row) => {
  row[to] = options[row[from]]
}

export default convertValueToName
