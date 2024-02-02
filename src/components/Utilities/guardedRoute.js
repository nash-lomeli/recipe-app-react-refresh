import React from 'react';
import { Route, Navigate } from "react-router-dom";

const GuardedRoute = ({ component: Component, currentUser, ...rest }) => (
    <Route {...rest} render={(props) => {
        return (
            currentUser && currentUser.token === window.localStorage.getItem('jwt')
            ? <Component {...props} /> : <Navigate push to='/' />
        )
    }} />
)

export default GuardedRoute;