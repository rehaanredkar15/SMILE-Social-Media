import React,{useEffect,useState} from 'react';
import axios from 'axios';
import './Post.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import {Users} from '../../dummyData';
import {format} from 'timeago.js';
import { Link } from "react-router-dom";


const Post = ({post}) => {
    
    const [Like, setLike] = useState(post.like);
    const [isLiked, setisLiked] = useState(false);
    const [users,setUsers]  = useState([]);


     useEffect(() => {

        //  console.log(users);
         const fetchUser = async () => {
              const res = await axios.get(`/user?userId=${post.userId}`)
             //here the fetch function is required to make the api request 
              console.log(res.data);
              setUsers(res.data);
         }
         fetchUser();
     }, [post.userId])
     //the useEffect will run for every user change

    // const [isLoved, setisLoved] = useState(false)
    const likeHandler = () => {

         setLike(isLiked? Like - 1 : Like + 1);
         setisLiked(!isLiked);
    }
    // const [Love, setLoved] = useState(post.like);
    // const LoveHandler = () => {
    //      setLoved(isLoved? Love - 1 : Love + 1);
    //      setisLoved(!isLoved);
    // }



    return (
        <div className="post">

         {/* post start */}
          <div className="postWrapper">
              <div className="postTop">
                  <div className="postTopLeft">
                     <div>

                     <Link to = {`/profile/${users.username}`}>                     
                     <img className = "postProfileImg" src={ users.profilePicture} alt="" />
                     </Link>
                     </div>
                     <div className="postDetails">
                      <span className="postUserName"> 
                       {
                           users.username
                       }
                         </span>
                      <span className="postTime">{format(post.createdAt)}</span>
                      </div>
                  </div>
                    <div className="moreOptions">
                      <MoreVertIcon/>
                     </div>
                </div>

              <div className="postCenter">
                 <div className="postText">{post.desc}</div>
                 <img src={post.photo} alt="" className="postImg" />
              </div>

                <div className="postBottom">  
                 <div className="postBottomLeft">
                 
                  <img src="/Assets/like.png" alt="" className="likeIcon" onClick={likeHandler}/>
                  <span className="postLikeCounter">{post.likes.length} </span>
                  {/* <img src="/Assets/heart.png" alt="" className="likeIcon" onClick={LoveHandler}/>
                 <span className="postLikeCounter">{Love}  </span> */}
                 </div>

                 <div className="postBottomRight">
                     <div className="postCommentText">
                        {post.comment} Comments
                     </div>
                 </div>
                </div>


            </div>

            {/* post end */}

             
        </div>
    )
}

export default Post
