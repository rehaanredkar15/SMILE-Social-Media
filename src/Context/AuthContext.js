import React,{useContext,useReducer,useEffect,useState} from 'react';
import AuthReducer from './AuthReducer';


//creating the Initial state
const InitialState =  {

     user:null,
     isFetching:false,
     error:false,
}


//the context i.e our auth context to  store all the auth related data 
export const AuthContext = React.createContext(InitialState);


//The provider to provide the context to required components , it is a wrapper over compnents
export const AuthContextProvider = ({children}) => {


            const [state, dispatch] = useReducer(AuthReducer, InitialState)

     return(
         //wrapping the provider of our authContext 
         <AuthContext.Provider 
           value={{
               user:state.user,
               isFetching:state.isFetching,
               error:state.error,
               dispatch,
         }}>
         
         {children}
         </AuthContext.Provider>
 
         
    )
}

