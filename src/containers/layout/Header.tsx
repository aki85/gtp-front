import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useAppContext } from '../../contexts/app'

const Header = () => {
  const location = useLocation()
  const history = useHistory()
  const { token, logout } = useAppContext()
  const [searchId, setSearchId] = useState('')
  
  function handleSearch(e: any) {
    e.preventDefault()
    if (searchId) {
      history.push({
        pathname: '/view/'+searchId,
        search: location.search
      })
      setSearchId('')
    }
  }

  function handleChange(e: any) {
    e.preventDefault()
    if (e?.target?.value?.match(/[ -,\./:-@\[-`\{-~亜-熙ぁ-んァ-ヶ]/)) return
    setSearchId(e?.target?.value)
  }

  function handleLogout(e: any) {
    e.preventDefault()
    logout()
    history.push('/login')
  }

  return (
    <header>
      {token &&
        <>
          <a className="home" href="/" onClick={(e) => {e.preventDefault(); history.push('/')}}><i className="fas fa-home" /></a>
          <form className="search" name="search" onSubmit={(e) => handleSearch(e)}>
            <input type="text" name="search" placeholder="&#xf002; Search by GitHubID" value={searchId} onChange={handleChange} />
            {searchId && <Link to={"/view/"+searchId+location.search} onClick={() => setSearchId('')}><i className="fas fa-search"></i></Link>}
          </form>
        </>
      }
      <Link to="/" className="logo">GitLev</Link>
      {token &&
        <a className="logout" href="/logout" onClick={(e) => handleLogout(e)}><i className="fas fa-sign-out-alt" /></a>
      }
    </header>
  )
}

export default Header