import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { reducer as appReducer, AppState } from './App';

export type State = {
  app: AppState,
  router?: RouterState
}

export const createRootReducer = (history) => combineReducers({
  app: appReducer,
  router: connectRouter(history)
})