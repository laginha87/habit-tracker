import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { AppComponent } from './App';
import configureStore, { history } from "./configureStore";
import { Firebase } from "./model/firebase";

const store = configureStore();
const firebase = new Firebase();

firebase.setUp(() => {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <AppComponent firebase={firebase} />
            </ConnectedRouter>
        </Provider>
        , document.getElementById("root"));
});