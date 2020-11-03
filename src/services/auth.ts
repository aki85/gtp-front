import * as cookie from '../repos/cookies'
import {
  getApi,
  signupByCoop,
  register,
  loginByCoop,
  cancelMembership,
} from '../repos/api'
import { CoopInfo } from '../api'

export default class AuthService {
  getToken() {
    return cookie.getAuthToken()
  }

  async signupByCoop(params: {type: string} & CoopInfo) {
    const api = getApi()
    await signupByCoop(api, params)
    return
  }

  async register(token: string) {
    const api = getApi()
    const response = await register(api, {token})
    cookie.setAuthToken(response.data.token)
    return response.data.token
  }

  async loginByCoop(params: {type: string} & CoopInfo) {
    const api = getApi()
    const response = await loginByCoop(api, params)
    cookie.setAuthToken(response.data.token)
    return response.data.token
  }

  async cancelMembership() {
    const api = getApi(cookie.getAuthToken())
    await cancelMembership(api)
    cookie.removeAuthToken()
    return
  }

  logout(){
    cookie.removeAuthToken()
  }
}