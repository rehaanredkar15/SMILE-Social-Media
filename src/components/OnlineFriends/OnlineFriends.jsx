import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import "./OnlineFriends.css";
import { io } from "socket.io-client";
import { CurrentChatContext } from "../../Context/CurrentChat/CurrentChatContext";
import { OnlineUsersContext } from "../../Context/OnlineUsers/OnlineUsersContext";


export default function OnlineFriends ({  currentId ,conversations}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
    const { currentchat,dispatcher } = useContext(CurrentChatContext);
    const { OnlineUsers } = useContext(OnlineUsersContext);



  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("https://smilesocialapp.herokuapp.com/api/user/friends/" + currentId); 
      setFriends(res.data);

    };

    getFriends();
  }, [currentId]);


  useEffect(() => {

  
    OnlineUsers && setOnlineFriends(friends.filter((f) => OnlineUsers.includes(f._id)));
    


  }, [friends, OnlineUsers]);



  const handleClick = async (user) => {

      const members = {
        senderId:currentId,
        receiverId:user._id
    }


    const check  = conversations?.some((f) => f.members.includes(user._id));
    console.log(check);

    if(check){

    try {
      const res = await axios.get(
        `https://smilesocialapp.herokuapp.com/api/conversations/find/${currentId}/${user._id}`
      );

      dispatcher({type:"CURRENTCHAT_SET",payload:res.data});
       
      } catch (err) {
      console.log(err);
    }
    }
    else
    {
         try {

         const res = await axios.post(`https://smilesocialapp.herokuapp.com/api/conversations/`,members);

        console.log(res);
        dispatcher({type:"CURRENTCHAT_SET",payload:res.data});
      
      } catch (err) {
      console.log(err);
     }
    }
  };



      useEffect(() => {
  window.scrollTo(0, 0)
}, [])


  return (
    <div className="chatOnline">
      {onlineFriends.length > 0 ? onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture
                  ?  o.profilePicture
                  :"https://raw.githubusercontent.com/rehaanredkar15/SMILE-Social-Media/master/public/Assets/person/user.webp"

              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      )):   <>
            <h3>No Online Friends</h3> 
                    </>
      }
    </div>
  );
}