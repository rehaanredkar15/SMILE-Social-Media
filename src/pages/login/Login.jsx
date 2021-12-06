import React,{useRef,useContext} from 'react'
import './Login.css';
import {  LoginCall } from '../APICalls';
import { AuthContext } from '../../Context/AuthContext';
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";



export default  function Login ()  {
 
   const email = useRef();
   const password = useRef();
   const { user,isFetching,error,dispatch} = useContext(AuthContext);


   const handleClick = (e) => {
     
     e.preventDefault();

    //the second parameter is dispatch 
     LoginCall({email:email.current.value,password:password.current.value},dispatch);

   }

 


    return (
        <div className="login">
          <div className="loginWrapper">
            <div className="loginLeft">
               <h3 className="loginLogo">Smile</h3>
               <span className="loginDesc">
                 Connect with Friends and the world around you on Smile
               </span>
            </div>
            <div className="loginRight">
          <div className="loginBox">

            <form onSubmit={handleClick} className="loginBox">
            <input placeholder="Email" type="email" ref={email} required className="loginInput" />
            <input placeholder="Password" type = "password" required minLength="6" ref = {password} className="loginInput" />
             <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register">
             <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="primary" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
            </Link>
            </form>
          </div>
        </div>
          </div>  
        </div>
    )
}




