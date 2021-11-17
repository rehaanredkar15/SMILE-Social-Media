import React from 'react'
import './RightBar.css';

const RightBar = () => {
    return (
        <div className="RightBarContainer">
            <div className="rightBarWrapper">
            <div className="rightTop">
              <div className="EventsContainer">
               <img src="/Assets/events.png" alt="" className="eventImg" />
               <span className="eventText"> 
                  <b>Rehaan Redkar </b>and<b> 3 other friends </b>are celebrating an event
               </span>
              </div>
              <img src="/Assets/event.png" alt="" className="rightBarAd" />
              </div>


              {/* Online Friends */}
              <div className="friendsListWrapper">   
                <div className="title">
                <h4 className="rightBarTitle">Online Friends</h4>
                </div>
                <ul className="rightBarFriendList">
                    <li className="rightBarFriend">
                        <div className = "FriendDetails">
                        <div className="rightBarProfileImgContainer">
                        <img src="/Assets/friend.jpg" alt="" className="rightBarFriendImg" />
                        <span className="rightBarOnline"></span>
                        </div>
                        <span className="rightBarFriendName"> Zayn Malik</span>
                        </div>
                     </li>
                    <li className="rightBarFriend">
                        <div className = "FriendDetails">
                        <div className="rightBarProfileImgContainer">
                        <img src="/Assets/friend.jpg" alt="" className="rightBarFriendImg" />
                        <span className="rightBarOnline"></span>
                        </div>
                        <span className="rightBarFriendName"> Zayn Malik</span>
                        </div>
                     </li>
                    <li className="rightBarFriend">
                        <div className = "FriendDetails">
                        <div className="rightBarProfileImgContainer">
                        <img src="/Assets/friend.jpg" alt="" className="rightBarFriendImg" />
                        <span className="rightBarOnline"></span>
                        </div>
                        <span className="rightBarFriendName"> Zayn Malik</span>
                        </div>
                     </li>
                 </ul>
              </div>
            </div>
        </div>
    )
}

export default RightBar
