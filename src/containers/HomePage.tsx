import React from 'react'
import { Link } from 'react-router-dom'
import Layout from './layout/Layout'
import HomeComponent from '../components/HomeComponent'

import _ from 'lodash'

const HomePage = () => {
  return (
    <Layout>
      <div className="main">
        <Link to='/login'>to login</Link>
        <HomeComponent />
      </div>
    </Layout>
  )
}

export default HomePage
