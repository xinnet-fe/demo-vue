export const formatEnUnit = u => {
  const obj = {
    'Y': '年',
    'M': '月',
    'D': '日',
    'C': '次'
  }
  return obj[u]
}

export const formatDeUnit = u => {
  const obj = {
    '年': 'Y',
    '月': 'M',
    '日': 'D',
    '次': 'C'
  }
  return obj[u]
}
