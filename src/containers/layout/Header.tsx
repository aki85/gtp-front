import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header><Link to="/" className="logo">GitLev</Link></header>
  )
}

export default Header