import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = (props: React.Props<null>) => {
  return (
    <div className="layout">
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}

export default Layout
