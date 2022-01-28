import React,{useContext,useReducer,useEffect,useState} from 'react';
import SnackbarReducer from './SnackbarReducer';


//creating the Initial state
const InitialState =  {

     snackbarOpen:false,
     snackbarType:"success",
     snackbarMessage:""
    
}


//the context i.e our auth context to  store all the auth related data 
export const SnackbarContext = React.createContext(InitialState);

//The provider to provide the context to required components , it is a wrapper over components
export const SnackbarProvider = ({children}) => {

    const [state, dispatched] = useReducer(SnackbarReducer, InitialState)
     
    // console.log(state);
     return(

         //wrapping the provider of our authContext 
         <SnackbarContext.Provider 
           value={{
               snackbarOpen:state.snackbarOpen,
               snackbarType:state.snackbarType,
               snackbarMessage:state.snackbarMessage,
               dispatched
         }}>

         {children}
         </SnackbarContext.Provider>
 
         
    )
}