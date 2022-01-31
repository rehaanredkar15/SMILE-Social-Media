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
                            src={user.coverPicture? user.coverPicture : "https://github.com/rehaanredkar15/SMILE-Social-Media/blob/master/public/Assets/person/cover1.jpg?raw=true"}
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
                            src={user.profilePicture? user.profilePicture : "https://raw.githubusercontent.com/rehaanredkar15/SMILE-Social-Media/master/public/Assets/person/user.webp"}
                            alt=""
                          />
                           <span className="Online" >
                           <ModeEditOutlineTwoToneIcon  htmlColor="tomato"  className = "shareIcon" onClick={(event) => {
                               handleCropper();
                                SetPicture('Profile');
                                scrollToTop();
                                
                            }}/> </span>
                          
                      </div>  
                    </div>

                    <div>
                       <div className="userprofileInfo">
                          <h4 className="userprofileInfoName"> {user.username} </h4>
                          <span className="userprofileInfoDesc">{user.desc}</span>
                       </div>
                     </div>    
           {showCropper && <Crop handleCropper={handleCropper} Picture={Picture}/>}

               <div className="userDetails">
                <div className="userDetailsTitle">
              
               <h4>User Information</h4> 

               <ModeEditOutlineTwoToneIcon onClick={handleChange} /> 
                </div>

                 { OpenModal && <ShareModal id="section2" OpeningModal={SetOpenModal}  />}
                  <div className="DetaisbarInfo" >
                  
                  <div className="rightbarInfoItem" >
                          <span className="rightbarInfoKey">City: </span>
                          <span className="rightbarInfoValue">{user.city} </span>
                  </div>
                  <div className="rightbarInfoItem">
                          <span className="rightbarInfoKey">From: </span>
                          <span className="rightbarInfoValue"> { user.from} </span>
                  </div>
                  <div className="rightbarInfoItem">
                      <span className="rightbarInfoKey">Contact details: </span>
                      <span className="rightbarInfoValue"> { user.contact} </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Email: </span>
                        <span className="rightbarInfoValue"> { user.email} </span>
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
