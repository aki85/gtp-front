import React from 'react'

import { HorizontalBar } from 'react-chartjs-2'
import 'chartjs-plugin-datalabels'
import { GithubAnalysis } from '../../api'
import { createGraphDataByLanguages, getGraphOptions } from '../../utils/graph'

type Props = {
  githubAnalysis: GithubAnalysis,
  type?: 'involved'|'owner'
}

const GithubAnalysisGraph: React.FC<Props> = ({ githubAnalysis, type }) => {
  const involvedGraphData = createGraphDataByLanguages(githubAnalysis.languagesData.involvedLanguages)
  const ownerGraphData = createGraphDataByLanguages(githubAnalysis.languagesData.ownerLanguages)
  const options = getGraphOptions()
  const hideOwner = type === 'involved'
  const hideInvolved = type === 'owner'

  return (
    <>
      {0 < githubAnalysis.repositoryCountData.ownerCount && !hideOwner &&
        <>
          <h2>作成したリポジトリ数: {githubAnalysis.repositoryCountData.ownerCount}</h2>
          <h3>言語レベル合計: {githubAnalysis.languagesData.ownerLanguagesTotal.level}</h3>
          {ownerGraphData && <HorizontalBar key={githubAnalysis.login} height={ownerGraphData.height} data={ownerGraphData} options={options} />}
        </>
      }

      {0 < githubAnalysis.repositoryCountData.involvedCount && !hideInvolved &&
        <>
          <h2>関与したリポジトリ数: {githubAnalysis.repositoryCountData.involvedCount}</h2>
          <h3>言語レベル合計: {githubAnalysis.languagesData.involvedLanguagesTotal.level}</h3>
          {involvedGraphData && <HorizontalBar key={githubAnalysis.login} height={involvedGraphData.height} data={involvedGraphData} options={options} />}
        </>
      }

      {!githubAnalysis.repositoryCountData.involvedCount &&
        <>
          <h3>
            関与した公開リポジトリがないため、言語レベルを計算できません
          </h3>
        </>
      }

    </>
  )
}

export default GithubAnalysisGraph