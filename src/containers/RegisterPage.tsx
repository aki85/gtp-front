import React from 'react'
import Layout from './layout/Layout'
import RegisterComponent from '../components/RegisterComponent'

import _ from 'lodash'

const RegisterPage = () => {
  return (
    <Layout>
      <div className="main register">
        <RegisterComponent />
      </div>
    </Layout>
  )
}

export default RegisterPage
