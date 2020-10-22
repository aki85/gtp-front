import React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { GraphqlProvider } from './graphql'
import store from './store'
import App from './App'
import './assets/styles/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={store}>
    <GraphqlProvider>
      <App />
    </GraphqlProvider>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
