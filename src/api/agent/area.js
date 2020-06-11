/*
 * @Author: your name
 * @Date: 2020-06-03 15:45:38
 * @LastEditTime: 2020-06-08 14:35:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \202003-xinnet-webd:\works\demo-vue\src\api\agent\area.js
 */ 
import request from '@/utils/http'

export function getCoreProvice(data) {
  return request({
    url: '/agent/api/area/getCoreProvice',
    method: 'POST',
    data
  })
}