export default function isDate(date) {
  return /^\d{4}-\d{1,2}-\d{1,2}\s\d{1,2}:\d{1,2}:\d{1,2}$/.test(date)
}
