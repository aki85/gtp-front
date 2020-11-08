import React from 'react'

interface Props {
  login: string
}

const GithubAnalysisError: React.FC<Props> = ({login}) => {
  return (
    <>
      <h1>{login} - GitHubAnalysis</h1>

      <h2>GitHub情報が取得できませんでした。IDを確認してください。</h2>
    </>
  )
}

export default GithubAnalysisError