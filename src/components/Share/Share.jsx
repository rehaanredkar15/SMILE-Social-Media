import React,{useContext,useRef,useState,useEffect} from 'react';
import PhotoSizeSelectActualTwoToneIcon from '@mui/icons-material/PhotoSizeSelectActualTwoTone';
import './Share.css';
import SentimentSatisfiedTwoToneIcon from '@mui/icons-material/SentimentSatisfiedTwoTone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { AuthContext } from '../../Context/AuthContext';
import { PostContext } from '../../Context/PostContext/PostContext';
import axios from 'axios';
import {  PostCall } from '../../pages/APICalls';
import {  UpdatePostCall  } from '../../pages/PostCalls';
import { Link } from "react-router-dom";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useNavigate,useParams } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { SnackbarContext } from "../../Context/Snackbar/SnackbarContext";
import { SetSnackbar } from "../../Context/Snackbar/SnackbarActions";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Share = ({postId}) => {

      const navigate = useNavigate();
        const { snackbarOpen,snackbarType,snackbarMessage,dispatched } = useContext(SnackbarContext);
      const user = JSON.parse(localStorage.getItem('user'));
      
      const handleClose = (event, reason) => {
			if (reason === 'clickaway') {
			return;
			}
      dispatched({type:"SNACKBAR_SET",payload:(snackbarOpen:false)});
		}; 

      const { post,isFetching,error,dispatch} = useContext(PostContext);


      const desc = useRef();
      const [file, setFile] = useState(null);

      const submitHandler = async (e) => {
      e.preventDefault();

      const newPost = {
      userId: user._id,
      desc: desc.current.value,
      photoUrl:"",
      };
      

    try {

            const formdata = new FormData();
            formdata.append("file", file);
            formdata.append("userId",user._id);
            formdata.append("desc", desc.current.value);

             if(postId)
             {
               if(file)
               {
               UpdatePostCall(formdata,dispatch,postId,navigate,dispatched);
               }
               else
               {

                   const data = { snackbarOpen:true,snackbarType:'error',snackbarMessage:'Please Pick A Image'}
         
                    dispatched(SetSnackbar(data));
               }
               
             }
             else{
                if(file)
               {
                 PostCall(formdata,dispatch);
                }
                else
               {

                   const data = { snackbarOpen:true,snackbarType:'error',snackbarMessage:'Please Pick A Image'}
         
                    dispatched(SetSnackbar(data));
               }

             }

              setFile(null);
               desc.current.reset();
           } catch (err) {
            console.log(err.message)
          }
   };

    return (
       <>
        <div className = "share">
       
            <div className="shareWrapper">
              <div className="shareTop">
               { snackbarOpen &&  <Snackbar open={snackbarOpen} autoHideDuration={3000} anchorOrigin={  {vertical: 'bottom',horizontal: 'center'}} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbarType} sx={{ width: '100%' }}>
                {snackbarMessage}
                </Alert>
              </Snackbar>
              }
               <div className="profileDiv"> 
               <Link to = {`/profile/${user.username}`}>
               <img className = "shareProfileImg" src={user.profilePicture? user.profilePicture : "https://raw.githubusercontent.com/rehaanredkar15/SMILE-Social-Media/master/public/Assets/person/user.webp"} alt="" />
               </Link>
               </div>
                <input placeholder={postId ? "Select a new image and write the description if you want to change":"What's on your mind " + user.username + "  ? "} ref={desc} className = "shareInput" />
              </div>
              <hr className="shareHr"/>

               {file && (
                    <div className="shareImgContainer">
                      <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                      <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                  )}
              <form className="shareBottom" onSubmit={submitHandler}>
                   <div className="shareOptions">

                     <label htmlFor = "file" className="shareOption" >
                        <PhotoSizeSelectActualTwoToneIcon  htmlColor="tomato"  className = "shareIcon"/>
                      <div>
                        <span className = "shareOptionText">Photos/Gifs</span>                      
                          <input style={{display:"none"}} type ="file" id = "file" accept=".png,.jpg,.jpeg,.gif"  onChange={(e) => setFile(e.target.files[0])}/>
                       </div>
                     </label>


                     <div className="PostButton">
                       <button className="shareButton" type="submit">Post</button>
                     </div>
                   </div>
               </form>
            </div>
        </div>
        </>
    )
}

export default Share
