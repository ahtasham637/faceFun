import React from 'react';
import {Redirect, Route} from 'react-router-dom';


function ProtectedRoute({children, ...rest}) {

    const isAuthenticated = () =>
    {
        const name = localStorage.getItem('name');
        if(typeof name !== 'undefined' && name !== null) return true;
        
        return false;
    }

    return (
        <Route {...rest} render={() => {
            return isAuthenticated() ? children : <Redirect to="/" />
        }} />
    );
}

export default ProtectedRoute;