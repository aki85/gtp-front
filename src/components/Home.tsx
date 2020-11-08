import React from 'react'

import 'chartjs-plugin-datalabels'
import { useAccountQuery } from '../api'

import GithubAnalysisGraph from './githubAnalysis/Graph'


const HomeComponent = () => {
  const { data } = useAccountQuery()

  if (!data) {
    return <></>
  }

  return (
    <>
      <h1>{data.account.name}</h1>

      <GithubAnalysisGraph githubAnalysis={data.account.githubAnalysis!} />
    </>
  )
}

export default HomeComponent