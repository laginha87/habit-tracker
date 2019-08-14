import * as React from "react";
import { Firebase } from "../model/firebase";
import { Route, Redirect } from "react-router";

type ProtectedRouteProps = {
    firebase: Firebase,
    Component: any,
    path: string
};

export const ProtectedRoute = ({ firebase, Component, ...rest }: ProtectedRouteProps) =>
    <Route {...rest} render={(props) => {
        return firebase.isAuthenticated
            ? <Component {...props} />
            : <Redirect to='/login' />
    }}
    />;