import React from 'react'

import { HorizontalBar } from 'react-chartjs-2'
import 'chartjs-plugin-datalabels'
import { useAccountQuery } from '../api'
import { createGraphDataByLanguages, getGraphOptions } from '../utils/graph'


const HomeComponent = () => {
  const { data } = useAccountQuery()
  
  let involvedGraphData, ownerGraphData
  if (data) {
    involvedGraphData = createGraphDataByLanguages(data.account.githubAnalysis?.languagesData.involvedLanguages)
    ownerGraphData = createGraphDataByLanguages(data.account.githubAnalysis?.languagesData.ownerLanguages)
  }
  
  const options = getGraphOptions()

  return (
    <>
      <h1>Github: {data?.account.name}</h1>

      <h2>作成したリポジトリ数: {data?.account.githubAnalysis?.repositoryCountData.ownerCount}</h2>
      <h3>言語レベル合計: {data?.account.githubAnalysis?.languagesData.ownerLanguagesTotal.level}</h3>
      {ownerGraphData && <HorizontalBar height={ownerGraphData.height} data={ownerGraphData} options={options} />}

      <h2>関与したリポジトリ数: {data?.account.githubAnalysis?.repositoryCountData.involvedCount}</h2>
      <h3>言語レベル合計: {data?.account.githubAnalysis?.languagesData.involvedLanguagesTotal.level}</h3>
      {involvedGraphData && <HorizontalBar height={involvedGraphData.height} data={involvedGraphData} options={options} />}
    </>
  )
}

export default HomeComponent