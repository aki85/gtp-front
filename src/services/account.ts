import * as cookie from '../repos/cookies'

export default class AccountService {
  // signup() {

  // }

  // login() {

  // }

  public loadAuth() {
    return cookie.getAuthTokenCookie()
  }

  // getProfile() {

  // }

  // updateProfile() {

  // }

  // withdrawal() {

  // }

  // logout(){
  //   cookie.removeAuthTokenCookie()
  // }
}