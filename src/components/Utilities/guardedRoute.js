import React from 'react';
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, currentUser, ...rest }) => (
    <Route {...rest} render={(props) => {
        return (
            currentUser && currentUser.token === window.localStorage.getItem('jwt')
            ? <Component {...props} /> : <Redirect push to='/' />
        )
    }} />
)

export default GuardedRoute;