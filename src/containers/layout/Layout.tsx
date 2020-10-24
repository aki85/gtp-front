import React from 'react'
import Header from './Header'
import Footer from './Footer'

interface Props {
  isAdmin?: boolean
}

const Layout = (props: React.Props<null> & Props) => {
  return (
    <div className="todo">
      <Header isAdmin={props.isAdmin}/>
      {props.children}
      <Footer />
    </div>
  )
}

export default Layout
