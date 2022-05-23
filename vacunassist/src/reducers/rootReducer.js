import { combineReducers } from 'redux'

import { uiReducer } from './uiReducer'
import { calendarReducer } from './calendarReducer'
import { authReducer } from './authReducer'
import { locationReducer } from './locationReducer'
import { connectRouter } from 'connected-react-router'
import accountReducer from './accountReducer'

import generalReducer from './generalReducer'
import infoReducer from './infoReducer'

import history from '../store/history'
export const rootReducer = combineReducers({
  // ui: uiReducer,
  info: infoReducer,
  calendar: calendarReducer,
  auth: authReducer,
  location: locationReducer,
  general: generalReducer,
  account: accountReducer,
  router: connectRouter(history),
})
