import * as React from "react";
import {
    Switch,
    Route,
    withRouter

} from 'react-router';
import { Location } from 'history';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Dashboard } from '../Dashboard';
import { Spend } from "../Spend";
import { Firebase } from "../model/firebase";

interface AppProps {
    firebase: Firebase,
    location: Location
}

const InnerAppComponent = ({ location, firebase }: AppProps) =>
    {

        return <TransitionGroup childFactory={ child => {
        if(!location.state || !location.state.transition) {
            return child;
        }
        return React.cloneElement(child, {
            classNames: location.state.transition,
            timeout: location.state.duration
    })}}>
        <CSSTransition
            timeout={{enter: 1000, exit: 1000}}
            key={location.key}
        >
            <Switch location={location}>
                <Route path="/spend" component={Spend} />
                <Route path="/" component={Dashboard} />
            </Switch>
        </CSSTransition>
    </TransitionGroup>}

export const AppComponent = withRouter(InnerAppComponent as any);