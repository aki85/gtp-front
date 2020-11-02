import axios, { AxiosResponse, AxiosInstance } from 'axios';
import _ from 'lodash'
import { CoopInfo } from '../api'

export const getApi = (token?: string | null) => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: token ? 'Bearer' + token : ''
    }
  })
}

export const signupByCoop = async (
  api: AxiosInstance, coopInfo: CoopInfo
): Promise<AxiosResponse<void>> => {
  const url = `/signupByCoop`
  return await api.post(url, coopInfo)
}

export const register = async (
  api: AxiosInstance, params: {token: string}
): Promise<AxiosResponse<{token: string}>> => {
  const url = `/register`
  return await api.post(url, params)
}

export const loginByCoop = async (
  api: AxiosInstance, coopInfo: CoopInfo
): Promise<AxiosResponse<{token: string}>> => {
  const url = `/loginByCoop`
  return await api.post(url, coopInfo)
}

export const cancelMembership = async (
  api: AxiosInstance
): Promise<AxiosResponse<void>> => {
  const url = `/cancelMembership`
  return await api.delete(url)
}