
type DataType = {
  [key: string]: any
}

export function saveSessionStorage(key: string, data: DataType | null | undefined): void {
  let _data = data ? data : {}
  sessionStorage.setItem(key, JSON.stringify(_data))
}


export function loadSessionStorage (key: string, defaultData: DataType = {}): DataType {
  let data = defaultData
  let _data = sessionStorage.getItem(key)
  if (_data) {
    data = JSON.parse(_data)
  }
  return data
}
