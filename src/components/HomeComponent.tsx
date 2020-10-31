import React, { useState } from 'react'
import { GithubInfo, getGithubInfo } from '../repos/githubApi'

const HomeComponent = () => {
  const [githubInfo, setGithubInfo] = useState<GithubInfo | undefined>()
  const loadGithubInfo = async () => {
    const res = await getGithubInfo()
    setGithubInfo(res)
    return
  }

  return (
    <>
      <h3>Github</h3>
      <button className="btn btn-primary" onClick={loadGithubInfo}>Load Github Info!</button>
      <div>関与したリポジトリ数: {githubInfo?.involvedRepogitoryCount}</div>
    </>
  )
}

export default HomeComponent