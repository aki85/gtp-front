import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from './containers/routes/PrivateRoute'
import UnSignedRoute from './containers/routes/UnSignedRoute'
import HomePage from './containers/HomePage'
import LoginPage from './containers/LoginPage'
import SignupPage from './containers/SignupPage'
import RegisterPage from './containers/RegisterPage'

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path='/test' component={LoginPage} />
          <UnSignedRoute fallbackPath='/'>
            <Switch>
              <Route exact path='/login' component={LoginPage} />
              <Route exact path='/signup' component={SignupPage} />
              <Route exact path='/register' component={RegisterPage} />
              <Route exact path='/register/:token' component={RegisterPage} />
              <PrivateRoute exact path='/' fallbackPath='/login'>
                <Switch>
                  <Route exact path='/' component={HomePage} />
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