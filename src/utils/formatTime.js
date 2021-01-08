import moment from 'moment'

const formatTime = (timestamp, format = 'YYYY-MM-DD HH:mm:ss') => {
  timestamp = parseInt(timestamp, 10)
  const time = moment(timestamp)
  if (time.isValid()) {
    return time.format(format)
  }
  return ''
}

export default formatTime
