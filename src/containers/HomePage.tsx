import React from 'react'
import Layout from './layout/Layout'
import HomeComponent from '../components/Home'

import _ from 'lodash'

const HomePage = () => {
  return (
    <Layout>
      <div className="main home">
        <HomeComponent />
      </div>
    </Layout>
  )
}

export default HomePage
