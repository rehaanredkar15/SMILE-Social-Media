import React from 'react';
import {useEffect,useState,useContext} from 'react';
import axios from 'axios';
import Feed from '../../components/Feed/Feed.jsx';
import SideBar from '../../components/Sidebar/Sidebar.jsx';
import RightBar from '../../components/Rightbar/RightBar.jsx';
import TopBar from '../../components/Topbar/Topbar.jsx';
import './Profile.css';
import {  useParams } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';
import { CurrentChatContext } from "../../Context/CurrentChat/CurrentChatContext";
import TextsmsTwoToneIcon from '@mui/icons-material/TextsmsTwoTone';
import { Link } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { SnackbarContext } from "../../Context/Snackbar/SnackbarContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Profile = () => {
   
     const { user} = useContext(AuthContext);


   const [current,setCurrent]  = useState([]);
   const username = useParams().username;
  const [convers, setConvers] = useState([]);
   const { currentchat,dispatcher } = useContext(CurrentChatContext);
   const { snackbarOpen,snackbarType,snackbarMessage,dispatched } = useContext(SnackbarContext);
    const initialState = { snackbarOpen:snackbarOpen,snackbarType:snackbarType,snackbarMessage:snackbarMessage}
    const [Data, setData] = useState(initialState)
	 

		const handleClose = (event, reason) => {
			if (reason === 'clickaway') {
			return;
			}

				setData((state) => ({snackbarOpen:false}))
		};
         
         	useEffect(() => {
         dispatched({type:"SNACKBAR_SET",payload:Data});
				
			}, [Data])


     useEffect(() => {

         const fetchUser = async () => {
              const res = await axios.get(`https://smilesocial.herokuapp.com/api/user?username=${username}`)
             //here the fetch function is required to make the api request 
              setCurrent(res.data);
         }
         fetchUser();
     }, [username])

            useEffect(() => {
                    const getConversations = async () => {
                    try {
                        const res = await axios.get("https://smilesocial.herokuapp.com/api/conversations/" + current._id);
                        setConvers(res.data);
                    } catch (err) {
                        console.log(err);
                    }
                    };
                    getConversations();
                }, [currentchat,current._id]);


            const check  = convers?.map((f) => f.members.includes(current._id))

            
              const handleClick = async () => {

              const members = {
                senderId:user._id,
                receiverId:current._id
            }

            try {
              const res = await axios.get(
                `https://smilesocial.herokuapp.com/api/conversations/find/${user._id}/${current._id}`
              );

              
              if(res.data === null)
              {
                 try {
                const res = await axios.post(`https://smilesocial.herokuapp.com/api/conversations/`,members);

                    dispatcher({type:"CURRENTCHAT_SET",payload:res.data});
                  
                  } catch (err) {
                  console.log(err);
                } 
              }
              else
              { 
              dispatcher({type:"CURRENTCHAT_SET",payload:res.data});
              }

              
              } catch (err) {
              console.log(err);
            }

              
          };

    

    return (
        <>
            <TopBar/>
            <div className="profile"> 
             <SideBar/>
            <div className="profileRight">

             { <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbarType} sx={{ width: '100%' }}>
                {snackbarMessage}
                </Alert>
              </Snackbar>
              }
              <div className="profileRightTop">
                <div className="profileCover">
                 <img
                className="profileCoverImg"
                src={current.coverPicture? current.coverPicture : "https://github.com/rehaanredkar15/SMILE-Social-Media/blob/master/public/Assets/person/cover1.jpg?raw=true"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={current.profilePicture? current.profilePicture : "https://raw.githubusercontent.com/rehaanredkar15/SMILE-Social-Media/master/public/Assets/person/user.webp"}
                alt=""
              />
            </div>
            <div className="ChatSection">
            {

                    current && 
                    <Link to="/Chatsection" style={{textDecoration:"none"}}>
               <TextsmsTwoToneIcon htmlColor="limegreen" style={{textDecoration:"none",height:"3rem",width:"2rem"}} onClick={handleClick}/>
                    </Link>
            }
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName"> {current.username} 
                  </h4>
              <span className="profileInfoDesc">{current.desc}</span>
            </div>
            </div>
                <div className="profileRightBottom">
                   <Feed username={username}/>
                   <RightBar users={current} />
                  </div>
              </div>
            </div>
        </>
    )
}

export default Profile
