import React from 'react'
import { Provider } from 'react-redux'

import { AppRouter } from './router/AppRouter'

import { ConnectedRouter } from 'connected-react-router'

import configureStore from './store/store'
import history from './store/history'
const store = configureStore()

export const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppRouter />
      </ConnectedRouter>
    </Provider>
  )
}
