import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import 'chartjs-plugin-datalabels'
import { useAccountQuery, useGithubAnalysisLogsQuery, useSaveGithubAnalysisMutation, useDeleteGithubAnalysisMutation } from '../api'

import GithubAnalysisGraph from './githubAnalysis/Graph'
import { formatDate } from '../utils/date'


const HomeComponent = () => {
  const query = new URLSearchParams(useLocation().search)
  const history = useHistory()
  const { data } = useAccountQuery()
  const githubAnalysisLogsQuery = useGithubAnalysisLogsQuery()
  const [saveGithubAnalysisMutation] = useSaveGithubAnalysisMutation()
  const [deleteGithubAnalysisMutation] = useDeleteGithubAnalysisMutation()
  const logIndex = Number(query.get('index')) || 0

  const githubAnalysisLogs = githubAnalysisLogsQuery.data?.githubAnalysisLogs
  useEffect(() => {
    if (!githubAnalysisLogsQuery.loading && (!githubAnalysisLogs || githubAnalysisLogs.length < logIndex)) {
      history.push('/')
    }
  }, [githubAnalysisLogsQuery])

  let githubAnalysis = data?.account.githubAnalysis
  if (logIndex && githubAnalysisLogs) {
    githubAnalysis = githubAnalysisLogs[logIndex-1]
  }

  if (!githubAnalysis) {
    return <></>
  }

  function toPrev() {
    const index = logIndex+1
    history.push({
      pathname: '/',
      search: '?index='+index
    })
  }

  function toNext() {
    const index = logIndex-1
    history.push({
      pathname: '/',
      search: '?index='+index
    })
  }

  async function saveGitHubAnalysis() {
    await saveGithubAnalysisMutation()
    await githubAnalysisLogsQuery.refetch()
  }

  async function deleteGitHubAnalysis() {
    if (!githubAnalysisLogs) return
    const githubAnalysis = githubAnalysisLogs[logIndex-1]
    await deleteGithubAnalysisMutation({
      variables: {id: githubAnalysis.id!}
    })
    toNext()
    await githubAnalysisLogsQuery.refetch()
  }

  return (
    <>
      <h1>
        {data!.account.name}
        {githubAnalysisLogs &&
          <>
            {logIndex < githubAnalysisLogs.length &&
              <button className="btn btn-dark" onClick={() => toPrev()}>Prev</button>
            }
            {0 < logIndex &&
              <button className="btn btn-dark" onClick={() => toNext()}>Next</button>
            }
          </>
        }
      
        {logIndex === 0 &&
          <button className="btn btn-success btn-right" onClick={() => saveGitHubAnalysis()}>Save</button>
        }
      
        {logIndex !== 0 &&
          <button className="btn btn-danger btn-right" onClick={() => deleteGitHubAnalysis()}>Delete</button>
        }
      </h1>
      {!logIndex &&
        <h4>最終更新日時: {formatDate(githubAnalysis?.syncedAt)}</h4>
      }
      {!!logIndex &&
        <h4>更新日時: {formatDate(githubAnalysis?.syncedAt)} 保存日時: {formatDate(githubAnalysis?.savedAt)}</h4>
      }

      <GithubAnalysisGraph githubAnalysis={githubAnalysis!} />
    </>
  )
}

export default HomeComponent