import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppComponent } from './App';
import configureStore, { history } from "./configureStore";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter } from "react-router";

const store = configureStore();


const InnerContainer = ({ location }) =>
    <TransitionGroup className="transition-group">
        <CSSTransition
            key={location.key}
            timeout={{ enter: 1000, exit: 1000 }}
            classNames="slide"
        >

            <AppComponent />
        </CSSTransition>
    </TransitionGroup>

const Container = withRouter(InnerContainer)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Container />
        </Router>
    </Provider>
    , document.getElementById("root"));