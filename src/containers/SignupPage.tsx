import React from 'react'
import Layout from './layout/Layout'
import SignupComponent from '../components/Signup'

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
