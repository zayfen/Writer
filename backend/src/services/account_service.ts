import * as AccountData from '../../data/account.json'

const Account = typeof AccountData === 'string' ? JSON.parse(AccountData) : AccountData

export type UserInfo = {
  passwd: string,
  aliasName: string,
  email: string
}

export type AccountType = {
  [key: string]: UserInfo
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