import React,{useState} from 'react';
import './Post.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Users} from '../../dummyData';



const Post = ({post}) => {
    
    const [Like, setLike] = useState(post.like);
    const [isLiked, setisLiked] = useState(false)
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
                     <div  >                     
                     <img className = "postProfileImg" src={ Users.filter((u) =>u.id === post.userId)[0].profilePicture} alt="" />
                     </div>
                     <div className="postDetails">
                      <span className="postUserName"> 
                    { 
                       Users.filter((u) =>u.id === post.userId)[0].username
                    }
                         </span>
                      <span className="postTime">{post.date}</span>
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
                  <span className="postLikeCounter">{Like} </span>
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
