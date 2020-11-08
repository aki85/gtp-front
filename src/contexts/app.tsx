import React, { useState, useEffect } from 'react'

import AuthService from '../services/auth'
import { CoopInfo } from '../api'

interface CurrentAccount {
  token: string,
  githubInfo: {
    alias: string,
    name: string
  }
}


export const AccountContext = React.createContext<{
  token: string|undefined,
  setToken: (token: string|undefined) => void
  currentAccount: CurrentAccount|undefined,
  setCurrentAccount: (currentAccount: CurrentAccount|undefined) => void
} | undefined>(undefined)
export const AuthServiceContext = React.createContext<AuthService | undefined>(undefined)

export const AppContextProvider: React.FC = ({ children }) => {
  const authService = new AuthService()
  
  const [token, setToken] = useState<string|undefined>(undefined)
  const [currentAccount, setCurrentAccount] = useState<CurrentAccount|undefined>(undefined)
  useEffect(() => {
    if (!currentAccount) {
      setToken(authService.getToken())
      setCurrentAccount(authService.getCurrentAccount())
    }
  }, [authService, currentAccount])

  return (
    <AccountContext.Provider value={{token, setToken, currentAccount, setCurrentAccount}}>
      <AuthServiceContext.Provider value={authService}>
        { children }
      </AuthServiceContext.Provider>
    </AccountContext.Provider>
  )
}

export const useAccountContext = () => {
  const context = React.useContext(AccountContext)
  if (context === undefined) {
    throw new Error('useAccountContext must be used within a AppContextProvider')
  }
  return context
}

export const useAppContext = () => {
  const {token, setToken, currentAccount, setCurrentAccount} = useAccountContext()
  const authService = React.useContext(AuthServiceContext)
  if (authService === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider')
  }

  const signupByCoop = async (params: {type: string} & CoopInfo) => {
    await authService.signupByCoop(params)
  }

  const register = async (token: string) => {
    const userToken = await authService.register(token)
    setToken(userToken)
  }

  const loginByCoop = async (params: {type: string} & CoopInfo) => {
    const userToken = await authService.loginByCoop(params)
    setToken(userToken)
  }

  const cancelMembership = async () => {
    await authService.cancelMembership()
    setToken(undefined)
  }

  const logout = () => {
    authService.logout()
    setToken(undefined)
  }

  return {
    token,
    setToken,
    currentAccount,
    setCurrentAccount,
    signupByCoop,
    register,
    loginByCoop,
    cancelMembership,
    logout,
  }
}