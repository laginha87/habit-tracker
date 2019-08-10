import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppComponent } from './App';
import configureStore, { history } from "./configureStore";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <AppComponent />
        </Router>
    </Provider>
    , document.getElementById("root"));