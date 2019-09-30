import * as AccountData from '../../data/account.json'

const Account = typeof AccountData === 'string' ? JSON.parse(AccountData) : AccountData

export type UserInfo = {
  passwd: string,
  aliasName: string,
  email: string,
  privilege: "admin" | "write" | "read"
}

export type AccountType = {
  [key: string]: UserInfo
}


function dynGetAccountData () {
  return new Promise((resolve, reject) => {
    import('../../data/account.json').then(data => {
      let accountData = typeof data === 'string' ? JSON.parse(data) : data
      resolve(data)
    })    
  })
}

class AccountService {
  public static validAccount (userName: string, passwd: string): boolean {
    return Account[userName] && Account[userName].passwd === passwd
  }

  public static getUserInfo (userName: string): UserInfo | null {
    return Account[userName] ? Account[userName] : null
  }
}

export default AccountService