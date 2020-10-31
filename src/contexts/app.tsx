import React from 'react'

import AccountService from '../services/account'

export const AccountServiceContext = React.createContext<AccountService | undefined>(undefined)

export const AccountServiceContextProvider: React.FC = ({ children }) => {
  const accountService = new AccountService()
  return (
    <AccountServiceContext.Provider value={accountService}>
      { children }
    </AccountServiceContext.Provider>
  )
}


export const useAccountServiceContext = () => {
  const context = React.useContext(AccountServiceContext)
  if (context === undefined) {
    throw new Error('useAppService must be used within a AppContextProvider')
  }
  return context
}
