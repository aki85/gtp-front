import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import UnSignedRoute from './containers/routes/UnSignedRoute'
import PrivateRoute from './containers/routes/PrivateRoute'

import LoginPage from './containers/LoginPage'
import SignupPage from './containers/SignupPage'
import RegisterPage from './containers/RegisterPage'

import HomePage from './containers/HomePage'
import ViewPage from './containers/ViewPage'

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <UnSignedRoute fallbackPath='/'>
            <Switch>
              <Route exact path='/login' component={LoginPage} />
              <Route exact path='/signup' component={SignupPage} />
              <Route exact path='/register' component={RegisterPage} />
              <Route exact path='/register/:token' component={RegisterPage} />
              <PrivateRoute fallbackPath='/login'>
                <Switch>
                  <Route exact path='/' component={HomePage} />
                  <Route exact path='/view/:login' component={ViewPage} />
                </Switch>
              </PrivateRoute>
            </Switch>
          </UnSignedRoute>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App