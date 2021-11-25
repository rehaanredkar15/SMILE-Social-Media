import React from 'react'
import './RightBar.css';
import { Users} from '../../dummyData';
import OnlineFriends from '../OnlineFriends/OnlineFriends.jsx';

export default function RightBar({profile}){

    const HomeRightBar = () => {
        return(
            <>
              <div className="EventsContainer">
               <img src="/Assets/events.png" alt="" className="eventImg" />
               <span className="eventText"> 
                  <b>Rehaan Redkar </b>and<b> 3 other friends </b>are celebrating an event
               </span>
              </div>
              <img src="/Assets/event.png" alt="" className="rightBarAd" />
              {/* Online Friends */}
              <div className="friendsListWrapper">   
                <div className="title">
                <h4 className="rightBarTitle">Online Friends</h4>
                </div>
                <ul className="rightBarFriendList">
                     {
                         Users.map((u) => (

                          <OnlineFriends key ={u.id} user={u}/>
                         ))
                     }
                 </ul>
              </div>
            </>
        )
    }

     
    const ProfileRightbar = () => {

        return (
            <>
            <div className="rightBarDetails">
            <h4 className="rightBarTitle">User Information</h4>
            <div className="rightbarInfo">
             <div className="rightbarInfoItem">
             <span className="rightbarInfoKey">City: </span>
             <span className="rightbarInfoValue">New York </span>
             </div>
             <div className="rightbarInfoItem">
             <span className="rightbarInfoKey">From: </span>
             <span className="rightbarInfoValue">Madrid </span>
             </div>
             <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship: </span>
                    <span className="rightbarInfoValue">Single </span>
               </div>
             </div>
            <h4 className="rightBarTitle">User Friends</h4>
            <div className="rightbarFollowings">

                 {
                         Users.map((u) => (
                              <div className="rightbarFollowing">
                                    <img src={u.profilePicture} alt="" className="rightbarFollowingImg" />
                                    <div className="rightbarFollowingName">{u.username}</div>
                                </div>
                         ))
                     }
             </div>
            </div>
            </>
        )
    }



    return (
        <div className="RightBarContainer">
            <div className="rightBarWrapper">
            <div className="rightTop">
             {profile ? <ProfileRightbar/> : <HomeRightBar/>}
            </div>
            </div>
        </div>
    )
}

