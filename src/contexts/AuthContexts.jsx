// import React, {useState,useEffect,useContext,createContext} from 'react'
// import { useNavigate } from 'react-router-dom';


// export const AuthContexts = createContext({}) 

// export function useAuth(){
//     return useContext(AuthContexts)
// }

// export function AuthProvider({children}){
//     const [auth, setAuth] = useState(localStorage.getItem("Token")|| '');    
//     const value = {
//         auth,
//         setAuth,
//     }


//     return(
//         <AuthContexts.Provider value={value}>{children}</AuthContexts.Provider>
//     )
// }

// export default AuthContexts
