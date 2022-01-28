import React,{useRef,useContext} from 'react'
import './ForgotPassword.css';
import { useNavigate,useParams } from "react-router-dom";
import {  ForgotPasswordCall } from '../APICalls';
import { AuthContext } from '../../Context/AuthContext';
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { SnackbarContext } from "../../Context/Snackbar/SnackbarContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const ForgotPassword = () => {

    const navigate = useNavigate();
    const email = useRef();
    const { user,isFetching,error,dispatch} = useContext(AuthContext);
     const { snackbarOpen,snackbarType,snackbarMessage,dispatched } = useContext(SnackbarContext);


     const handleClose = (event, reason) => {
			if (reason === 'clickaway') {
			return;
			}
      dispatched({type:"SNACKBAR_SET",payload:(snackbarOpen:false)});
				// snackbarOpen:false;
		}; 




   const handleClick = (e) => {
     e.preventDefault();
     
    //the second parameter is dispatch 
     ForgotPasswordCall({email:email.current.value},dispatch,navigate,dispatched);

   }

    return (
         <div className="ForgotPassword">
          {  snackbarOpen &&  <Snackbar open={snackbarOpen} autoHideDuration={3000} anchorOrigin={  {vertical: 'top',horizontal: 'center'}} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbarType} sx={{ width: '100%' }}>
                {snackbarMessage}
                </Alert>
              </Snackbar>
              }
          <div className="ForgotPasswordWrapper">
            <div className="ForgotPasswordLeft">
               <h3 className="ForgotPasswordLogo">SMilE</h3>
               <span className="ForgotPasswordDesc">
                 Enter Your Email To get reset Password Link
               </span>
            </div>
            <div className="ForgotPasswordRight">
          <div className="ForgotPasswordBox">

            <form onSubmit={handleClick} className="ForgotPasswordBox">
            <input placeholder="Email" type="email" ref={email} required className="ForgotPasswordInput" />
             <button className="ForgotPasswordBtn" type="submit" disabled={isFetching}>
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
             <button className="ForgotPasswordButton">
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

export default ForgotPassword





 
  

 

