import React from 'react';
import {
    Route,
    Redirect
  } from 'react-router-dom';
  
export const PrivateRoute = ({
    isAuthenticated,
    component:Component
}) => {
    return (        
        <Route 
            component={(props) =>{
                console.log('llego');
                console.log(props);
                return(isAuthenticated) ? <Component {...props}/>
                : <Redirect to="/auth"/>
            }}
        />
    )
}
