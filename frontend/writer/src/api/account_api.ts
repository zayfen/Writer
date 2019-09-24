import net from '@/utils/net'

interface Response {
  code: number,
  message: string,
  data: { [key: string ]: any }
}

export function login (userName: string, passwd: string) {
  const URL = '/api/account/login'
  return net.post(URL, { userName, passwd }, null)
}

export function logout () {
  const URL = '/api/account/logout'
  return net.post(URL, {}, null)
}

export function alreadyLogin () {
  const URL = '/api/account/alreadyLogin'
  return net.post(URL, {}, null)
}