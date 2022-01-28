import React,{useContext,useReducer,useEffect,useState} from 'react';
import OnlineUsersReducer from './OnlineUsersReducer';


//creating the Initial state
const InitialState =  {

     OnlineUsers:null,
    
}


//the context i.e our auth context to  store all the auth related data 
export const OnlineUsersContext = React.createContext(InitialState);

//The provider to provide the context to required components , it is a wrapper over components
export const OnlineUsersProvider = ({children}) => {

    const [state, dispatch] = useReducer(OnlineUsersReducer, InitialState)
     
     return(

         //wrapping the provider of our authContext 
         <OnlineUsersContext.Provider 
           value={{
               OnlineUsers:state.OnlineUsers,
               dispatch
         }}>

         {children}
         </OnlineUsersContext.Provider>
 
         
    )
}