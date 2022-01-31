import React from 'react'
import './Register.css';
import {useRef,useContext,useState,useEffect} from 'react'
import {  RegisterCall,LoginDetails } from '../APICalls';
import { AuthContext } from '../../Context/AuthContext';
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { SnackbarContext } from "../../Context/Snackbar/SnackbarContext";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate,useParams } from "react-router-dom";


const initialState = { snackbarOpen:false,snackbarType:'',snackbarMessage:''}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default  function Register ()  {

    const email = useRef();
   const password = useRef();
   const username= useRef();
   const navigate = useNavigate();
   const confirmPassword = useRef();
   const { user,isFetching,error,dispatch} = useContext(AuthContext);
   const [Data, setData] = useState(initialState);
   const { snackbarOpen,snackbarType,snackbarMessage,dispatched } = useContext(SnackbarContext);

   const handleClose = (event, reason) => {
			if (reason === 'clickaway') {
			return;
			}
      dispatched({type:"SNACKBAR_SET",payload:(snackbarOpen:false)});
		};

   
   

   useEffect(() => {
         dispatch({type:"SNACKBAR_SET",payload:Data});
				
			}, [Data])




  const handleClick = (e) => {
     
     e.preventDefault();


    if(password.current.value == confirmPassword.current.value)
    {

    //the second parameter is dispatch 
     RegisterCall({ username:username.current.value,
     email:email.current.value,
     password:password.current.value},dispatch,dispatched,navigate);


    }
    else{
      alert('Password and Confirm Password are not matching!!')
    }


   }

    return (
        <div className="login">

           { snackbarOpen && <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleClose}>
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




