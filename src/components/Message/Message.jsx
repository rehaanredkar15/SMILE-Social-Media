import "./Message.css";
import { format } from "timeago.js";
import { useContext, useEffect, useRef, useState } from "react";


export default function Message({ message, own ,currentUser,friend}) {
 

 const profile = currentUser?.profilePicture ? currentUser.profilePicture :  "http://localhost:3000/Assets/person/user.webp";
 const friendprofile = friend?.profilePicture ? friend.profilePicture :  "http://localhost:3000/Assets/person/user.webp";
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