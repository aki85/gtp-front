import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from './containers/routes/PrivateRoute'
import HomePage from './containers/HomePage'
import LoginPage from './containers/LoginPage'

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div>
          <Route exact path='/login' component={LoginPage} />
          <PrivateRoute fallbackPath="/login">
            <Switch>
              <Route exact path='/' component={HomePage} />
            </Switch>
          </PrivateRoute>
        </div>
      </BrowserRouter>
    )
  }
}

export default App