import React,{useEffect,useState , useContext} from 'react';
import axios from 'axios';
import './Post.css';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import {format} from 'timeago.js';
import { Link } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';
import { PostContext } from '../../Context/PostContext/PostContext';
import { DeletePostCall} from '../../pages/PostCalls.js';

const Post = ({post,socket}) => {
    
     const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user,setUser]  = useState([]);
    const { user:currentUser } = useContext(AuthContext);
    
     const IdCheck = currentUser._id;
    

    useEffect(() => {
         setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id])


     useEffect(() => {

         const fetchUser = async () => {
              const res = await axios.get(`/user?userId=${post.userId}`)
             //here the fetch function is required to make the api request 
              setUser(res.data);
         }
         fetchUser();
     }, [post.userId])
    


    //deletion
    const DeleteHandler = () =>{
       
        DeletePostCall(post.userId ,post._id);
        window.location.reload();
    }
    
    //updation

    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like",{ userId:currentUser._id});

             socket.emit("sendNotification", {
                senderName: currentUser.username,
                receiverId:user._id,
                type:'liked',
                });
        }
        catch(err){
           console.log(err)
        }
        setLike(isLiked ? like - 1 : like + 1);
       setIsLiked(!isLiked);
    }

    return (
        <>
        <div className="post">
          <div className="postWrapper">
              <div className="postTop">
                  <div className="postTopLeft">
                     <div>
                     <Link to = {`/profile/${user.username}`}>                     
                     <img className = "postProfileImg" src={user.profilePicture? user.profilePicture : "http://localhost:3000/Assets/person/user.webp"} alt="" />
                     </Link>
                     </div>
                     <div className="postDetails">
                      <span className="postUserName"> 
                       {user.username}
                         </span>
                      <span className="postTime">{format(post.createdAt)}</span>
                      </div>
                  </div>
                  { post.userId === currentUser._id && 
                    <div className="moreOptions">
                       <Link to = {`/posts/${post._id}`}>  
                      <div className="option1">
                      <ModeEditOutlineTwoToneIcon/>
                      </div>
                      </Link>
                      <div className="option1"> <DeleteTwoToneIcon onClick={DeleteHandler}/>
                       </div>
                     </div>
                  }
                </div>
              <div className="postCenter">
                 <div className="postText">{post.desc}</div>
                 <div className="mainPost">
                  <img src={post.photoUrl} alt="" className="postImg" />
                </div>
              </div>

                <div className="postBottom">  
                 <div className="postBottomLeft">
                  <img src="/Assets/like.png" alt="" className="likeIcon" onClick={likeHandler}/>
                  <span className="postLikeCounter">{like} </span>
                 </div>
                </div>
            </div>
         
        </div>
        </>
    )
}

export default Post;
