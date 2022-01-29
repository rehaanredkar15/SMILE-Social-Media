import React from 'react';
import './Chat.css';
import Message from '../../components/Message/Message.jsx';
import SideBar from '../../components/Sidebar/Sidebar.jsx';
import OnlineFriends from '../../components/OnlineFriends/OnlineFriends.jsx';
import ChatSection from '../../components/ChatSection/ChatSection.jsx';
import TopBar from '../../components/Topbar/Topbar.jsx';
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { CurrentChatContext } from "../../Context/CurrentChat/CurrentChatContext";
import axios from "axios";
import Conversation from "../../components/Conversation/Conversation.jsx";
import { Link } from "react-router-dom";
import {Search } from "@material-ui/icons";
import { io } from "socket.io-client";
import { OnlineUsersContext } from "../../Context/OnlineUsers/OnlineUsersContext";



const Chat = ({socket}) => {
    
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const { user}  = useContext(AuthContext);
    const { currentchat,dispatcher } = useContext(CurrentChatContext);
    const [Current, setCurrent] = useState(user);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();
    const [currentChat, setCurrentChat] = useState(currentchat);
    const { OnlineUsers,dispatch } = useContext(OnlineUsersContext); 



    

        useEffect(() => {
           //to add the user in the current users array at socket file
          socket && socket.emit("addUser",user._id)
          var res;
          // getting the current socket connection users and then filtering this the followings of current user
          // with the u.id of every user received from the 
          socket && socket.on("getUsers",(users) => {

             res = user.followings.filter((f) => users.some((u) => u.userId === f)) ;

           dispatch({type:"ONLINEUSERS_SET",payload:res});
          })

        }, [user,socket])




        useEffect(() => {
            const getConversations = async () => {
            try {
                const res = await axios.get("/conversations/" + user._id);
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
            };
            getConversations();
        }, [currentchat,user._id]);
  

      
      

 


         useEffect(() => {

             const fetchUser = async () => {

               if(user._id === currentchat.members[0] )
               {
              const res = await axios.get(`/user?userId=${currentchat.members[1]}`)
              setCurrent(res.data);
               }
               else{
              const res = await axios.get(`/user?userId=${currentchat.members[0]}`)
              setCurrent(res.data);
               }
            }
            if(currentchat)
            {
            fetchUser();
            }
        }, [currentchat])


    return (
              <>
             <TopBar/>
            <div className="hContainer">
           <div className="SideBarCont">
          <div className="SideWrap">
            <div className="Friends">
                <ul className="sidebarFriend">
                <h4>Recents</h4>
                        {conversations && conversations.map((c) => (
                            <div onClick={() =>  dispatcher({type:"CURRENTCHAT_SET",payload:c})}>
                              <Conversation conversation={c} currentUser={user} />
                            </div>
                          ))}
                    </ul>
                    </div>
                    </div>
                </div>

             <div className = "FeedContainer">
                    <div className="chatBox">
                    <h3>{Current.username}</h3>
                    <div className="chatBoxWrapper">
                                {currentchat ? (

                                 <>
                                 <ChatSection user={user} currentchat={currentchat} Current={Current} socket={socket}/>
                                 </>
                                ) : (

                                <span className="noConversationText">
                                    Open a conversation to start a chat.
                                    <div className="inboxdiv" >
                                      <img 
                                    src="http://localhost:3000/Assets/Icons/1.gif"
                                    alt="" 
                                    className="inbox"/> 
                                    </div>
                                </span>
                                )}
                            </div>
                            </div>
                        </div>
                        <div className="chatOnlineChatsection">
                            <div className="chatOnlineWrapper">
                            
                                <OnlineFriends  
                                currentId={user._id}
                                 currentChat={currentChat} 
                                 conversations = {conversations}/>
                            </div>
                      </div>
            </div>
        </>
    )
}

export default Chat
