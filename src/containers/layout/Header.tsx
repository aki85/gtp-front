import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  isAdmin: boolean
}

const Header = (props: Props) => {
  const { isAdmin } = props
  let headerText = 'Todo List'
  if (isAdmin) {
    headerText = 'Todo List for Admin'
  }
  return (
    <header>
      {headerText} By TS
      {isAdmin ? <Link to="/"> go to user</Link> : <Link to="/admin"> go to admin</Link>}
    </header>
  )
}

export default Header