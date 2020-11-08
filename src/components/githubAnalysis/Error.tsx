import React from 'react'

import GithubAnalysisCompareForm from './CompareForm'

interface Props {
  login: string,
  mainLogin?: string,
  hideFunc?: Function
}

const GithubAnalysisError: React.FC<Props> = ({login, mainLogin, hideFunc}) => {
  return (
    <>
      <h1>
        {login}

        {mainLogin && hideFunc &&
          <>
            <GithubAnalysisCompareForm login={mainLogin}/>
            <button className="btn btn-dark" onClick={() => hideFunc()}>Hide</button>
          </>
        }
      </h1>

      <h2>GitHub情報が取得できませんでした。IDを確認してください。</h2>
    </>
  )
}

export default GithubAnalysisError