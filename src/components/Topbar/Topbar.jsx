import React from 'react'
import './Topbar.css';
// import { Search } from "@material-ui/icons";
import {Search,Person,Chat,Notifications } from "@material-ui/icons";



const TopBar = () => {
    return (
        <div className="TopBarContainer">
          <img src="/Assets/Logo.png" alt="profile" className="logoImg" />
            <div className="topBarLeft"> 
              <span className="logo"> 
                Smile
              </span>
            </div>
 
            <div className="topBarCenter"> 
               <div className="SearchBar"> 
                <Search className="SearchIcon" />
              <input placeholder="Search for friend,post or video" type="text" className="searchInput" />
               </div>
            </div>


             <div className="topBarRight">
               <div className="profile">
                 {/* <span className="topbarLink">HomePage</span>
                 <span className="topbarLink">Timeline</span> */}
               </div>

               <div className="topBarIcons">
                <div className="topBarIconItem">
                  <Person/>
                    <span className="topBarIconBadge">1</span>
                 </div>
                <div className="topBarIconItem">
                  <Chat/>
                    <span className="topBarIconBadge">1</span>
                 </div>
                <div className="topBarIconItem">
                  <Notifications/>
                    <span className="topBarIconBadge">1</span>
                 </div>
               <img src="/Assets/profilepic.jpg" alt="profile" className="topbarImg" />
               </div>

              </div>


        </div>
    )
}

export default TopBar
