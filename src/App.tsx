import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import HomePage from './containers/HomePage'

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div>
          <Route exact={true} path='/' component={HomePage} />
          <Route path='/admin' component={HomePage} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App