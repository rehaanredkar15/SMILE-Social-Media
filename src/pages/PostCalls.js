import axios from "axios";
import { useParams } from "react-router-dom";
import { SetSnackbar } from "../Context/Snackbar/SnackbarActions";


export const DeletePostCall = async (userId,postId) => {

    try {
   

     const res = await axios.delete("posts/" + postId );
     window.location.reload(); 
    }
    catch(err)
    {
        console.log(err.message);
    }
}



export const UpdatePostCall = async (formdata,dispatch,postId,navigate,dispatched) => {

     dispatch({type:"POSTING_UPDATE_START"});

    
    try {
 
       const res = await fetch("https://smilesocialapp.herokuapp.com/api/posts/update/"+ postId  , {
              method: "POST",
              body: formdata,
            });

       
     dispatch({type:"POSTING_UPDATE_SUCCESS",payload:res});
      window.location.reload();
      navigate('/');
    }
    catch(err)
    {
         dispatch({type:"POSTING_UPDATE_FAILURE",payload: err.message});
        console.log(err.message);
    }
}