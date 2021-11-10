import React from 'react'
import './Topbar.css';

const TopBar = () => {
    return (
        <div className="TopBarContainer">
            <div className="topBarLeft">
              <span className="logo">  
                Smile
              </span>
            </div>
 
            <div className="topBarCenter"> 
               <div className="SearchBar"> 
               
               </div>
            
            </div>


             <div className="topBarRight">
               <div className="profile">
               
               </div>
              </div>


        </div>
    )
}

export default TopBar
