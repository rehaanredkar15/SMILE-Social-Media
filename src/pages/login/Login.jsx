import React,{useRef,useContext} from 'react'
import './Login.css';
import {  LoginCall,LoginDetails } from '../APICalls';
import { AuthContext } from '../../Context/AuthContext';
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { SnackbarContext } from "../../Context/Snackbar/SnackbarContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default  function Login ()  {
 
   const email = useRef();
   const password = useRef();
   const { user,isFetching,error,dispatch} = useContext(AuthContext);
    const { snackbarOpen,snackbarType,snackbarMessage,dispatched } = useContext(SnackbarContext);

  const handleClose = (event, reason) => {
			if (reason === 'clickaway') {
			return;
			}
      dispatched({type:"SNACKBAR_SET",payload:(snackbarOpen:false)});
		}; 

   const handleClick = (e) => {
     
     e.preventDefault();

    //the second parameter is dispatch 
     LoginCall({email:email.current.value,password:password.current.value},dispatch,dispatched);

   }

    

    return (
        <div className="login">
           { snackbarOpen &&  <Snackbar open={snackbarOpen} autoHideDuration={3000} anchorOrigin={  {vertical: 'top',horizontal: 'center'}} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbarType} sx={{ width: '100%' }}>
                {snackbarMessage}
                </Alert>
              </Snackbar>
              }
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

            <span className="loginForgot">
             <Link to="/login/forgotPassword">
               Forgot Password?
            </Link>
            </span>

            <Link to="/register">
             <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="primary" size="20px" />
              ) : (
                "Register"
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




