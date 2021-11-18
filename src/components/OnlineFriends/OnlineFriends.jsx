import React from 'react';


const OnlineFriends = ({user}) => {
    return (
        <div>
              <li className="rightBarFriend">
                        <div className = "FriendDetails">
                        <div className="rightBarProfileImgContainer">
                        <img src={user.profilePicture} alt="" className="rightBarFriendImg" />
                        <span className="rightBarOnline"></span>
                        </div>
                        <span className="rightBarFriendName"> {user.username}</span>
                        </div>
               </li>
        </div>
    )
}

export default OnlineFriends
