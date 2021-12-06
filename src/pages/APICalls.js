import axios from "axios";

export const LoginCall = async (userCredential,dispatch) => {

    dispatch({type:"LOGIN_START"});

    try {
     
     const res = await axios.post("auth/login",userCredential);
     dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    }
    catch(err)
    {
         dispatch({type:"LOGIN_FAILURE",payload: err});
        console.log(err.message);
    }
}

export const RegisterCall = async (userCredential,dispatch) => {

    dispatch({type:"LOGIN_START"});

    try {
     
     const res = await axios.post("auth/register",userCredential);
     dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    }
    catch(err)
    {
         dispatch({type:"LOGIN_FAILURE",payload: err.message});
        console.log(err.message);
    }
}