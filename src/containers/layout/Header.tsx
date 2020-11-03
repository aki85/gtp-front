import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAppContext } from '../../contexts/app'

const Header = () => {
  const history = useHistory()
  const { token, logout } = useAppContext()

  function handleLogout(e: any) {
    e.preventDefault()
    logout()
    history.push('/login')
  }

  return (
    <header>
      <Link to="/" className="logo">GitLev</Link>
      {token &&
        <a className="logout" href="/logout" onClick={(e) => handleLogout(e)}><i className="fas fa-sign-out-alt" /></a>
      }
    </header>
  )
}

export default Header