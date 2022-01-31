import React from 'react'
import Message from '../../components/Message/Message.jsx';
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

const ChatSection = ({currentchat,user,socket,Current}) => { 
  
      const [messages, setMessages] = useState([]);
     const scrollRef = useRef();
     const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    

       useEffect(() => {
         socket && socket.on("getMessage", (data) => {
            setArrivalMessage({
              sender: data.senderId,
              text: data.text,
              createdAt: Date.now(),
            });
          });
      }, [arrivalMessage]);

       useEffect(() => {
         //to check if the messages are only set according to the user other wise there will be
         //no security
           arrivalMessage &&
            currentchat?.members.includes(arrivalMessage.sender) &&
          setMessages((prev) => [...prev, arrivalMessage]);
       }, [arrivalMessage,currentchat])



     useEffect(() => {

          const getMessages = async () => {
            try {
                const res = await axios.get("https://smilesocial.herokuapp.com/api/messages/" +currentchat._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
            };
                 
           currentchat._id && getMessages();
           
        }, [currentchat]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentchat._id,
    };

    const receiverId = currentchat.members.find(
      (member) => member !== user._id
    );

    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId:Current._id,
      text: newMessage,
    });
         
     socket.emit("sendNotification", {
      senderName: user.username,
      receiverId:Current._id,
      type:'message',
    });
    try {
      const res = await axios.post("https://smilesocial.herokuapp.com/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
     
  
      useEffect(() => {
         scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }, [messages]);

    return (
        <>
            <div className="ChatBoxTop">
        {messages.map((m) => (
           <div ref={scrollRef}>
            <Message message={m} own={m.sender === user._id} currentUser={user} friend={Current} />
           </div>
        ))}
       </div>
        <div className="chatBoxBottom">
          <textarea
                 className="chatMessageInput"
                 placeholder="Type something..."
                 onChange={(e) => setNewMessage(e.target.value)}
                 value={newMessage}
           ></textarea>
           <button className="chatSubmitButton" onClick={handleSubmit}>
               Send
           </button>
           </div>
              </>
    )
}

export default ChatSection
