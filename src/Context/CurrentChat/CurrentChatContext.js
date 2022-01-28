import React,{useContext,useReducer,useEffect,useState} from 'react';
import CurrentChatReducer from './CurrentChatReducer';


//creating the Initial state
const InitialState =  {

     currentchat:null,
    
}


//the context i.e our auth context to  store all the auth related data 
export const CurrentChatContext = React.createContext(InitialState);

//The provider to provide the context to required components , it is a wrapper over components
export const CurrentChatProvider = ({children}) => {

    const [state, dispatcher] = useReducer(CurrentChatReducer, InitialState)
     
    // console.log(state);
     return(

         //wrapping the provider of our authContext 
         <CurrentChatContext.Provider 
           value={{
               currentchat:state.currentchat,
               dispatcher
         }}>

         {children}
         </CurrentChatContext.Provider>
 
         
    )
}