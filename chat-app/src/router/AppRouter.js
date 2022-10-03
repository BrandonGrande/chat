import React,{useContext,useEffect} from 'react';
import {ChatPage} from '../pages/ChatPage';
import {AuthRouter} from './AuthRouter';
import {PublicRoute} from './PublicRoute';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import {PrivateRoute} from './PrivateRoute';

export const AppRouter = () => {

    const {auth,verificaToken}= useContext(AuthContext)
 
    useEffect(() => {
        verificaToken();        
    }, [verificaToken])


    return (
        auth.checking 
        ?
        <div></div>
        :
        <Router>
            <div>
                <Switch>
                    {/* <Route path="/auth" component={AuthRouter}/> */}
                    <PublicRoute isAuthenticated={auth.logged} path="/auth" component={AuthRouter}/>             
                    <PrivateRoute isAuthenticated={auth.logged}  path="/" component={ChatPage}/>
                    <Redirect to="/"/>     
                 
                </Switch>
            </div>
        </Router>

    )
}
