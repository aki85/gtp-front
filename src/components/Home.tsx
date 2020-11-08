import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import 'chartjs-plugin-datalabels'
import { useAccountQuery, useGithubAnalysisLogsQuery, useSaveGithubAnalysisMutation, useDeleteGithubAnalysisMutation } from '../api'

import GithubAnalysisGraphRow from './githubAnalysis/GraphRow'
import { formatDate } from '../utils/date'


const HomeComponent = () => {
  const query = new URLSearchParams(useLocation().search)
  const history = useHistory()
  const { data } = useAccountQuery()
  const githubAnalysisLogsQuery = useGithubAnalysisLogsQuery()
  const [saveGithubAnalysisMutation] = useSaveGithubAnalysisMutation()
  const [deleteGithubAnalysisMutation] = useDeleteGithubAnalysisMutation()
  const isCompare = Boolean(query.get('isCompare')) || false
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
    const isCompareQuery = isCompare ? '&isCompare=true' : ''
    history.push({
      pathname: '/',
      search: '?index='+index+isCompareQuery
    })
  }

  function toNext() {
    const index = logIndex-1
    const isCompareQuery = isCompare ? '&isCompare=true' : ''
    history.push({
      pathname: '/',
      search: '?index='+index+isCompareQuery
    })
  }

  function compareWithLatest() {
    history.push({
      search: '?index='+logIndex+'&isCompare=true'
    })
  }

  function hideCompare() {
    history.push({
      search: '?index='+logIndex
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
      <Row className="d-md-none">
        <Col md="12">
          {githubAnalysisLogs &&
            <>
              {logIndex < githubAnalysisLogs.length &&
                <button className="btn btn-dark" onClick={() => toPrev()}>Prev</button>
              }
              {logIndex >= githubAnalysisLogs.length &&
                <div style={{display: 'inline-block', width: '88.56px'}}></div>
              }
              {0 < logIndex &&
                <button className="btn btn-dark" onClick={() => toNext()}>Next</button>
              }
            </>
          }
          
          {!isCompare && logIndex === 0 &&
            <button className="btn btn-success btn-right" onClick={() => saveGitHubAnalysis()}>Save</button>
          }
        
          {!isCompare && logIndex !== 0 &&
            <button className="btn btn-danger btn-right" onClick={() => deleteGitHubAnalysis()}>Delete</button>
          }
        </Col>
      </Row>

      <Row className={'d-none d-md-flex' + (isCompare ? ' compared-graphs' : '')}>
        <Col md={isCompare ? 6 : 12}>
          <h1>
            {data!.account.name}
            {githubAnalysisLogs &&
              <>
                {logIndex < githubAnalysisLogs.length &&
                  <button className="btn btn-dark" onClick={() => toPrev()}>Prev</button>
                }
                {logIndex >= githubAnalysisLogs.length &&
                  <div style={{display: 'inline-block', width: '88.56px'}}></div>
                }
                {0 < logIndex &&
                  <button className="btn btn-dark" onClick={() => toNext()}>Next</button>
                }
                {!isCompare && 0 < logIndex &&
                  <button className="btn btn-dark" onClick={() => compareWithLatest()}>Compare with Latest</button>
                }
              </>
            }
          
            {!isCompare && logIndex === 0 &&
              <button className="btn btn-success btn-right" onClick={() => saveGitHubAnalysis()}>Save</button>
            }
          
            {!isCompare && logIndex !== 0 &&
              <button className="btn btn-danger btn-right" onClick={() => deleteGitHubAnalysis()}>Delete</button>
            }
          </h1>
          {!logIndex &&
            <h4>最終更新日時: {formatDate(githubAnalysis?.syncedAt)}</h4>
          }
          {!!logIndex &&
            <h4>更新日時: {formatDate(githubAnalysis?.syncedAt)} 保存日時: {formatDate(githubAnalysis?.savedAt)}</h4>
          }
        </Col>

        {isCompare &&
          <Col md="6">
            <h1>
              {data!.account.name}
              <button className="btn btn-dark" onClick={() => hideCompare()}>Hide</button>
            </h1>
            <h4>最終更新日時: {formatDate(githubAnalysis?.syncedAt)}</h4>
          </Col>
        }
      </Row>

      <GithubAnalysisGraphRow
        githubAnalysis={githubAnalysis}
        isCompare={isCompare}
        compareGithubAnalysis={data?.account.githubAnalysis!}
        type='owner'
      />

      <Row className="d-md-none">
        <Col md="12">
          {!isCompare && 0 < logIndex && <button className="btn btn-dark" onClick={() => compareWithLatest()}>Compare with Latest</button>}
          {isCompare &&<button className="btn btn-dark" onClick={() => hideCompare()}>Hide</button>}
        </Col>
      </Row>

      <GithubAnalysisGraphRow
        githubAnalysis={githubAnalysis}
        isCompare={isCompare}
        compareGithubAnalysis={data?.account.githubAnalysis!}
        type='involved'
      />
    </>
  )
}

export default HomeComponent