import isEmpty from 'lodash/isEmpty'
import property from 'lodash/property'
import flow from 'lodash/flow'

export default path => flow([property(path), isEmpty])
