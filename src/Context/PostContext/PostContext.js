import React,{useContext,useReducer,useEffect,useState} from 'react';
import PostReducer from './PostReducer';


//creating the Initial state
const InitialState =  {

     post:null,
     isFetching:false,
     error:false,
}


//the context i.e our auth context to  store all the auth related data 
export const PostContext = React.createContext(InitialState);

//The provider to provide the context to required components , it is a wrapper over components
export const PostContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(PostReducer, InitialState)
     
    // console.log(state);
     return(

         //wrapping the provider of our authContext 
         <PostContext.Provider 
           value={{
               post:state.post,
               isFetching:state.isFetching,
               error:state.error,
               dispatch
         }}>

         {children}
         </PostContext.Provider>
 
         
    )
}