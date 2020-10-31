import React from 'react'
import { Link } from 'react-router-dom'
import Layout from './layout/Layout'
import LoginComponent from '../components/LoginComponent'

import _ from 'lodash'

const LoginPage = () => {
  return (
    <Layout>
      <div className="main">
        <Link to='/'>to home</Link>
        <LoginComponent />
      </div>
    </Layout>
  )
}

export default LoginPage
