import React from 'react'
import Layout from './layout/Layout'
import TodoComponent from '../components/TodoComponent'
import { useLocation } from 'react-router'

import _ from 'lodash'

const HomePage = () => {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'
  return (
    <Layout isAdmin={isAdmin}>
      <div className="main">
        <TodoComponent
          isAdmin={isAdmin}
        />
      </div>
    </Layout>
  )
}

export default HomePage
