import React from 'react'
import './Sidebar.css';
import ContactsTwoToneIcon from '@mui/icons-material/ContactsTwoTone';
import MapsHomeWorkTwoToneIcon from '@mui/icons-material/MapsHomeWorkTwoTone';
import PhotoAlbumTwoToneIcon from '@mui/icons-material/PhotoAlbumTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import SettingsApplicationsTwoToneIcon from '@mui/icons-material/SettingsApplicationsTwoTone';
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';
import { Users} from '../../dummyData';
import { Link } from "react-router-dom";
import {useRef,useContext} from 'react'
import { AuthContext } from '../../Context/AuthContext';




const Sidebar = () => {


     const { user} = useContext(AuthContext);


    return (
        <div className="SideBarContainer">
          <div className="SideWrapper">
             <div className="Profile">
               <div className="ProfileImage">
               <img src={user.profilePicture}  className="ProfileImg" />
               </div>
                <div className="ProfileDetails">
                Rehaan Redkar

                @{user.username}
                

                </div>
             </div>
              <div className="Options">
                <ul className = "sidebarList">
                  <li className="sidebarListItem">     
                  <MapsHomeWorkTwoToneIcon  htmlColor="tomato" className="Icons"/>
                   <Link to="/">
                        <span className="sidebarListItemText"> Home </span>
                  </Link>
                  </li>


                  <hr className = "sidebarHr"/>


                  <li className="sidebarListItem">
                  <AccountCircleTwoToneIcon className="Icons"  htmlColor="purple"/>
                   <Link to="/profile/Arshad" style={{textDecoration:"none"}}> 
                   <span className="sidebarListItemText"> Profile</span>
                   </Link>
                  </li>
                  <hr className = "sidebarHr"/>

                   <li className="sidebarListItem"> 
                  <ContactsTwoToneIcon htmlColor="blue" className="Icons"/>
                   <Link to="/">
                   <span className="sidebarListItemText">People </span>
                   </Link> 
                  </li>
                  <hr className = "sidebarHr"/>

 
                  <li className="sidebarListItem">
                  <PhotoAlbumTwoToneIcon  htmlColor="goldenrod" className="Icons"/>
                  <span className="sidebarListItemText">   Photos </span>
                  </li>
                  <hr className = "sidebarHr"/>
                  
                  <li className="sidebarListItem">     
                  <EventNoteTwoToneIcon className="Icons"  htmlColor="green"/>
                  <span className="sidebarListItemText"> News Feed </span>
                  </li>
                  <hr className = "sidebarHr"/>

                  

                  <li className="sidebarListItem">     
                  <SettingsApplicationsTwoToneIcon className="Icons"  htmlColor="#839192"/>
                  <span className="sidebarListItemText"> Settings </span>
                  </li>
                </ul>
              </div>

                 <hr className = "sidebarSec"/>
              
              <div className="FriendsList">
                <ul className="sidebarFriendList">
                        {
                          Users.map((u) => (

                               <li className="sidebarFriend">
                               <div className = "FriendDetails">
                                    <img src={u.profilePicture} alt="" className="sidebarFriendImg" />
                                    <span className="sidebarFriendName"> {u.username}</span>
                                    </div>
                                </li>
                          ))
                        }

                    
                 </ul>
              </div>
              

          </div>
        </div>
    )
}

export default Sidebar
      