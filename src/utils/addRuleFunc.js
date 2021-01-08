export default validator => (rule, value, callback) => {
  if (!value) {
    callback()
  } else if (!validator(value)) {
    const message = rule.message || validator.message
    callback(new Error(message))
  } else {
    callback()
  }
}
