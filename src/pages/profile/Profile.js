import React from 'react'
import Feed from '../../components/Feed/Feed.jsx';
import SideBar from '../../components/Sidebar/Sidebar.jsx';
import RightBar from '../../components/Rightbar/RightBar.jsx';
import TopBar from '../../components/Topbar/Topbar.jsx';
import './Profile.css';

const Profile = () => {
    return (
        <>
            <TopBar/>
            <div className="profile"> 
             <SideBar/>
            <div className="profileRight">
              <div className="profileRightTop">

                <div className="profileCover">
                
                 <img
                className="profileCoverImg"
                src="assets/post/3.jpeg"
                alt=""
              />
              <img
                className="profileUserImg"
                src="Assets/person/person2.jpg"
                alt=""
              />
            </div>
            
            <div className="profileInfo">
              <h4 className="profileInfoName">  Rehaan Redkar </h4>
              <span className="profileInfoDesc">Best Web Developer Out There</span>
            </div>

            </div>
                <div className="profileRightBottom">
                   <Feed/>
                   <RightBar/>
                  </div>
              </div>
            </div>
        </>
    )
}

export default Profile
