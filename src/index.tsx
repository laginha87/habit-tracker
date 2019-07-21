import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import { AppComponent } from './App';
import configureStore, { history } from "./configureStore";

const store = configureStore({});

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AppComponent />
        </ConnectedRouter>
    </Provider>
    , document.getElementById("root"));