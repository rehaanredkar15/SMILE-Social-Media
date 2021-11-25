import React from 'react'
import './Register.css';


export default  function Login ()  {
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
            <input placeholder="Username" className="loginInput" />
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Password" className="loginInput" />
            <input placeholder="ConfirmPassword" className="loginInput" />
            <button className="loginButton">Register</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
               Sign In
            </button>
          </div>
        </div>
          </div>  
        </div>
    )
}




