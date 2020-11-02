import React from 'react'
import Layout from './layout/Layout'
import SignupComponent from '../components/SignupComponent'

import _ from 'lodash'

const SignupPage = () => {
  return (
    <Layout>
      <div className="main signup">
        <SignupComponent />
      </div>
    </Layout>
  )
}

export default SignupPage
