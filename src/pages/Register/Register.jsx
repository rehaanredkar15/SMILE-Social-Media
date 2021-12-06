import React from 'react'
import './Register.css';
import {useRef,useContext} from 'react'
import {  RegisterCall } from '../APICalls';
import { AuthContext } from '../../Context/AuthContext';
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

export default  function Register ()  {

    const email = useRef();
   const password = useRef();
   const username= useRef();
   const confirmPassword = useRef();
   const { user,isFetching,error,dispatch} = useContext(AuthContext);

  const handleClick = (e) => {
     
     e.preventDefault();

    //the second parameter is dispatch 
     RegisterCall({ username:username.current.value,
     email:email.current.value,
     password:password.current.value},dispatch);


     console.log({
     username:username.current.value,
     email:email.current.value,
     password:password.current.value,
     confirmPassword:confirmPassword.current.value});

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
            <input placeholder="Username" ref={username} className="loginInput" />
            <input placeholder="Email" type = "email" ref={email} className="loginInput" />
            <input placeholder="Password" type = "password" required minLength="6" ref={password} className="loginInput" />
            <input placeholder="ConfirmPassword" type = "password" required minLength="6" ref={confirmPassword}  className="loginInput" />
             
            
            <button className="loginButton" disabled={isFetching}>
            {isFetching ? (
                <CircularProgress color="primary" size="20px" />
              ) : (
                "Register"
              )}
            
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/login">
            <button className="loginRegisterButton">

               {isFetching ? (
                <CircularProgress color="primary" size="20px" />
              ) : (
                "Sign In"
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




