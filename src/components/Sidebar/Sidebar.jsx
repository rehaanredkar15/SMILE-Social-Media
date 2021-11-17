import React from 'react'
import './Sidebar.css';


const Sidebar = () => {
    return (
        <div className="SideBarContainer">
          <div className="SideWrapper">
             <div className="Profile">
               <div className="ProfileImage">
               <img src="/Assets/profilepic.jpg" alt="profile" className="ProfileImg" />
               </div>
                <div className="ProfileDetails">
                Rehaan Redkar
                @Rehaan2525

                </div>
             </div>
              <div className="Options">
                <ul className = "sidebarList">
                   <li className="sidebarListItem"> 
                  <ContactsTwoToneIcon htmlColor="blue" className="Icons"/>
                   <span className="sidebarListItemText">People </span>
                  </li>
                  <hr className = "sidebarHr"/>

                  <li className="sidebarListItem">     
                  <MapsHomeWorkTwoToneIcon  htmlColor="tomato" className="Icons"/>
                  <span className="sidebarListItemText"> Home </span>
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
                  <AccountCircleTwoToneIcon className="Icons"  htmlColor="purple"/>
                  <span className="sidebarListItemText"> Profile</span>
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
                    <li className="sidebarFriend">
                        <div className = "FriendDetails">
                        <img src="/Assets/friend.jpg" alt="" className="sidebarFriendImg" />
                        <span className="sidebarFriendName"> Zayn Malik</span>
                        
                        </div>
                     </li>
                    <li className="sidebarFriend">
                        <div className = "FriendDetails">
                        <img src="/Assets/friend.jpg" alt="" className="sidebarFriendImg" />
                        <span className="sidebarFriendName"> Zayn Malik</span>
                        
                        </div>
                     </li>
                    <li className="sidebarFriend">
                        <div className = "FriendDetails">
                        <img src="/Assets/friend.jpg" alt="" className="sidebarFriendImg" />
                        <span className="sidebarFriendName"> Zayn Malik</span>
                        
                        </div>
                     </li>
                    <li className="sidebarFriend">
                        <div className = "FriendDetails">
                        <img src="/Assets/friend.jpg" alt="" className="sidebarFriendImg" />
                        <span className="sidebarFriendName"> Zayn Malik</span>
                        
                        </div>
                     </li>
                 </ul>
              </div>
              

          </div>
        </div>
    )
}

export default Sidebar
      