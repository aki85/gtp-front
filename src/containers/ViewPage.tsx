import React from 'react'
import Layout from './layout/Layout'
import ViewComponent from '../components/View'

import _ from 'lodash'

const ViewPage = () => {
  return (
    <Layout>
      <div className="main home">
        <ViewComponent />
      </div>
    </Layout>
  )
}

export default ViewPage
