import React, {useState,useEffect,useContext,createContext} from 'react'
import { useNavigate } from 'react-router-dom';


const AuthContexts = createContext({}) 

export function useAuth(){
    return useContext(AuthContexts)
}

export function AuthProvider({children}){
    
    const [auth, setAuth] = useState({ token: localStorage.getItem("token") });    
    const value = {
        auth,
        setAuth,
    }

    return(
        <AuthContexts.Provider value={value}>{children}</AuthContexts.Provider>
    )
}

export default AuthContexts
