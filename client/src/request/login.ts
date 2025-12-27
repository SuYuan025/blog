import axios from 'axios'

// 登录
export async function login(data: any) {
  return axios({
    url: '/admin/login',
    method: 'post',
    data
  })
}