import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { githubIdValidate } from '../../utils/validator'

interface Props {
  login: string
}

const GithubAnalysisCompareForm: React.FC<Props> = ({login}) => {
  const history = useHistory()
  const [id, setId] = useState('')
  
  function handleCompare(e: any) {
    e.preventDefault()
    if (id) {
      history.push({
        pathname: '/view/'+login,
        search: '?compare='+id
      })
      setId('')
    }
  }

  function handleChange(e: any) {
    e.preventDefault()
    if (githubIdValidate(e?.target?.value)) return
    setId(e?.target?.value)
  }
  return (
    <>
      <form className="compare" name="compare" onSubmit={(e) => handleCompare(e)}>
        <input type="text" name="compare" placeholder="&#xf002; Compare by GitHubID" value={id} onChange={handleChange} />
        {id && <Link to={"/view/"+login+"?compare="+id} onClick={() => setId('')}><i className="fas fa-search"></i></Link>}
      </form>
    </>
  )
}

export default GithubAnalysisCompareForm