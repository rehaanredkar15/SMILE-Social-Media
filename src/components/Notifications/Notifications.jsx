import React from 'react';
import { useContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
import { OnlineUsersContext } from "../../Context/OnlineUsers/OnlineUsersContext";

const Notifications = ({notifications}) => {
    
    const [User, setUser] = useState()
    useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/user?username=" + notifications.senderName);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
     getUser();
  }, []);

        
      
    return (
        <>
            <div className="conversation">
                <img
                    className="conversationImg"
                    src={
                     User?.profilePicture
                        ? User.profilePicture
                        :  "http://localhost:3000/Assets/person/unknown.jpg"
                    }
                    alt=""
                />
        {
        notifications.type == 'message' ? 
        <span className="notification">
        <b> {`${notifications.senderName} `} </b> sent you a new <b>{ `${notifications.type}`}</b>   </span>
         : <span className="notification"> <b> {`${notifications.senderName} `}  </b>  { `${notifications.type}`} your post </span>

        }
        </div >
        </>
    )
}

export default Notifications

