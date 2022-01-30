import "./Message.css";
import { format } from "timeago.js";
import { useContext, useEffect, useRef, useState } from "react";


export default function Message({ message, own ,currentUser,friend}) {
 

 const profile = currentUser?.profilePicture ? currentUser.profilePicture :  "https://raw.githubusercontent.com/rehaanredkar15/SMILE-Social-Media/master/public/Assets/person/user.webp";
 const friendprofile = friend?.profilePicture ? friend.profilePicture :  "https://raw.githubusercontent.com/rehaanredkar15/SMILE-Social-Media/master/public/Assets/person/user.webp";
       const scrollRef = useRef();



    useEffect(() => {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })

        }, [message]);

        
  return (
    <div className={own ? "message own" : "message"} ref={scrollRef}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            own? profile
            : friendprofile
        }
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
} 