import UniversalCookie from 'universal-cookie'

const COOKIE_API_KEY = 'gitlev'

export const getAuthTokenCookie = (): string | undefined => {
  const cookie = new UniversalCookie()
  return cookie.get(COOKIE_API_KEY)
}

export const setAuthTokenCookie = (token: string, expires?: number): void => {
  const cookie = new UniversalCookie()
  cookie.set(
    COOKIE_API_KEY,
    token,
    { path: '/', expires: expires ? new Date(expires * 1000) : undefined })
}

export const removeAuthTokenCookie = (): void => {
  const cookie = new UniversalCookie()
  cookie.remove(COOKIE_API_KEY)
}
