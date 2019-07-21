import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as appReducer } from './App';

export const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  app: appReducer,
})