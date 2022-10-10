import React from 'react';
import {
    Route,
    Redirect
  } from 'react-router-dom';
  
  
export const PublicRoute = ({ isAuthenticated, component:Component }) => {
    return (
        <Route component={(props) =>{
                console.log(isAuthenticated);
                console.log(props); 
                return(!isAuthenticated) 
                ? <Component {...props}/>
                : <Redirect to="/"/>
            }}/>)    
    }
