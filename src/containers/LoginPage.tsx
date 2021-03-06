import React from 'react'
import Layout from './layout/Layout'
import LoginComponent from '../components/Login'

import _ from 'lodash'

const LoginPage = () => {
  return (
    <Layout>
      <div className="main login">
        <LoginComponent />
      </div>
    </Layout>
  )
}

export default LoginPage
