import React from 'react';
import {useEffect,useState} from 'react';
import axios from 'axios';
import Feed from '../../components/Feed/Feed.jsx';
import SideBar from '../../components/Sidebar/Sidebar.jsx';
import RightBar from '../../components/Rightbar/RightBar.jsx';
import TopBar from '../../components/Topbar/Topbar.jsx';
import './Profile.css';
import {  useParams } from "react-router-dom";

const Profile = () => {
   


   const [users,setUsers]  = useState([]);
   const params = useParams();
   


     useEffect(() => {

         const fetchUser = async () => {
              const res = await axios.get(`/user?username=${params.username}`)
             //here the fetch function is required to make the api request 
              setUsers(res.data);
              // console.log(res.data);
         }
         fetchUser();
     }, [])



    return (
        <>
            <TopBar/>
            <div className="profile"> 
             <SideBar/>
             
            <div className="profileRight">
              <div className="profileRightTop">

                <div className="profileCover">
                
                 <img
                className="profileCoverImg"
                src="assets/post/3.jpeg"
                alt=""
              />
              <img
                className="profileUserImg"
                src="Assets/person/person2.jpg"
                alt=""
              />
            </div>
            
            <div className="profileInfo">
              <h4 className="profileInfoName"> {users.username} </h4>
              <span className="profileInfoDesc">{users.desc}</span>
            </div>

            </div>
                <div className="profileRightBottom">
                   <Feed username={params.username}/>
                   <RightBar users={users} />
                  </div>
              </div>
            </div>
        </>
    )
}

export default Profile
