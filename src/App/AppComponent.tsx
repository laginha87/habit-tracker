import * as React from "react";
import {
    Switch,
    Route

} from 'react-router';

import { Dashboard } from '../Dashboard';
import { Spend } from "../Spend";

export class AppComponent extends React.Component {
    render() {
        return <Switch>
            <Route path="/spend" component={Spend} />
            <Route path="/" component={Dashboard} />
        </Switch>
    }
}