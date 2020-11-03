import React from 'react'

import 'chartjs-plugin-datalabels'
import { useGithubAnalysisByLoginQuery } from '../api'

import GithubAnalysisGraph from './githubAnalysis/Graph'
import { useParams } from 'react-router-dom'


const ViewComponent = () => {
  const { login } = useParams()
  const { data, error } = useGithubAnalysisByLoginQuery({
    variables: {
      login
    }
  })

  if (error) {
    return (
      <>
        <h1>{login} - GitHubAnalysis</h1>
  
        <h2>GitHub情報が取得できませんでした。IDを確認してください。</h2>
      </>
    )
  }

  if (!data) {
    return <><h1> - GitHubAnalysis</h1></>
  }

  return (
    <>
      <h1>{data.githubAnalysisByLogin.login} - GitHubAnalysis</h1>

      <GithubAnalysisGraph githubAnalysis={data.githubAnalysisByLogin} />
    </>
  )
}

export default ViewComponent