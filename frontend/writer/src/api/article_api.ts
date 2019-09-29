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

export function getArticleById (id: string): Promise<Response> {
  const URL = `/api/article/${id}`
  return new Promise<Response>((resolve, reject) => {
    net.get(URL, {}).then(response => {
      resolve(response.data)
    })
  })
}

export function updateArticle (id: string, article: any): Promise<Response> {
  const URL = `/api/article/update/${id}`
  return new Promise<Response>((resolve, reject) => {
    net.post(URL, article, {}).then(response => {
      resolve(response.data)
    })
  })
}

export function createArticle (article: any): Promise<Response> {
  const URL = '/api/article/create'
  return new Promise<Response>((resolve, reject) => {
    net.post(URL, article, {}).then(response => {
      resolve(response.data)
    })
  })
}


export function deleteArticle (id: string): Promise<Response> {
  const URL = `/api/article/delete/${id}`
  return new Promise<Response>((resolve, reject) => {
    net.post(URL, {}, {}).then(response => {
      resolve(response.data)
    })
  })
}