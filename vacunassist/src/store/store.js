import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { rootReducer } from '../reducers/rootReducer'
import { routerMiddleware, connectRouter } from 'connected-react-router'

import history from './history'

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

export default function configureStore() {
  const routerMiddlewaree = routerMiddleware(history)

  const middlewares = [thunk, routerMiddlewaree]
  const store = createStore(
    connectRouter(history)(rootReducer),
    composeEnhancers(applyMiddleware(...middlewares))
  )
  return store
}
