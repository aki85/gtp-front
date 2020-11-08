import React from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import 'chartjs-plugin-datalabels'
import { useGithubAnalysisByLoginQuery } from '../api'

import GithubAnalysisGraphRow from './githubAnalysis/GraphRow'
import GithubAnalysisError from './githubAnalysis/Error'
import GithubAnalysisCompareForm from './githubAnalysis/CompareForm'
import { useAccountContext } from '../contexts/app'

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
  const isCompare = !!compareTargetLogin

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

  function hideCompareTarget() {
    history.push({
      search: ''
    })
  }

  return (
    <>
      <Row className={'d-none d-md-flex' + (isCompare ? ' compared-graphs' : '')}>
        <Col md={isCompare ? 6 : 12}>
          <h1>
            {data.githubAnalysisByLogin.login}
            {!isCompare &&
              <>
                <GithubAnalysisCompareForm login={data.githubAnalysisByLogin.login!}/>
                <button className="btn btn-dark" onClick={() => compareWithMine()}>Compare with Mine</button>
              </>
            }
          </h1>
        </Col>

        {isCompare &&
          <Col md="6">
            {compareTarget.error &&
              <GithubAnalysisError login={compareTargetLogin} mainLogin={login} hideFunc={() => hideCompareTarget()}/>
            }
            {!compareTarget.error && compareTarget.data &&
              <>
                <h1>
                  {compareTarget.data.githubAnalysisByLogin.login}
                  <GithubAnalysisCompareForm login={data.githubAnalysisByLogin.login!}/>
                  <button className="btn btn-dark" onClick={() => hideCompareTarget()}>Hide</button>
                </h1>
              </>
            }
          </Col>
        }
      </Row>

      <GithubAnalysisGraphRow
        githubAnalysis={data.githubAnalysisByLogin}
        isCompare={isCompare}
        compareGithubAnalysis={compareTarget.data?.githubAnalysisByLogin}
        type='owner'
      />

      <Row className="d-md-none">
        <Col md="12">
          <GithubAnalysisCompareForm login={data.githubAnalysisByLogin.login!}/>
          {!isCompare && <button className="btn btn-dark" onClick={() => compareWithMine()}>Compare with Mine</button>}
          {isCompare &&<button className="btn btn-dark" onClick={() => hideCompareTarget()}>Hide</button>}
        </Col>
      </Row>

      <GithubAnalysisGraphRow
        githubAnalysis={data.githubAnalysisByLogin}
        isCompare={isCompare}
        compareGithubAnalysis={compareTarget.data?.githubAnalysisByLogin}
        type='involved'
      />
    </>
  )
}

export default ViewComponent