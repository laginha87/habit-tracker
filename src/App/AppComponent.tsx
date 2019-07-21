import * as React from "react";
import {
    Switch,
    Route

} from 'react-router';

import { Dashboard } from '../Dashboard';

export class AppComponent extends React.Component {
    render() {
        return <Switch>
            <Route path="/" component={Dashboard} />
        </Switch>
    }
}