import React from 'react'
import './Topbar.css';
import {Search,Person,Chat,Notifications } from "@material-ui/icons";
import {useRef,useContext,useEffect,useState} from 'react'
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { Link } from "react-router-dom";
import { LogoutCall } from '../../pages/APICalls.js';

const TopBar = () => {


     const { dispatch} = useContext(AuthContext);

      const user = JSON.parse(localStorage.getItem('user'));
      
    
     const handleLogoutClick =(e)=> {

      e.preventDefault();
       LogoutCall(user,dispatch);
       
    }



    return (
      <>
        <div className="TopBarContainer">
            <img src="/Assets/Logo.png" alt="profile" className="logoImg" />
            <div className="topBarLeft"> 
                <Link to ="/"  style={{textDecoration:"none"}} >
              <span className="logo"> 
                SMILE
              </span>
               </Link>
            </div>
 
            <div className="topBarCenter"> 
             <div className="topBarIcons">
             <div className="IconsItem">






              <Link to="/" style={{textDecoration:"none"}}>
                  <img src="https://github.com/rehaanredkar15/SMILE-Social-Media/blob/master/public/Assets/Icons/compass.png" alt=""  className="IconsTop"/>
                  </Link>
             </div>

             <div className="IconsItem">
                  <Link to="/ChatSection" style={{textDecoration:"none"}}>
                   <img src="https://github.com/rehaanredkar15/SMILE-Social-Media/blob/master/public/Assets/Icons/chat.png" alt=""  className="IconsTop"/>                
                  </Link> 
             </div>

             <div className="IconsItem">
                   <Link to = "/explore" style={{textDecoration:"none"}}> 
                 <img src="https://github.com/rehaanredkar15/SMILE-Social-Media/blob/master/public/Assets/Icons/userEdt.png" alt="" className="IconsTop"/>                   
                 </Link>
             </div>
             </div>
            </div>
                 <li className="sidebarListItem">     
                  <button className="sidebarButton"  onClick={handleLogoutClick}> Logout </button>
                  </li>

             <div className="topBarRight">
               
               <div className="profile">
                  
               </div>
               <div className="topBarIcons">
               <img src={user.profilePicture? user.profilePicture : "http://localhost:3000/Assets/person/user.webp"}  className="topbarImg" />
               </div>

              </div>


        </div>
        </>
    )
}

export default TopBar
