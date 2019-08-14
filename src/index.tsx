import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppComponent } from './App';
import configureStore, { history } from "./configureStore";
import { Firebase } from "./model/firebase";

const store = configureStore();
const firebase = new Firebase();

firebase.setUp();


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <AppComponent firebase={firebase}/>
        </Router>
    </Provider>
    , document.getElementById("root"));