import axios from 'axios'

export const getApi = () => {
  return axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_GITHUB_AUTH_TOKEN}`,
    }
  })
}

export interface GithubInfo {
  involvedRepogitoryCount: number
}

export const getGithubInfo = async (): Promise<GithubInfo> => {
  const api = getApi()
  const res = await api.post('/graphql', {query: `
    query {
      repositoryOwner(login: "aki85"){
        repositories(first:100){
          totalCount
        }
      }
    }`
  })
  const data = res.data.data
  console.log('data', data)
  return {
    involvedRepogitoryCount: data.repositoryOwner.repositories.totalCount
  }
}