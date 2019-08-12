import * as React from "react";
import {
    Switch,
    Route,
    withRouter

} from 'react-router';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Dashboard } from '../Dashboard';
import { Spend } from "../Spend";

const InnerAppComponent = ({ location }) =>
    <TransitionGroup childFactory={ child => {
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
    </TransitionGroup>

export const AppComponent = withRouter(InnerAppComponent);