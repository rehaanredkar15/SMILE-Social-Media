import React,{useRef,useContext} from 'react'
import './ResetPassword.css';
import {  LoginCall } from '../APICalls';
import { AuthContext } from '../../Context/AuthContext';
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useNavigate,useParams } from "react-router-dom";
import { ResetPasswordCall} from '../APICalls';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { SnackbarContext } from "../../Context/Snackbar/SnackbarContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ResetPassword = () => {
    
     const navigate = useNavigate();

      const password = useRef();
      const confirmPassword = useRef();
   const { user,isFetching,error,dispatch} = useContext(AuthContext);
       const { snackbarOpen,snackbarType,snackbarMessage,dispatched } = useContext(SnackbarContext);

    const { resetToken } = useParams(); 


    const handleClose = (event, reason) => {
			if (reason === 'clickaway') {
			return;
			}
      dispatched({type:"SNACKBAR_SET",payload:(snackbarOpen:false)});
			
		}; 




   const handleClick = (e) => {
     
     e.preventDefault();
      ResetPasswordCall({password:password.current.value},resetToken,navigate,dispatched);
   }

    return (
         <div className="login">
          {  snackbarOpen &&   <Snackbar open={snackbarOpen} autoHideDuration={2000} anchorOrigin={  {vertical: 'top',horizontal: 'center'}} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbarType} sx={{ width: '100%' }}>
                {snackbarMessage}
                </Alert>
              </Snackbar>
              }
          <div className="loginWrapper">
            <div className="loginLeft">
               <h3 className="loginLogo">SMilE</h3>
               <span className="loginDesc">
                 Reset Your Password
               </span>
            </div>
            <div className="loginRight">
          <div className="loginBox">
            <form onSubmit={handleClick} className="loginBox">
            {/* <input placeholder="Email" type="email" ref={email} required className="loginInput" /> */}
            <input placeholder="Password" type = "password" required minLength="6" ref = {password} className="loginInput" />
             <input placeholder="ConfirmPassword" type = "password" required minLength="6" ref={confirmPassword}  className="loginInput" />
             <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Reset Password"
              )}
            </button>

            <span className="BackToLogin"> 
            <Link to="/login">
            Back to Login 
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

export default ResetPassword

