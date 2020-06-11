import request from '@/utils/http'

export function sendCaptchaWithMobile(query) {
  return request({
    url: '/agent/api/smsCaptcha/sendCaptchaWithMobile',
    method: 'POST',
    params: query
  })
}
