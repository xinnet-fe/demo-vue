import Cookies from 'js-cookie'

// cookie
const TokenKey = 'Admin-Token'
export function getToken(key) {
  const tokey = key || TokenKey
  return Cookies.get(tokey)
}

/**
 * @param {string} token  tokenValue
 * @param {string} key    tokenKey
 */
export function setToken(key, token) {
  return Cookies.set(key, token)
}

export function removeToken(key) {
  return Cookies.remove(key)
}

// storage
export function getStore(key) {
  return JSON.parse(sessionStorage.getItem(key))
}

export function setStore(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value))
}

export function removeStore(key) {
  sessionStorage.removeItem(key)
}
