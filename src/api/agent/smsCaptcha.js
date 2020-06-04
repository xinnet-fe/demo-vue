import request from '@/utils/request'

export function sendCaptchaWithMobile(query) {
  return request({
    url: '/smsCaptcha/sendCaptchaWithMobile',
    method: 'POST',
    params: query
  })
}
