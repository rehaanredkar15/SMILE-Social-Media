import React,{useEffect ,useState,useContext,useRef} from 'react'
import './RightBar.css';
import OnlineFriends from '../OnlineFriends/OnlineFriends.jsx';
import Notifications from '../Notifications/Notifications.jsx';
import axios from 'axios';
import { Link } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';
import { Add, Remove } from "@material-ui/icons";
import { io } from "socket.io-client";
import { CurrentChatContext } from "../../Context/CurrentChat/CurrentChatContext";
import {Search} from "@material-ui/icons";
import { LogoutCall } from '../../pages/APICalls.js';




export default function RightBar({users,socket}){

    const {user:CurrentUser,dispatch} = useContext(AuthContext);
    const [Friends, setFriends] = useState();
 
    const [Follow,setFollow] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [convos, setConvos] = useState([]);
    const { currentchat } = useContext(CurrentChatContext);
         const [SearchTerm, setSearchTerm] = useState('')
         const [Term, SetTerm] = useState('')
       const [Loading, setLoading] = useState(false)

     
   
  
         useEffect(() => {
          
          socket && socket.emit("addUser",CurrentUser._id)
          socket && socket.on("getNotifications",(data) => {
            setNotifications((prev) => [...prev,data]);
          })
        }, [socket,CurrentUser])
     
      
      useEffect(() => {

          if(users)
        {
        
         setFollow(CurrentUser.followings.includes(users._id));

        }
        else
        {
             setFollow(false);
        }
      }, [users])



            useEffect(() => {

            const getFriends = async () => {
            try {
                if(users?._id)
                {
                const friendList = await axios.get("/user/friends/" + users?._id);
                setFriends(friendList.data);
                }
            } catch (err) {
                console.log(err);
            }
            };
           
            users &&  getFriends();
            
        }, [users]);


    
     const handleClick = async ()=>{
         setLoading(true);
         try{
             if(Follow){
                await axios.put("/user/" + users._id + "/unfollow",{
                    userId : CurrentUser._id,
                })
                dispatch({ type: "UNFOLLOW", payload: users._id });
                setLoading(false);
             }else{ 
                 await axios.put("/user/" + users._id + "/follow",{
                     userId:CurrentUser._id,
                 })
                 setLoading(false);
                dispatch({ type: "FOLLOW", payload: users._id });
             }
         }catch(err)
         {
             console.log(err);
         }

          setFollow(!Follow);
         }




     useEffect(() => {
            const getConversations = async () => {
            try {
                const res = await axios.get("/conversations/" + CurrentUser._id);
                setConvos(res.data);
            } catch (err) {
                console.log(err);
            }
            };
            CurrentUser &&  getConversations();
        }, []);
 


    const HomeRightBar = () => {
        return(
            <>
                <div className="Options">
                 <ul className = "sidebarList">
                  <li className="sidebarListItem">     
                   <img src="http://localhost:3000/Assets/Icons/home.gif" alt="" className="Icons"/>
                   <Link to="/" style={{textDecoration:"none"}}>
                        <span className="sidebarListItemText"> Home </span>
                  </Link>
                  </li>

                 <hr className = "sidebarHr"/>

                   <li className="sidebarListItem"> 
                  <img src="http://localhost:3000/Assets/Icons/explore.gif" alt="" className="Icons"/>
                   <Link to="/explore" style={{textDecoration:"none"}}>
                   <span className="sidebarListItemText"> Explore </span>
                   </Link> 
                  </li>

                  <hr className = "sidebarHr"/>
                  <li className="sidebarListItem">
                   <img src="http://localhost:3000/Assets/Icons/msg3.gif" alt="" className="Icons"/>
                  <Link to="/ChatSection" style={{textDecoration:"none"}}>
                  <span className="sidebarListItemText" >Messages </span>
                   </Link> 
                  </li>
                   <hr className = "sidebarHr"/>
                  <li className="sidebarListItem">
                  <img src="http://localhost:3000/Assets/Icons/8.gif" alt="" className="Icons"/>
                   <Link to = {`/userProfile/${CurrentUser.username}`} style={{textDecoration:"none"}}> 
                   <span className="sidebarListItemText">Edit  Profile</span>
                   </Link>
                  </li>
                  
                 
                </ul>
              </div>

              <div className="friendsListWrapper">   
                <div className="title">
              
               <h4 className="rightBarTitle">
                <img src="http://localhost:3000/Assets/Icons/notify.gif" alt="" className="Icons"/>
                Notifications : { notifications.length > 0 && notifications.length}</h4>
                </div>
                <ul className="rightBarFriendList">
                     {notifications.length>0 ? notifications.map((n) => (
                              <Notifications notifications={n}   />
                          ))
                          :  <img 
                       src="http://localhost:3000/Assets/person/notify.gif"
                      alt="" 
                    className="notify"/> 
                          }
                   
                 </ul>
              </div>
                <div className="friendsListWrapper">   
                <h4 className="rightBarTitle">
                <img src="http://localhost:3000/Assets/Icons/online.gif" alt="" className="Icons"/>
                Online Friends  :</h4>
                <ul className="rightBarFriend">
                       <Link to="/ChatSection" style={{textDecoration:"none"}}>
                      <OnlineFriends  
                    currentId={CurrentUser._id}
                     conversations={convos}
                   />
                   </Link>
                 </ul>
              </div>
            </>
        )
    }


     
    const ProfileRightbar = () => {

        return (
            <>
            <div className="rightBarDetails">
            
             {users.username !==CurrentUser.username && (
                 <>
                  <div className="btn-logo">
                <button className="ConnectButton" onClick={handleClick}>
                    {Follow ? "Disconnect" : "Connect"} 
                    {Follow ? <Remove /> : <Add />}   
                </button>
                {
                    
                   Loading && <img src="http://localhost:3000/Assets/person/loading.gif" alt="" className="Icons"/>
                }
                  </div>
                </>
                )}

            <h4 className="rightBarTitle">User Information</h4>
            <div className="rightbarInfo">
             <div className="rightbarInfoItem">
             <span className="rightbarInfoKey">City: </span>
             <span className="rightbarInfoValue">{users.city} </span>
             </div>
             <div className="rightbarInfoItem">
             <span className="rightbarInfoKey">From: </span>
             <span className="rightbarInfoValue"> { users.from} </span>
             </div>
             <div className="rightbarInfoItem">
                 <span className="rightbarInfoKey">Contact details: </span>
                 <span className="rightbarInfoValue"> { users.contact} </span>
               </div>
             <div className="rightbarInfoItem">
                 <span className="rightbarInfoKey">Email: </span>
                 <span className="rightbarInfoValue"> { users.email} </span>
               </div>
             </div>
            <h4 className="rightBarTitle">Connections :  { Friends?Friends.length : "-"} </h4>
            <div className="rightbarFollowings">

                 {Friends &&  Friends.map((u) => (
                              <div className="rightbarFollowing">
                                    <Link to = {"/profile/" + u.username}> 
                                    <img src={u.profilePicture} alt="" className="rightbarFollowingImg" />
                                    </Link>
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
             { users ? <ProfileRightbar/> : <HomeRightBar/>}
            </div>
            </div>
        </div>
    )
}

