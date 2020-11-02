import UniversalCookie from 'universal-cookie'

const COOKIE_API_KEY = 'gitlev'

export const getAuthToken = (): string | undefined => {
  const cookie = new UniversalCookie()
  return cookie.get(COOKIE_API_KEY)
}

export const setAuthToken = (token: string, expires?: number): void => {
  const cookie = new UniversalCookie()
  cookie.set(
    COOKIE_API_KEY,
    token,
    { path: '/', expires: expires ? new Date(expires * 1000) : undefined })
}

export const removeAuthToken = (): void => {
  const cookie = new UniversalCookie()
  cookie.remove(COOKIE_API_KEY)
}
