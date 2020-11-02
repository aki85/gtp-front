import React from 'react'

import AuthService from '../services/auth'

export const AuthServiceContext = React.createContext<AuthService | undefined>(undefined)

export const AuthServiceContextProvider: React.FC = ({ children }) => {
  const authService = new AuthService()
  return (
    <AuthServiceContext.Provider value={authService}>
      { children }
    </AuthServiceContext.Provider>
  )
}


export const useAuthServiceContext = () => {
  const context = React.useContext(AuthServiceContext)
  if (context === undefined) {
    throw new Error('useAppService must be used within a AppContextProvider')
  }
  return context
}
