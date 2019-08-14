import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { createRootReducer } from './reducer';
import { List } from 'immutable';
import { DayData } from './model/types';
import { DateTime } from 'luxon';

export const history = createBrowserHistory()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return {};
    }
    const state = JSON.parse(serializedState);

    return {
      app: {
        day: DateTime.fromISO(state.app.day),
        days: List.of(...state.app.days.map(({result, date}) => ({result, date: DateTime.fromISO(date)}))),
        spent: List.of(...state.app.spent)
      }
    };
  } catch (err) {
    return {};
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};


export default function configureStore() {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    loadState(),
    composeEnhancers()
  )

  store.subscribe(() => {
    const {days, day, spent} = store.getState().app;
    saveState({
      app: {
        day: day.toISO(),
        days: (days as List<DayData>).toJS(),
        spent: (spent as List<number>).toJS(),
      }
    });
  });

  return store
}