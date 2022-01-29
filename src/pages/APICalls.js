import axios from "axios";
import { useParams } from "react-router-dom";
import {useEffect,useState,useContext,useRef} from 'react';
import { SetSnackbar } from "../Context/Snackbar/SnackbarActions";

    
	

   
export const LoginCall = async (userCredential,dispatch,dispatched) => {


    dispatch({type:"LOGIN_START"});

    try {
     const res1 = await axios.post("auth/login",userCredential);

      const res2 = localStorage.setItem('token',res1.data.token);


     const res = await axios.get("auth/login/userdetails",{headers: {
            'authorization': res1.data.token}});


     dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    }
    catch(err)
    {
     const data = { snackbarOpen:true,snackbarType:'error',snackbarMessage:'Invalid Credentials!! Please Check your Email and Password'}
         dispatch({type:"LOGIN_FAILURE",payload: err});
       
      dispatched(SetSnackbar(data));
    }
}

export const LoginDetails = async () => {

    try {

      const res2 = localStorage.getItem('token');
     const res = await axios.get("auth/login/userdetails",{headers: {
            'authorization': res2}});

      return res;
    }
    catch(err)
    {
       
    }
}


export const RegisterCall = async (userCredential,dispatch,dispatched) => {


    dispatch({type:"LOGIN_START"});
    try {
     
     const res = await axios.post("auth/register",userCredential);
      
     dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    }
    catch(err)
    {
         dispatch({type:"LOGIN_FAILURE",payload: err.message});
        const data = { snackbarOpen:true,snackbarType:'error',snackbarMessage:'Duplicate Credentials!! Email/Username is already Taken Please try something else'}
       
      dispatched(SetSnackbar(data));
    }
}

export const LogoutCall = async (user,dispatch) => {
 
    localStorage.removeItem("user");
    try {
     dispatch({type:"LOGOUT",user});
    localStorage.removeItem("token");
      
    }
    catch(err)
    {
        console.log(err.message);
    }
}

export const ForgotPasswordCall = async (userCredential,dispatch,navigate,dispatched) => {

    try {
        const res = await axios.post("/auth/login/forgotPassword",userCredential);
       
         const data = { snackbarOpen:true,
                        snackbarType:'success',
                        snackbarMessage:'Email Sent!!! Check Your mail box'}
       
      dispatched(SetSnackbar(data));


    }
    catch(err)
    {
       const data = { snackbarOpen:true,
                        snackbarType:'error',
                        snackbarMessage:'Please Enter Valid Email'}
       
      dispatched(SetSnackbar(data));
    }
}
export const ResetPasswordCall = async (password,resetToken,navigate,dispatched) => {
 
    try {
    
        const res = await axios.put("/auth/resetpassword/" + resetToken,password);
                    const data = { snackbarOpen:true,
                        snackbarType:'success',
                        snackbarMessage:'Password Updated !!! Redirecting you back to login'}
       
      dispatched(SetSnackbar(data));

           navigate('/login')
    }
    catch(error)
    {
          const data = { snackbarOpen:true,
                        snackbarType:'error',
                        snackbarMessage:'Password Reset Failed! Please try Again'}
       
      dispatched(SetSnackbar(data));

    }
}


export const PostCall = async (formdata,dispatch) => {

    dispatch({type:"POSTING_START"});
    try {

       const res = await fetch("posts/feed", {
              method: "POST",
              body: formdata,
            });

      const res2 = await res.json();
     dispatch({type:"POSTING_SUCCESS",payload:res2});
    }
    catch(err)
    {
         dispatch({type:"POSTING_FAILURE",payload: err.message});
       
    }
}
