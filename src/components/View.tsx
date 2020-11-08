import React from 'react'

import 'chartjs-plugin-datalabels'
import { useGithubAnalysisByLoginQuery } from '../api'

import GithubAnalysisGraph from './githubAnalysis/Graph'
import GithubAnalysisError from './githubAnalysis/Error'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { useAccountContext } from '../contexts/app'
import { Row, Col } from 'react-bootstrap'

const ViewComponent = () => {
  const query = new URLSearchParams(useLocation().search)
  const history = useHistory()
  const { login } = useParams()
  const { currentAccount } = useAccountContext()
  const { data, error } = useGithubAnalysisByLoginQuery({
    variables: {
      login
    }
  })
  const compareTargetLogin = query.get('compare') || ''

  const compareTarget = useGithubAnalysisByLoginQuery({
    variables: {
      login: compareTargetLogin
    }
  })

  if (error) {
    return <GithubAnalysisError login={login}/>
  }

  if (!data) {
    return <><h1> - GitHubAnalysis</h1></>
  }

  function compareWithMine() {
    history.push({
      search: '?compare='+currentAccount?.githubInfo.alias
    })
  }

  function clearCompareTarget() {
    history.push({
      search: ''
    })
  }

  console.log('compareTarget.error', compareTarget.error)

  return (
    <>
      <Row className={compareTargetLogin ? 'compared-graphs' : ''}>
        <Col md={compareTargetLogin ? 6 : 12}>
          <h1>
            {data.githubAnalysisByLogin.login} - GitHubAnalysis
            {!compareTargetLogin &&
              <button className="btn btn-dark" onClick={() => compareWithMine()}>Compare with mine</button>
            }
          </h1>
          <GithubAnalysisGraph githubAnalysis={data.githubAnalysisByLogin} />
        </Col>

        {compareTargetLogin &&
          <Col md="6">
            {!compareTarget.data && compareTarget.error &&
              <GithubAnalysisError login={compareTargetLogin}/>
            }
            {compareTarget.data &&
              <>
                <h1>
                  {compareTarget.data.githubAnalysisByLogin.login} - GitHubAnalysis
                  <button className="btn btn-dark" onClick={() => clearCompareTarget()}>Clear</button>
                </h1>
                <GithubAnalysisGraph githubAnalysis={compareTarget.data.githubAnalysisByLogin} />
              </>
            }
            {!compareTarget.data &&
              <><h1> - GitHubAnalysis</h1></>
            }
          </Col>
        }
      </Row>
    </>
  )
}

export default ViewComponent