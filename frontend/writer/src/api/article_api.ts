import net from '@/utils/net'

interface Response {
  code: number,
  message: string,
  data: { [key: string ]: any }
}
 
export function getArticlesList (): Promise<Response> {
  const URL = '/api/article/list'
  return new Promise<Response>((resolve, reject) => {
    net.get(URL, {}).then(response => {
      resolve(response.data)
    })
  })
}