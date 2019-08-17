import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { createRootReducer } from './reducer';
import { List } from 'immutable';
import { DayData, SpendData } from './model/types';
import { DateTime } from 'luxon';
import { routerMiddleware } from 'connected-react-router'
import { Firebase, firestore } from './model/firebase';

export const history = createBrowserHistory()

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const loadState = async (firebase : Firebase) => {
  let state = await firebase.get();
  if(state === undefined) {
    return {};
  }
  return {
    app: {
      day: DateTime.local().startOf('day'),
      days: List.of(...(state.days || []).map(({result, date})=> ({result, date: DateTime.fromSeconds(date.seconds)}))),
      spent: List.of(...(state.spent || []).map(({description, type, value, date})=> ({description, type, value, date: DateTime.fromSeconds(date.seconds)})))
    }
  }
};


export default async function configureStore(firebase : Firebase) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    await loadState(firebase),
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        // ... other middlewares ...
      ),
    ),
  )

  store.subscribe(() => {
    const {days, spent} = store.getState().app;
    const state = {
      days: (days as List<DayData>).toJS().map(({result, date} : DayData) => ({result, date: new firestore.Timestamp(date.startOf('day').toSeconds(), 0)})),
      spent: (spent as List<SpendData>).toJS().map(({date, type, value, description}) => ({date: new firestore.Timestamp(date.startOf('day').toSeconds(), 0), type, value, description})),
      origin: process.env.FIREBASE_ENV
    };

    firebase.set(state);
  });

  return store
}

