import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as appReducer, AppState } from './App';

export type State = {
  app: AppState
}

export const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  app: appReducer,
})