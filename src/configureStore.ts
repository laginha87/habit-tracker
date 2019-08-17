import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { createRootReducer } from './reducer';
import { List } from 'immutable';
import { DayData } from './model/types';
import { DateTime } from 'luxon';
import { routerMiddleware } from 'connected-react-router'
import { Firebase } from './model/firebase';

export const history = createBrowserHistory()

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const loadState = async (firebase : Firebase) => {
  const state = await firebase.get();
  return {
    app: {
      day: DateTime.local().startOf('day'),
      days: List.of(...state.days.map(({result, date})=> ({result, date: DateTime.fromSeconds(date.seconds)}))),
      spent: List.of(...state.spent.map(({description, type, value, date})=> ({description, type, value, date: DateTime.fromSeconds(date.seconds)})))
    }
  }
  // try {
  //   const serializedState = localStorage.getItem('state');
  //   if (serializedState === null) {
  //     return {};
  //   }
  //   const state = JSON.parse(serializedState);

  //   return {
  //     app: {
  //       day: DateTime.fromISO(state.app.day),
  //       days: List.of(...state.app.days.map(({result, date}) => ({result, date: DateTime.fromISO(date)}))),
  //       spent: List.of(...state.app.spent)
  //     }
  //   };
  // } catch (err) {
  //   return {};
  // }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
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