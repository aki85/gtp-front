import React from 'react'

import { Row, Col } from 'react-bootstrap'
import GithubAnalysisGraph from './Graph'
import { GithubAnalysis } from '../../api'

type Props = {
  githubAnalysis: GithubAnalysis,
  type?: 'involved'|'owner',
  isCompare?: boolean,
  compareGithubAnalysis?: GithubAnalysis
}

const GithubAnalysisGraphRow: React.FC<Props> = ({githubAnalysis, type, isCompare, compareGithubAnalysis}) => {
  return (
    <Row className={isCompare ? 'compared-graphs' : ''}>
      <Col md={isCompare ? 6 : 12}>
        <h1 className='d-md-none'>{githubAnalysis.login}</h1>
        <GithubAnalysisGraph githubAnalysis={githubAnalysis} type={type}/>
      </Col>

      {isCompare && compareGithubAnalysis &&
        <Col md='6'>
          <h1 className='d-md-none'>{compareGithubAnalysis.login}</h1>
          <GithubAnalysisGraph githubAnalysis={compareGithubAnalysis} type={type}/>
        </Col>
      }
    </Row>
  )
}

export default GithubAnalysisGraphRow