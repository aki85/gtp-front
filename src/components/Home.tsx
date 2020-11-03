import React from 'react'

import 'chartjs-plugin-datalabels'
import { useAccountQuery } from '../api'

import GithubAnalysisGraph from './githubAnalysis/Graph'


const HomeComponent = () => {
  const { data } = useAccountQuery()

  if (!data) {
    return <><h1> - GitHubAnalysis</h1></>
  }

  return (
    <>
      <h1>{data.account.name} - GitHubAnalysis</h1>

      <GithubAnalysisGraph githubAnalysis={data.account.githubAnalysis!} />
    </>
  )
}

export default HomeComponent