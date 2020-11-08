import React from 'react'

import 'chartjs-plugin-datalabels'
import { useGithubAnalysisByLoginQuery } from '../api'

import GithubAnalysisGraphRow from './githubAnalysis/GraphRow'
import GithubAnalysisError from './githubAnalysis/Error'
import GithubAnalysisCompareForm from './githubAnalysis/CompareForm'
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
    },
    skip: !compareTargetLogin
  })

  if (error) {
    return <GithubAnalysisError login={login}/>
  }

  if (!data) {
    return <></>
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

  return (
    <>
      <Row className={'d-none d-md-flex' + (compareTargetLogin ? ' compared-graphs' : '')}>
        <Col md={compareTargetLogin ? 6 : 12}>
          <h1>
            {data.githubAnalysisByLogin.login}
            {!compareTargetLogin &&
              <>
                <GithubAnalysisCompareForm login={data.githubAnalysisByLogin.login!}/>
                <button className="btn btn-dark" onClick={() => compareWithMine()}>Compare with mine</button>
              </>
            }
          </h1>
        </Col>

        {compareTargetLogin &&
          <Col md="6">
            {compareTarget.error &&
              <GithubAnalysisError login={compareTargetLogin}/>
            }
            {!compareTarget.error && compareTarget.data &&
              <>
                <h1>
                  {compareTarget.data.githubAnalysisByLogin.login}
                  <GithubAnalysisCompareForm login={data.githubAnalysisByLogin.login!}/>
                  <button className="btn btn-dark" onClick={() => clearCompareTarget()}>Clear</button>
                </h1>
              </>
            }
          </Col>
        }
      </Row>

      <GithubAnalysisGraphRow
        githubAnalysis={data.githubAnalysisByLogin}
        isCompare={!!compareTargetLogin}
        compareGithubAnalysis={compareTarget.data?.githubAnalysisByLogin}
        type='owner'
      />

      <Row className="d-md-none">
        <Col md="12">
          <GithubAnalysisCompareForm login={data.githubAnalysisByLogin.login!}/>
          {!compareTargetLogin && <button className="btn btn-dark" onClick={() => compareWithMine()}>Compare with mine</button>}
          {compareTargetLogin &&<button className="btn btn-dark" onClick={() => clearCompareTarget()}>Clear</button>}
        </Col>
      </Row>

      <GithubAnalysisGraphRow
        githubAnalysis={data.githubAnalysisByLogin}
        isCompare={!!compareTargetLogin}
        compareGithubAnalysis={compareTarget.data?.githubAnalysisByLogin}
        type='involved'
      />
    </>
  )
}

export default ViewComponent