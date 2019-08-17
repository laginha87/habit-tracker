import * as React from "react";
import {
    Switch,
    Route

} from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Dashboard } from '../Dashboard';
import { Spend } from "../Spend";
import { Login } from "../Login";
import { Firebase } from "../model/firebase";
import { ProtectedRoute } from "../common/ProtectedRoute";
import { useSelector } from "react-redux";
import { AppState } from "./reducer";
import { State } from "../reducer";

interface AppProps {
    firebase: Firebase
}

export const AppComponent = ({ firebase }: AppProps) => {
    const location = useSelector((state: State) => state.router.location);

    return <TransitionGroup childFactory={child => {
        if (!location.state || !location.state.transition) {
            return child;
        }
        return React.cloneElement(child, {
            classNames: location.state.transition,
            timeout: location.state.duration
        })
    }}>
        <CSSTransition
            timeout={{ enter: 1000, exit: 1000 }}
            key={location.key}
        >
            <Switch location={location}>
                <Route path="/login" render={() => <Login firebase={firebase} />} />
                <ProtectedRoute path="/spend" Component={Spend} firebase={firebase} />
                <ProtectedRoute path="/" Component={Dashboard} firebase={firebase} />
            </Switch>
        </CSSTransition>
    </TransitionGroup>
}
