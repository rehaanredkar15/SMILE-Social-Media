import React ,{useEffect,useState} from 'react'
import './Sidebar.css';
import { Link } from "react-router-dom";
import {useRef,useContext} from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { LogoutCall } from '../../pages/APICalls.js';
import axios from 'axios';
import {Search,Person,Chat,Notifications } from "@material-ui/icons";
import { CurrentChatContext } from "../../Context/CurrentChat/CurrentChatContext";
import OnlineFriends from '../OnlineFriends/OnlineFriends.jsx';



const Sidebar = () => {

     const [Friends, setFriends] = useState('');
     const [onUsers, setOnUsers] = useState([]);
     const { dispatch,user } = useContext(AuthContext);
       const [convos, setConvos] = useState([]);
    const { currentchat } = useContext(CurrentChatContext);


      const users  = JSON.parse(localStorage.getItem('user'));
      
     const [Current, setCurrent] = useState(user);
     const [SearchTerm, setSearchTerm] = useState('')



       useEffect(() => {

         const fetchUser = async () => {
              const res = await axios.get(`https://smilesocial.herokuapp.com/api/user?userId=${users._id}`)
             //here the fetch function is required to make the api request 
              setCurrent(res.data);
              localStorage.setItem('user',JSON.stringify(res.data));
         }
         fetchUser();
     }, [dispatch,user])
    
    




     useEffect(() => {

         const fetchPost = async () => {
               await fetch("https://smilesocial.herokuapp.com/api/user/userprofile" , {
              method: "GET",
            }).then(res => res.json())
              .then(data => setFriends(data.data));
         }
         fetchPost();
     }, [])
  
     useEffect(() => {
      window.scrollTo(0, 0)
    }, [])


     useEffect(() => {

         const fetchPost = async () => {
               await fetch("https://smilesocial.herokuapp.com/api/user/userprofile" , {
              method: "GET",
            }).then(res => res.json())
              .then(data => setOnUsers(data.data));
         }
         fetchPost();
     }, [])

    
    return (
        <div className="SideBarContainer">
          <div className="SideWrapper">
             <div className="Profile">
               <div className="ProfileImage">
                  <Link to = {`/profile/${Current.username}`}>
               <img src={Current.profilePicture? Current.profilePicture : "https://raw.githubusercontent.com/rehaanredkar15/SMILE-Social-Media/master/public/Assets/person/user.webp"}  className="ProfileImg" />
                 </Link>

               </div>
                <div className="ProfileDetails">
                 {Current.fullname}
                 <br/>
                @{Current.username}
                </div>
             </div>
             

                 
              <div className="FriendsList">
               <div className="topBarCenter"> 
                      <div className="Search"> 
                        <Search className="SIcon" />
                        <input placeholder="Search for a person"
                                 type="text"
                                  className="sInput" 
                                  onChange={(event)=>{
                                     setSearchTerm(event.target.value);
                                  }}
                           />
                      </div>
                        { SearchTerm &&  <h6 style={{paddingLeft:'18px',marginTop:'10px'}}>Search Results</h6>}
                      {
                         Friends && SearchTerm && Friends.filter((val) => {

                           if(SearchTerm == ""){
                             return val
                           }else if(val.username.toLowerCase().includes(SearchTerm.toLowerCase())){
                              
                             return val
                           }
                           
                         }).map((val,key) => {

                            
                               
                               return(
                                <ul className="sidebarFriend">
                               <li className="sidebarFriend">
                               <div className = "FriendDetails">
                                    <Link to = {`/profile/${val.username}`}>
                                    <img  src={ val?.profilePicture?  val.profilePicture :"https://raw.githubusercontent.com/rehaanredkar15/SMILE-Social-Media/master/public/Assets/person/user.webp"}
                                        alt="" className="sidebarFriendImg" />
                                    </Link>
                                    <span className="sidebarFriendName"> {val.username}</span>
                                    </div>
                                </li>
                                 </ul>
                               )
                         })
                         
                         }

                 </div>
                     <ul className="sidebarFriendList">
                        <h4> All Users: { onUsers.length > 0 && onUsers.length}</h4>

                     
                        {
                          onUsers && onUsers.map((u) => (

                               <li className="sidebarFriend">
                               <div className = "FriendDetails">
                                    <Link to = {`/profile/${u.username}`}>
                                    <img  src={ u?.profilePicture?  u.profilePicture :"https://raw.githubusercontent.com/rehaanredkar15/SMILE-Social-Media/master/public/Assets/person/user.webp"}
                                        alt="" className="sidebarFriendImg" />
                                    </Link>
                                    <span className="sidebarFriendName"> {u.username}</span>
                                    </div>
                                </li>
                          ))

                        }
                 </ul>
              </div>
          </div>
        </div>
    )
}

export default Sidebar
      