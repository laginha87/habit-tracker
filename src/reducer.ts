import { combineReducers } from 'redux'
import { reducer as appReducer, AppState } from './App';

export type State = {
  app: AppState
}

export const createRootReducer = (history) => combineReducers({
  app: appReducer,
})