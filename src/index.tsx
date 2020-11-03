import React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { AppContextProvider } from './contexts/app'
import { GraphqlProvider } from './graphql/provider'
import store from './store'
import App from './App'
import 'loaders.css'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-social/bootstrap-social.css'
import './assets/styles/index.scss'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Provider store={store}>
    <AppContextProvider>
      <GraphqlProvider>
        <App />
      </GraphqlProvider>
    </AppContextProvider>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
