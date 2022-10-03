import {createContext,useState,useCallback,useContext} from 'react';
import {fetchSinToken,fetchConToken} from '../helpers/fetch';
import {ChatContext} from '../context/chat/ChatContext';
import { types } from '../types/types';
export const AuthContext = createContext();

const initialState = {
    uid:null,
    checking:true,
    logged:false,
    name:null,
    email:null
};

export const AuthProvider = ({children}) =>{
    const [auth, setAuth] = useState(initialState);
    const {dispatch} = useContext(ChatContext)
    const login = async(email,password)=>{
       
        const resp = await fetchSinToken('login',{email,password},'POST');

        if (resp.ok){
            localStorage.setItem('token',resp.token);
            setAuth({
                uid:resp.id,
                checking:false,
                logged:true,
                name:resp.nombre,
                email:resp.email
            })
        
            return true;
        
        }   

        return resp.msg;

    };
    const register = async(nombre,email,password)=>{

        const resp = await fetchSinToken('login/new',{nombre,email,password},'POST');
        if (resp.ok){
            localStorage.setItem('token',resp.token);
            setAuth({
                uid:resp.id,
                checking:false,
                logged:true,
                name:resp.nombre,
                email:resp.email
            })
            return true;
        }   
        return resp.msg;

    };
    const verificaToken = useCallback( async ()=>{
        
        const token = localStorage.getItem('token');

        if(!token){
           setAuth({
                uid:null,
                checking:false,
                logged:false,
                name:null,
                email:null
            })
            return false;
        }
        const resp = await fetchConToken('login/renew');
    
        if (resp.ok){
            localStorage.setItem('token',resp.token);
            setAuth({
                uid:resp.id,
                checking:false,
                logged:true,
                name:resp.nombre,
                email:resp.email
            })
            return true;
        }else{
            setAuth({
                uid:null,
                checking:false,
                logged:false,
                name:null,
                email:null
            })
            return false;
        }   
  
        
        
    },[]); 
    const logout = () =>{
        localStorage.removeItem('token');

        dispatch({
            type:types.cerrarSesion
        }) 

        setAuth({
            checking:false,
            logged:false
        })

    };
    return(
        <AuthContext.Provider value={{
            auth,
            login,
            register,
            verificaToken,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
