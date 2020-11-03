import React, { useState, useEffect } from 'react'

import AuthService from '../services/auth'
import { CoopInfo } from '../api'

export const TokenContext = React.createContext<{
  token: string|undefined,
  setToken: (token: string|undefined) => void
} | undefined>(undefined)
export const AuthServiceContext = React.createContext<AuthService | undefined>(undefined)

export const AppContextProvider: React.FC = ({ children }) => {
  const authService = new AuthService()
  
  const [token, setToken] = useState<string|undefined>(undefined)
  useEffect(() => {
    if (!token) {
      setToken(authService.getToken())
    }
  }, [authService, token])

  return (
    <TokenContext.Provider value={{token, setToken}}>
      <AuthServiceContext.Provider value={authService}>
        { children }
      </AuthServiceContext.Provider>
    </TokenContext.Provider>
  )
}

export const useTokenContext = () => {
  const context = React.useContext(TokenContext)
  if (context === undefined) {
    throw new Error('useTokenContext must be used within a AppContextProvider')
  }
  return context
}

export const useAppContext = () => {
  const {token, setToken} = useTokenContext()
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
    signupByCoop,
    register,
    loginByCoop,
    cancelMembership,
    logout,
  }
}
