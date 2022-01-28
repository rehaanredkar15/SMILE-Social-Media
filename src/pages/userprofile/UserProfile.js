import React from 'react';
import {useEffect,useState,useContext,useRef} from 'react';
import axios from 'axios';
import Feed from '../../components/Feed/Feed.jsx';
import Crop from '../../components/cropper/cropper.jsx';
import SideBar from '../../components/Sidebar/Sidebar.jsx';
import ShareModal from '../../components/ShareModal/ShareModal.js';
import TopBar from '../../components/Topbar/Topbar.jsx';
import './User.css';
import {  useParams } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import { makeStyles } from "@material-ui/core/styles";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { CurrentChatContext } from "../../Context/CurrentChat/CurrentChatContext";

const useStyles = makeStyles({
	iconButton: {
		// position: "relative",
		// top: "10px",
    // marginTop:"3rem",
    height:"2rem",
    width:"2rem",
    color:"red",
		right: "20px",
    float:"right",
    marginLeft:"8rem"
	},
	cancelIcon: {
		color: "#00a3c8",
    height:"2rem",
    //  marginTop:"30rem",
    width:"2rem",
    color:"red",
		fontSize: "50px",
		"&:hover": {
			color: "red",
		},
	},
});


const UserProfile = () => {
   
     const [open, setOpen] = React.useState(false);
     const [OpenModal,SetOpenModal] = useState(false);
     const [users,setUsers]  = useState('');
     const params = useParams();
     const [File,setFile] = useState('');
     const username = useParams().username;
     const inputRef = useRef();
     const section = useRef();
     const [showCropper, setShowCropper] = React.useState(false);
     const [Picture,SetPicture] = useState('');
     const { user } = useContext(AuthContext);
     

    const handleCropper = () => setShowCropper((prevValue) => !prevValue);


     const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };

      const scrollToTop = () => window.scrollTo({ top: section.current.offsetTop, behavior: "smooth" });
   
     useEffect(() => {

         const fetchUser = async () => {
              const res = await axios.get(`/user?username=${username}`)
             //here the fetch function is required to make the api request 
              setUsers(res.data);
         }
         fetchUser();
     }, [username])


    const handleChange = ()=>{

        SetOpenModal(!OpenModal);  
    }
   
    

    return (
        <>
            <TopBar/>
            <div className="userprofile"> 
             <SideBar/>
               <div className="userprofileRight">
                <div className="userprofileRightTop">
                   <div className="userprofileCover">
                            <img
                            className="userprofileCoverImg"
                            src={users.coverPicture? users.coverPicture : "http://localhost:3000/Assets/cover.jpg"}
                            alt=""
                          />

                          <label htmlFor = "file" className="Cover" >
                            <ModeEditOutlineTwoToneIcon  htmlColor="tomato"  className = "shareIcon" onClick={(event) => {
                               handleCropper();
                              SetPicture('Cover');
                                scrollToTop();
                            }}/>
                         <div>
                        <span className = "shareOptionText"></span>                      
                       </div>
                     </label>
                          <img
                            className="userprofileUserImg"
                            src={users.profilePicture? users.profilePicture : "http://localhost:3000/Assets/person/user.webp"}
                            alt=""
                          />
                           <span className="Online" >
                           <ModeEditOutlineTwoToneIcon  htmlColor="tomato"  className = "shareIcon" onClick={(event) => {
                               handleCropper();
                                SetPicture('Profile');
                                scrollToTop();
                                // handleClose(event);
                            }}/> </span>
                          
                      </div>  
                    </div>

                    <div>
                       <div className="userprofileInfo">
                          <h4 className="userprofileInfoName"> {users.username} </h4>
                          <span className="userprofileInfoDesc">{users.desc}</span>
                       </div>
                     </div>    
           {showCropper && <Crop handleCropper={handleCropper} Picture={Picture}/>}

               <div className="userDetails">
                <div className="userDetailsTitle">
              
               <h4>User Information</h4> 
               {/* <a href="#section2"> */}
               <ModeEditOutlineTwoToneIcon onClick={handleChange} /> 
                {/* </a> */}
                </div>

                 { OpenModal && <ShareModal id="section2" OpeningModal={SetOpenModal}  />}
                  <div className="DetaisbarInfo" >
                  
                  <div className="rightbarInfoItem" >
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
                 </div>

                  <div ref={section} className="Upload">
                       upload
                    </div>
               </div>
            </div>
        </>
    )
}

export default UserProfile
